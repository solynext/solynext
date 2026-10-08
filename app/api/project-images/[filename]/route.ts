import { readFile } from "node:fs/promises";
import path from "node:path";
import { portfolioDirectory } from "@/lib/portfolio/repository";
export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!/^[a-f0-9-]{36}\.(png|jpg|webp)$/.test(filename)) return new Response("Not found", { status: 404 });
  try {
    const bytes = await readFile(path.join(portfolioDirectory, "images", filename));
    const type = filename.endsWith(".png") ? "image/png" : filename.endsWith(".jpg") ? "image/jpeg" : "image/webp";
    return new Response(bytes, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
