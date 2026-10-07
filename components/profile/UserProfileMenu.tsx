"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Camera, Check, CircleHelp, LoaderCircle, Pencil, ShieldCheck, Upload, UserRound, X } from "lucide-react";
import { useUserProfile } from "./useUserProfile";
import { prepareProfileImage } from "@/lib/profile/image";
import { validateProfile } from "@/lib/profile/service";
import type { ProfileUpdate } from "@/lib/profile/types";
import styles from "./UserProfileMenu.module.css";

function Avatar({ image, name, large = false }: { image: string | null; name: string; large?: boolean }) {
  return <span className={`${styles.avatar} ${large ? styles.largeAvatar : ""}`}>
    {/* User-selected browser data URLs do not need the Next image optimization service. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {image ? <img src={image} alt={`${name}'s profile`} /> : <UserRound size={large ? 34 : 19} aria-hidden="true" />}
  </span>;
}

export function UserProfileMenu() {
  const { profile, ready, saveProfile } = useUserProfile();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ProfileUpdate>(profile);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileUpdate, string>>>({});
  const [saveError, setSaveError] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const editButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const imageRequest = useRef(0);

  useEffect(() => {
    if (!open) return;
    editButton.current?.focus();
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);

  const startEditing = (choosePhoto = false) => {
    setDraft({ name: profile.name, email: profile.email, profileImage: profile.profileImage });
    setErrors({}); setSaveError(""); setStatus(""); setOpen(false);
    dialog.current?.showModal();
    nameInput.current?.focus();
    if (choosePhoto) fileInput.current?.click();
  };
  const closeEditor = () => { if (!saving) dialog.current?.close(); };
  const changeImage = async (file?: File) => {
    if (!file) return;
    const request = ++imageRequest.current;
    setProcessing(true); setErrors(previous => ({ ...previous, profileImage: undefined }));
    try {
      const image = await prepareProfileImage(file);
      if (request === imageRequest.current) setDraft(previous => ({ ...previous, profileImage: image }));
    } catch (error) {
      if (request === imageRequest.current) setErrors(previous => ({ ...previous, profileImage: error instanceof Error ? error.message : "Could not open image." }));
    } finally { if (request === imageRequest.current) setProcessing(false); }
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || processing) return;
    const validation = validateProfile(draft);
    setErrors(validation); setSaveError("");
    if (Object.keys(validation).length) {
      requestAnimationFrame(() => dialog.current?.querySelector<HTMLInputElement>("[aria-invalid=true]")?.focus());
      return;
    }
    setSaving(true);
    try {
      await saveProfile(draft);
      dialog.current?.close();
      setStatus("Profile saved successfully.");
    } catch (error) { setSaveError(error instanceof Error ? error.message : "Could not save your profile. Please try again."); }
    finally { setSaving(false); }
  };

  return <div ref={root} className={styles.root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <button ref={trigger} type="button" className={styles.trigger} disabled={!ready} aria-label={`Profile for ${profile.name}, ${profile.email}`} aria-expanded={open} aria-controls="user-profile-popover" onClick={() => { setStatus(""); setOpen(value => !value); }} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); } }}>
      <Avatar image={profile.profileImage} name={profile.name} />
    </button>
    {open && <div id="user-profile-popover" className={styles.popover}>
      <div className={styles.menuIdentity}><Avatar image={profile.profileImage} name={profile.name} /><div className={styles.menuDetails}><strong>{profile.name}</strong><span>{profile.email}</span></div></div>
      <div className={styles.menuOptions}>
        <button ref={editButton} type="button" className={styles.editButton} onClick={() => startEditing()}><Pencil size={17} aria-hidden="true" /><span>Edit profile</span></button>
        <button type="button" className={styles.editButton} onClick={() => startEditing(true)}><Camera size={17} aria-hidden="true" /><span>Change profile photo</span></button>
      </div>
      <div className={styles.menuOptions}>
        <Link href="/contact" className={styles.editButton} onClick={() => setOpen(false)}><CircleHelp size={17} aria-hidden="true" /><span>Help & support</span><ArrowUpRight className={styles.optionArrow} size={14} aria-hidden="true" /></Link>
        <Link href="/privacy-policy" className={styles.editButton} onClick={() => setOpen(false)}><ShieldCheck size={17} aria-hidden="true" /><span>Privacy policy</span><ArrowUpRight className={styles.optionArrow} size={14} aria-hidden="true" /></Link>
      </div>
    </div>}
    <span className="sr-only" role="status">{status}</span>
    {status && <div className={styles.toast}><Check size={16} aria-hidden="true" />{status}<button type="button" aria-label="Dismiss notification" onClick={() => setStatus("")}><X size={15} /></button></div>}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="edit-profile-title" aria-describedby="edit-profile-description" onCancel={event => { if (saving) event.preventDefault(); }} onClose={() => { ++imageRequest.current; setProcessing(false); trigger.current?.focus(); }} onClick={event => {
      if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeEditor(); }
    }}>
      <form onSubmit={save} noValidate aria-busy={saving}>
        <div className={styles.heading}><div><p className={styles.eyebrow}>YOUR PROFILE</p><h2 id="edit-profile-title">Make it yours.</h2></div><button type="button" className={styles.close} onClick={closeEditor} disabled={saving} aria-label="Close profile editor"><X size={20} /></button></div>
        <p id="edit-profile-description" className={styles.description}>Update your photo and personal details.</p>
        <fieldset disabled={saving} className={styles.fields}>
          <div className={styles.imageSection}>
            <Avatar image={draft.profileImage} name={draft.name || "Your"} large />
            <div><div className={styles.imageActions}><button type="button" className={styles.secondary} disabled={processing} onClick={() => fileInput.current?.click()}>{processing ? <LoaderCircle className={styles.spinner} size={15} /> : <Upload size={15} aria-hidden="true" />}{processing ? "Preparing…" : draft.profileImage ? "Change photo" : "Upload photo"}</button>{draft.profileImage && <button type="button" className={styles.remove} disabled={processing} onClick={() => { setDraft(previous => ({ ...previous, profileImage: null })); setErrors(previous => ({ ...previous, profileImage: undefined })); }}>Remove</button>}</div><p className={styles.hint}>JPG, PNG or WebP · up to 5 MB</p></div>
          </div>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className={styles.fileInput} aria-label="Choose profile photo" onChange={event => { void changeImage(event.target.files?.[0]); event.target.value = ""; }} />
          <span role="status" className="sr-only">{processing ? "Preparing image preview." : ""}</span>
          {errors.profileImage && <p className={styles.error} role="alert">{errors.profileImage}</p>}
          <div className={styles.field}><label htmlFor="profile-name">Full name</label><input ref={nameInput} id="profile-name" autoComplete="name" maxLength={80} value={draft.name} aria-invalid={!!errors.name} aria-describedby={errors.name ? "profile-name-error" : undefined} onChange={event => { setDraft(previous => ({ ...previous, name: event.target.value })); setErrors(previous => ({ ...previous, name: undefined })); }} />{errors.name && <p id="profile-name-error" className={styles.error} role="alert">{errors.name}</p>}</div>
          <div className={styles.field}><label htmlFor="profile-email">Email address</label><input id="profile-email" type="email" autoComplete="email" maxLength={254} value={draft.email} aria-invalid={!!errors.email} aria-describedby={errors.email ? "profile-email-error" : undefined} onChange={event => { setDraft(previous => ({ ...previous, email: event.target.value })); setErrors(previous => ({ ...previous, email: undefined })); }} />{errors.email && <p id="profile-email-error" className={styles.error} role="alert">{errors.email}</p>}</div>
        </fieldset>
        <p className={styles.localNote}>Saved on this device.</p>
        {saveError && <p className={styles.error} role="alert">{saveError}</p>}
        <div className={styles.footer}><button type="button" className={styles.secondary} onClick={closeEditor} disabled={saving}>Cancel</button><button type="submit" className={styles.primary} disabled={saving || processing}>{saving && <LoaderCircle className={styles.spinner} size={16} />}{saving ? "Saving…" : "Save changes"}</button></div>
      </form>
    </dialog>
  </div>;
}
