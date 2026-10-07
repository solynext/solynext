import Link from "next/link";
import styles from "@/components/admin/admin.module.css";
export default function AdminNotFound() { return <div className={styles.emptyState}><h1>Page not found</h1><p>This management section doesn’t exist.</p><Link href="/admin">Return to dashboard</Link></div>; }
