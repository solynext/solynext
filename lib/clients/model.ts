import type { AdminRecord } from "../admin/types";

export function validateClient(value: unknown): AdminRecord {
  if (!value || typeof value !== "object") throw new Error("Client: enter client details.");
  const input = value as Record<string, unknown>;
  const field = (key: string, max: number, required = false) => {
    const value = input[key] ?? "";
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new Error(`Client: check ${key}.`);
    return value.trim();
  };
  const id = field("id", 100, true);
  if (!/^[a-zA-Z0-9-]+$/.test(id)) throw new Error("Client: invalid identifier.");
  const status = field("status", 30, true);
  if (!["Active", "Inactive", "Prospect", "Archived"].includes(status)) throw new Error("Client: choose a valid status.");
  return {
    id, title: field("title", 180, true), category: field("category", 120, true),
    description: field("description", 2000), status,
    updatedAt: field("updatedAt", 40, true),
    email: field("email", 254), phone: field("phone", 60), contactName: field("contactName", 180),
    location: field("location", 180), notes: field("notes", 5000), icon: field("icon", 60),
  };
}

export function upsertClient(items: AdminRecord[], value: unknown): AdminRecord[] {
  const client = validateClient(value);
  if (items.some(item => item.id !== client.id && item.title.toLowerCase() === client.title.toLowerCase())) throw new Error("Client: this business already exists.");
  if (items.some(item => item.id === client.id)) return items.map(item => item.id === client.id ? { ...client, updatedAt: new Date().toISOString() } : item);
  if (items.length >= 200) throw new Error("Client: the client limit is 200.");
  return [...items, { ...client, updatedAt: new Date().toISOString() }];
}
