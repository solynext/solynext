"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ShieldCheck, Save, LogOut, Clock3, Mail, UserRound, LockKeyhole, ArrowUpRight, Info, Camera, Trash2, LoaderCircle } from "lucide-react";
import { logoutAdmin } from "@/lib/admin/auth/actions";
import { uploadAdminPhoto, removeAdminPhoto } from "@/lib/admin/profile/actions";
import { useAdmin } from "./AdminProvider";
import { AdminPageHeading, AdminButton } from "./AdminUI";
import { markAdminFormSaved } from "./AdminUnsavedChanges";
import styles from "./AdminProfile.module.css";
import { AdminAvatar } from "./AdminAvatar";

export function AdminProfile() {
  const { session, notify, authState, profilePhoto, setProfilePhoto } = useAdmin();
  const photoInput = useRef<HTMLInputElement>(null);
  const [photoPending, setPhotoPending] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [name, setName] = useState(session.user.name);
  const [email, setEmail] = useState(session.user.email);
  const initials = session.user.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  const formatTime = (seconds: number) => new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" }).format(new Date(seconds * 1000));

  async function changePhoto(file: File) {
    setPhotoError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || !file.size || file.size > 5 * 1024 * 1024) {
      setPhotoError("Choose a JPG, PNG, or WebP image up to 5 MB."); return;
    }
    setPhotoPending(true);
    try {
      const data = new FormData(); data.set("photo", file);
      const result = await uploadAdminPhoto(data);
      if (result.error || !result.photo) { setPhotoError(result.error || "Could not upload your photo."); return; }
      setProfilePhoto(result.photo);
      notify("Profile photo updated across your admin workspace.");
    } catch { setPhotoError("Could not upload your photo. Try again."); }
    finally { setPhotoPending(false); }
  }

  async function removePhoto() {
    setPhotoPending(true); setPhotoError("");
    try {
      const result = await removeAdminPhoto();
      if (result.error || !result.photo) { setPhotoError(result.error || "Could not remove your photo."); return; }
      setProfilePhoto(result.photo);
      notify("Profile photo removed.");
    } catch { setPhotoError("Could not remove your photo. Try again."); }
    finally { setPhotoPending(false); }
  }

  return <>
    <AdminPageHeading title="Your profile" description="Your identity, workspace access, and session in one place."/>
    <div className={styles.layout}>
      <aside className={styles.identity} aria-label="Account overview">
        <div className={styles.cover}><span><ShieldCheck size={14}/>SOLYNEXT WORKSPACE</span><i aria-hidden="true"/><i aria-hidden="true"/></div>
        <div className={styles.identityBody}>
          <div className={styles.avatar}>
            <AdminAvatar image={profilePhoto.image} initials={initials} className={styles.profileImage} alt={`${session.user.name} profile photo`}/>
            <button type="button" className={styles.cameraButton} disabled={photoPending} onClick={() => photoInput.current?.click()} aria-label={photoPending ? "Saving profile photo" : profilePhoto.image ? "Change profile photo" : "Upload profile photo"}>{photoPending ? <LoaderCircle size={14} className={styles.spinner}/> : <Camera size={14}/>}</button>
          </div>
          <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" hidden aria-label="Choose admin profile photo" disabled={photoPending} onChange={event => { const file = event.currentTarget.files?.[0]; event.currentTarget.value = ""; if (file) void changePhoto(file); }}/>
          {profilePhoto.image && <div className={styles.photoControls}><button type="button" className={styles.removePhoto} disabled={photoPending} onClick={() => void removePhoto()}><Trash2 size={13}/>Remove</button></div>}
          {photoError && <p className={styles.photoError} role="alert">{photoError}</p>}
          <span className={styles.eyebrow}>YOUR ACCOUNT</span>
          <h2>{session.user.name}</h2>
          <p className={styles.email}>{session.user.email}</p>
          <div className={styles.badges}><span className={styles.role}><ShieldCheck size={13}/>Administrator</span><span className={styles.active}><i/>{authState === "checking" ? "Checking session" : authState === "expired" ? "Session expired" : "Active"}</span></div>
          <div className={styles.access}><span><LockKeyhole size={19}/></span><div><strong>Full workspace access</strong><p>Manage your website, content, and team.</p></div></div>
          <Link href="/admin/settings" className={styles.settingsLink}>Workspace settings<ArrowUpRight size={17}/></Link>
          <form action={logoutAdmin} className={styles.signout}><AdminButton variant="secondary" type="submit"><LogOut size={16}/>Sign out</AdminButton></form>
        </div>
      </aside>

      <div className={styles.content}>
        <section className={styles.panel} aria-labelledby="profile-details-title">
          <div className={styles.panelHeading}><span className={styles.sectionIcon}><UserRound size={20}/></span><div><h2 id="profile-details-title">Profile details</h2><p>A clear introduction to the person behind the workspace.</p></div><span className={styles.previewBadge}>Preview</span></div>
          <form className={styles.form} onSubmit={event => { event.preventDefault(); markAdminFormSaved(event.currentTarget); notify("Profile preview saved. Your sign-in identity has not changed."); }}>
            <div className={styles.fields}>
              <label>Display name<div className={styles.inputWrap}><UserRound size={17} aria-hidden="true"/><input name="displayName" value={name} onChange={event => setName(event.target.value)} required maxLength={120} autoComplete="name"/></div><small>The name shown in your profile preview.</small></label>
              <label>Email address<div className={styles.inputWrap}><Mail size={17} aria-hidden="true"/><input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} required maxLength={254} autoComplete="email"/></div><small>Your current sign-in email is shown on the account card.</small></label>
            </div>
            <div className={styles.permission}><div><span>Workspace role</span><strong>Administrator</strong></div><LockKeyhole size={16} aria-hidden="true"/></div>
            <p className={styles.notice}><Info size={16}/><span>Profile edits are a preview. Updating your sign-in details or password requires a connected identity provider.</span></p>
            <div className={styles.formFooter}><p>Keep your details clear and up to date.</p><AdminButton type="submit"><Save size={16}/>Save profile preview</AdminButton></div>
          </form>
        </section>

        <section className={styles.panel} aria-labelledby="profile-session-title">
          <div className={styles.panelHeading}><span className={`${styles.sectionIcon} ${styles.sessionIcon}`}><ShieldCheck size={20}/></span><div><h2 id="profile-session-title">Access & session</h2><p>Your access is checked on every protected request.</p></div><span className={styles.sessionLabel}><Clock3 size={13}/>Current session</span></div>
          <dl className={styles.sessionDetails}>
            <div><dt>Authentication</dt><dd>Development account</dd><small>Temporary development identity</small></div>
            <div><dt>Session protection</dt><dd>Signed, HTTP-only cookie</dd><small>Admin workspace only</small></div>
            <div><dt>Signed in</dt><dd>{formatTime(session.issuedAt)}</dd><small>Pakistan Standard Time</small></div>
            <div><dt>Session expires</dt><dd>{formatTime(session.expiresAt)}</dd><small>Pakistan Standard Time</small></div>
          </dl>
        </section>
      </div>
    </div>
  </>;
}
