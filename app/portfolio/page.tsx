import { getPublicProjects } from "@/lib/portfolio/repository";
import { PortfolioClient } from "./PortfolioClient";

export const metadata = {
  title: "Client Case Studies & Technical Impact — SolyNext",
  description:
    "Explore real-world case studies in FinTech, Healthcare, E-Commerce, and ERP engineering delivered by SolyNext.",
};

export default async function PortfolioPage() {
  return <PortfolioClient initialProjects={await getPublicProjects()} />;
}
