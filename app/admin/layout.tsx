import type { Metadata } from "next";
import styles from "@/components/admin/admin.module.css";

export const metadata: Metadata = { title: { default: "Admin workspace — SolyNext", template: "%s — SolyNext Admin" }, robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className={styles.root}>{children}</div>; }
