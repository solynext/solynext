import { getPredefinedReply } from "./responses";
import type { ChatService } from "./types";

/** Local UI adapter. No network requests, lead submissions, or conversation storage. */
export const chatService: ChatService = {
  async reply({ message, history }, signal) {
    signal.throwIfAborted();
    await new Promise<void>((resolve, reject) => {
      const cancel = () => { clearTimeout(timer); reject(new DOMException("Request cancelled", "AbortError")); };
      const timer = setTimeout(() => { signal.removeEventListener("abort", cancel); resolve(); }, 650);
      signal.addEventListener("abort", cancel, { once: true });
    });
    signal.throwIfAborted();
    return getPredefinedReply(message, history);
  },
};
