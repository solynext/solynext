"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { listAds, saveAd, deleteAd } from "@/lib/ads/actions";
import { adPages, emptyAd, type AdInput, type WebsiteAd } from "@/lib/ads/model";
import { AdBlock } from "@/components/ads/AdBlock";
import { AdminButton, AdminPageHeading, StatusBadge } from "./AdminUI";
import { AdminDialog } from "./AdminDialog";
import { useAdmin } from "./AdminProvider";
import { markAdminFormSaved } from "./AdminUnsavedChanges";
import styles from "./admin.module.css";
import css from "./AdSystem.module.css";

type Result = Awaited<ReturnType<typeof listAds>>;
function pageName(page: string) {
  return page === "*" ? "All public pages" : page === "/" ? "Home" : page.slice(1).split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function simpleAd(ad: AdInput): AdInput {
  return { ...emptyAd, title: ad.title, name: ad.title.trim().slice(0, 100), description: ad.description, button: "Learn more", url: ad.url, page: ad.page, placement: ad.placement, status: ad.status, order: ad.order };
}
export function AdSystem({ initial }: { initial: Result }) {
  const [items, setItems] = useState(initial.items ?? []);
  const [error, setError] = useState(initial.error ?? "");
  const [value, setValue] = useState<AdInput>({ ...emptyAd });
  const [id, setId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [filter, setFilter] = useState<"All" | "Published" | "Draft">("All");
  const [deletion, setDeletion] = useState<WebsiteAd | null>(null);
  const [pending, startTransition] = useTransition();
  const { notify } = useAdmin();
  function change<K extends keyof AdInput>(key: K, next: AdInput[K]) { setValue(previous => ({ ...previous, [key]: next })); }
  function run(operation: () => Promise<Result>, message: string, done?: (items: WebsiteAd[]) => void) {
    setError("");
    startTransition(async () => {
      try {
        const result = await operation();
        if (result.error) { setError(result.error); return; }
        setItems(result.items ?? []); done?.(result.items ?? []); notify(message);
      } catch { setError("The request failed. Please try again."); }
    });
  }
  function edit(ad?: WebsiteAd) {
    setId(ad?.id ?? null); setValue(ad ? simpleAd(ad) : { ...emptyAd, title: "", description: "" }); setError("");
    setEditorOpen(true);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "Published" ? "Published" : "Draft";
    run(() => saveAd(id, { ...simpleAd(value), status }), status === "Published" ? "Ad published to the website." : "Ad draft saved.", () => {
      markAdminFormSaved(form);
      setEditorOpen(false);
    });
  }
  return <>
    <AdminPageHeading title="Ad System" description="Add a title, description, and Learn more link. Choose where your ad appears.">
      <AdminButton variant="secondary" disabled={pending} onClick={() => run(listAds, "Ads refreshed.")}><RefreshCw size={16}/>Refresh</AdminButton>
      <AdminButton disabled={pending} onClick={() => void edit()}><Plus size={16}/>New ad</AdminButton>
    </AdminPageHeading>
    {error && !editorOpen && !deletion && <p role="alert" className={styles.formError}>{error}</p>}
    <div className={styles.notificationFilters} role="group" aria-label="Ad status">
      {(["All", "Published", "Draft"] as const).map(status => <button key={status} aria-pressed={filter === status} onClick={() => setFilter(status)}>{status === "Published" ? "Active" : status === "Draft" ? "Drafts" : "All ads"}<span>{items.filter(ad => status === "All" || ad.status === status).length}</span></button>)}
    </div>
    {editorOpen && <AdminDialog title={id ? "Edit ad" : "Create an ad"} description="Add your content, choose where it appears, then save a draft or publish." onClose={() => { if (!pending) { setEditorOpen(false); setError(""); } }}>
    <div className={css.popup}>
      <section className={`${styles.panel} ${css.editor}`}><h2>{id ? "Edit ad" : "Create an ad"}</h2>
        <form className={styles.form} onSubmit={submit}>
          <fieldset disabled={pending} className={css.fields}>
            <label>Title<input required maxLength={180} value={value.title} onChange={e => change("title", e.target.value)} placeholder="Enter your ad title"/></label>
            <label>Description<textarea rows={3} maxLength={1000} value={value.description} onChange={e => change("description", e.target.value)} placeholder="Write a short description"/></label>
            <label>Learn more link<input required maxLength={2000} value={value.url} onChange={e => change("url", e.target.value)} placeholder="/contact or https://example.com"/></label>
            <div className={css.location}><h3>Where to show</h3>
              <label>Public page<select value={value.page} onChange={e => change("page", e.target.value)}><option value="*">All public pages</option>{adPages.map(page => <option key={page} value={page}>{pageName(page)}</option>)}</select></label>
              <label>Position<select value={value.placement} onChange={e => change("placement", e.target.value as AdInput["placement"])}><option value="top">After hero - automatic placement</option><option value="bottom">Later on page - automatic placement</option></select></label>
              <p>{pageName(value.page)} / {value.placement === "top" ? "After hero" : "Later on page"}</p>
            </div>
            {error && <p role="alert" className={styles.formError}>{error}</p>}
            <div className={styles.formActions}><AdminButton type="submit" value="Draft" variant="secondary">{pending ? "Saving..." : "Save draft"}</AdminButton><AdminButton type="submit" value="Published">{pending ? "Saving..." : "Publish"}</AdminButton></div>
          </fieldset>
        </form>
      </section>
      <section className={`${styles.panel} ${css.preview}`}><h2>Live preview</h2><AdBlock ad={simpleAd(value)} preview/><p>Ads fit the section or card layout. Closing an ad hides it for 5 seconds, then shows it in the third following section. Drafts stay hidden.</p></section>
    </div></AdminDialog>}
    <section className={css.list} aria-label="Saved ads" aria-busy={pending}>
      {items.filter(ad => filter === "All" || ad.status === filter).toSorted((a, b) => a.order - b.order).map(ad => <article key={ad.id} className={`${styles.panel} ${css.row}`}><div className={css.details}><strong>{ad.title}</strong><small>{pageName(ad.page)} / {ad.placement === "top" ? "After hero" : "Later on page"}</small></div><StatusBadge status={ad.status === "Published" ? "Active" : "Draft"}/><AdminButton variant="secondary" disabled={pending} onClick={() => edit(ad)}><Pencil size={15}/>Edit</AdminButton><AdminButton variant="secondary" disabled={pending} onClick={() => run(() => saveAd(ad.id, { ...ad, status: ad.status === "Published" ? "Draft" : "Published" }), ad.status === "Published" ? "Ad unpublished." : "Ad published.")}>{ad.status === "Published" ? "Unpublish" : "Publish"}</AdminButton><AdminButton variant="danger" disabled={pending} onClick={() => { setError(""); setDeletion(ad); }} aria-label={`Delete ${ad.title}`}><Trash2 size={15}/></AdminButton></article>)}
      {!items.some(ad => filter === "All" || ad.status === filter) && <div className={`${styles.panel} ${styles.emptyState}`}><h2>{items.length ? `No ${filter === "Published" ? "active ads" : "drafts"}` : "No ads yet"}</h2><p>Use New ad to create an ad, then save a draft or publish it.</p><AdminButton disabled={pending} onClick={() => edit()}><Plus size={16}/>New ad</AdminButton></div>}
    </section>
    {deletion && <AdminDialog title="Delete ad?" description={`Remove “${deletion.name}” from the ad system and website.`} onClose={() => { if (!pending) setDeletion(null); }}><div className={styles.recordForm}>{error && <p role="alert" className={styles.formError}>{error}</p>}<div className={styles.formActions}><AdminButton variant="secondary" disabled={pending} onClick={() => setDeletion(null)}>Cancel</AdminButton><AdminButton variant="danger" disabled={pending} onClick={() => run(() => deleteAd(deletion.id), "Ad deleted.", () => { if (id === deletion.id) { setId(null); setValue({ ...emptyAd }); } setDeletion(null); })}>Delete ad</AdminButton></div></div></AdminDialog>}
  </>;
}
