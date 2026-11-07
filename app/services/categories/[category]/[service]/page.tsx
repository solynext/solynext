import { notFound } from "next/navigation";
import { serviceCategoryPages } from "@/lib/catalog/service-category-pages";
import { ServiceDirectoryDetail } from "@/components/catalog/ServiceDirectoryDetail";

type Props = { params: Promise<{ category: string; service: string }> };

async function getService({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const category = serviceCategoryPages.find(entry => entry.slug === categorySlug);
  const service = category?.details.find(entry => entry.slug === serviceSlug);
  if (!category || !service) notFound();
  return { category, service };
}

export async function generateMetadata(props: Props) {
  const { service } = await getService(props);
  return { title: `${service.name} | SolyNext`, description: service.description };
}

export default async function ServicePage(props: Props) {
  const { category, service } = await getService(props);
  return <ServiceDirectoryDetail category={category} service={service} />;
}
