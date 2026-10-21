import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import type { AdminRecord } from "../admin/types";
import { validateClient } from "./model";

export function createClientStore(file: string, initial: AdminRecord[]) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<AdminRecord[]> {
    let raw: string;
    try { raw = await readFile(file, "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(initial); throw error; }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > 200) throw new Error("Client storage is invalid.");
    const items = parsed.map(validateClient);
    if (new Set(items.map(item => item.id)).size !== items.length) throw new Error("Client storage has duplicate identifiers.");
    return items;
  }
  function update(transform: (items: AdminRecord[]) => AdminRecord[]) {
    const operation = pending.then(async () => {
      const items = transform(await read()).map(validateClient);
      await mkdir(dirname(file), { recursive: true });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(items, null, 2), "utf8");
      await rename(temporary, file);
      return items;
    });
    pending = operation.catch(() => undefined);
    return operation;
  }
  return { read, update };
}
