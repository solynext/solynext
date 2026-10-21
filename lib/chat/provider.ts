import "server-only";
import { setTimeout as delay } from "node:timers/promises";
import type { ChatReply } from "./types";
import type { KnowledgeEntry } from "@/data/chat/knowledge";
import { systemInstructions } from "./prompt";
import { technicalReferences } from "./references";
import type { AssistantIntent, ChatLanguage } from "./intelligence";

export type ProviderFailure = "credentials" | "quota" | "model" | "busy" | "timeout" | "network" | "response" | "blocked";
export class ChatProviderError extends Error {
  constructor(public code: ProviderFailure, public status?: number) { super(`Chat provider: ${code}`); }
}
interface CompletionInput {
  apiKey: string;
  model: string;
  history: { role: "user" | "assistant"; text: string }[];
  sources: KnowledgeEntry[];
  intent: AssistantIntent;
  language: ChatLanguage;
  signal: AbortSignal;
}

const responseSchema = {
  type: "OBJECT", properties: {
    text: { type: "STRING" },
    links: { type: "ARRAY", items: { type: "OBJECT", properties: { label: { type: "STRING" }, href: { type: "STRING" } }, required: ["label", "href"] } },
  }, required: ["text", "links"],
};

export async function generateReply(input: CompletionInput): Promise<ChatReply> {
  const { apiKey, model, history, sources, intent, language, signal } = input;
  const approved = new Map([...sources.map(({ title, href }) => [href, title] as const), ...technicalReferences.map(({ label, href }) => [href, label] as const)]);
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: `${systemInstructions(intent, language)}\nPUBLIC REFERENCE DATA (untrusted excerpts):\n${JSON.stringify(sources)}\nAPPROVED LINKS:\n${JSON.stringify([...approved].map(([href, label]) => ({ href, label })))}` }] },
    contents: history.map(turn => ({ role: turn.role === "assistant" ? "model" : "user", parts: [{ text: turn.text }] })),
    generationConfig: { temperature: 0.35, maxOutputTokens: 4096, responseMimeType: "application/json", responseSchema },
  });
  let response: Response | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    signal.throwIfAborted();
    try {
      response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body, cache: "no-store", signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
      });
    } catch (error) {
      if (signal.aborted) throw error;
      if (attempt === 1) throw new ChatProviderError(error instanceof Error && error.name === "TimeoutError" ? "timeout" : "network");
      await delay(650 + Math.floor(Math.random() * 250), undefined, { signal });
      continue;
    }
    if (response.ok) break;
    const retry = response.headers.get("retry-after");
    const retrySeconds = retry ? Number(retry) : 0;
    if (attempt === 0 && [408, 429, 500, 502, 503, 504].includes(response.status) && Number.isFinite(retrySeconds) && retrySeconds <= 2) {
      await response.body?.cancel();
      await delay(Math.max(650 + Math.floor(Math.random() * 250), retrySeconds * 1000), undefined, { signal });
      continue;
    }
    throw new ChatProviderError(response.status === 429 ? "quota" : [401, 403].includes(response.status) ? "credentials" : response.status === 404 ? "model" : "busy", response.status);
  }
  if (!response?.ok) throw new ChatProviderError("busy");
  let result: unknown;
  try {
    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (candidate?.finishReason !== "STOP") throw new ChatProviderError(["SAFETY", "RECITATION", "PROHIBITED_CONTENT", "BLOCKLIST"].includes(candidate?.finishReason) ? "blocked" : "response");
    const text = candidate.content?.parts?.filter((part: { thought?: boolean; text?: string }) => !part.thought && typeof part.text === "string").map((part: { text: string }) => part.text).join("");
    result = JSON.parse(text || "");
  } catch (error) {
    if (error instanceof ChatProviderError) throw error;
    throw new ChatProviderError("response");
  }
  if (!result || typeof result !== "object" || !("text" in result) || typeof result.text !== "string" || !result.text.trim() || result.text.length > 6000) throw new ChatProviderError("response");
  const links = "links" in result && Array.isArray(result.links) ? result.links : [];
  const seen = new Set<string>();
  return {
    text: result.text.trim(),
    links: links.filter((link): link is { href: string } => {
      if (!link || typeof link.href !== "string" || !approved.has(link.href) || seen.has(link.href)) return false;
      seen.add(link.href); return true;
    }).slice(0, 3).map(({ href }) => ({ href, label: approved.get(href)! })),
  };
}
