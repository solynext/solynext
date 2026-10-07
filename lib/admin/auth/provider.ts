import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { authConfigured } from "./session";
import type { AdminSession } from "./types";

/** Replace this adapter with your identity provider; no credentials enter the client bundle. */
export async function authenticateAdmin(email: string, password: string): Promise<AdminSession["user"] | null> {
  if (!authConfigured()) return null;
  const expectedEmail = process.env.ADMIN_DEV_EMAIL ?? "admin@next.com";
  const expectedPassword = process.env.ADMIN_DEV_PASSWORD ?? "Admin123";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  const emailMatches = timingSafeEqual(hash(email.trim().toLowerCase()), hash(expectedEmail.toLowerCase()));
  const passwordMatches = timingSafeEqual(hash(password), hash(expectedPassword));
  return emailMatches && passwordMatches ? { id: "development-admin", name: "SolyNext Admin", email: expectedEmail, role: "admin" } : null;
}
