"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Smartphone, X, Upload, Gamepad2 } from "lucide-react";
import type { CatalogApp } from "@/lib/apps/model";
import { saveCatalogApp, deleteCatalogApp } from "@/lib/apps/actions";
import { AppPlayer } from "./AppsCatalog";
import styles from "./Apps.module.css";

export function AppsManager({ initialApps }: { initialApps:CatalogApp[] }) {
  const [apps,setApps] = useState(initialApps);
  const [editing,setEditing] = useState<CatalogApp | null>(null);
  const [adding,setAdding] = useState(false);
  const [editorKind,setEditorKind] = useState<"app" | "game">("app");
  const [preview,setPreview] = useState<CatalogApp | null>(null);
  const [deleting,setDeleting] = useState<CatalogApp | null>(null);
  const [busy,setBusy] = useState(false);
  const [notice,setNotice] = useState("");
  const [error,setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  function edit(app:CatalogApp | null, kind: "app" | "game" = "app") { setEditorKind(app ? (/\bgames?\b/i.test(app.category) ? "game" : "app") : kind); setEditing(app);setAdding(true);setError("");setNotice(""); }
  function closeEditor() { if (!busy) {setAdding(false);setEditing(null);setError("");} }
  async function save(form:FormData) {
    setBusy(true);setError("");setNotice("");
    try { const result = await saveCatalogApp(form); if (result.error) setError(result.error); else if (result.items) { setApps(result.items);setAdding(false);setEditing(null);setNotice("App saved. Published apps are available on SolyNext Apps."); } }
    catch { setError("Could not save the app. Check your connection and try again."); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!deleting) return;
    setBusy(true);setError("");setNotice("");
    try { const result = await deleteCatalogApp(deleting.id); if (result.error) setError(result.error); else if (result.items) {setApps(result.items);setDeleting(null);setNotice("App deleted.");} }
    catch { setError("Could not delete this app. Try again."); }
    finally {setBusy(false);}
  }
  return <div className={styles.manager}>
    <div className={styles.managerHeading}><div><p className={styles.eyebrow}>WEBSITE MANAGEMENT</p><h1>SolyNext Apps</h1><p>Manage the apps visitors can launch from your website.</p></div><div className={styles.managerActions}><Link href="/solynext-apps" target="_blank">View catalog <ExternalLink size={15}/></Link><button type="button" className={styles.primary} onClick={() => edit(null)} disabled={busy}><Plus size={17}/> Add app</button><button type="button" className={`${styles.primary} ${styles.addGame}`} onClick={() => edit(null,"game")} disabled={busy}><Gamepad2 size={17}/> Add game</button></div></div>
    {notice && <p role="status" className={styles.success}>{notice}</p>}{error && !adding && <p role="alert" className={styles.error}>{error}</p>}
    {adding && <EditorDialog busy={busy} onClose={closeEditor}><section className={styles.editor} aria-labelledby="app-editor-title"><div className={styles.simpleEditorHeading}><h2 id="app-editor-title">{editing ? `Edit ${editorKind}` : `Add ${editorKind}`}</h2></div>{error && <p role="alert" className={styles.error}>{error}</p>}<form ref={formRef} key={editing?.id || "new"} action={save}><fieldset disabled={busy}>
      <input type="hidden" name="id" value={editing?.id || ""}/><input type="hidden" name="kind" value={editorKind}/>
      <div className={styles.formGrid}>
        <AppImageField key={editing?.id || "new-image"} existing={editing?.image}/>
        <label>{editorKind === "game" ? "Game name" : "App name"}<input name="name" required minLength={5} maxLength={15} defaultValue={editing?.name} placeholder="5–15 characters"/></label>
        <label>Category<input name="category" required maxLength={60} defaultValue={editing?.category || (editorKind === "game" ? "Games" : "Productivity")} placeholder="Productivity, Games, Design…"/></label>
        <label className={styles.fullField}>{editorKind === "game" ? "Game URL" : "App URL"}<input name="url" type="url" required maxLength={2048} defaultValue={editing?.url} placeholder="https://your-app.example.com"/></label>
        <label className={styles.fullField}>Short description<textarea name="description" required maxLength={240} rows={2} defaultValue={editing?.description} placeholder="A short summary"/></label>
        <label className={styles.fullField}>{editorKind === "game" ? "Game details" : "App details"}<textarea name="details" maxLength={10000} rows={3} defaultValue={editing?.details} placeholder="Features or instructions (optional)"/></label>
        <label>Developer<input name="developer" maxLength={100} defaultValue={editing?.developer || "SolyNext"}/></label>
        <label>Version<input name="version" maxLength={40} defaultValue={editing?.version} placeholder="1.0"/></label>
        <label>Status<select name="status" defaultValue={editing?.status || "Draft"}><option>Draft</option><option>Published</option></select></label>
        <label>Display order<input name="order" type="number" min={0} max={9999} step={1} defaultValue={editing?.order || 0}/></label>
        <label className={styles.check}><input name="featured" type="checkbox" defaultChecked={editing?.featured}/> Featured</label>
      </div><div className={styles.formActions}><button type="submit" className={styles.primary}>{busy ? "Saving…" : `Save ${editorKind}`}</button><button type="button" disabled={busy} onClick={closeEditor}>Cancel</button></div>
    </fieldset></form></section></EditorDialog>}
    <div className={styles.adminColumns}>{(["app","game"] as const).map(kind => {
      const items = [...apps].filter(app => kind === "game" ? /\bgames?\b/i.test(app.category) : !/\bgames?\b/i.test(app.category)).sort((a,b)=>a.order-b.order);
      return <section className={styles.adminColumn} key={kind} aria-labelledby={`admin-${kind}-heading`}>
        <div className={styles.columnHeading}><h2 id={`admin-${kind}-heading`}>{kind === "app" ? <Smartphone size={18}/> : <Gamepad2 size={19}/>} {kind === "app" ? "Apps" : "Games"}</h2><span>{items.length}</span></div>
        <div className={styles.adminList}>{items.length ? items.map(app=><article className={styles.adminAppCard} key={app.id}><Image src={app.image} alt="" width={60} height={60} unoptimized/><div className={styles.adminAppCopy}><h3>{app.name}</h3><p>{app.description}</p><span className={styles.status} data-published={app.status === "Published"}>{app.status}</span><small>{app.category}{app.featured ? " · Featured" : ""}</small></div><div className={styles.rowActions}><button type="button" onClick={()=>setPreview(app)} disabled={busy} aria-label={`Preview ${app.name}`}><ExternalLink size={16}/></button><button type="button" onClick={()=>edit(app)} disabled={busy} aria-label={`Edit ${app.name}`}><Pencil size={16}/></button><button type="button" onClick={()=>{setDeleting(app);setError("");}} disabled={busy} aria-label={`Delete ${app.name}`}><Trash2 size={16}/></button></div></article>) : <div className={styles.empty}><p>No {kind === "app" ? "apps" : "games"} yet.</p><button type="button" onClick={()=>edit(null,kind)}>Add {kind}</button></div>}</div>
      </section>;
    })}</div>
    {deleting && <DeleteDialog name={deleting.name} busy={busy} onCancel={()=>setDeleting(null)} onDelete={remove}/>}
    {preview && <AppPlayer key={preview.id} app={preview} onClose={()=>setPreview(null)}/>}
  </div>;
}
function DeleteDialog({name,busy,onCancel,onDelete}:{name:string;busy:boolean;onCancel:()=>void;onDelete:()=>void}) {
  const ref = useRef<HTMLDialogElement>(null);
  return <dialog ref={node=>{ref.current=node;if(node && !node.open) node.showModal();}} className={styles.deleteDialog} onCancel={event=>{if(busy)event.preventDefault();else onCancel();}} aria-labelledby="delete-app-title"><h2 id="delete-app-title">Delete {name}?</h2><p>This removes the app from your catalog. This cannot be undone.</p><div className={styles.formActions}><button type="button" className={styles.danger} disabled={busy} onClick={onDelete}>{busy ? "Deleting…" : "Delete app"}</button><button type="button" disabled={busy} onClick={onCancel}>Cancel</button></div></dialog>;
}
function EditorDialog({ children,busy,onClose }: { children:ReactNode;busy:boolean;onClose:()=>void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    node?.showModal(); document.body.style.overflow = "hidden";
    return () => {node?.close();document.body.style.overflow = overflow;previous?.focus();};
  },[]);
  return <dialog ref={ref} className={styles.editorDialog} aria-labelledby="app-editor-title" onCancel={event=>{event.preventDefault();if(!busy)onClose();}} onClick={event=>{if(!busy && event.target===event.currentTarget){const rect=event.currentTarget.getBoundingClientRect();if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)onClose();}}}>
    <button type="button" className={styles.editorClose} aria-label="Close app editor" disabled={busy} onClick={onClose}><X size={20}/></button>{children}
  </dialog>;
}
function AppImageField({ existing }: { existing?:string }) {
  const [file,setFile] = useState<File | null>(null);
  const [preview,setPreview] = useState("");
  useEffect(() => { return () => { if (preview) URL.revokeObjectURL(preview); }; },[preview]);
  return <label className={`${styles.fullField} ${styles.uploadLabel}`}>App image
    <span className={styles.uploadZone}>
      <span className={styles.uploadPreview}>{preview || existing ? <Image src={preview || existing!} width={72} height={72} alt="App icon preview" unoptimized/> : <Upload size={26} strokeWidth={1.5}/>}</span>
      <span className={styles.uploadCopy}><strong>{file ? file.name : existing ? "Change image" : "Choose image"}</strong><small>Square crop · Max 4 MB</small></span>
      <span className={styles.uploadBrowse}>Browse</span>
      <input className={styles.uploadInput} name="image" type="file" accept="image/jpeg,image/png,image/webp" required={!existing} onChange={event => {const next=event.target.files?.[0] || null;setFile(next);setPreview(next ? URL.createObjectURL(next) : "");}}/>
    </span>
  </label>;
}