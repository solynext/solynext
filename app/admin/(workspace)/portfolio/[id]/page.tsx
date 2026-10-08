import { notFound } from "next/navigation";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { listPortfolio } from "@/lib/portfolio/actions";
export default async function PortfolioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initial = await listPortfolio();
  const project = initial.items?.find(item => item.id === id || `pf-${item.id}` === id);
  if (!project && !initial.error) notFound();
  return <PortfolioManager initial={initial} initialId={project?.id}/>;
}
