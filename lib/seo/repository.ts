import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { cache } from "react";
import { createSeoStore } from "./storage";

export const seoStore = createSeoStore(path.join(process.env.SEO_DATA_DIR || path.join(process.cwd(), ".data", "seo"), "settings.json"));
export const getSeoSettings = cache(async () => {
  await connection();
  return seoStore.read();
});
