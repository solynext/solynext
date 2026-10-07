import { notFound } from "next/navigation";
import { isManagementSection } from "@/lib/admin/sections";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { ResourceDetails } from "@/components/admin/ResourceDetails";
export default async function AdminDetailsPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  await requireAdmin();
  const { section, id } = await params;
  if (!isManagementSection(section)) notFound();
  return <ResourceDetails key={`${section}-${id}`} section={section} id={id}/>;
}
