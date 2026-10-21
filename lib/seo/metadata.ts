import "server-only";
import type { Metadata } from "next";
import { getSeoSettings } from "./repository";
import { resolvePageSeo } from "./model";
import { seoPages } from "./pages";

export async function getSiteMetadata(): Promise<Metadata> {
  const settings = await getSeoSettings();
  return {
    metadataBase: settings.siteUrl ? new URL(settings.siteUrl) : undefined,
    title: settings.title, description: settings.description,
    verification: {
      google: settings.googleVerification || undefined,
      other: settings.bingVerification ? { "msvalidate.01": settings.bingVerification } : undefined,
    },
    robots: { index: settings.allowIndexing, follow: true },
  };
}

export async function getPageMetadata(path: string, fallback: { title?: string; description?: string; image?: string; type?: "website" | "article" } = {}): Promise<Metadata> {
  const settings = await getSeoSettings();
  const page = resolvePageSeo(settings, path, { ...seoPages.find(page => page.path === path), ...fallback });
  const image = fallback.image || settings.socialImage;
  const imageUrl = image && (image.startsWith("https://") ? image : settings.siteUrl ? new URL(image, settings.siteUrl).href : undefined);
  const title = path === "/" && settings.socialTitle ? settings.socialTitle : page.title;
  const description = path === "/" && settings.socialDescription ? settings.socialDescription : page.description;
  return {
    title: page.title, description: page.description,
    alternates: page.canonical ? { canonical: page.canonical } : undefined,
    robots: { index: page.index, follow: true },
    openGraph: { title, description, type: fallback.type || "website", siteName: settings.siteName, url: page.canonical, images: imageUrl ? [{ url: imageUrl, alt: title }] : [] },
    twitter: { card: imageUrl ? "summary_large_image" : "summary", title, description, images: imageUrl ? [imageUrl] : [] },
  };
}
