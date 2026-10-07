import type { ButtonHTMLAttributes } from "react";
import styles from "./admin.module.css";

export function AdminButton({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) {
  return <button {...props} className={`${styles.button} ${styles[variant]} ${className}`} />;
}
export function StatusBadge({ status }: { status: string }) {
  const variant = ["Published", "Active", "Ready", "Resolved", "Completed", "Approved", "Converted"].includes(status) ? "positive" : ["New", "Pending", "Prospect", "In progress", "In Progress", "Review", "Contacted", "In Discussion", "To Do", "Upcoming"].includes(status) ? "warning" : ["Blocked", "Rejected", "Cancelled"].includes(status) ? "negative" : "neutral";
  return <span className={`${styles.badge} ${styles[variant]}`}><i />{status}</span>;
}
export function AdminPageHeading({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <div className={styles.pageHeading}><div><h1>{title}</h1><p>{description}</p></div><div className={styles.headingActions}>{children}</div></div>;
}
export function formatAdminDate(value?: string) { if (!value || Number.isNaN(Date.parse(value))) return "Not set"; return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Karachi" }).format(new Date(value)); }
export function ProgressBar({ value = 0, label = "Completion" }: { value?: number; label?: string }) {
  const completion = Math.max(0, Math.min(100, value));
  return <div className={styles.progressBlock}><div><span>{label}</span><strong>{completion}%</strong></div><div className={styles.progressTrack} role="progressbar" aria-label={label} aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${completion}%` }}/></div></div>;
}
export function PriorityBadge({ priority = "Medium" }: { priority?: string }) { return <span className={`${styles.priorityBadge} ${["High", "Urgent"].includes(priority) ? styles.highPriority : ""}`}>{priority}</span>; }
