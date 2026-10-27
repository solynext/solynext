import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySession } from "./session";

export async function getAdminSession() {
  return verifySession((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin(allowCatalogOnly = false) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login?reason=expired");
  if (session.user.catalogOnly && !allowCatalogOnly) redirect("/admin/services");
  return session;
}
