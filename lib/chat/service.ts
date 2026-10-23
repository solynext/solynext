import { getPredefinedReply } from "./responses";
import type { ChatService } from "./types";

/** Local service guidance. No messages are sent to an external provider. */
export const chatService: ChatService = {
  async reply({ message, history }, signal) {
    signal.throwIfAborted();
    // Keep the typing indicator visible and cancel immediately when chat is cleared.
    await new Promise<void>((resolve, reject) => {
      const onAbort = () => {
        clearTimeout(timer);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      };
      const timer = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, 650);
      signal.addEventListener("abort", onAbort, { once: true });
    });
    signal.throwIfAborted();
    return getPredefinedReply(message, history);
  },
};
