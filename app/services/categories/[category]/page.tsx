import { notFound } from "next/navigation";
import { serviceCategoryPages } from "@/lib/catalog/service-category-pages";
import { ServiceDirectoryDetail } from "@/components/catalog/ServiceDirectoryDetail";

type Props = { params: Promise<{ category: string }> };

async function getCategory({ params }: Props) {
  const { category } = await params;
  return serviceCategoryPages.find(entry => entry.slug === category) ?? notFound();
}

export async function generateMetadata(props: Props) {
  const category = await getCategory(props);
  return { title: `${category.title} Services | SolyNext`, description: category.description };
}

export default async function CategoryPage(props: Props) {
  return <ServiceDirectoryDetail category={await getCategory(props)} />;
}
