import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/data/mockData";
import { ServiceDetailClient } from "./ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) notFound();

  return getPageMetadata(`/services/${slug}`, { title: `${service.title} | SolyNext Services`, description: service.shortDescription, image: undefined, type: "website" });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
