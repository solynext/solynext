"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Globe, Star, RefreshCw } from "lucide-react";
import type { PortfolioProject, ProjectInput } from "@/lib/portfolio/model";
import { listPortfolio, savePortfolioProject, deletePortfolioProjects } from "@/lib/portfolio/actions";
import { useAdmin } from "./AdminProvider";
import { AdminDialog } from "./AdminDialog";
import { AdminButton, AdminPageHeading, StatusBadge } from "./AdminUI";
import { AdminSearchInput, AdminSelectControl } from "./AdminControls";
import { PortfolioEditor } from "./PortfolioEditor";
import styles from "./admin.module.css";

type Result = Awaited<ReturnType<typeof listPortfolio>>;
export function PortfolioManager({ initial, initialId, initialNew = false, linkedProjectId }: { initial: Result; initialId?: string; initialNew?: boolean; linkedProjectId?: string }) {
  const [items, setItems] = useState(initial.items ?? []);
  const [error, setError] = useState(initial.error ?? "");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [editor, setEditor] = useState<PortfolioProject | "new" | null>(initialId ? initial.items?.find(item => item.id === initialId) ?? null : initialNew ? "new" : null);
  const [deletion, setDeletion] = useState<PortfolioProject | null>(null);
  const [pending, startTransition] = useTransition();
  const { notify } = useAdmin();
  const filtered = items.filter(item => (status === "All" || item.status === status) && [item.title, item.slug, item.industry, item.client, ...item.technologies].join(" ").toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => a.displayOrder - b.displayOrder);
  function run(operation: () => Promise<Result>, message: string, close = false) {
    setError("");
    startTransition(async () => {
      try { const result = await operation(); if (result.error) { setError(result.error); return; } if (result.items) setItems(result.items); if (close) { setEditor(null); setDeletion(null); } notify(message); }
      catch { setError("The request failed. Check your connection and try again."); }
    });
  }
  function save(input: ProjectInput) { run(() => savePortfolioProject(editor && editor !== "new" ? editor.id : null, input), input.status === "Published" ? "Project saved and published to the website." : "Project saved. It is hidden from the public website.", true); }
  return <>
    <AdminPageHeading title="Public portfolio" description="Control the project images, links and case studies visitors see. The first four featured projects appear on the homepage."><Link href="/portfolio" target="_blank" className={`${styles.button} ${styles.secondary}`}>View website<Globe size={16}/></Link><AdminButton disabled={pending} onClick={() => { setError(""); setEditor("new"); }}><Plus size={17}/>Add project</AdminButton></AdminPageHeading>
    <div className={styles.managementSummary}><span><strong>{items.length}</strong> projects</span><span><strong>{items.filter(item => item.status === "Published").length}</strong> published</span><span><strong>{items.filter(item => item.featured && item.status === "Published").length}</strong> featured</span></div>
    <section className={styles.panel}><div className={styles.tableToolbar}><AdminSearchInput value={query} onChange={setQuery} label="Search public projects" placeholder="Search projects, clients or technology"/><div className={styles.filterControls}><AdminSelectControl value={status} onChange={setStatus} label="Publication status" icon={Globe}>{["All", "Published", "Draft", "Archived"].map(value => <option key={value}>{value}</option>)}</AdminSelectControl><AdminButton variant="secondary" disabled={pending} aria-label="Refresh portfolio" onClick={() => run(listPortfolio, "Portfolio refreshed.")}><RefreshCw size={16}/></AdminButton></div></div>
      {error && !editor && !deletion && <p role="alert" className={styles.formError}>{error}</p>}
      <div className={styles.portfolioAdminList}>{filtered.map(item => <article key={item.id} className={styles.portfolioAdminItem}><div className={styles.portfolioAdminImage}><Image src={item.featuredImage} alt={item.imageAlt} fill sizes="160px" unoptimized/></div><div className={styles.portfolioAdminInfo}><div><strong>{item.title}</strong><StatusBadge status={item.status}/>{item.featured && <span className={styles.softLabel}>Featured</span>}</div><p>{item.industry} · /portfolio/{item.slug}</p><small>Order {item.displayOrder} · {item.gallery.length} gallery images</small><div className={styles.portfolioAdminActions}><button className={styles.textButton} disabled={pending} onClick={() => { setError(""); setEditor(item); }}><Pencil size={15}/>Edit</button><button className={styles.textButton} disabled={pending} onClick={() => run(() => savePortfolioProject(item.id, { ...item, status: item.status === "Published" ? "Draft" : "Published" }), item.status === "Published" ? "Project unpublished." : "Project published.")}>{item.status === "Published" ? "Unpublish" : "Publish"}</button><button className={styles.textButton} disabled={pending} onClick={() => run(() => savePortfolioProject(item.id, { ...item, featured: !item.featured }), "Homepage selection updated.")}><Star size={15}/>{item.featured ? "Unfeature" : "Feature"}</button>{item.status === "Published" && <Link href={`/portfolio/${item.slug}`} target="_blank" className={styles.textButton}>View live<Globe size={15}/></Link>}<button className={styles.textButton} disabled={pending} aria-label={`Delete ${item.title}`} onClick={() => { setError(""); setDeletion(item); }}><Trash2 size={15}/>Delete</button></div></div></article>)}{!filtered.length && <div className={styles.emptyState}><h2>No matching projects</h2><p>Add a project or adjust your search.</p></div>}</div>
    </section>
    {editor && <AdminDialog title={editor === "new" ? "Add public project" : "Edit public project"} description="Published projects appear on the portfolio. Featured projects also appear on the homepage." onClose={() => { if (!pending) { setEditor(null); setError(""); } }}><PortfolioEditor project={editor === "new" ? undefined : editor} linkedProjectId={linkedProjectId} pending={pending} error={error} onSave={save} onCancel={() => { setEditor(null); setError(""); }}/></AdminDialog>}
    {deletion && <AdminDialog title="Delete public project?" description={`“${deletion.title}” will be removed from the public portfolio and homepage. The delivery project remains available.`} onClose={() => { if (!pending) setDeletion(null); }}><div className={styles.recordForm}>{error && <p className={styles.formError} role="alert">{error}</p>}<div className={styles.formActions}><AdminButton variant="secondary" disabled={pending} onClick={() => setDeletion(null)}>Cancel</AdminButton><AdminButton variant="danger" disabled={pending} onClick={() => run(() => deletePortfolioProjects([deletion.id]), "Public project removed.", true)}>{pending ? "Deleting…" : "Delete project"}</AdminButton></div></div></AdminDialog>}
  </>;
}
