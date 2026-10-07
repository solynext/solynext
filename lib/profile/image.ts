export const MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024;

/** Decode, crop centrally, and bound the stored image to keep browser storage small. */
export async function prepareProfileImage(file: File): Promise<string> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG, or WebP image.");
  if (file.size > MAX_PROFILE_IMAGE_BYTES) throw new Error("Choose an image smaller than 5 MB.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 40_000_000) throw new Error("This image is too large. Choose an image under 40 megapixels.");
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 384;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Image preview is unavailable in this browser.");
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 384, 384);
    return canvas.toDataURL("image/png");
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("This image")) throw error;
    throw new Error("This image could not be opened. Try a different image.");
  } finally { URL.revokeObjectURL(url); }
}
