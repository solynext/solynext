import { conversationWindow } from "./intelligence";
import type { ChatMessage } from "./types";

export function validateChatRequest(value: unknown) {
  if (!value || typeof value !== "object") throw new Error("Invalid request");
  const { message, history, page } = value as Record<string, unknown>;
  if (typeof message !== "string" || !message.trim() || message.length > 1000 || !Array.isArray(history) || history.length > 12) throw new Error("Invalid message or history");
  const clean: ChatMessage[] = history.map((turn, index) => {
    if (!turn || typeof turn !== "object" || !["user", "assistant"].includes(turn.role) || typeof turn.text !== "string" || !turn.text.trim() || turn.text.length > (turn.role === "user" ? 1000 : 6000)) throw new Error("Invalid conversation turn");
    return { id: String(index), role: turn.role, text: turn.text };
  });
  const text = message.trim();
  return { message: text, history: conversationWindow(clean, text), page: typeof page === "string" && /^\/(?!\/)[a-zA-Z0-9/_-]{0,180}$/.test(page) ? page : undefined };
}

/** Process-local resource bound; use trusted edge/shared limits for multi-instance deployments. */
export function createRateLimiter() {
  let reset = 0;
  let total = 0;
  const counts = new Map<string, number>();
  return (visitor: string, now = Date.now()) => {
    if (now >= reset) { reset = now + 60000; total = 0; counts.clear(); }
    const count = counts.get(visitor) || 0;
    if (count >= 12 || total >= 100) return false;
    counts.set(visitor, count + 1); total++; return true;
  };
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  try {
    const source = new URL(origin);
    const host = request.headers.get("host") || new URL(request.url).host;
    return ["http:", "https:"].includes(source.protocol) && source.origin === origin && source.host === host;
  } catch { return false; }
}
