import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { listPortfolio } from "@/lib/portfolio/actions";
export const metadata = { title: "Public portfolio" };
export default async function PortfolioAdminPage({ searchParams }: { searchParams: Promise<{ new?: string; project?: string; edit?: string }> }) {
  const intent = await searchParams;
  return <PortfolioManager initial={await listPortfolio()} initialNew={intent.new === "1"} linkedProjectId={intent.project} initialId={intent.edit}/>;
}
