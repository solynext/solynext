"use server";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { adStore } from "./repository";
import { validateAd, type AdInput, type WebsiteAd } from "./model";
type Result = { items: WebsiteAd[]; error?: never } | { error: string; items?: never };
export async function listAds(): Promise<Result> {
  await requireAdmin();
  try { return { items: await adStore.read() }; }
  catch { return { error: "Could not load ads. Check server storage and try again." }; }
}
export async function saveAd(id: string | null, value: AdInput): Promise<Result> {
  await requireAdmin();
  let input: AdInput;
  try { input = validateAd(value); } catch (error) { return { error: error instanceof Error ? error.message : "Check the ad fields." }; }
  try {
    return { items: await adStore.update(items => {
      if (id && !items.some(item => item.id === id)) throw new Error("missing");
      if (!id && items.length >= 100) throw new Error("limit");
      const item = { ...input, id: id ?? crypto.randomUUID(), updatedAt: new Date().toISOString() };
      return id ? items.map(row => row.id === id ? item : row) : [...items, item];
    }) };
  } catch { return { error: "Could not save. Refresh the list and check server storage (maximum 100 ads)." }; }
}
export async function deleteAd(id: string): Promise<Result> {
  await requireAdmin();
  try { return { items: await adStore.update(items => items.filter(item => item.id !== id)) }; }
  catch { return { error: "Could not delete the ad. Try again." }; }
}
