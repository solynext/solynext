"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, X, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import type { PublicNotification } from "@/lib/notifications/types";
import { createNotificationSound } from "@/lib/notifications/sound";
import styles from "./notifications.module.css";

const readKey = "solynext.website-notifications.read.v1";
const soundKey = "solynext.website-notifications.sound.v1";
const identity = (item: PublicNotification) => `${item.id}:${item.updatedAt}`;
function savedReads(): string[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(readKey) ?? "[]"); return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(-100) : []; }
  catch { return []; }
}
export function WebsiteNotificationBell() {
  const [items, setItems] = useState<PublicNotification[]>([]);
  const [reads, setReads] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const enabled = useRef(true);
  const sound = useRef<ReturnType<typeof createNotificationSound> | null>(null);
  const seen = useRef<Set<string> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const unread = items.filter(item => !reads.includes(identity(item))).length;
  useEffect(() => {
    const player = createNotificationSound();
    sound.current = player;
    function syncSound() {
      try { enabled.current = localStorage.getItem(soundKey) !== "off"; } catch { /* Use the current setting when storage is blocked. */ }
      setSoundEnabled(enabled.current);
    }
    function unlock() { if (enabled.current) player.unlock(); }
    function sync(event: StorageEvent) { if (event.key === soundKey) syncSound(); }
    syncSound();
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
    window.addEventListener("storage", sync);
    return () => { document.removeEventListener("pointerdown", unlock, true); document.removeEventListener("keydown", unlock, true); window.removeEventListener("storage", sync); player.dispose(); sound.current = null; };
  }, []);
  useEffect(() => {
    let live = true;
    let fetching = false;
    const controller = new AbortController();
    async function refresh() {
      if (fetching || document.visibilityState === "hidden") return;
      fetching = true;
      try {
        const response = await fetch("/api/notifications", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const data = await response.json();
        if (!Array.isArray(data.notifications)) throw new Error("Invalid response");
        if (live) {
          const incoming = data.notifications as PublicNotification[];
          const read = savedReads();
          const revisions = incoming.map(identity);
          const hasNew = seen.current !== null && revisions.some(revision => !seen.current?.has(revision) && !read.includes(revision));
          seen.current = new Set([...(seen.current ?? []), ...revisions].slice(-200));
          if (hasNew && enabled.current) sound.current?.play();
          setItems(incoming); setReads(read); setError(false);
        }
      } catch { if (live) setError(true); }
      finally { fetching = false; if (live) setLoaded(true); }
    }
    void refresh();
    const timer = setInterval(refresh, 20000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    const sync = (event: StorageEvent) => { if (event.key === readKey) setReads(savedReads()); };
    window.addEventListener("storage", sync);
    return () => { live = false; controller.abort(); clearInterval(timer); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refresh); window.removeEventListener("storage", sync); };
  }, [retry]);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("click", closeOutside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("click", closeOutside); document.removeEventListener("keydown", escape); };
  }, [open]);
  function markRead(targets: PublicNotification[]) {
    const next = [...new Set([...savedReads(), ...reads, ...targets.map(identity)])].slice(-100);
    setReads(next);
    try { localStorage.setItem(readKey, JSON.stringify(next)); } catch { /* Read state still works for this visit. */ }
  }
  function toggleSound() {
    const next = !enabled.current;
    enabled.current = next;
    setSoundEnabled(next);
    if (next) sound.current?.unlock();
    try { localStorage.setItem(soundKey, next ? "on" : "off"); } catch { /* Keep the preference for this visit. */ }
  }
  return <div className={styles.root} ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} className={styles.trigger} aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`} aria-expanded={open} aria-controls={panelId} onClick={() => { setOpen(!open); if (!open) setRetry(value => value + 1); }}><Bell size={19} aria-hidden="true"/>{unread > 0 && <span className={styles.count}>{unread > 99 ? "99+" : unread}</span>}</button>
    {open && <section id={panelId} className={styles.panel} aria-label="Website notifications">
      <div className={styles.heading}><div><h2>Notifications</h2><p>{unread ? `${unread} unread update${unread === 1 ? "" : "s"}` : "Updates from SolyNext"}</p></div><button className={styles.close} aria-label="Close notifications" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={18}/></button></div>
      <div className={styles.toolbar}><button className={styles.soundToggle} aria-label={soundEnabled ? "Mute notification sound" : "Enable notification sound"} aria-pressed={soundEnabled} onClick={toggleSound}>{soundEnabled ? <Volume2 size={15}/> : <VolumeX size={15}/>}Sound {soundEnabled ? "on" : "off"}</button><button disabled={!unread} onClick={() => markRead(items)}><CheckCheck size={15}/>Read all</button></div>
      <div className={styles.list}>
        {error && <div className={styles.error} role="status">Could not refresh notifications. <button onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
        {!loaded && <p className={styles.empty} role="status">Loading notifications…</p>}
        {loaded && !error && !items.length && <div className={styles.empty}><Bell size={28}/><strong>No notifications yet</strong><p>Announcements will appear here.</p></div>}
        {items.map(item => {
          const isUnread = !reads.includes(identity(item));
          return <article key={item.id} className={`${styles.item} ${isUnread ? styles.unread : ""}`}><div className={styles.itemHeading}><strong>{item.title}</strong>{isUnread && <span aria-label="Unread" className={styles.dot}/>}</div><p>{item.message}</p><div className={styles.itemFooter}>{item.publishedAt && <time dateTime={item.publishedAt}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Asia/Karachi" }).format(new Date(item.publishedAt))}</time>}{isUnread && <button onClick={() => markRead([item])}>Mark read</button>}{item.href && <Link href={item.href} onClick={() => { markRead([item]); setOpen(false); }}>View update<ArrowUpRight size={14}/></Link>}</div></article>;
        })}
      </div>
    </section>}
  </div>;
}
