import { adminSections } from "@/lib/admin/sections";
import type { AdminCollections } from "@/lib/admin/types";
import { requireAdmin } from "@/lib/admin/auth/dal";
import { adminRepository } from "@/lib/admin/repository";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminPhotoStore } from "@/lib/admin/profile/repository";
import { emptyAdminPhoto } from "@/lib/admin/profile/types";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin(true);
  const [initialData, initialPhoto] = await Promise.all([
    session.user.catalogOnly ? Promise.resolve(Object.fromEntries(Object.keys(adminSections).map(key=>[key,[]])) as unknown as AdminCollections) : adminRepository.getCollections(),
    adminPhotoStore.read(session.user.id).catch(() => ({ ...emptyAdminPhoto })),
  ]);
  return <AdminProvider session={session} initialData={initialData} initialPhoto={initialPhoto}><AdminShell>{children}</AdminShell></AdminProvider>;
}
