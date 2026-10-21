import { getPageMetadata } from "@/lib/seo/metadata";
import { getPublicProjects } from "@/lib/portfolio/repository";
import { PortfolioClient } from "./PortfolioClient";

export async function generateMetadata() { return getPageMetadata("/portfolio"); }

export default async function PortfolioPage() {
  return <PortfolioClient initialProjects={await getPublicProjects()} />;
}
