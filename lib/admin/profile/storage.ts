import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { emptyAdminPhoto, type AdminPhoto } from "./types";

function validateImage(image: unknown): asserts image is string | null {
  if (image !== null && (typeof image !== "string" || image.length > 1_500_000 || !/^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(image))) throw new Error("Photo: invalid stored image.");
}
export function createAdminPhotoStore(directory: string) {
  let pending: Promise<unknown> = Promise.resolve();
  const fileFor = (id: string) => {
    if (!/^[a-zA-Z0-9-]{1,100}$/.test(id)) throw new Error("Photo: invalid account identifier.");
    return path.join(directory, `${id}.json`);
  };
  async function read(id: string): Promise<AdminPhoto> {
    let raw: string;
    try { raw = await readFile(fileFor(id), "utf8"); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return { ...emptyAdminPhoto }; throw error; }
    const value = JSON.parse(raw) as AdminPhoto;
    if (!value || typeof value !== "object") throw new Error("Photo storage is invalid.");
    validateImage(value.image);
    const coverImage = value.coverImage ?? null;
    validateImage(coverImage);
    if (typeof value.updatedAt !== "string" || !Number.isFinite(Date.parse(value.updatedAt))) throw new Error("Photo storage is invalid.");
    return { image: value.image, coverImage, updatedAt: value.updatedAt };
  }
  function save(id: string, image: string | null, kind: "avatar" | "cover" = "avatar") {
    const operation = pending.then(async () => {
      const file = fileFor(id);
      validateImage(image);
      const previous = await read(id);
      const photo = { ...previous, [kind === "cover" ? "coverImage" : "image"]: image, updatedAt: new Date().toISOString() };
      await mkdir(directory, { recursive: true });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(photo), "utf8");
      await rename(temporary, file);
      return photo;
    });
    pending = operation.catch(() => undefined);
    return operation;
  }
  return { read, save };
}
