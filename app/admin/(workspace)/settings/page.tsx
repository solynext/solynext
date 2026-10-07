import { AdminSettings } from "@/components/admin/AdminSettings";
import { requireAdmin } from "@/lib/admin/auth/dal";
export const metadata = { title: "Settings" };
export default async function SettingsPage() { await requireAdmin(); return <AdminSettings/>; }
