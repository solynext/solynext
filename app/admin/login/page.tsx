import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { getAdminSession } from "@/lib/admin/auth/dal";
import { safeAdminReturn } from "@/lib/admin/auth/session";
import { LoginForm } from "@/components/admin/LoginForm";
import styles from "@/components/admin/admin.module.css";

export const metadata = { title: "Sign in" };
export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ returnTo?: string; reason?: string }> }) {
  const params = await searchParams;
  const returnTo = safeAdminReturn(params.returnTo);
  if (await getAdminSession()) redirect(returnTo);
  return <main id="main-content" className={styles.loginPage}>
    <section className={styles.loginStory}><Link href="/" className={styles.brand}><span>s.</span>SolyNext<span className={styles.brandDot}>.</span></Link><div className={styles.loginStoryBody}><span className={styles.eyebrow}>YOUR WEBSITE. YOUR WORKSPACE.</span><h1>A little control.<br/>A lot of possibility.</h1><p>One place to manage your projects, content, and the conversations that move SolyNext forward.</p><div className={styles.loginIllustration} aria-hidden="true"><div><Layers3 size={46}/></div><span><Sparkles size={24}/></span><i/></div></div><small><ShieldCheck size={16}/> A dedicated space for the SolyNext team.</small></section>
    <section className={styles.loginFormArea}><div className={styles.loginCard}><span className={styles.eyebrow}>ADMIN WORKSPACE</span><h2>Welcome back.</h2><p>Sign in to manage what comes next.</p><LoginForm returnTo={returnTo} expired={params.reason === "expired"}/><Link href="/" className={styles.backLink}>Back to SolyNext <ArrowUpRight size={15}/></Link></div><p className={styles.loginEnvironment}>Development preview · Temporary authentication</p></section>
  </main>;
}
