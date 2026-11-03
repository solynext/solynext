import { isPublicChatLink } from "./references";
import type { ChatService } from "./types";

export const chatService: ChatService = {
  async reply({ message, history, page }, signal) {
    signal.throwIfAborted();
    const conversation = history.map(({ role, text }) => ({ role, text }));
    if (conversation.at(-1)?.role !== "user" || conversation.at(-1)?.text !== message) {
      conversation.push({ role: "user", text: message });
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history: conversation.slice(-12),
        page,
      }),
      cache: "no-store",
      signal,
    });
    signal.throwIfAborted();
    if (!response.ok) throw new Error("Chat request failed");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("text" in result) || typeof result.text !== "string" || !result.text.trim() || result.text.length > 6000) {
      throw new Error("Invalid chat response");
    }
    const links = "links" in result && Array.isArray(result.links)
      ? result.links.filter((link): link is { label: string; href: string } => Boolean(
        link && typeof link === "object" && "label" in link && typeof link.label === "string" &&
        "href" in link && typeof link.href === "string" && isPublicChatLink(link.href),
      )).slice(0, 3)
      : [];
    return { text: result.text.trim(), ...(links.length ? { links } : {}) };
  },
};
