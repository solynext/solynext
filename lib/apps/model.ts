export const downloadPlatforms = ["Windows", "Android", "iOS", "macOS", "Linux", "Other"] as const;
export type CatalogApp = {
  id: string; name: string; description: string; details: string; url: string; image: string;
  category: string; developer: string; version: string; status: "Draft" | "Published";
  platforms?: string[]; featured: boolean; order: number; updatedAt: string;
  purpose?: string; currentStatus?: string; owner?: string; ownerType?: string;
  developmentTeam?: string; agency?: string; website?: string; audience?: string;
  features?: string[]; releaseDate?: string;
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
  const platforms = item.platforms ?? [];
  if (!Array.isArray(platforms) || platforms.some(value => typeof value !== "string" || !downloadPlatforms.includes(value as typeof downloadPlatforms[number]))) throw new Error("App: Choose valid download platforms.");
  const list = (key: string) => {
    const value = item[key];
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > 30 || value.some(entry => typeof entry !== "string" || entry.length > 120)) throw new Error(`App: Invalid ${key}.`);
    return value.map(entry => (entry as string).trim()).filter(Boolean);
  };
  const website = text("website", 300, false);
  if (website) {
    let websiteUrl: URL;
    try { websiteUrl = new URL(website); } catch { throw new Error("App: Enter a complete owner or product website URL."); }
    if (!["http:", "https:"].includes(websiteUrl.protocol) || websiteUrl.username || websiteUrl.password) throw new Error("App: Use an HTTP or HTTPS website URL.");
  }
  return { platforms: [...new Set(platforms)] as string[], id, name, description: text("description", 240), details: text("details", 10000, false), url: parsed.href, image, category: text("category", 60), developer: text("developer", 100, false), version: text("version", 40, false), status: item.status, featured: item.featured, order: item.order as number, updatedAt,
    purpose: text("purpose", 1000, false), currentStatus: text("currentStatus", 100, false), owner: text("owner", 160, false), ownerType: text("ownerType", 100, false), developmentTeam: text("developmentTeam", 1000, false), agency: text("agency", 160, false), website, audience: text("audience", 500, false), features: list("features"), releaseDate: text("releaseDate", 40, false) };
}
export function publishedApps(items: CatalogApp[]) {
  return items.filter(item => item.status === "Published").sort((a,b) => Number(b.featured) - Number(a.featured) || a.order - b.order || a.name.localeCompare(b.name));
}
