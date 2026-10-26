import { requireAdmin } from "@/lib/admin/auth/dal";
import { appStore } from "@/lib/apps/repository";
import { AppsManager } from "@/components/apps/AppsManager";
export default async function AppsAdminPage() { await requireAdmin(); return <AppsManager initialApps={await appStore.read()}/>; }