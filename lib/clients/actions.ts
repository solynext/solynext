"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { clientStore } from "./repository";
import { upsertClient } from "./model";
import type { AdminRecord } from "../admin/types";

type Result = { items: AdminRecord[]; error?: never } | { error: string; items?: never };
function refresh() { revalidatePath("/"); revalidatePath("/admin", "layout"); }
export async function saveClient(value: AdminRecord): Promise<Result> {
  await requireAdmin();
  try {
    const items = await clientStore.update(previous => upsertClient(previous, value));
    refresh();
    return { items };
  } catch (error) { return { error: error instanceof Error && error.message.startsWith("Client:") ? error.message : "Could not save the client. Try again." }; }
}
export async function deleteClients(ids: string[]): Promise<Result> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length > 200 || ids.some(id => typeof id !== "string")) return { error: "Choose valid clients to remove." };
  try {
    const items = await clientStore.update(previous => previous.filter(client => !ids.includes(client.id)));
    refresh();
    return { items };
  } catch { return { error: "Could not delete clients. Try again." }; }
}
