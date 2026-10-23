import { createHash } from "node:crypto";
import { getPredefinedReply } from "@/lib/chat/responses";
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

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request not allowed" }, { status: 403, headers: cacheHeaders });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON" }, { status: 415, headers: cacheHeaders });
  const visitor = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").digest("hex");
  if (!allow(visitor)) return Response.json({ error: "Please wait a minute before sending more messages." }, { status: 429, headers: { ...cacheHeaders, "Retry-After": "60" } });
  let input: ReturnType<typeof validateChatRequest>;
  try { input = validateChatRequest(await bodyJson(request)); }
  catch { return Response.json({ error: "Use a message of up to 1,000 characters and a short conversation history." }, { status: 400, headers: cacheHeaders }); }
  const history = input.history.map((turn, index) => ({ ...turn, id: String(index) }));
  return Response.json(getPredefinedReply(input.message, history), { headers: cacheHeaders });
}
