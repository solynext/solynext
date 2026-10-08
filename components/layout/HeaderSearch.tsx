"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, BLOG_POSTS_DATA, TECHNOLOGIES_DATA } from "@/data/mockData";
import type { PublicProject } from "@/lib/portfolio/model";
import styles from "./HeaderSearch.module.css";

const pages = [
  ["About SolyNext", "/about"], ["Contact & start a project", "/contact"],
  ["Pricing & project estimator", "/pricing"], ["Industry solutions", "/solutions"],
  ["Our delivery process", "/process"], ["Careers", "/careers"],
].map(([title, href]) => ({ title, href, category: "Pages", detail: "Explore SolyNext", keywords: title }));
const baseRecords = [
  ...SERVICES_DATA.map(s => ({ title: s.title, href: `/services/${s.slug}`, category: "Services", detail: s.shortDescription, keywords: s.technologies.join(" ") })),
  ...BLOG_POSTS_DATA.map(p => ({ title: p.title, href: `/blog/${p.slug}`, category: "Insights", detail: p.excerpt, keywords: p.tags.join(" ") })),
  ...TECHNOLOGIES_DATA.map(t => ({ title: t.name, href: "/technologies", category: "Technologies", detail: t.description, keywords: t.category })),
  ...pages,
];

export function HeaderSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const loadProjects = useCallback(async () => {
    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data.projects)) setProjects(data.projects);
    } catch { /* Static services and page search remain available. */ }
  }, []);
  const records = [...baseRecords, ...projects.map(project => ({ title: project.title, href: `/portfolio/${project.slug}`, category: "Projects", detail: project.summary, keywords: `${project.industry} ${project.technologies.join(" ")}` }))];
  const normalized = query.trim().toLowerCase();
  const matches = normalized ? records.filter(record => `${record.title} ${record.detail} ${record.keywords}`.toLowerCase().includes(normalized)) : [];
  const results = matches.slice(0, 12);
  const open = () => { dialog.current?.showModal(); input.current?.focus(); void loadProjects(); };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else { dialog.current?.showModal(); input.current?.focus(); void loadProjects(); }
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [loadProjects]);

  return <>
    <button ref={trigger} type="button" className={styles.trigger} aria-label="Search SolyNext" aria-haspopup="dialog" aria-controls="header-search-dialog" aria-keyshortcuts="Control+k Meta+k" onClick={open}>
      <Search size={17} aria-hidden="true" /><span>Search</span>
    </button>
    <dialog ref={dialog} id="header-search-dialog" className={styles.dialog} aria-labelledby="header-search-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <div className={styles.panel}>
        <h2 id="header-search-title" className="sr-only">Search SolyNext</h2>
        <div className={styles.inputRow}><Search size={21} aria-hidden="true" /><input ref={input} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Services, projects, technologies..." aria-label="Search services, projects, technologies, and pages" aria-describedby="search-result-count" autoComplete="off" /><button onClick={close} aria-label="Close search"><X size={19} /></button></div>
        <div className={styles.body}>
          {!normalized ? <><p className={styles.label}>A GOOD PLACE TO START</p><div className={styles.suggestions}>{["Design", "Mobile", "FinTech", "Next.js"].map(term => <button key={term} onClick={() => { setQuery(term); input.current?.focus(); }}>{term}<ArrowUpRight size={14} /></button>)}</div><p className={styles.label}>QUICK LINKS</p>{pages.slice(0, 4).map(page => <Link className={styles.result} key={page.href} href={page.href} onClick={close}><span><strong>{page.title}</strong><small>{page.category}</small></span><ArrowUpRight size={18} /></Link>)}</> : results.length ? <>{results.map(record => <Link className={styles.result} key={`${record.category}-${record.title}`} href={record.href} onClick={close}><span><small>{record.category}</small><strong>{record.title}</strong><p>{record.detail}</p></span><ArrowUpRight size={18} /></Link>)}</> : <div className={styles.empty}><Search size={28} /><h3>No matches for “{query.trim()}”</h3><p>Try a service, technology, or industry name.</p><button onClick={() => { setQuery(""); input.current?.focus(); }}>Clear search</button></div>}
        </div>
        <div className={styles.footer}><span id="search-result-count" role="status" aria-live="polite">{normalized ? `${matches.length} ${matches.length === 1 ? "result" : "results"}${matches.length > 12 ? " · showing 12" : ""}` : "Find your next step"}</span><span><kbd>esc</kbd> to close</span></div>
      </div>
    </dialog>
  </>;
}
