"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Upload, Plus, Trash2 } from "lucide-react";
import { uploadProjectImage } from "@/lib/portfolio/actions";
import type { ProjectInput, PortfolioProject, ProjectImage } from "@/lib/portfolio/model";
import { useAdmin } from "./AdminProvider";
import { AdminButton } from "./AdminUI";
import styles from "./admin.module.css";

const siteImages = ["/images/fintech-enterprise.jpg", "/images/uiux-design.jpg", "/images/engineering-dev.jpg", "/images/cloud-infrastructure.jpg", "/images/marketing-growth.jpg", "/images/hero-tech.jpg"];
export function PortfolioEditor({ project, linkedProjectId, pending, error, onSave, onCancel }: { project?: PortfolioProject; linkedProjectId?: string; pending: boolean; error: string; onSave: (input: ProjectInput) => void; onCancel: () => void }) {
  const { collections } = useAdmin();
  const linked = collections.projects.find(item => item.id === linkedProjectId);
  const [image, setImage] = useState(project?.featuredImage ?? "/images/engineering-dev.jpg");
  const [gallery, setGallery] = useState<ProjectImage[]>(project?.gallery ?? []);
  const [results, setResults] = useState(project?.keyResults ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  async function upload(file: File, galleryIndex?: number) {
    setUploading(true); setUploadError("");
    try {
      if (file.size > 5 * 1024 * 1024) { setUploadError("Choose an image smaller than 5 MB."); return; }
      const form = new FormData(); form.set("image", file);
      const result = await uploadProjectImage(form);
      if (result.error) { setUploadError(result.error); return; }
      if (result.src) {
        if (galleryIndex !== undefined) setGallery(previous => previous.map((item, index) => index === galleryIndex ? { ...item, src: result.src! } : item));
        else setImage(result.src);
      }
    } catch { setUploadError("The upload failed. Try again."); }
    finally { setUploading(false); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const quote = value("quote");
    onSave({ title: value("title"), slug: value("slug"), industry: value("industry"), summary: value("summary"), client: value("client"), clientLocation: value("clientLocation"), challenge: value("challenge"), solution: value("solution"), featuredImage: image, imageAlt: value("imageAlt"), projectUrl: value("projectUrl"), technologies: value("technologies").split(",").map(item => item.trim()).filter(Boolean), architectureDetails: value("architectureDetails").split("\n").map(item => item.trim()).filter(Boolean), keyResults: results, gallery, completionDate: value("completionDate"), projectId: value("projectId"), status: value("status") as ProjectInput["status"], featured: form.has("featured"), displayOrder: Number(value("displayOrder")), testimonial: quote ? { quote, author: value("author"), role: value("role"), company: value("company") } : undefined });
  }
  return <form className={`${styles.form} ${styles.recordForm}`} onSubmit={submit}><fieldset className={styles.portfolioFields} disabled={pending || uploading}>
    <section className={styles.portfolioFormSection}><h3>Project & publication</h3>
      <label>Project title<input name="title" required maxLength={180} defaultValue={project?.title ?? linked?.title ?? ""}/></label>
      <div className={styles.formPair}><label>URL slug<input name="slug" required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={project?.slug ?? ""} placeholder="my-project"/><small>Public address: /portfolio/your-slug</small></label><label>Industry<input name="industry" required maxLength={120} defaultValue={project?.industry ?? linked?.category ?? ""}/></label></div>
      <label>Summary<textarea name="summary" required maxLength={2000} rows={3} defaultValue={project?.summary ?? ""}/></label>
      <div className={styles.formPair}><label>Publication<select name="status" defaultValue={project?.status ?? "Draft"}><option>Draft</option><option>Published</option><option>Archived</option></select></label><label>Display order<input name="displayOrder" type="number" min={0} max={9999} step={1} required defaultValue={project?.displayOrder ?? 0}/></label></div>
      <label className={styles.checkLabel}><input type="checkbox" name="featured" defaultChecked={project?.featured ?? false}/>Feature on the homepage</label>
      <div className={styles.formPair}><label>Public client name<input name="client" maxLength={180} defaultValue={project?.client ?? ""}/></label><label>Public client location<input name="clientLocation" maxLength={180} defaultValue={project?.clientLocation ?? ""}/></label></div>
      <div className={styles.formPair}><label>Completion date<input name="completionDate" type="date" defaultValue={project?.completionDate ?? ""}/></label><label>Related delivery project<select name="projectId" defaultValue={project?.projectId ?? linkedProjectId ?? ""}><option value="">No delivery project</option>{project?.projectId && !collections.projects.some(item => item.id === project.projectId) && <option value={project.projectId}>Existing project</option>}{collections.projects.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select><small>This link is private to admins.</small></label></div>
    </section>
    <section className={styles.portfolioFormSection}><h3>Cover image & project link</h3>
      <div className={styles.portfolioImagePreview}><Image src={image || "/images/engineering-dev.jpg"} alt="Cover image preview" fill sizes="600px" unoptimized/></div>
      <label>Image path or HTTPS URL<input value={image} onChange={event => setImage(event.target.value)} required maxLength={1000}/></label>
      <div className={styles.formPair}><label>Choose a site image<select value={siteImages.includes(image) ? image : ""} onChange={event => { if (event.target.value) setImage(event.target.value); }}><option value="">Uploaded or custom image</option>{siteImages.map(src => <option key={src} value={src}>{src.split("/").at(-1)}</option>)}</select></label><label className={styles.portfolioUpload}><Upload size={16}/>Upload cover image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }}/><small>PNG, JPEG or WebP · Up to 5 MB</small></label></div>
      <label>Cover image description<input name="imageAlt" required maxLength={180} defaultValue={project?.imageAlt ?? ""} placeholder="Describe the image for screen readers"/></label>
      <label>Live project link<input name="projectUrl" type="url" maxLength={1000} defaultValue={project?.projectUrl ?? ""} placeholder="https://your-project.com"/></label>
    </section>
    <section className={styles.portfolioFormSection}><h3>Project gallery</h3><p>Add screenshots or additional project visuals.</p>
      {gallery.map((entry, index) => <div className={styles.portfolioGalleryRow} key={index}><label>Image {index + 1}<input required value={entry.src} onChange={event => setGallery(previous => previous.map((item, i) => i === index ? { ...item, src: event.target.value } : item))} placeholder="HTTPS image URL or upload below" maxLength={1000}/></label><label>Image description<input required value={entry.alt} maxLength={180} onChange={event => setGallery(previous => previous.map((item, i) => i === index ? { ...item, alt: event.target.value } : item))}/></label><div className={styles.formActions}><label className={styles.portfolioUpload}>Upload image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file, index); event.target.value = ""; }}/></label><AdminButton type="button" variant="secondary" onClick={() => setGallery(previous => previous.filter((_, i) => i !== index))}><Trash2 size={15}/>Remove</AdminButton></div></div>)}
      <AdminButton type="button" variant="secondary" disabled={gallery.length >= 12} onClick={() => setGallery(previous => [...previous, { src: "", alt: "" }])}><Plus size={15}/>Add gallery image</AdminButton>
    </section>
    <section className={styles.portfolioFormSection}><h3>Case study</h3><label>Challenge<textarea name="challenge" rows={4} maxLength={5000} defaultValue={project?.challenge ?? ""}/></label><label>Solution<textarea name="solution" rows={4} maxLength={5000} defaultValue={project?.solution ?? ""}/></label><label>Technologies<input name="technologies" maxLength={2000} defaultValue={project?.technologies.join(", ") ?? linked?.technologies?.join(", ") ?? ""} placeholder="Next.js, React, PostgreSQL"/></label><label>Engineering highlights<textarea name="architectureDetails" rows={4} maxLength={15000} defaultValue={project?.architectureDetails.join("\n") ?? ""} placeholder="One highlight per line"/></label></section>
    <section className={styles.portfolioFormSection}><h3>Results & impact</h3>{results.map((result, index) => <div key={index} className={styles.portfolioResultRow}><label>Metric<input required maxLength={80} value={result.metric} placeholder="40%" onChange={event => setResults(previous => previous.map((item, i) => i === index ? { ...item, metric: event.target.value } : item))}/></label><label>Label<input required maxLength={160} value={result.label} placeholder="Faster load times" onChange={event => setResults(previous => previous.map((item, i) => i === index ? { ...item, label: event.target.value } : item))}/></label><button type="button" className={styles.iconButton} aria-label={`Remove result ${index + 1}`} onClick={() => setResults(previous => previous.filter((_, i) => i !== index))}><Trash2 size={16}/></button></div>)}<AdminButton type="button" variant="secondary" disabled={results.length >= 12} onClick={() => setResults(previous => [...previous, { metric: "", label: "" }])}><Plus size={15}/>Add result</AdminButton></section>
    <section className={styles.portfolioFormSection}><h3>Client testimonial (optional)</h3><label>Quote<textarea name="quote" rows={3} maxLength={2000} defaultValue={project?.testimonial?.quote ?? ""}/></label><div className={styles.formPair}><label>Author<input name="author" maxLength={120} defaultValue={project?.testimonial?.author ?? ""}/></label><label>Role<input name="role" maxLength={120} defaultValue={project?.testimonial?.role ?? ""}/></label></div><label>Company<input name="company" maxLength={180} defaultValue={project?.testimonial?.company ?? ""}/></label></section>
    {error && <p className={styles.formError} role="alert">{error}</p>}
    <div className={styles.formActions}><AdminButton type="button" variant="secondary" onClick={onCancel}>Cancel</AdminButton><AdminButton type="submit">{pending ? "Saving…" : "Save project"}</AdminButton></div>
  </fieldset>{uploading && <p role="status" className={styles.notice}>Uploading image…</p>}{uploadError && <p role="alert" className={styles.formError}>{uploadError}</p>}</form>;
}
