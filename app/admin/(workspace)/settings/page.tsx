import { AdminSettings } from "@/components/admin/AdminSettings";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { getSeoSettings } from "@/lib/seo/repository";
import { seoPages } from "@/lib/seo/pages";
import { SERVICES_DATA, BLOG_POSTS_DATA } from "@/data/mockData";
import { getPublicProjects } from "@/lib/portfolio/repository";
export const metadata = { title: "Settings" };
export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const [seo, projects] = await Promise.all([getSeoSettings(), getPublicProjects()]);
  const pages = [
    ...seoPages,
    ...SERVICES_DATA.map(service => ({ path: `/services/${service.slug}`, label: service.title, title: `${service.title} | SolyNext Services`, description: service.shortDescription })),
    ...projects.map(project => ({ path: `/portfolio/${project.slug}`, label: project.client || project.title, title: `${project.title} | SolyNext Case Study`, description: project.summary })),
    ...BLOG_POSTS_DATA.map(post => ({ path: `/blog/${post.slug}`, label: post.title, title: `${post.title} | SolyNext Insights`, description: post.excerpt })),
  ];
  return <AdminSettings seo={seo} seoPages={pages} initialTab={(await searchParams).tab}/>;
}
