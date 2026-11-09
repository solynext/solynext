import { demoApps } from "@/lib/apps/demo-catalog";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const app = demoApps.find(item => item.id === id && item.category === "Downloads");
  if (!app) return new Response("Not found", { status: 404 });
  const content = `SolyNext Apps sample download\n\n${app.name}\n\n${app.description}\n\nThis is a text preview file for the sample catalog listing. It is not a software installer.\n`;
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${app.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-sample.txt"`, "X-Content-Type-Options": "nosniff" } });
}
