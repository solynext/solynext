import { adStore } from "@/lib/ads/repository";
export const runtime = "nodejs";
export async function GET() {
  try {
    const ads = (await adStore.read()).filter(ad => ad.status === "Published").sort((a, b) => a.order - b.order).map(({ name, ...ad }) => { void name; return ad; });
    return Response.json({ ads }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ ads: [] }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
