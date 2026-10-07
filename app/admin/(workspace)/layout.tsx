import { requireAdmin } from "@/lib/admin/auth/dal";
import { adminRepository } from "@/lib/admin/repository";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const initialData = await adminRepository.getCollections();
  return <AdminProvider session={session} initialData={initialData}><AdminShell>{children}</AdminShell></AdminProvider>;
}
