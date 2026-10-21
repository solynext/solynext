import { getOfflineReply } from "./offline";
import { conversationWindow } from "./intelligence";
import { isPublicChatLink } from "./references";
import type { ChatReply, ChatService } from "./types";

/** Same UI contract; the optional AI provider and credentials remain server-side. */
export const chatService: ChatService = {
  async reply({ message, history }, signal) {
    signal.throwIfAborted();
    await Promise.resolve();
    signal.throwIfAborted();
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: conversationWindow(history, message), page: typeof window !== "undefined" ? window.location.pathname : undefined }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(35000)]),
      });
      signal.throwIfAborted();
      if (response.status === 429) return { text: "Please wait a minute before sending more messages." };
      if (!response.ok) throw new Error("Assistant request failed");
      const value: unknown = await response.json();
      if (!value || typeof value !== "object" || !("text" in value) || typeof value.text !== "string" || !value.text.trim() || value.text.length > 6500) throw new Error("Invalid assistant response");
      const links = "links" in value && Array.isArray(value.links) ? value.links : [];
      const reply: ChatReply = { text: value.text, links: links.filter(link => link && typeof link.href === "string" && isPublicChatLink(link.href) && typeof link.label === "string").slice(0, 3).map(link => ({ label: link.label.slice(0, 200), href: link.href })) };
      return reply;
    } catch {
      signal.throwIfAborted();
      return getOfflineReply(message, history);
    }
  },
};
