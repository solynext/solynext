import { AdminProfile } from "@/components/admin/AdminProfile";
import { requireAdmin } from "@/lib/admin/auth/dal";
export const metadata = { title: "Admin profile" };
export default async function ProfilePage() { await requireAdmin(); return <AdminProfile/>; }
