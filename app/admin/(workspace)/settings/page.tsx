import { publicOfferings } from "@/lib/catalog/repository";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { getSeoSettings } from "@/lib/seo/repository";
import { seoPages } from "@/lib/seo/pages";
import { BLOG_POSTS_DATA } from "@/data/mockData";
import { getPublicProjects } from "@/lib/portfolio/repository";
export const metadata = { title: "Settings" };
export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const [seo, projects, services, industries] = await Promise.all([getSeoSettings(), getPublicProjects(), publicOfferings("services"), publicOfferings("industries")]);
  const pages = [
    ...seoPages,
    ...services.map(service => ({ path: `/services/${service.slug}`, label: service.name, title: service.seo_title || `${service.name} | SolyNext Services`, description: service.seo_description || service.card_summary })),
    ...industries.map(industry => ({ path: `/solutions/${industry.slug}`, label: industry.name, title: industry.seo_title || `${industry.name} | SolyNext`, description: industry.seo_description || industry.card_summary })),
    ...projects.map(project => ({ path: `/portfolio/${project.slug}`, label: project.client || project.title, title: `${project.title} | SolyNext Case Study`, description: project.summary })),
    ...BLOG_POSTS_DATA.map(post => ({ path: `/blog/${post.slug}`, label: post.title, title: `${post.title} | SolyNext Insights`, description: post.excerpt })),
  ];
  return <AdminSettings seo={seo} seoPages={pages} initialTab={(await searchParams).tab}/>;
}
