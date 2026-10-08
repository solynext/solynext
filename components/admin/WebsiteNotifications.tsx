"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Bell, Plus, Pencil, Send, Trash2, EyeOff, RefreshCw, Globe, FileText, Link2 } from "lucide-react";
import { listWebsiteNotifications, saveWebsiteNotification, deleteWebsiteNotifications } from "@/lib/notifications/actions";
import type { WebsiteNotification, NotificationInput } from "@/lib/notifications/types";
import { useAdmin } from "./AdminProvider";
import { AdminDialog } from "./AdminDialog";
import { AdminButton, AdminPageHeading } from "./AdminUI";
import { WorkspaceEvents } from "./WorkspaceEvents";
import { AdminSearchInput } from "./AdminControls";
import styles from "./admin.module.css";

type Result = Awaited<ReturnType<typeof listWebsiteNotifications>>;
export function WebsiteNotifications({ initial }: { initial: Result }) {
  const [items, setItems] = useState(initial.items ?? []);
  const [error, setError] = useState(initial.error ?? "");
  const [tab, setTab] = useState("Website");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editor, setEditor] = useState<WebsiteNotification | "new" | null>(null);
  const [deletion, setDeletion] = useState<WebsiteNotification | "all" | null>(null);
  const [pending, startTransition] = useTransition();
  const { notify } = useAdmin();
  function run(operation: () => Promise<Result>, message: string, close = false) {
    setError("");
    startTransition(async () => {
      try {
        const result = await operation();
        if (result.error) { setError(result.error); return; }
        if (result.items) setItems(result.items);
        if (close) { setEditor(null); setDeletion(null); }
        notify(message);
      } catch { setError("The request failed. Check your connection and try again."); }
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input: NotificationInput = { title: String(data.get("title")), message: String(data.get("message")), href: String(data.get("href")), status: data.get("status") === "published" ? "published" : "draft" };
    run(() => saveWebsiteNotification(editor && editor !== "new" ? editor.id : null, input), input.status === "published" ? "Notification published to the website." : "Draft saved.", true);
  }
  const editing = editor && editor !== "new" ? editor : null;
  const published = items.filter(item => item.status === "published").length;
  const filtered = items.filter(item => (filter === "all" || item.status === filter) && `${item.title} ${item.message}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className={styles.notificationAudience} role="group" aria-label="Notification audience"><button aria-pressed={tab === "Website"} onClick={() => setTab("Website")}><Globe size={16}/>Website announcements</button><button aria-pressed={tab === "Workspace"} onClick={() => setTab("Workspace")}><Bell size={16}/>Workspace inbox</button></div>
    {tab === "Workspace" ? <WorkspaceEvents mode="notifications"/> : <>
      <AdminPageHeading title="Notification center" description="Keep your visitors informed. Create, manage, and publish announcements.">
        <AdminButton variant="secondary" disabled={pending} onClick={() => run(listWebsiteNotifications, "Notifications refreshed.")} aria-label="Refresh website notifications"><RefreshCw size={16}/></AdminButton>
        <AdminButton variant="secondary" disabled={pending || !items.length} onClick={() => setDeletion("all")}><Trash2 size={16}/>Remove all</AdminButton>
        <AdminButton disabled={pending} onClick={() => { setError(""); setEditor("new"); }}><Plus size={17}/>Add notification</AdminButton>
      </AdminPageHeading>
      <div className={styles.notificationStats}>
        <div><span className={styles.notificationIcon}><Bell size={21}/></span><div><small>Total announcements</small><strong>{items.length}</strong></div></div>
        <div><span className={`${styles.notificationIcon} ${styles.liveNotificationIcon}`}><Globe size={21}/></span><div><small>Live on website</small><strong>{published}</strong></div></div>
        <div><span className={styles.notificationIcon}><FileText size={21}/></span><div><small>Saved drafts</small><strong>{items.length - published}</strong></div></div>
      </div>
      {error && !editor && !deletion && <p className={styles.formError} role="alert">{error}</p>}
      <section className={`${styles.panel} ${styles.notificationPanel}`} aria-label="Website announcements" aria-busy={pending}>
        <div className={styles.notificationToolbar}><div className={styles.notificationFilters} role="group" aria-label="Announcement status">{["all", "published", "draft"].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === "all" ? "All announcements" : value === "published" ? "Published" : "Drafts"}<span>{value === "all" ? items.length : value === "published" ? published : items.length - published}</span></button>)}</div><AdminSearchInput value={query} onChange={setQuery} label="Search announcements" placeholder="Search announcements…"/></div>
        <div className={`${styles.eventList} ${styles.notificationFeed}`}>
        {filtered.map(item => <article key={item.id}>
          <span className={`${styles.notificationIcon} ${item.status === "published" ? styles.liveNotificationIcon : ""}`}>{item.status === "published" ? <Globe size={20}/> : <FileText size={20}/>}</span>
          <div><div><strong>{item.title}</strong><span className={`${styles.badge} ${item.status === "published" ? styles.positive : styles.neutral}`}>{item.status === "published" ? "Published" : "Draft"}</span></div><p className={styles.announcementMessage}>{item.message}</p><div className={styles.notificationMetadata}><small>Updated {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Asia/Karachi" }).format(new Date(item.updatedAt))}</small>{item.href && <small><Link2 size={13}/>{item.href}</small>}</div></div>
          <div><button className={styles.textButton} disabled={pending} onClick={() => { setError(""); setEditor(item); }}><Pencil size={15}/>Edit</button><button className={styles.textButton} disabled={pending} onClick={() => run(() => saveWebsiteNotification(item.id, { ...item, status: item.status === "published" ? "draft" : "published" }), item.status === "published" ? "Notification unpublished." : "Notification published to the website.")}>{item.status === "published" ? <EyeOff size={15}/> : <Send size={15}/>} {item.status === "published" ? "Unpublish" : "Publish"}</button><button className={styles.textButton} disabled={pending} aria-label={`Delete notification: ${item.title}`} onClick={() => { setError(""); setDeletion(item); }}><Trash2 size={15}/>Delete</button></div>
        </article>)}
        {!filtered.length && <div className={styles.emptyState}><span className={styles.notificationEmptyIcon}><Bell size={30}/></span><h2>{items.length ? "No matching announcements" : "Your next update starts here"}</h2><p>{items.length ? "Try another search or select a different status." : "Share news, launches, and important updates with your visitors."}</p><AdminButton variant="secondary" onClick={() => { if (items.length) { setQuery(""); setFilter("all"); } else { setError(""); setEditor("new"); } }}>{items.length ? "Reset filters" : "Create announcement"}</AdminButton></div>}
      </div></section>
    </>}
    {editor && <AdminDialog title={editing ? "Edit notification" : "Add notification"} description="Published notifications appear in the website header bell." onClose={() => { if (!pending) { setEditor(null); setError(""); } }}>
      <form className={`${styles.form} ${styles.recordForm}`} onSubmit={submit}><fieldset disabled={pending} className={styles.announcementFields}>
        <label>Title<input name="title" required maxLength={120} defaultValue={editing?.title ?? ""} autoFocus/></label>
        <label>Message<textarea name="message" required rows={4} maxLength={2000} defaultValue={editing?.message ?? ""}/></label>
        <label>Optional link<input name="href" maxLength={500} placeholder="/services or https://example.com" defaultValue={editing?.href ?? ""}/></label>
        <label>Status<select name="status" defaultValue={editing?.status ?? "draft"}><option value="draft">Draft — admin only</option><option value="published">Published — visible on website</option></select></label>
        {error && <p className={styles.formError} role="alert">{error}</p>}
        <div className={styles.formActions}><AdminButton type="button" variant="secondary" onClick={() => { setEditor(null); setError(""); }}>Cancel</AdminButton><AdminButton type="submit">{pending ? "Saving…" : "Save notification"}</AdminButton></div>
      </fieldset></form>
    </AdminDialog>}
    {deletion && <AdminDialog title={deletion === "all" ? "Remove all website notifications?" : "Delete notification?"} description={deletion === "all" ? "This removes all drafts and published announcements from the website." : `“${deletion.title}” will be removed from the website if published.`} onClose={() => { if (!pending) { setDeletion(null); setError(""); } }}><div className={styles.recordForm}>{error && <p role="alert" className={styles.formError}>{error}</p>}<div className={styles.formActions}><AdminButton variant="secondary" disabled={pending} onClick={() => setDeletion(null)}>Cancel</AdminButton><AdminButton variant="danger" disabled={pending} onClick={() => run(() => deleteWebsiteNotifications(deletion === "all" ? null : deletion.id), "Website notifications removed.", true)}>{pending ? "Removing…" : deletion === "all" ? "Remove all" : "Delete"}</AdminButton></div></div></AdminDialog>}
  </>;
}
