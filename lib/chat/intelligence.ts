import type { ChatMessage } from "./types";

export type AssistantIntent = "service" | "quotation" | "troubleshooting" | "explanation" | "writing" | "conversation" | "general";
export type ChatLanguage = "en" | "ur" | "roman-ur";

export function detectLanguage(text: string): ChatLanguage {
  if (/[\u0600-\u06ff]/u.test(text)) return "ur";
  return /\b(ass?alam|salam|alaikum|walai?kum|kya|kaise|kaisay|kese|aap|apko|mujhe|chahiye|batao|bataye|bataein|shukriya|theek|hai|hain|hoon)\b/i.test(text) ? "roman-ur" : "en";
}

export function classifyIntent(message: string, history: Pick<ChatMessage, "role" | "text">[] = []): AssistantIntent {
  const text = message.toLowerCase();
  const previousUser = history.filter(turn => turn.role === "user" && turn.text !== message).at(-1)?.text || "";
  const projectContext = /solynext|website|web app|mobile app|software|project|design|development|quotation|quote|estimate|ویب سائٹ|پروجیکٹ/i.test(`${text} ${previousUser}`);
  if (projectContext && /\b(price|pricing|quote|quotation|cost|budget|estimate|kitna|qeemat)\b|قیمت|لاگت/.test(text)) return "quotation";
  if (/\b(error|debug|bug|not working|doesn.t work|crash|stack trace|vercel|troubleshoot|fix|broken)\b|کام نہیں/.test(text)) return "troubleshooting";
  if (/\b(translate|translation|rewrite|grammar|proofread|draft|write|summarize|summarise)\b|ترجمہ|لکھ/.test(text)) return "writing";
  if (/\b(what (is|are)|explain|how (does|do)|difference|compare|versus|vs|tutorial|teach|learn|kya (hai|hain)|samjhao|samjha|farq)\b|کیا ہے|سمجھا/.test(text)) return "explanation";
  if (/\b(solynext|services?|can you (build|develop|design|make)|i (need|want)|we (need|want)|our services|start a project|mujhe.*(website|app|design)|website.*chahiye)\b|سروس|ویب سائٹ.*چاہیے/.test(text)) return "service";
  if (/^(hi|hello|hey|thanks|thank you|ass?alam|salam|wa alaikum|good morning)|کیا حال|السلام|شکریہ/i.test(text)) return "conversation";
  if (text.length < 90 && /^(and |what about|how about|can it|can you also|it |that |both|yes|no|aur |is mein)/i.test(text)) {
    const previous = history.filter(item => item.role === "user" && item.text !== message).at(-1);
    if (previous) return classifyIntent(previous.text);
  }
  return "general";
}

/** Only a bounded, contiguous recent conversation crosses the model boundary. */
export function conversationWindow(history: Pick<ChatMessage, "role" | "text">[], message: string) {
  const turns = history.filter(turn => turn.role === "user" || turn.role === "assistant").slice(-12).map(turn => ({ role: turn.role, text: turn.text.slice(0, turn.role === "user" ? 1000 : 6000) }));
  if (turns.at(-1)?.role !== "user" || turns.at(-1)?.text !== message) turns.push({ role: "user", text: message });
  while (turns.length > 12 || new TextEncoder().encode(JSON.stringify(turns)).byteLength > 18000) turns.shift();
  while (turns.length && turns[0].role !== "user") turns.shift();
  return turns;
}
