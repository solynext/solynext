import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, safeAdminReturn, verifySession } from "@/lib/admin/auth/session";

/** Next.js 16's middleware convention. Real authorization also runs in the DAL. */
export function proxy(request: NextRequest) {
  const session = verifySession(request.cookies.get(ADMIN_COOKIE)?.value);
  const isLogin = request.nextUrl.pathname === "/admin/login";
  // Login Server Actions POST here; they must be able to set/clear their cookies.
  if (isLogin && request.method === "POST") return NextResponse.next();
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

export const config = { matcher: ["/admin/:path*"] };
