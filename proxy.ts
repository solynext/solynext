import { lookupCatalogRedirect } from "@/lib/catalog/redirects";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, safeAdminReturn, verifySession } from "@/lib/admin/auth/session";

/** Next.js 16's middleware convention. Real authorization also runs in the DAL. */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/services" || request.nextUrl.pathname === "/solutions" || request.nextUrl.pathname.startsWith("/services/") || request.nextUrl.pathname.startsWith("/solutions/")) {
    const target = await lookupCatalogRedirect(request.nextUrl.pathname);
    return target ? NextResponse.redirect(new URL(target, request.url), 301) : NextResponse.next();
  }
  const session = verifySession(request.cookies.get(ADMIN_COOKIE)?.value);
  const isLogin = request.nextUrl.pathname === "/admin/login";
  // Login Server Actions POST here; they must be able to set/clear their cookies.
  if (isLogin && request.method === "POST") return NextResponse.next();
  if (session?.user.catalogOnly && !isLogin && !/^\/admin\/(services|industries)(\/|$)/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/admin/services", request.url));
  }
  let response: NextResponse;
  if (!session && !isLogin) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("returnTo", safeAdminReturn(request.nextUrl.pathname + request.nextUrl.search));
    if (request.cookies.has(ADMIN_COOKIE)) url.searchParams.set("reason", "expired");
    response = NextResponse.redirect(url);
    if (request.cookies.has(ADMIN_COOKIE)) response.cookies.set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
  } else if (session && isLogin) {
    response = NextResponse.redirect(new URL(safeAdminReturn(request.nextUrl.searchParams.get("returnTo")), request.url));
  } else response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "same-origin");
  return response;
}

export const config = { matcher: ["/admin/:path*", "/services/:path*", "/solutions/:path*"] };
