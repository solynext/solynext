import type { ChatReply, ChatService } from "./types";

export const chatService: ChatService = {
  async reply({ message, history, page }, signal) {
    signal.throwIfAborted();
    const recent = history.slice(-12).map(({ role, text }) => ({ role, text }));
    while (new TextEncoder().encode(JSON.stringify(recent)).byteLength > 24000 && recent.length > 2) recent.shift();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, page, history: recent }),
      signal,
    });
    if (!response.ok) throw new Error("Chat request failed");
    const reply: ChatReply = await response.json();
    if (typeof reply.text !== "string" || !reply.text.trim()) throw new Error("Empty chat response");
    return reply;
  },
};
