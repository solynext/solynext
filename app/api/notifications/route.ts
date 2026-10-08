import { notificationStore } from "@/lib/notifications/repository";
import { publishedNotifications } from "@/lib/notifications/types";

export const runtime = "nodejs";
export async function GET() {
  try { return Response.json({ notifications: publishedNotifications(await notificationStore.read()) }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Notifications unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
