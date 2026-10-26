import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { validateApp, type CatalogApp } from "./model";
export function createAppStore(file: string) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<CatalogApp[]> {
    let raw: string;
    try { raw = await readFile(file, "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data) || data.length > 500) throw new Error("App catalog storage is invalid.");
    const items = data.map(validateApp);
    if (new Set(items.map(item => item.id)).size !== items.length) throw new Error("Duplicate app identifiers.");
    return items;
  }
  function update(transform: (items: CatalogApp[]) => CatalogApp[]) {
    const operation = pending.then(async () => {
      const items = transform(await read()).map(validateApp);
      if (items.length > 500 || new Set(items.map(item => item.id)).size !== items.length) throw new Error("App: Catalog limit reached or duplicate identifier.");
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