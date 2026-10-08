"use server";

import { requireAdmin } from "@/lib/admin/auth/dal";
import { notificationStore } from "./repository";
import { validateNotification, type NotificationInput, type WebsiteNotification } from "./types";

type Result = { items: WebsiteNotification[]; error?: never } | { error: string; items?: never };

export async function listWebsiteNotifications(): Promise<Result> {
  await requireAdmin();
  try { return { items: await notificationStore.read() }; }
  catch { return { error: "Could not load website notifications. Try again." }; }
}

export async function saveWebsiteNotification(id: string | null, value: NotificationInput): Promise<Result> {
  await requireAdmin();
  try {
    const input = validateNotification(value);
    const items = await notificationStore.update(previous => {
      const existing = id ? previous.find(item => item.id === id) : undefined;
      if (id && !existing) throw new Error("This notification was removed. Refresh the list.");
      if (!id && previous.length >= 100) throw new Error("Remove an older notification before adding another (limit: 100).");
      const now = new Date().toISOString();
      const item: WebsiteNotification = { ...input, id: existing?.id ?? crypto.randomUUID(), createdAt: existing?.createdAt ?? now, updatedAt: now, publishedAt: input.status === "published" ? existing?.publishedAt ?? now : null };
      return existing ? previous.map(row => row.id === id ? item : row) : [item, ...previous];
    });
    return { items };
  } catch (error) { return { error: error instanceof Error && /^(Enter|Choose|Use|This notification|Remove an older)/.test(error.message) ? error.message : "Could not save the notification. Check server storage and try again." }; }
}

export async function deleteWebsiteNotifications(id: string | null): Promise<Result> {
  await requireAdmin();
  try { return { items: await notificationStore.update(items => id === null ? [] : items.filter(item => item.id !== id)) }; }
  catch { return { error: "Could not remove notifications. Try again." }; }
}
