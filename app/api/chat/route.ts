import { createHash } from "node:crypto";
import { companyKnowledge } from "@/data/chat/knowledge";
import { getPublicProjects } from "@/lib/portfolio/repository";
import { classifyIntent, detectLanguage } from "@/lib/chat/intelligence";
import { buildKnowledge, retrieveKnowledge } from "@/lib/chat/knowledge";
import { getOfflineReply } from "@/lib/chat/offline";
import { ChatProviderError, generateReply } from "@/lib/chat/provider";
import { createRateLimiter, isSameOrigin, validateChatRequest } from "@/lib/chat/request";

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

function publicProjectSources(projects: Awaited<ReturnType<typeof getPublicProjects>>) {
  return projects.slice(0, 20).map(project => ({
    id: `project:${project.slug}`,
    title: project.title,
    href: `/portfolio/${project.slug}`,
    keywords: [project.industry, ...project.technologies].filter((value): value is string => Boolean(value)),
    content: [project.summary, project.industry && `Industry: ${project.industry}`, project.technologies.length && `Technologies: ${project.technologies.join(", ")}`].filter(Boolean).join("\n"),
  }));
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request not allowed" }, { status: 403, headers: cacheHeaders });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON" }, { status: 415, headers: cacheHeaders });
  const visitor = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").digest("hex");
  if (!allow(visitor)) return Response.json({ error: "Please wait a minute before sending more messages." }, { status: 429, headers: { ...cacheHeaders, "Retry-After": "60" } });
  let input: ReturnType<typeof validateChatRequest>;
  try { input = validateChatRequest(await bodyJson(request)); }
  catch { return Response.json({ error: "Use a message of up to 1,000 characters and a short conversation history." }, { status: 400, headers: cacheHeaders }); }

  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return Response.json({ ...getOfflineReply(input.message, input.history), mode: "local" }, { headers: cacheHeaders });

  const intent = classifyIntent(input.message, input.history);
  const language = detectLanguage(input.message);
  let sources = buildKnowledge();
  try {
    const projects = await getPublicProjects();
    sources = [...sources, ...publicProjectSources(projects)];
  } catch {
    globalThis.console?.error("Public portfolio knowledge is unavailable for chat.");
  }
  const relevantSources = retrieveKnowledge(sources, input.message, input.page);
  const history = input.history.map(({ role, text }) => ({ role, text }));
  try {
    const reply = await generateReply({
      apiKey,
      model: process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o",
      history,
      sources: relevantSources.length ? relevantSources : companyKnowledge,
      intent,
      language,
      signal: request.signal,
    });
    return Response.json({ ...reply, mode: "ai" }, { headers: cacheHeaders });
  } catch (error) {
    if (!(error instanceof ChatProviderError)) throw error;
    const fallback = getOfflineReply(input.message, input.history);
    const message = error.code === "quota"
      ? `The AI provider reached its request limit, so here's a limited offline answer. ${fallback.text}`
      : `AI replies are temporarily unavailable, so here's a limited offline answer. ${fallback.text}`;
    return Response.json({ ...fallback, text: message, mode: "local", reason: error.code }, { headers: cacheHeaders });
  }
}
