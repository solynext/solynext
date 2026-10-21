"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { seoStore } from "./repository";
import type { SeoSettings } from "./model";

export async function saveSeoSettings(value: SeoSettings): Promise<{ settings: SeoSettings; error?: never } | { error: string; settings?: never }> {
  await requireAdmin();
  try {
    const settings = await seoStore.save(value, value.updatedAt);
    revalidatePath("/", "layout");
    revalidatePath("/robots.txt");
    revalidatePath("/sitemap.xml");
    return { settings };
  } catch (error) {
    return { error: error instanceof Error && error.message.startsWith("SEO:") ? error.message : "Could not save SEO settings. Check server storage and try again." };
  }
}
