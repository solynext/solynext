import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { createAppStore } from "./storage";
import { publishedApps } from "./model";
export const appsDirectory = process.env.APPS_DATA_DIR || path.join(process.cwd(), ".data", "apps");
export const appStore = createAppStore(path.join(appsDirectory, "apps.json"));
export async function getPublicApps() { await connection(); return publishedApps(await appStore.read()); }