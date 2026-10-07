import { LoaderCircle } from "lucide-react";
import styles from "@/components/admin/admin.module.css";
export default function AdminLoading() { return <div className={styles.loading} role="status" aria-label="Loading admin workspace"><LoaderCircle className={styles.spin} size={24}/><p>Loading your workspace…</p><div className={styles.skeleton}/><div className={styles.skeleton}/><div className={styles.skeleton}/></div>; }
