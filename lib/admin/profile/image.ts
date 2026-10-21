import sharp from "sharp";

export const MAX_ADMIN_PHOTO_BYTES = 5 * 1024 * 1024;
export async function processAdminPhoto(file: File, kind: "avatar" | "cover" = "avatar"): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Photo: choose a JPG, PNG, or WebP image.");
  if (!file.size || file.size > MAX_ADMIN_PHOTO_BYTES) throw new Error("Photo: choose an image up to 5 MB.");
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const image = sharp(bytes, { limitInputPixels: 40_000_000 });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages ?? 1) > 1) throw new Error();
    const [width, height] = kind === "cover" ? [1200, 480] : [384, 384];
    const result = await image.rotate().resize(width, height, { fit: "cover" }).webp({ quality: 85 }).toBuffer();
    return `data:image/webp;base64,${result.toString("base64")}`;
  } catch { throw new Error("Photo: this image could not be opened. Choose a valid, still image under 40 megapixels."); }
}
