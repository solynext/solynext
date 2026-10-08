"use client";

import { useState } from "react";
import { ShieldCheck, Save, LogOut, Clock3 } from "lucide-react";
import { logoutAdmin } from "@/lib/admin/auth/actions";
import { useAdmin } from "./AdminProvider";
import { AdminPageHeading, AdminButton, StatusBadge } from "./AdminUI";
import styles from "./admin.module.css";
import { markAdminFormSaved } from "./AdminUnsavedChanges";

export function AdminProfile() {
  const { session, notify } = useAdmin();
  const [name, setName] = useState(session.user.name);
  const [email, setEmail] = useState(session.user.email);
  return <><AdminPageHeading title="Admin profile" description="Your workspace identity, profile information, and current session."/>
    <div className={styles.profileLayout}><section className={`${styles.panel} ${styles.profileCard}`}><span className={styles.largeAvatar}>SA</span><h2>{session.user.name}</h2><p>{session.user.email}</p><StatusBadge status="Active"/><span className={styles.softLabel}>Administrator</span><div><ShieldCheck size={17}/><p>Full workspace access<br/><small>Temporary development identity</small></p></div><form action={logoutAdmin}><AdminButton variant="secondary" type="submit"><LogOut size={16}/>Sign out</AdminButton></form></section>
    <div><section className={styles.panel}><div className={styles.panelHeading}><div><h2>Profile information</h2><p>Prepare your admin profile for backend integration.</p></div></div><form className={`${styles.form} ${styles.settingsForm}`} onSubmit={event => { event.preventDefault(); markAdminFormSaved(event.currentTarget); notify("Profile edits saved as a preview. Your sign-in identity has not changed."); }}><label>Display name<input value={name} onChange={event => setName(event.target.value)} required maxLength={120} autoComplete="name"/></label><label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} required maxLength={254} autoComplete="email"/></label><label>Role<input value="Administrator" readOnly aria-readonly="true"/></label><p className={styles.notice}>Identity changes and password management will be enabled with a real authentication provider.</p><div className={styles.formActions}><AdminButton type="submit"><Save size={16}/>Save profile preview</AdminButton></div></form></section>
    <section className={`${styles.panel} ${styles.sessionPanel}`}><div className={styles.panelHeading}><div><h2>Current session</h2><p>Your access is checked on every protected request.</p></div><Clock3 size={20}/></div><dl className={styles.securityFacts}><div><dt>Authentication method</dt><dd>Development credentials</dd></div><div><dt>Expires</dt><dd>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" }).format(new Date(session.expiresAt * 1000))} PKT</dd></div><div><dt>Session scope</dt><dd>Admin workspace only</dd></div></dl></section></div></div>
  </>;
}
