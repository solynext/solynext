"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth/dal";
import type { AdminRecord } from "@/lib/admin/types";
import { reviewStore } from "./repository";
import { upsertReview } from "./model";

type Result = { items: AdminRecord[]; error?: never } | { error: string; items?: never };
function refresh() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  revalidatePath("/admin", "layout");
}

export async function saveReview(value: AdminRecord): Promise<Result> {
  await requireAdmin();
  try {
    const items = await reviewStore.update(previous => upsertReview(previous, value));
    refresh();
    return { items };
  } catch (error) {
    return { error: error instanceof Error && error.message.startsWith("Review:") ? error.message : "Could not save the review. Try again." };
  }
}

export async function deleteReviews(ids: string[]): Promise<Result> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length > 200 || ids.some(id => typeof id !== "string" || !/^[a-zA-Z0-9-]+$/.test(id))) return { error: "Choose valid reviews to remove." };
  try {
    const items = await reviewStore.update(previous => previous.filter(review => !ids.includes(review.id)));
    refresh();
    return { items };
  } catch {
    return { error: "Could not delete the reviews. Try again." };
  }
}
