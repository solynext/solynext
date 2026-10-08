import { getPublicProjects } from "@/lib/portfolio/repository";
export const runtime = "nodejs";
export async function GET() {
  try { return Response.json({ projects: await getPublicProjects() }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Projects unavailable" }, { status: 503 }); }
}
