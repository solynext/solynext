import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { validateNotification, type WebsiteNotification } from "./types";

/** Atomic writes and a queue prevent overlapping updates in a single Node server. */
export function createNotificationStore(file: string) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<WebsiteNotification[]> {
    let raw: string;
    try { raw = await readFile(file, "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > 100) throw new Error("Notification storage is invalid.");
    return parsed.map(value => {
      const input = validateNotification(value);
      if (typeof value.id !== "string" || typeof value.createdAt !== "string" || typeof value.updatedAt !== "string" || (value.publishedAt !== null && typeof value.publishedAt !== "string")) throw new Error("Notification storage is invalid.");
      return { ...input, id: value.id, createdAt: value.createdAt, updatedAt: value.updatedAt, publishedAt: value.publishedAt };
    });
  }
  function update(transform: (items: WebsiteNotification[]) => WebsiteNotification[]) {
    const operation = pending.then(async () => {
      const next = transform(await read());
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
