"use client";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminUI";
import styles from "@/components/admin/admin.module.css";
export default function AdminError({ retry }: { error: Error & { digest?: string }; retry: () => void }) { return <div className={styles.emptyState} role="alert"><TriangleAlert size={36}/><h1>We couldn’t load this page.</h1><p>Try again, or return to the dashboard.</p><AdminButton onClick={retry}>Try again</AdminButton><Link href="/admin">Back to dashboard</Link></div>; }
