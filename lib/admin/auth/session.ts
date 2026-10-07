import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { AdminSession } from "./types";

export const ADMIN_COOKIE = "solynext_admin_session";
export const SESSION_TTL = 60 * 60 * 8;

function secret() {
  const configured = process.env.ADMIN_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV !== "production") return "solynext-local-development-session-key-replace-before-deploy";
  return null;
}

export function authConfigured() {
  return Boolean(secret()) && (process.env.NODE_ENV !== "production" || process.env.ADMIN_ENABLE_DEV_AUTH === "true");
}

export function signSession(session: AdminSession) {
  const key = secret();
  if (!key || !authConfigured()) throw new Error("Admin authentication is not configured.");
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${body}.${createHmac("sha256", key).update(body).digest("base64url")}`;
}

export function verifySession(token: string | undefined): AdminSession | null {
  const key = secret();
  if (!token || token.length > 4096 || !key || !authConfigured()) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [body, signature] = parts;
    const actual = Buffer.from(signature, "base64url");
    const expected = createHmac("sha256", key).update(body).digest();
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const session = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AdminSession;
    const now = Math.floor(Date.now() / 1000);
    if (session?.user?.role !== "admin" || session.user.id !== "development-admin" || typeof session.user.name !== "string" || typeof session.user.email !== "string" || !Number.isInteger(session.expiresAt) || !Number.isInteger(session.issuedAt) || session.expiresAt <= now || session.issuedAt > now + 30 || session.expiresAt - session.issuedAt > SESSION_TTL) return null;
    return session;
  } catch { return null; }
}

export function safeAdminReturn(value: unknown) {
  if (typeof value !== "string" || value.length > 2048 || !/^\/admin(?:\/|$)/.test(value) || value.includes("\\") || value.includes("//") || /[\r\n]|%2f|%5c/i.test(value)) return "/admin";
  const normalized = new URL(value, "https://admin.invalid");
  if (!/^\/admin(?:\/|$)/.test(normalized.pathname) || normalized.pathname.startsWith("/admin/login")) return "/admin";
  return normalized.pathname + normalized.search;
}
