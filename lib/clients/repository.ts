import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { CLIENTS } from "@/data/clients";
import { createClientStore } from "./storage";

export const clientSeeds = CLIENTS.map(client => ({
  id: client.id, title: client.name, category: client.category, description: client.summary,
  status: "Active", updatedAt: "2026-10-18T00:00:00.000Z", icon: client.icon,
}));
export const clientStore = createClientStore(path.join(process.env.CLIENT_DATA_DIR || path.join(process.cwd(), ".data", "clients"), "clients.json"), clientSeeds);
export async function getPublicClients() {
  await connection();
  return (await clientStore.read()).filter(client => client.status === "Active").map(({ id, title, category, icon }) => ({ id, title, category, icon }));
}
