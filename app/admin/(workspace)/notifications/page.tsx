import { WebsiteNotifications } from "@/components/admin/WebsiteNotifications";
import { listWebsiteNotifications } from "@/lib/notifications/actions";
export const metadata = { title: "Notifications" };
export default async function NotificationsPage() { return <WebsiteNotifications initial={await listWebsiteNotifications()}/>; }
