import type { ChatMessage } from "./types";
import { capabilities } from "./capabilities";

export const CHAT_HISTORY_KEY = "solynext.chat.history.v1";
const MAX_MESSAGES = 201;
const allowedLinks = new Set(["/contact", "/services", ...Object.values(capabilities).map(service => `/services/${service.slug}`)]);
type StorageAccess = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Treat browser storage as untrusted. Never restore external or executable links. */
export function readChatHistory(storage: StorageAccess): ChatMessage[] | null {
  try {
    const raw = storage.getItem(CHAT_HISTORY_KEY);
    if (!raw || raw.length > 600000) return null;
    const saved = JSON.parse(raw);
    if (saved.version !== 1 || !Array.isArray(saved.messages) || !saved.messages.length || saved.messages.length > MAX_MESSAGES) return null;
    const ids = new Set<string>();
    const messages: ChatMessage[] = [];
    for (const item of saved.messages) {
      if (!item || typeof item.id !== "string" || item.id.length > 100 || ids.has(item.id) || !["user", "assistant"].includes(item.role) || typeof item.text !== "string" || !item.text.trim() || item.text.length > 6000) return null;
      ids.add(item.id);
      const links = Array.isArray(item.links) && item.role === "assistant" ? item.links.filter((link: unknown): link is { label: string; href: string } => Boolean(link && typeof link === "object" && "label" in link && "href" in link && typeof link.label === "string" && link.label.length <= 100 && typeof link.href === "string" && allowedLinks.has(link.href))).slice(0, 3) : [];
      messages.push({ id: item.id, role: item.role, text: item.text, ...(links.length ? { links } : {}) });
    }
    return messages;
  } catch { return null; }
}

/** Persist completed exchanges only, so reloads never restore a stranded typing request. */
export function saveChatHistory(storage: StorageAccess, messages: ChatMessage[]): boolean {
  try {
    if (messages.length <= 1 && messages[0]?.id === "welcome") storage.removeItem(CHAT_HISTORY_KEY);
    else if (messages.at(-1)?.role === "assistant") {
      const welcome = messages.find(message => message.id === "welcome");
      const recent = messages.filter(message => message.id !== "welcome").slice(-200);
      storage.setItem(CHAT_HISTORY_KEY, JSON.stringify({ version: 1, messages: welcome ? [welcome, ...recent] : recent }));
    }
    return true;
  } catch { return false; }
}

export function clearChatHistory(storage: StorageAccess): boolean {
  try { storage.removeItem(CHAT_HISTORY_KEY); return true; }
  catch { return false; }
}
