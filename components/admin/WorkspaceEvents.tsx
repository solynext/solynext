"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Activity, ArrowUpRight, Trash2 } from "lucide-react";
import { useAdmin } from "./AdminProvider";
import { AdminPageHeading, AdminButton } from "./AdminUI";
import { AdminSearchInput } from "./AdminControls";
import styles from "./admin.module.css";

export function WorkspaceEvents({ mode }: { mode: "notifications" | "activity" }) {
  const { activity, notifications, markRead, deleteNotification, removeAllNotifications } = useAdmin();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const isNotifications = mode === "notifications";
  const events = isNotifications ? notifications : activity;
  const unread = notifications.filter(item => !item.read).length;
  const filtered = events.filter(item => (filter !== "Unread" || ("read" in item && !item.read)) && `${item.title} ${item.detail} ${item.kind ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  const hasFilters = Boolean(query || filter !== "All");
  return <>
    <AdminPageHeading title={isNotifications ? "Notifications" : "Activity timeline"} description={isNotifications ? "Client conversations and delivery updates." : "Recent changes across your workspace."}>
      {isNotifications && <><AdminButton variant="secondary" disabled={!unread} onClick={() => markRead()}><CheckCheck size={17}/>Read all</AdminButton><AdminButton variant="secondary" disabled={!notifications.length} onClick={removeAllNotifications}><Trash2 size={17}/>Remove all</AdminButton></>}
    </AdminPageHeading>
    <section className={`${styles.panel} ${isNotifications ? styles.notificationPanel : ""}`}>
      <div className={styles.eventToolbar}>
        {isNotifications ? <div className={styles.viewToggle} role="group" aria-label="Notification view">{["All", "Unread"].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}{value === "Unread" ? ` (${unread})` : ""}</button>)}</div> : <span className={styles.eventCount}>{activity.length} updates</span>}
        <AdminSearchInput value={query} onChange={setQuery} label="Search updates" placeholder="Search updates"/>
      </div>
      {hasFilters && <div className={`${styles.filterSummary} ${styles.eventFilterSummary}`}><span role="status">{filtered.length} matching updates</span><button className={styles.textButton} onClick={() => { setQuery(""); setFilter("All"); }}>Reset filters</button></div>}
      <div className={`${styles.eventList} ${isNotifications ? styles.notificationFeed : ""}`}>{filtered.map(item => <article key={item.id} className={"read" in item && !item.read ? styles.unreadEvent : ""}>
        <span className={styles.notificationIcon}>{isNotifications ? <Bell size={20}/> : <Activity size={20}/>}</span>
        <div><div><strong>{item.title}</strong>{"read" in item && !item.read && <span className={styles.softLabel}>New</span>}</div><p>{item.detail}</p><small>{item.time} · {item.kind ?? "Workspace"}</small></div>
        <div>{item.href && <Link href={item.href} className={styles.iconButton} aria-label={`Open ${item.title}`}><ArrowUpRight size={18}/></Link>}{isNotifications && "read" in item && !item.read && <button className={styles.textButton} onClick={() => markRead(item.id)}>Mark read</button>}{isNotifications && <button className={styles.textButton} aria-label={`Delete notification: ${item.title}`} onClick={() => deleteNotification(item.id)}><Trash2 size={15} aria-hidden="true"/>Delete</button>}</div>
      </article>)}{!filtered.length && <div className={styles.emptyState}><CheckCheck size={35}/><h2>{query.trim() ? "No matching updates" : "You're all caught up"}</h2><p>{query.trim() ? "Try a different search or reset the filters." : filter === "Unread" ? "No unread notifications." : "Workspace updates will appear here."}</p>{hasFilters && <AdminButton variant="secondary" onClick={() => { setQuery(""); setFilter("All"); }}>Reset filters</AdminButton>}</div>}</div>
    </section>
  </>;
}
