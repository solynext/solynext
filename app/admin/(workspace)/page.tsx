import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { requireAdmin } from "@/lib/admin/auth/dal";
export const metadata = { title: "Dashboard" };
export default async function AdminDashboardPage() { await requireAdmin(); return <AdminDashboard/>; }
