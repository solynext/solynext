"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateAdmin } from "./provider";
import { ADMIN_COOKIE, SESSION_TTL, safeAdminReturn, signSession } from "./session";
import { getAdminSession } from "./dal";
import type { LoginState } from "./types";

export async function loginAdmin(_previous: LoginState, form: FormData): Promise<LoginState> {
  const email = form.get("email");
  const password = form.get("password");
  if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 256) return { error: "Enter a valid email address and password." };
  const user = await authenticateAdmin(email, password);
  if (!user) return { error: "Unable to sign in. Check your credentials and try again." };
  const issuedAt = Math.floor(Date.now() / 1000);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, signSession({ user, issuedAt, expiresAt: issuedAt + SESSION_TTL }), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/admin", maxAge: SESSION_TTL,
  });
  redirect(safeAdminReturn(form.get("returnTo")));
}

export async function logoutAdmin() {
  (await cookies()).set(ADMIN_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/admin", maxAge: 0 });
  redirect("/admin/login");
}

/** A read-only server check; call on focus to detect expiry in an open workspace. */
export async function checkAdminSession() {
  const session = await getAdminSession();
  return { authenticated: Boolean(session), expiresAt: session?.expiresAt ?? null };
}
