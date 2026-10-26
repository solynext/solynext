"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, X, Smartphone, RotateCw, Info, LayoutGrid, Gamepad2, ChevronRight } from "lucide-react";
import type { CatalogApp } from "@/lib/apps/model";
import styles from "./Apps.module.css";

export function AppPlayer({ app, onClose }: { app:CatalogApp; onClose:()=>void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [loading,setLoading] = useState(true);
  const [showDetails,setShowDetails] = useState(false);
  const [frameKey,setFrameKey] = useState(0);
  const [delayed,setDelayed] = useState(false);
  useEffect(() => {
    const node = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    node?.showModal();
    const overflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = overflow; document.documentElement.style.overflow = rootOverflow; previous?.focus(); };
  },[]);
  useEffect(() => { const timer = setTimeout(() => setDelayed(true),12000); return () => clearTimeout(timer); },[frameKey]);
  return <dialog ref={dialog} className={`${styles.player} ${styles.wide}`} aria-labelledby="app-player-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.playerShell}>
      <header className={styles.playerHeader}><Image src={app.image} width={40} height={40} unoptimized alt=""/><div><h2 id="app-player-title">{app.name}</h2><span>{app.developer || "SolyNext"}</span></div><div className={styles.playerActions}>
        <button type="button" onClick={() => { setLoading(true); setDelayed(false); setFrameKey(key => key+1); }} aria-label="Reload app"><RotateCw size={18}/></button>
        <button type="button" aria-label="About this app" aria-pressed={showDetails} onClick={() => setShowDetails(value => !value)}><Info size={18}/></button>
        <button type="button" onClick={onClose} aria-label="Close app"><X size={21}/></button>
      </div></header>
      <div className={styles.frameArea}>
        {loading && !showDetails && <div className={styles.loading} role="status">{delayed ? "Taking longer than expected. Try reloading the app." : "Loading your app…"}</div>}
        <iframe className={showDetails ? styles.hiddenFrame : undefined} key={frameKey} src={app.url} scrolling="yes" title={`${app.name} web app`} sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-pointer-lock" allow="fullscreen" referrerPolicy="no-referrer" allowFullScreen onLoad={() => setLoading(false)}/>
        {showDetails && <section className={styles.detailsView} aria-label="About this app"><h3>About {app.name}</h3><p>{app.description}</p>{app.details && <p className={styles.detailsText}>{app.details}</p>}<dl><div><dt>Category</dt><dd>{app.category}</dd></div>{app.version && <div><dt>Version</dt><dd>{app.version}</dd></div>}<div><dt>Developer</dt><dd>{app.developer || "SolyNext"}</dd></div></dl></section>}
      </div>

    </div>
  </dialog>;
}
export function AppsCatalog({ apps }: { apps:CatalogApp[] }) {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All apps");
  const [tab,setTab] = useState<"Apps" | "Games">("Apps");
  const [selected,setSelected] = useState<CatalogApp | null>(null);
  const tabApps = apps.filter(app => tab === "Games" ? /\bgames?\b/i.test(app.category) : !/\bgames?\b/i.test(app.category));
  const categories = ["All apps", ...new Set(tabApps.map(app => app.category))];
  const visible = tabApps.filter(app => (category === "All apps" || app.category === category) && `${app.name} ${app.description} ${app.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <main id="main-content" className={styles.catalog}><div className="premium-container">
    <div className={styles.catalogTop}><div className={styles.catalogTitleRow}><h1>SolyNext Apps</h1><div className={styles.catalogTabs} aria-label="Browse apps or games">{(["Apps","Games"] as const).map(item => <button type="button" key={item} aria-pressed={tab === item} onClick={() => {setTab(item);setCategory("All apps");setQuery("");}}><span className={styles.tabIcon}>{item === "Apps" ? <LayoutGrid size={19} aria-hidden="true"/> : <Gamepad2 size={21} aria-hidden="true"/>}</span><span className={styles.tabDivider} aria-hidden="true"/><span className={styles.tabText}>{item}</span><ChevronRight className={styles.tabArrow} size={18} aria-hidden="true"/></button>)}</div></div><label className={styles.catalogSearch}><Search size={18} aria-hidden="true"/><span className={styles.srOnly}>Search apps</span><input type="search" placeholder="Search apps" value={query} onChange={event => setQuery(event.target.value)}/></label></div>
    {tabApps.length > 0 && <div className={styles.filters} aria-label="Filter by category">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>}
    {visible.length ? <div className={styles.appsGrid}>{visible.map(app => <button type="button" className={styles.appTile} key={app.id} onClick={() => setSelected(app)} aria-label={`Open ${app.name}`}><span className={styles.appImage}><Image src={app.image} alt="" fill unoptimized sizes="(max-width:600px) 45vw, (max-width:1000px) 25vw, 180px"/></span><strong>{app.name}</strong></button>)}</div> : <div className={styles.empty}><Smartphone size={40} strokeWidth={1.5} aria-hidden="true"/><h3>{tabApps.length ? "No apps found" : tab === "Games" ? "Games are on the way" : "New apps are on the way"}</h3><p>{tabApps.length ? "Try a different search or category." : tab === "Games" ? "Published games will appear here, ready to play in your browser." : "Our published apps will appear here, ready to launch in your browser."}</p>{tabApps.length > 0 && <button onClick={() => {setQuery("");setCategory("All apps");}}>Show all apps</button>}</div>}
  </div>{selected && <AppPlayer key={selected.id} app={selected} onClose={() => setSelected(null)}/>}</main>;
}