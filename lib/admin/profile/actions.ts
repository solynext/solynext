"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth/dal";
import { adminPhotoStore } from "./repository";
import { processAdminPhoto } from "./image";
import type { AdminPhoto } from "./types";

type Result = { photo: AdminPhoto; error?: never } | { error: string; photo?: never };
async function uploadPhoto(data: FormData, kind: "avatar" | "cover"): Promise<Result> {
  const session = await requireAdmin();
  const file = data.get("photo");
  if (!(file instanceof File)) return { error: "Choose a profile image." };
  try {
    const image = await processAdminPhoto(file, kind);
    const photo = await adminPhotoStore.save(session.user.id, image, kind);
    revalidatePath("/admin", "layout");
    return { photo };
  } catch (error) { return { error: error instanceof Error && error.message.startsWith("Photo:") ? error.message.slice(7) : "Could not save your profile photo. Try again." }; }
}
async function removePhoto(kind: "avatar" | "cover"): Promise<Result> {
  const session = await requireAdmin();
  try {
    const photo = await adminPhotoStore.save(session.user.id, null, kind);
    revalidatePath("/admin", "layout");
    return { photo };
  } catch { return { error: "Could not remove your profile photo. Try again." }; }
}
export async function uploadAdminPhoto(data: FormData) { return uploadPhoto(data, "avatar"); }
export async function uploadAdminCover(data: FormData) { return uploadPhoto(data, "cover"); }
export async function removeAdminPhoto() { return removePhoto("avatar"); }
export async function removeAdminCover() { return removePhoto("cover"); }
