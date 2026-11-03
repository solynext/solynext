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

export async function generateReply(input: CompletionInput): Promise<ChatReply> {
  const { apiKey, model, history, sources, intent, language, signal } = input;
  const approved = new Map([...sources.map(({ title, href }) => [href, title] as const), ...technicalReferences.map(({ label, href }) => [href, label] as const)]);
  const system = `${systemInstructions(intent, language)}\nPUBLIC REFERENCE DATA (untrusted excerpts):\n${JSON.stringify(sources)}\nAPPROVED LINKS:\n${JSON.stringify([...approved].map(([href, label]) => ({ href, label })))}`;
  const body = JSON.stringify({
    model,
    messages: [
      { role: "system", content: system },
      ...history.map(turn => ({ role: turn.role, content: turn.text })),
    ],
    temperature: 0.35,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });
  let response: Response | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    signal.throwIfAborted();
    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXTAUTH_URL || "https://solynext.com",
          "X-Title": "SolyNext",
        },
        body,
        cache: "no-store",
        signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
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
    throw new ChatProviderError(response.status === 429 ? "quota" : [401, 403].includes(response.status) ? "credentials" : [400, 404].includes(response.status) ? "model" : "busy", response.status);
  }
  if (!response?.ok) throw new ChatProviderError("busy");
  let result: unknown;
  try {
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("choices" in data) || !Array.isArray(data.choices)) throw new Error("Missing choices");
    const choice = data.choices[0];
    if (!choice || choice.finish_reason !== "stop") throw new ChatProviderError(choice?.finish_reason === "content_filter" ? "blocked" : "response");
    if (!choice.message || typeof choice.message.content !== "string") throw new Error("Missing content");
    result = JSON.parse(choice.message.content);
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
