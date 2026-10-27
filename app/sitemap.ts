import { publicOfferings } from "@/lib/catalog/repository";
import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/seo/repository";
import { seoPages } from "@/lib/seo/pages";
import { resolvePageSeo } from "@/lib/seo/model";
import { BLOG_POSTS_DATA } from "@/data/mockData";
import { portfolioStore } from "@/lib/portfolio/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings();
  if (!settings.siteUrl || !settings.allowIndexing) return [];
  const projects = (await portfolioStore.read()).filter(project => project.status === "Published");
  const paths: { path: string; lastModified?: string }[] = [
    ...seoPages,
    ...(await publicOfferings("services")).map(service => ({ path: `/services/${service.slug}`, lastModified: service.updated_at })),
    ...(await publicOfferings("industries")).map(industry => ({ path: `/solutions/${industry.slug}`, lastModified: industry.updated_at })),
    ...BLOG_POSTS_DATA.map(post => ({ path: `/blog/${post.slug}`, lastModified: post.publishedDate })),
    ...projects.map(project => ({ path: `/portfolio/${project.slug}`, lastModified: project.updatedAt })),
  ];
  return paths.filter(({ path }) => resolvePageSeo(settings, path).index).map(({ path, lastModified }) => ({
    url: new URL(path, settings.siteUrl).href,
    ...(lastModified && Number.isFinite(Date.parse(lastModified)) ? { lastModified } : {}),
  }));
}
