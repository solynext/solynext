import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { defaultSeo, validateSeo, type SeoSettings } from "./model";

export function createSeoStore(file: string) {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<SeoSettings> {
    try { return validateSeo(JSON.parse(await readFile(file, "utf8"))); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(defaultSeo); throw error; }
  }
  function save(value: unknown, expectedUpdatedAt: string) {
    const operation = pending.then(async () => {
      const previous = await read();
      if (previous.updatedAt !== expectedUpdatedAt) throw new Error("SEO: settings changed in another session. Reload before saving.");
      const settings = validateSeo(value);
      settings.updatedAt = new Date(Math.max(Date.now(), Date.parse(previous.updatedAt || "1970-01-01") + 1)).toISOString();
      await mkdir(dirname(file), { recursive: true });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(settings, null, 2), "utf8");
      await rename(temporary, file);
      return settings;
    });
    pending = operation.catch(() => undefined);
    return operation;
  }
  return { read, save };
}
