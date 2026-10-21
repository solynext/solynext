import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/seo/repository";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings();
  return {
    // Crawlers must be able to read page-level noindex directives.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: settings.siteUrl && settings.allowIndexing ? `${settings.siteUrl}/sitemap.xml` : undefined,
  };
}
