import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import type { AdminRecord } from "@/lib/admin/types";
import { validateReview } from "./model";

export function createReviewStore(file: string, initial: AdminRecord[]) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<AdminRecord[]> {
    let raw: string;
    try { raw = await readFile(file, "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(initial); throw error; }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > 500) throw new Error("Review storage is invalid.");
    const items = parsed.map(validateReview);
    if (new Set(items.map(item => item.id)).size !== items.length) throw new Error("Review storage has duplicate identifiers.");
    const existingIds = new Set(items.map(item => item.id));
    const restored = initial.filter(item => !existingIds.has(item.id));
    return restored.length ? [...restored, ...items] : items;
  }
  function update(transform: (items: AdminRecord[]) => AdminRecord[]) {
    const operation = pending.then(async () => {
      const next = transform(await read()).map(validateReview);
      await mkdir(dirname(file), { recursive: true });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(next, null, 2), "utf8");
      await rename(temporary, file);
      return next;
    });
    pending = operation.catch(() => undefined);
    return operation;
  }
  return { read, update };
}
