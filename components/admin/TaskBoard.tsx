"use client";
import Link from "next/link";
import { CalendarDays, UserRound } from "lucide-react";
import { TASK_STATUSES } from "@/lib/admin/selectors";
import type { AdminRecord } from "@/lib/admin/types";
import { useAdmin } from "./AdminProvider";
import { PriorityBadge, formatAdminDate } from "./AdminUI";
import styles from "./admin.module.css";
import { cardTone } from "@/components/ui/CardMotif";
export function TaskBoard({ tasks }: { tasks: AdminRecord[] }) {
  const { collections, save } = useAdmin();
  return <div className={styles.boardScroll}><div className={styles.taskBoard}>{TASK_STATUSES.map(status => <section key={status} className={styles.boardColumn}><h3><i/>{status}<span>{tasks.filter(task => task.status === status).length}</span></h3>{tasks.filter(task => task.status === status).map(task => <article key={task.id} className={`${styles.taskCard} visual-card`} data-card-tone={cardTone(task.category)}><PriorityBadge priority={task.priority}/><Link href={`/admin/tasks/${task.id}`}><h4>{task.title}</h4></Link><p>{collections.projects.find(project => project.id === task.projectId)?.title ?? "Unassigned project"}</p><div><span><UserRound size={14}/>{collections.team.find(member => member.id === task.assignedTo)?.title ?? "Unassigned"}</span><span><CalendarDays size={14}/>{formatAdminDate(task.deadline)}</span></div><label className={styles.srOnly} htmlFor={`task-status-${task.id}`}>Status for {task.title}</label><select id={`task-status-${task.id}`} value={task.status} onChange={event => save("tasks", { ...task, status: event.target.value, updatedAt: new Date().toISOString() })}>{TASK_STATUSES.map(value => <option key={value}>{value}</option>)}</select></article>)}{!tasks.some(task => task.status === status) && <p className={styles.boardEmpty}>No tasks in this stage</p>}</section>)}</div></div>;
}
