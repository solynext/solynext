import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { validateAd, type WebsiteAd } from "./model";

const file = process.env.ADS_FILE || path.join(process.cwd(), ".data", "website-ads.json");
let pending: Promise<unknown> = Promise.resolve();
async function read(): Promise<WebsiteAd[]> {
  let raw: string;
  try { raw = await readFile(file, "utf8"); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data) || data.length > 100) throw new Error("Invalid ad storage.");
  return data.map(item => {
    const input = validateAd(item);
    if (typeof item.id !== "string" || typeof item.updatedAt !== "string") throw new Error("Invalid ad storage.");
    return { ...input, id: item.id, updatedAt: item.updatedAt };
  });
}
function update(transform: (items: WebsiteAd[]) => WebsiteAd[]) {
  const operation = pending.then(async () => {
    const items = transform(await read());
    await mkdir(path.dirname(file), { recursive: true });
    const temporary = `${file}.${randomUUID()}.tmp`;
    await writeFile(temporary, JSON.stringify(items, null, 2), "utf8");
    await rename(temporary, file);
    return items;
  });
  pending = operation.catch(() => undefined);
  return operation;
}
export const adStore = { read, update };
