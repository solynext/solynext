import type { ChatMessage } from "./types";

export function parseChatRequest(value: unknown) {
  if (!value || typeof value !== "object") throw new Error("Invalid request");
  const { message, history, page } = value as Record<string, unknown>;
  if (typeof message !== "string" || !message.trim() || message.length > 1000) throw new Error("Invalid message");
  if (!Array.isArray(history) || history.length > 12) throw new Error("Invalid history");
  const clean: ChatMessage[] = history.map((entry, index) => {
    if (!entry || typeof entry !== "object" || !["user", "assistant"].includes(entry.role) || typeof entry.text !== "string" || !entry.text.trim() || entry.text.length > (entry.role === "user" ? 1000 : 8000)) throw new Error("Invalid history entry");
    return { id: String(index), role: entry.role, text: entry.text };
  });
  // Initial greeting is presentation, not prior model context.
  while (clean.length && clean[0].role !== "user") clean.shift();
  const text = message.trim();
  if (clean.at(-1)?.role !== "user" || clean.at(-1)?.text !== text) clean.push({ id: "current", role: "user", text });
  return { message: text, history: clean, page: typeof page === "string" && /^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(page) && page.length <= 200 ? page : undefined };
}

/** Process-local protection; multi-instance hosting should also enforce edge limits. */
export function createChatLimiter() {
  const visitors = new Map<string, { count: number; reset: number }>();
  let total = 0;
  let reset = 0;
  return (visitor: string, now = Date.now()) => {
    if (now >= reset) { total = 0; reset = now + 60_000; visitors.clear(); }
    if (total >= 120) return false;
    const usage = visitors.get(visitor) ?? { count: 0, reset };
    if (usage.count >= 12) return false;
    usage.count++; total++;
    visitors.set(visitor, usage);
    return true;
  };
}
