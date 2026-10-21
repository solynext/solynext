"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, ExternalLink, Globe2, ImageIcon, Save, Search, Share2, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { saveSeoSettings } from "@/lib/seo/actions";
import { resolvePageSeo, type SeoSettings as Settings } from "@/lib/seo/model";
import { markAdminFormSaved } from "./AdminUnsavedChanges";
import { AdminButton } from "./AdminUI";
import { useAdmin } from "./AdminProvider";
import styles from "./SeoSettings.module.css";

export interface SeoPageChoice { path: string; label: string; title?: string; description?: string }

export function SeoSettings({ initial, pages }: { initial: Settings; pages: SeoPageChoice[] }) {
  const [draft, setDraft] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [selected, setSelected] = useState("/");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<"search" | "social">("search");
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { notify } = useAdmin();
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  useEffect(() => { if (!dirty && form.current) markAdminFormSaved(form.current); }, [dirty, saved]);
  const choice = pages.find(page => page.path === selected);
  const effective = resolvePageSeo(draft, selected, choice);
  const override = draft.pages[selected] ?? { title: "", description: "", index: true };
  const titleLength = effective.title.length;
  const descriptionLength = effective.description.length;
  let hostname = "yourdomain.com";
  try { hostname = new URL(draft.siteUrl).hostname; } catch { /* Incomplete domains are normal while editing. */ }
  const previewImage = /^(https:\/\/|\/images\/|\/solynext-)/.test(draft.socialImage) ? draft.socialImage : "";
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => setDraft(previous => ({ ...previous, [key]: value }));
  const setPage = (key: "title" | "description" | "index", value: string | boolean) => setDraft(previous => ({
    ...previous, pages: { ...previous.pages, [selected]: { ...(previous.pages[selected] ?? { title: "", description: "", index: true }), [key]: value } },
  }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true); setError("");
    try {
      const result = await saveSeoSettings(draft);
      if (result.error || !result.settings) { setError(result.error || "Could not save SEO settings."); return; }
      setSaved(result.settings); setDraft(result.settings);
      if (form.current) markAdminFormSaved(form.current);
      notify("SEO settings published. Website metadata is up to date.");
      router.refresh();
    } catch { setError("Could not save SEO settings. Your edits are still here; try again."); }
    finally { setPending(false); }
  }

  return <form ref={form} onSubmit={submit} className={styles.editor} data-editor-state={JSON.stringify(draft)}>
    <div className={styles.topbar}>
      <div><span className={styles.eyebrow}>SEARCH & DISCOVERY</span><h2>Make every first impression count.</h2><p>Control how your pages appear in search and when shared.</p></div>
      <span className={`${styles.status} ${dirty ? styles.unsaved : ""}`} role="status"><i/>{pending ? "Publishing…" : dirty ? "Unsaved changes" : saved.updatedAt ? "Published" : "Default settings"}</span>
    </div>
    <div className={styles.layout}>
      <div className={styles.fields}>
        <fieldset disabled={pending} className={styles.section}>
          <legend><Globe2 size={18}/>Website identity</legend>
          <p>Your public website name and preferred HTTPS domain.</p>
          <label>Website name<input name="siteName" value={draft.siteName} onChange={event => set("siteName", event.target.value)} required maxLength={80}/></label>
          <label>Canonical website URL<input name="siteUrl" type="url" value={draft.siteUrl} onChange={event => set("siteUrl", event.target.value)} placeholder="https://yourdomain.com" maxLength={300}/><small>Enter your real domain to activate canonical URLs and the sitemap.</small></label>
          <label>Homepage title<input name="title" value={draft.title} onChange={event => set("title", event.target.value)} required maxLength={180}/><small>{draft.title.length} characters · Keep it clear and specific.</small></label>
          <label>Default meta description<textarea name="description" value={draft.description} onChange={event => set("description", event.target.value)} required maxLength={500} rows={3}/><small>{draft.description.length} characters · Summarize what makes your business useful.</small></label>
        </fieldset>

        <fieldset disabled={pending} className={styles.section}>
          <legend><Search size={18}/>Page search appearance</legend>
          <p>Give each page its own title and description. Empty fields use the page’s existing content.</p>
          <label>Choose a page<select name="selectedPage" value={selected} onChange={event => setSelected(event.target.value)}>{pages.map(page => <option key={page.path} value={page.path}>{page.label} — {page.path}</option>)}</select></label>
          <label>Page title<input name="pageTitle" value={override.title} onChange={event => setPage("title", event.target.value)} placeholder={effective.title} maxLength={180}/><span className={styles.counter} data-warning={titleLength > 60}>{titleLength} characters <span>30–60 is a useful guideline</span></span></label>
          <label>Page meta description<textarea name="pageDescription" value={override.description} onChange={event => setPage("description", event.target.value)} placeholder={effective.description} maxLength={500} rows={3}/><span className={styles.counter} data-warning={descriptionLength > 160}>{descriptionLength} characters <span>120–160 is a useful guideline</span></span></label>
          <label className={styles.toggle}><input name="pageIndex" type="checkbox" checked={override.index} onChange={event => setPage("index", event.target.checked)}/><span><strong>Allow this page in search results</strong><small>Turning this off applies a noindex directive and excludes it from the sitemap.</small></span></label>
        </fieldset>

        <fieldset disabled={pending} className={styles.section}>
          <legend><Share2 size={18}/>Social sharing</legend>
          <p>Open Graph and X cards use the page title and description unless you set a homepage override.</p>
          <label>Homepage social title<input name="socialTitle" value={draft.socialTitle} onChange={event => set("socialTitle", event.target.value)} placeholder={draft.title} maxLength={180}/></label>
          <label>Homepage social description<textarea name="socialDescription" value={draft.socialDescription} onChange={event => set("socialDescription", event.target.value)} placeholder={draft.description} maxLength={500} rows={3}/></label>
          <label>Default sharing image<input name="socialImage" value={draft.socialImage} onChange={event => set("socialImage", event.target.value)} placeholder="/images/hero-tech.jpg" maxLength={1000}/><small>Public image path or HTTPS URL. A landscape image around 1200 × 630 works well.</small></label>
        </fieldset>

        <fieldset disabled={pending} className={styles.section}>
          <legend><ShieldCheck size={18}/>Indexing & ownership</legend>
          <label className={styles.toggle}><input name="allowIndexing" type="checkbox" checked={draft.allowIndexing} onChange={event => set("allowIndexing", event.target.checked)}/><span><strong>Allow public pages in search results</strong><small>Admin pages always remain noindex. Search engines need time to process changes.</small></span></label>
          <label>Google Search Console token<input name="googleVerification" value={draft.googleVerification} onChange={event => set("googleVerification", event.target.value)} maxLength={200} placeholder="Verification token only" autoComplete="off"/><small>Paste the content value from the HTML verification tag.</small></label>
          <label>Bing Webmaster Tools token<input name="bingVerification" value={draft.bingVerification} onChange={event => set("bingVerification", event.target.value)} maxLength={200} placeholder="Verification token only" autoComplete="off"/><small>Saving adds the verification tag. Complete ownership verification in Bing.</small></label>
        </fieldset>
      </div>

      <aside className={styles.sidebar} aria-label="Live SEO preview">
        <div className={styles.preview}>
          <div className={styles.previewHeading}><span><i/>LIVE PREVIEW</span><div role="tablist" aria-label="Preview type"><button type="button" role="tab" aria-selected={preview === "search"} onClick={() => setPreview("search")}>Search</button><button type="button" role="tab" aria-selected={preview === "social"} onClick={() => setPreview("social")}>Social</button></div></div>
          {preview === "search" ? <div className={styles.searchPreview}>
            <div className={styles.searchIdentity}><span><Globe2 size={17}/></span><div><strong>{draft.siteName || "Website name"}</strong><small>{hostname}</small></div></div>
            <p className={styles.previewPath}>{effective.canonical || `https://yourdomain.com${selected}`}</p>
            <h3>{effective.title || "Your page title"}</h3><p className={styles.snippet}>{effective.description || "Your page description appears here."}</p>
          </div> : <div className={styles.socialPreview}>
            <div className={styles.shareArt}><ImageIcon size={30}/>{previewImage && <Image key={previewImage} src={previewImage} alt="Social sharing preview" width={1200} height={630} unoptimized onError={event => { event.currentTarget.style.opacity = "0"; }}/>}</div>
            <div><small>{draft.siteUrl || "yourdomain.com"}</small><h3>{selected === "/" && draft.socialTitle ? draft.socialTitle : effective.title}</h3><p>{selected === "/" && draft.socialDescription ? draft.socialDescription : effective.description}</p></div>
          </div>}
          <p className={styles.previewNote}>Illustrative preview. Search engines may rewrite or truncate the title and snippet.</p>
        </div>

        <div className={styles.readiness}><h3>Publication checklist</h3>
          {[{ label: "Canonical domain configured", ready: !!effective.canonical }, { label: "Title and description present", ready: !!effective.title && !!effective.description }, { label: "Sharing image configured", ready: !!draft.socialImage }, { label: "This page allows indexing", ready: effective.index }].map(item => <div key={item.label}>{item.ready ? <Check size={15}/> : <AlertCircle size={15}/>}<span>{item.label}</span></div>)}
          <p>These checks describe your configuration, not search rankings.</p>
        </div>
        <div className={styles.resources}><h3>Published resources</h3><a href="/robots.txt" target="_blank" rel="noreferrer">robots.txt <ExternalLink size={14}/></a><a href="/sitemap.xml" target="_blank" rel="noreferrer">sitemap.xml <ExternalLink size={14}/></a><p>{saved.siteUrl ? `Sitemap domain: ${saved.siteUrl}` : "Add your domain and publish to generate sitemap URLs."}</p></div>
      </aside>
    </div>
    <div className={styles.footer}>
      <div>{error ? <p className={styles.error} role="alert">{error}</p> : <p role="status">{saved.updatedAt ? `Last published ${new Date(saved.updatedAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" })} PKT` : "Changes go live on the website when published."}</p>}</div>
      <AdminButton type="submit" disabled={pending || !dirty}><Save size={16}/>{pending ? "Publishing…" : "Publish SEO changes"}</AdminButton>
    </div>
  </form>;
}
