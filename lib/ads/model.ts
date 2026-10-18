export const adPages = ["/", "/about", "/services", "/solutions", "/technologies", "/portfolio", "/blog", "/pricing", "/contact", "/careers", "/process"] as const;
export interface AdInput {
  name: string; title: string; description: string; label: string;
  button: string; url: string; image: string; background: string; foreground: string;
  layout: "banner" | "card"; placement: "top" | "bottom";
  page: string; status: "Draft" | "Published"; order: number;
}
export interface WebsiteAd extends AdInput { id: string; updatedAt: string }
export const emptyAd: AdInput = { name: "", title: "Your next big idea starts here", description: "Build something remarkable with SolyNext.", label: "Sponsored", button: "Learn more", url: "/contact", image: "", background: "#f2f2f7", foreground: "#1c1c1e", layout: "banner", placement: "bottom", page: "/", status: "Draft", order: 0 };
export function safeAdUrl(value: string) {
  if (/^\/(?!\/)/.test(value) && !/[\\\s\u0000-\u001f]/.test(value)) return true;
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}
export function validateAd(value: unknown): AdInput {
  if (!value || typeof value !== "object") throw new Error("Invalid ad.");
  const v = value as Record<string, unknown>;
  const result = {} as AdInput;
  for (const [key, limit] of Object.entries({ name: 100, title: 180, description: 1000, label: 50, button: 60, url: 2000, image: 2000, background: 7, foreground: 7 })) {
    if (typeof v[key] !== "string" || (v[key] as string).length > limit) throw new Error(`Check ${key} (maximum ${limit} characters).`);
    Object.assign(result, { [key]: (v[key] as string).trim() });
  }
  if (!result.name || !result.title || !result.label) throw new Error("Enter an internal name, headline, and ad label.");
  if ((result.button && !safeAdUrl(result.url)) || (result.url && !safeAdUrl(result.url))) throw new Error("Use a local path or an HTTP(S) link for the button.");
  if (result.image && !safeAdUrl(result.image)) throw new Error("Use a local path or an HTTP(S) image URL.");
  if (![result.background, result.foreground].every(color => /^#[0-9a-f]{6}$/i.test(color))) throw new Error("Choose valid colors.");
  if (!["banner", "card"].includes(String(v.layout)) || !["top", "bottom"].includes(String(v.placement)) || !["Draft", "Published"].includes(String(v.status)) || (v.page !== "*" && !adPages.includes(v.page as typeof adPages[number]))) throw new Error("Choose valid layout, placement, page, and status options.");
  if (!Number.isInteger(v.order) || Number(v.order) < 0 || Number(v.order) > 999) throw new Error("Display order must be between 0 and 999.");
  return { ...result, layout: v.layout as AdInput["layout"], placement: v.placement as AdInput["placement"], page: v.page as string, status: v.status as AdInput["status"], order: v.order as number };
}
