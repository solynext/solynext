"use server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { appStore, appsDirectory } from "./repository";
import { validateApp, type CatalogApp } from "./model";
type Result = { items: CatalogApp[]; error?: never } | { error: string; items?: never };
function refresh() { revalidatePath("/solynext-apps"); revalidatePath("/admin/apps"); }
export async function saveCatalogApp(form: FormData): Promise<Result> {
  await requireAdmin();
  let uploaded: string | undefined;
  try {
    const id = String(form.get("id") || "");
    const previous = id ? (await appStore.read()).find(item => item.id === id) : undefined;
    if (id && !previous) throw new Error("App: This app no longer exists. Refresh and try again.");
    const photo = form.get("image");
    const hasPhoto = photo instanceof File && photo.size > 0;
    const kind = form.get("kind");
    let category = String(form.get("category") || "").trim();
    if (kind === "game" && !/\bgames?\b/i.test(category)) category = `Games · ${category}`;
    if (kind === "app" && /\bgames?\b/i.test(category)) throw new Error("App: Choose an app category, or use Add game.");
    // Validate all text before doing image work.
    let value = validateApp({ id: previous?.id || randomUUID(), name: form.get("name"), description: form.get("description"), details: form.get("details"), url: form.get("url"), image: previous?.image || "/api/app-images/00000000-0000-0000-0000-000000000000.webp", category, developer: form.get("developer"), version: form.get("version"), status: form.get("status"), featured: form.get("featured") === "on", order: Number(form.get("order")), updatedAt: new Date().toISOString() });
    if (!hasPhoto && !previous) throw new Error("App: Upload an image for your app.");
    if (hasPhoto) {
      if (photo.size > 4 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(photo.type)) throw new Error("App: Use a JPG, PNG, or WebP image up to 4 MB.");
      let bytes: Buffer;
      try { bytes = await sharp(Buffer.from(await photo.arrayBuffer()), { limitInputPixels: 40000000, animated: false }).rotate().resize(512,512,{ fit:"cover", position:"centre" }).webp({ quality:88 }).toBuffer(); }
      catch { throw new Error("App: This image could not be read. Choose a valid JPG, PNG, or WebP."); }
      const filename = `${randomUUID()}.webp`;
      await mkdir(path.join(appsDirectory,"images"), { recursive:true });
      uploaded = path.join(appsDirectory,"images",filename);
      await writeFile(uploaded,bytes);
      value = { ...value, image:`/api/app-images/${filename}` };
    }
    const items = await appStore.update(items => {
      if (previous && !items.some(item => item.id === id)) throw new Error("App: This app was deleted. Refresh and try again.");
      return previous ? items.map(item => item.id === id ? value : item) : [...items,value];
    });
    refresh(); return { items };
  } catch (error) {
    if (uploaded) await unlink(uploaded).catch(() => undefined);
    return { error: error instanceof Error && error.message.startsWith("App:") ? error.message : "Could not save the app. Try again." };
  }
}
export async function deleteCatalogApp(id: string): Promise<Result> {
  await requireAdmin();
  if (typeof id !== "string" || !/^[a-f0-9-]{36}$/.test(id)) return { error:"Choose a valid app." };
  try { const items = await appStore.update(items => items.filter(item => item.id !== id)); refresh(); return { items }; }
  catch { return { error:"Could not delete the app. Try again." }; }
}