import "server-only";
import path from "node:path";
import { createNotificationStore } from "./storage";

export const notificationStore = createNotificationStore(process.env.NOTIFICATIONS_FILE || path.join(process.cwd(), ".data", "website-notifications.json"));
