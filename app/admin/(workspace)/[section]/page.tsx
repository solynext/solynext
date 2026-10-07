import { notFound } from "next/navigation";
import { isManagementSection, adminSections } from "@/lib/admin/sections";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { ManagementPage } from "@/components/admin/ManagementPage";

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; return { title: isManagementSection(section) ? adminSections[section].label : "Page not found" }; }
export default async function AdminSectionPage({ params, searchParams }: { params: Promise<{ section: string }>; searchParams: Promise<{ new?: string; view?: string; status?: string }> }) {
  await requireAdmin();
  const { section } = await params;
  if (!isManagementSection(section)) notFound();
  const intent = await searchParams;
  const status = adminSections[section].statuses.includes(intent.status ?? "") ? intent.status : undefined;
  return <ManagementPage key={`${section}-${intent.new ?? ""}-${intent.view ?? ""}-${status ?? ""}`} section={section} initialNew={intent.new === "1"} initialView={intent.view} initialStatus={status}/>;
}
