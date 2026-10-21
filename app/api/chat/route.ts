import { createHash } from "node:crypto";
import { companyKnowledge, type KnowledgeEntry } from "@/data/chat/knowledge";
import { buildKnowledge, retrieveKnowledge } from "@/lib/chat/knowledge";
import { classifyIntent, detectLanguage } from "@/lib/chat/intelligence";
import { getOfflineReply } from "@/lib/chat/offline";
import { generateReply, ChatProviderError } from "@/lib/chat/provider";
import { createRateLimiter, isSameOrigin, validateChatRequest } from "@/lib/chat/request";
import { getPublicProjects } from "@/lib/portfolio/repository";

export const runtime = "nodejs";
const allow = createRateLimiter();
const cacheHeaders = { "Cache-Control": "no-store" };

async function bodyJson(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("No request body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); throw new Error("Request too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request not allowed" }, { status: 403, headers: cacheHeaders });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON" }, { status: 415, headers: cacheHeaders });
  const visitor = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").digest("hex");
  if (!allow(visitor)) return Response.json({ error: "Please wait a minute before sending more messages." }, { status: 429, headers: { ...cacheHeaders, "Retry-After": "60" } });
  let input: ReturnType<typeof validateChatRequest>;
  try { input = validateChatRequest(await bodyJson(request)); }
  catch { return Response.json({ error: "Use a message of up to 1,000 characters and a short conversation history." }, { status: 400, headers: cacheHeaders }); }
  const offline = (reason: string) => ({ ...getOfflineReply(input.message, input.history.map((turn, index) => ({ ...turn, id: String(index) }))), mode: "local", reason });
  const key = process.env.GEMINI_API_KEY?.trim();
  if (process.env.CHAT_PROVIDER === "local" || !key || key === "api") return Response.json(offline("not_configured"), { headers: cacheHeaders });

  const intent = classifyIntent(input.message, input.history);
  const language = detectLanguage(input.message);
  try {
    const entries = buildKnowledge();
    // Only published portfolio fields are allowed into the knowledge index.
    if (["service", "quotation"].includes(intent) || /solynext|portfolio|projects|case stud/i.test(input.message)) {
      try {
        const projects = await getPublicProjects();
        entries.push(...projects.map(project => ({ id: `project:${project.slug}`, title: project.title, href: `/portfolio/${project.slug}`, keywords: [project.industry, ...project.technologies], content: project.summary })));
      } catch {
        // A portfolio storage failure must not prevent a general conversation.
        console.warn("[SolyNext assistant] Published portfolio context unavailable");
      }
    }
    const currentQuery = input.message;
    const recentQuery = input.history.filter(turn => turn.role === "user").slice(-3).map(turn => turn.text).join(" ");
    const retrieved = retrieveKnowledge(entries, `${currentQuery} ${recentQuery}`, input.page);
    const pinned = [companyKnowledge[0], ...(["service", "quotation"].includes(intent) ? companyKnowledge.slice(1, 3) : [])];
    const sources: KnowledgeEntry[] = [...pinned, ...retrieved.filter(entry => !pinned.some(base => base.id === entry.id))];
    const reply = await generateReply({ apiKey: key, model: process.env.GEMINI_MODEL?.trim() || "gemini-3.1-flash-lite", history: input.history, intent, language, sources, signal: AbortSignal.any([request.signal, AbortSignal.timeout(28000)]) });
    return Response.json({ ...reply, mode: "ai" }, { headers: cacheHeaders });
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499, headers: cacheHeaders });
    const reason = error instanceof ChatProviderError ? error.code : error instanceof Error && error.name === "TimeoutError" ? "timeout" : "busy";
    console.warn("[SolyNext assistant] AI unavailable", { reason, status: error instanceof ChatProviderError ? error.status : undefined });
    const reply = offline(reason);
    const notices: Record<string, string> = { quota: "AI request limit reached. Please try later.", credentials: "AI access needs a configuration check.", model: "The configured AI model is unavailable.", timeout: "AI took too long to respond.", network: "Unable to connect to AI.", response: "AI returned an incomplete response.", blocked: "I couldn't answer that request. Please rephrase it.", busy: "AI is temporarily unavailable." };
    const notice = language === "en" ? notices[reason] : language === "ur" ? "اس وقت AI جواب دستیاب نہیں ہے۔" : "Abhi AI jawab available nahin hai.";
    return Response.json({ ...reply, text: `${notice}\n\n${reply.text}` }, { headers: cacheHeaders });
  }
}
