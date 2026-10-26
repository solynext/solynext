export type CatalogApp = {
  id: string; name: string; description: string; details: string; url: string; image: string;
  category: string; developer: string; version: string; status: "Draft" | "Published";
  featured: boolean; order: number; updatedAt: string;
};
export function validateApp(value: unknown): CatalogApp {
  if (!value || typeof value !== "object") throw new Error("App: Invalid app data.");
  const item = value as Record<string, unknown>;
  function text(key: string, max: number, required = true) {
    const value = item[key];
    if (typeof value !== "string" || value.trim().length > max || (required && !value.trim())) throw new Error(`App: Enter a valid ${key} (up to ${max} characters).`);
    return value.trim();
  }
  const name = text("name", 15);
  if (name.length < 5) throw new Error("App: App name must be between 5 and 15 characters.");
  const id = text("id", 36);
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error("App: Invalid app identifier.");
  const url = text("url", 2048);
  let parsed: URL;
  try { parsed = new URL(url); } catch { throw new Error("App: Enter a complete HTTP or HTTPS app URL."); }
  if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error("App: Use an HTTP or HTTPS URL without credentials.");
  const image = text("image", 200);
  if (!/^\/api\/app-images\/[a-f0-9-]{36}\.webp$/.test(image)) throw new Error("App: Upload an app image.");
  if (item.status !== "Draft" && item.status !== "Published") throw new Error("App: Choose Draft or Published.");
  if (typeof item.featured !== "boolean" || !Number.isInteger(item.order) || (item.order as number) < 0 || (item.order as number) > 9999) throw new Error("App: Invalid display settings.");
  const updatedAt = text("updatedAt", 40);
  if (!Number.isFinite(Date.parse(updatedAt))) throw new Error("App: Invalid update time.");
  return { id, name, description: text("description", 240), details: text("details", 10000, false), url: parsed.href, image, category: text("category", 60), developer: text("developer", 100, false), version: text("version", 40, false), status: item.status, featured: item.featured, order: item.order as number, updatedAt };
}
export function publishedApps(items: CatalogApp[]) {
  return items.filter(item => item.status === "Published").sort((a,b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.name.localeCompare(b.name));
}