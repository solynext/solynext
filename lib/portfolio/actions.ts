"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { portfolioDirectory, portfolioStore } from "./repository";
import { upsertProject, type ProjectInput, type PortfolioProject } from "./model";

type Result = { items: PortfolioProject[]; error?: never } | { error: string; items?: never };
export async function listPortfolio(): Promise<Result> {
  await requireAdmin();
  try { return { items: await portfolioStore.read() }; } catch { return { error: "Could not load portfolio projects. Try again." }; }
}
export async function savePortfolioProject(id: string | null, value: ProjectInput): Promise<Result> {
  await requireAdmin();
  try {
    const items = await portfolioStore.update(previous => upsertProject(previous, id, value));
    revalidatePath("/"); revalidatePath("/portfolio"); revalidatePath("/portfolio/[slug]", "page");
    return { items };
  } catch (error) { return { error: error instanceof Error && /^[A-Za-z ]+: /.test(error.message) ? error.message : "Could not save the project. Check server storage and try again." }; }
}
export async function deletePortfolioProjects(ids: string[]): Promise<Result> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.some(id => typeof id !== "string") || ids.length > 200) return { error: "Choose valid projects to remove." };
  try {
    const items = await portfolioStore.update(previous => previous.filter(item => !ids.includes(item.id)));
    revalidatePath("/"); revalidatePath("/portfolio"); revalidatePath("/portfolio/[slug]", "page");
    return { items };
  } catch { return { error: "Could not delete projects. Try again." }; }
}
export async function uploadProjectImage(data: FormData): Promise<{ src: string; error?: never } | { error: string; src?: never }> {
  await requireAdmin();
  const file = data.get("image");
  if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024) return { error: "Choose an image smaller than 5 MB." };
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
    const extension = png && file.type === "image/png" ? "png" : jpg && file.type === "image/jpeg" ? "jpg" : webp && file.type === "image/webp" ? "webp" : null;
    if (!extension) return { error: "Choose a valid PNG, JPEG or WebP image." };
    const directory = path.join(portfolioDirectory, "images");
    await mkdir(directory, { recursive: true });
    const filename = `${crypto.randomUUID()}.${extension}`;
    await writeFile(path.join(directory, filename), bytes);
    return { src: `/api/project-images/${filename}` };
  } catch { return { error: "Image upload failed. Check server storage and try again." }; }
}
