import { createHash } from "node:crypto";
import { generateGeminiReply } from "@/lib/chat/gemini";
import { selectKnowledge, websiteKnowledge } from "@/lib/chat/knowledge";
import { createChatLimiter, parseChatRequest } from "@/lib/chat/request";
import { getPredefinedReply } from "@/lib/chat/responses";
import { getPublicProjects } from "@/lib/portfolio/repository";

export const runtime = "nodejs";
const allowed = createChatLimiter();
const headers = { "Cache-Control": "no-store" };

async function readBody(request: Request) {
  if (!request.body) throw new Error("Empty request");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32_000) { await reader.cancel(); throw new Error("Request too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next can expose its bind address in request.url; Host is the browser-facing authority.
  const host = request.headers.get("host") || new URL(request.url).host;
  let sameOrigin = !origin;
  if (origin) {
    try {
      const source = new URL(origin);
      sameOrigin = ["http:", "https:"].includes(source.protocol) && source.origin === origin && source.host === host;
    } catch { sameOrigin = false; }
  }
  if (!sameOrigin) return Response.json({ error: "Request not allowed" }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON" }, { status: 415, headers });
  const visitor = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").digest("hex");
  if (!allowed(visitor)) return Response.json({ error: "Please wait a minute before sending more messages." }, { status: 429, headers: { ...headers, "Retry-After": "60" } });
  let input: ReturnType<typeof parseChatRequest>;
  try { input = parseChatRequest(await readBody(request)); }
  catch { return Response.json({ error: "Send a message of up to 1,000 characters with a short conversation history." }, { status: 400, headers }); }

  const basic = (notice: string) => {
    const reply = getPredefinedReply(input.message, input.history);
    return { ...reply, text: `${notice}\n\n${reply.text}` };
  };
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === "api") return Response.json(basic("I'm currently using basic website answers. AI conversation isn't enabled yet."), { headers });
  try {
    const projects = await getPublicProjects();
    const pages = [...websiteKnowledge, ...projects.map(project => ({ label: project.title, href: `/portfolio/${project.slug}`, content: JSON.stringify({ title: project.title, summary: project.summary, industry: project.industry, technologies: project.technologies }) }))];
    const selected = selectKnowledge(pages, input.history.slice(-5).map(message => message.text).join("\n"), input.page);
    // Always include company basics/contact, even when specialized pages rank higher.
    const sources = [...websiteKnowledge.slice(0, 3), ...selected.filter(page => !websiteKnowledge.slice(0, 3).some(base => base.href === page.href))];
    const reply = await generateGeminiReply({ apiKey, model: process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash", history: input.history, pages: sources, signal: AbortSignal.any([request.signal, AbortSignal.timeout(30_000)]) });
    return Response.json(reply, { headers });
  } catch {
    if (request.signal.aborted) return new Response(null, { status: 499, headers });
    return Response.json(basic("AI conversation is temporarily unavailable. Here's a basic website answer while you try again or contact our team."), { headers });
  }
}
