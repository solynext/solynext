import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { validateProject, type PortfolioProject } from "./model";

export function createPortfolioStore(file: string, initial: PortfolioProject[]) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<PortfolioProject[]> {
    let raw: string;
    try { raw = await readFile(file, "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(initial); throw error; }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length > 200) throw new Error("Portfolio storage is invalid.");
    const items = parsed.map(item => {
      if (typeof item.id !== "string" || typeof item.updatedAt !== "string") throw new Error("Portfolio storage is invalid.");
      return { ...validateProject(item), id: item.id, updatedAt: item.updatedAt };
    });
    if (new Set(items.map(item => item.slug)).size !== items.length) throw new Error("Portfolio has duplicate slugs.");
    return items;
  }
  function update(transform: (items: PortfolioProject[]) => PortfolioProject[]) {
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
