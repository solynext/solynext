export interface PageSeo { title: string; description: string; index: boolean }
export interface SeoSettings {
  siteName: string; siteUrl: string; title: string; description: string;
  socialTitle: string; socialDescription: string; socialImage: string;
  googleVerification: string; bingVerification: string; allowIndexing: boolean;
  pages: Record<string, PageSeo>; updatedAt: string;
}
export const defaultSeo: SeoSettings = {
  siteName: "SolyNext", siteUrl: "", title: "SolyNext | Digital Solutions for Growing Businesses",
  description: "SolyNext helps businesses grow online with web development, creative design, digital marketing, and social media management from Pakistan.",
  socialTitle: "", socialDescription: "", socialImage: "/images/hero-tech.jpg",
  googleVerification: "", bingVerification: "", allowIndexing: true, pages: {}, updatedAt: "",
};
export function publicSeoPath(path: string) {
  return /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(path) && !/^\/(admin|api)(\/|$)/.test(path);
}
export function validateSeo(value: unknown): SeoSettings {
  if (!value || typeof value !== "object") throw new Error("SEO: enter valid settings.");
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = input[key];
    if (typeof value !== "string" || value.trim().length > max || (required && !value.trim()) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw new Error(`SEO: check ${key}.`);
    return value.trim();
  };
  let siteUrl = text("siteUrl", 300);
  if (siteUrl) {
    try {
      const url = new URL(siteUrl);
      if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") throw new Error();
      siteUrl = url.origin;
    } catch { throw new Error("SEO: website URL must be an HTTPS domain without a path, query, or credentials."); }
  }
  const socialImage = text("socialImage", 1000);
  if (socialImage && !/^\/(?:images\/[a-zA-Z0-9_./-]+|solynext-(?:logo|wordmark))\.(png|jpe?g|webp)$/.test(socialImage)) {
    try { const url = new URL(socialImage); if (url.protocol !== "https:" || url.username || url.password) throw new Error(); }
    catch { throw new Error("SEO: social image must be a public image path or HTTPS image URL."); }
  }
  if (socialImage.includes("..")) throw new Error("SEO: invalid social image path.");
  const googleVerification = text("googleVerification", 200);
  const bingVerification = text("bingVerification", 200);
  if ([googleVerification, bingVerification].some(token => token && !/^[a-zA-Z0-9_-]+$/.test(token))) throw new Error("SEO: paste the verification token, not an HTML tag.");
  if (typeof input.allowIndexing !== "boolean" || !input.pages || typeof input.pages !== "object" || Array.isArray(input.pages)) throw new Error("SEO: check indexing settings.");
  const entries = Object.entries(input.pages);
  if (entries.length > 150) throw new Error("SEO: use at most 150 page overrides.");
  const pages: Record<string, PageSeo> = {};
  for (const [path, value] of entries) {
    if (path.length > 200 || !publicSeoPath(path) || !value || typeof value !== "object") throw new Error("SEO: invalid public page path.");
    const page = value as Record<string, unknown>;
    if (typeof page.title !== "string" || page.title.length > 180 || typeof page.description !== "string" || page.description.length > 500 || typeof page.index !== "boolean") throw new Error("SEO: check page title, description, and indexing.");
    pages[path] = { title: page.title.trim(), description: page.description.trim(), index: page.index };
  }
  const updatedAt = text("updatedAt", 40);
  if (updatedAt && !Number.isFinite(Date.parse(updatedAt))) throw new Error("SEO: invalid settings revision.");
  return {
    siteName: text("siteName", 80, true), siteUrl, title: text("title", 180, true), description: text("description", 500, true),
    socialTitle: text("socialTitle", 180), socialDescription: text("socialDescription", 500), socialImage,
    googleVerification, bingVerification, allowIndexing: input.allowIndexing, pages, updatedAt,
  };
}

export function resolvePageSeo(settings: SeoSettings, path: string, fallback: { title?: string; description?: string } = {}) {
  const page = settings.pages[path];
  let canonical: string | undefined;
  try { if (settings.siteUrl) canonical = new URL(path, settings.siteUrl).href; } catch { /* Live previews allow incomplete URL input. */ }
  return {
    title: page?.title || fallback.title || settings.title,
    description: page?.description || fallback.description || settings.description,
    index: settings.allowIndexing && (page?.index ?? true),
    canonical,
  };
}
