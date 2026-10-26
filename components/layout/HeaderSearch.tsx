"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA, BLOG_POSTS_DATA, TECHNOLOGIES_DATA } from "@/data/mockData";
import type { PublicProject } from "@/lib/portfolio/model";
import styles from "./HeaderSearch.module.css";

const pages = [
  ["SolyNext Apps", "/solynext-apps"], ["About SolyNext", "/about"], ["Contact & start a project", "/contact"],
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
  const router = useRouter();
  const host = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const loaded = useRef(false);
  const loadProjects = useCallback(async () => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      if (!response.ok) { loaded.current = false; return; }
      const data = await response.json();
      if (Array.isArray(data.projects)) setProjects(data.projects);
    } catch { loaded.current = false; }
  }, []);
  const records = [...baseRecords, ...projects.map(project => ({ title: project.title, href: `/portfolio/${project.slug}`, category: "Projects", detail: project.summary, keywords: `${project.industry} ${project.technologies.join(" ")}` }))];
  const normalized = query.trim().toLowerCase();
  const results = (normalized ? records.filter(record => `${record.title} ${record.detail} ${record.keywords}`.toLowerCase().includes(normalized)) : pages.slice(0, 4)).slice(0, 8);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  const close = () => { setOpen(false); setActive(-1); };
  const focusSearch = () => { setOpen(true); void loadProjects(); input.current?.focus(); };
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!host.current?.contains(event.target as Node)) { setOpen(false); setActive(-1); } };
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setOpen(true); input.current?.focus(); void loadProjects();
      }
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", shortcut);
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("keydown", shortcut); };
  }, [loadProjects]);
  return <div ref={host} className={`${styles.inlineSearch} ${open ? styles.expanded : ""}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) close(); }}>
    <button type="button" className={styles.mobileTrigger} aria-label="Open site search" onClick={focusSearch}><Search size={19}/></button>
    <div className={styles.searchField}>
      <input ref={input} type="text" role="combobox" aria-label="Search SolyNext" aria-autocomplete="list" aria-expanded={open} aria-controls="header-search-suggestions" aria-activedescendant={open && active >= 0 ? `search-option-${active}` : undefined} aria-keyshortcuts="Control+k Meta+k" value={query} placeholder="Search..." autoComplete="off" onFocus={() => { setOpen(true); void loadProjects(); }} onChange={event => { setQuery(event.target.value); setActive(-1); setOpen(true); }} onKeyDown={event => {
        if (event.key === "Escape") { event.preventDefault(); close(); }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); setOpen(true);
          if (results.length) setActive(previous => event.key === "ArrowDown" ? (previous + 1) % results.length : (previous <= 0 ? results.length - 1 : previous - 1));
        }
        if (event.key === "Enter" && open && results.length) { event.preventDefault(); router.push(results[active >= 0 ? active : 0].href); close(); input.current?.blur(); }
      }}/>
      {(query || open) && <button type="button" aria-label={query ? "Clear search" : "Close search"} onClick={() => { if (query) { setQuery(""); setActive(-1); input.current?.focus(); } else close(); }}><X size={15}/></button>}
      <button type="button" className={styles.searchAction} aria-label="Search" onClick={() => { if (normalized && results.length) { router.push(results[active >= 0 ? active : 0].href); close(); input.current?.blur(); } else focusSearch(); }}><Search size={16} aria-hidden="true"/></button>
    </div>
    {open && <div className={styles.dropdown}>
      <p className={styles.dropdownLabel}>{normalized ? "Suggestions" : "Quick links"}</p>
      <div id="header-search-suggestions" role="listbox" aria-label="Search suggestions">
        {results.map((record, index) => <Link key={`${record.category}-${record.href}-${record.title}`} id={`search-option-${index}`} role="option" aria-selected={active === index} href={record.href} className={`${styles.suggestion} ${active === index ? styles.activeSuggestion : ""}`} onMouseDown={event => event.preventDefault()} onClick={() => { close(); input.current?.blur(); }}><Search size={15} aria-hidden="true"/><span><strong>{record.title}</strong><small>{record.category}</small></span><ArrowUpRight size={15} aria-hidden="true"/></Link>)}
      </div>
      {!results.length && <p className={styles.noResults}>No matches. Try a service, project, or technology.</p>}
      <span className={styles.resultStatus} role="status" aria-live="polite">{normalized ? `${results.length} suggestions` : "Type to search the site"}</span>
    </div>}
  </div>;
}