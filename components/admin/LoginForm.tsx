"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { loginAdmin } from "@/lib/admin/auth/actions";
import { AdminButton } from "./AdminUI";
import styles from "./admin.module.css";

export function LoginForm({ returnTo, expired }: { returnTo: string; expired: boolean }) {
  const [state, action, pending] = useActionState(loginAdmin, {});
  const [showPassword, setShowPassword] = useState(false);
  return <form action={action} className={styles.form}>
    {expired && <p className={styles.notice} role="status">Your session has expired. Sign in again to continue.</p>}
    <input name="returnTo" type="hidden" value={returnTo}/>
    <label>Email address<input name="email" type="email" autoComplete="username" placeholder="Your admin email" required maxLength={254} disabled={pending}/></label>
    <label>Password<div className={styles.passwordField}><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required maxLength={256} disabled={pending}/><button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label>
    {state.error && <p className={styles.formError} role="alert">{state.error}</p>}
    <AdminButton type="submit" disabled={pending}>{pending ? <><LoaderCircle size={18} className={styles.spin}/>Signing in…</> : <>Sign in to workspace<ArrowRight size={18}/></>}</AdminButton>
    <p className={styles.loginFootnote}><LockKeyhole size={13}/> Restricted access for authorized administrators.</p>
  </form>;
}
