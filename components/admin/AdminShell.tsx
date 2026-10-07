"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, ChevronRight, Menu, X, LogOut, UserRound, Settings, CircleCheck, ShieldCheck, ArrowUpRight } from "lucide-react";
import { adminNavigation, adminSearchNavigation, getAdminPageNavigation, isAdminRouteActive } from "@/lib/admin/navigation";
import { useAdmin } from "./AdminProvider";
import { AdminDialog } from "./AdminDialog";
import { AdminSearchInput } from "./AdminControls";
import { AdminLogoutDialog } from "./AdminLogoutDialog";
import styles from "./admin.module.css";

const allLinks = adminSearchNavigation;
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session, collections, toast, authState, notifications: events, markRead } = useAdmin();
  const [sidebar, setSidebar] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchLinks = allLinks.filter(link => `${link.label} ${link.keywords} ${link.href.replaceAll("-", " ")}`.toLowerCase().includes(search.trim().toLowerCase()));
  const unread = events.filter(item => !item.read).length;
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const currentLink = allLinks.find(link => link.href === pathname || (link.href !== "/admin" && pathname.startsWith(link.href + "/")));
  const pageNavigation = getAdminPageNavigation(pathname);
  const mainHref = pageNavigation?.parent ?? currentLink?.href;
  const title = pageNavigation?.items.find(item => isAdminRouteActive(pathname, item.href))?.label ?? currentLink?.label ?? "Workspace";
  const isDetail = Boolean(currentLink && pathname !== currentLink.href);
  const newInquiries = collections.inquiries.filter(i => i.status === "New").length;
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!profileRef.current?.contains(event.target as Node)) setProfile(false); };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setProfile(false); setNotifications(false); } if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setProfile(false); setNotifications(false); setSearch(""); setSearchOpen(value => !value); } };
    document.addEventListener("click", close); window.addEventListener("keydown", key);
    return () => { document.removeEventListener("click", close); window.removeEventListener("keydown", key); };
  }, []);
  useEffect(() => {
    const dialog = mobileDialog.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (sidebar) { dialog?.showModal(); document.body.style.overflow = "hidden"; }
    else dialog?.close();
    return () => { dialog?.close(); document.body.style.overflow = overflow; if (sidebar) previous?.focus(); };
  }, [sidebar]);
  const navigation = <>
    <Link href="/admin" className={styles.brand} onClick={() => setSidebar(false)}><span>s.</span>SolyNext<span className={styles.brandDot}>.</span></Link>
    <div className={styles.workspaceLabel}>Company workspace <span>Admin</span></div>
    <nav aria-label="Admin navigation" className={`${styles.navigation} ${styles.primaryNavigation}`}>{adminNavigation.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={mainHref === href ? styles.navActive : ""} aria-current={mainHref === href ? "page" : undefined} onClick={() => setSidebar(false)}><Icon size={18}/><span>{label}</span>{href === "/admin/inquiries" && newInquiries > 0 && <b>{newInquiries}</b>}</Link>)}</nav>
    <div className={styles.sidebarBottom}><button type="button" className={styles.sidebarLogout} aria-haspopup="dialog" onClick={() => { setSidebar(false); setProfile(false); setLogoutOpen(true); }}><LogOut size={18}/>Log out</button></div>
  </>;
  if (authState === "expired") return <div className={styles.sessionExpired} role="alert"><ShieldCheck size={32}/><h1>Session expired</h1><p>Returning you to sign in…</p><Link href="/admin/login?reason=expired">Sign in again</Link></div>;
  return <div className={styles.shell}>
    <a href="#admin-main" className={styles.skipLink}>Skip to admin content</a>
    <aside className={styles.sidebar}>{navigation}</aside>
    <dialog ref={mobileDialog} className={styles.mobileSidebar} aria-label="Admin navigation" onCancel={event => { event.preventDefault(); setSidebar(false); }}><button className={styles.mobileClose} onClick={() => setSidebar(false)} aria-label="Close navigation"><X size={20}/></button>{navigation}</dialog>
    <div className={styles.workspace}>
      <header className={styles.topbar}><div className={styles.topbarLeft}><button className={`${styles.iconButton} ${styles.mobileMenu}`} onClick={() => setSidebar(true)} aria-label="Open admin navigation" aria-expanded={sidebar}><Menu size={21}/></button><nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/admin">Workspace</Link><ChevronRight size={14}/>{isDetail ? <><Link href={currentLink?.href ?? "/admin"}>{title}</Link><ChevronRight size={14}/><span aria-current="page">Details</span></> : <span aria-current="page">{title}</span>}</nav></div><div className={styles.topbarActions}>
        <Link href="/" target="_blank" rel="noopener noreferrer" className={styles.visitWebsite} aria-label="Visit Website (opens in a new tab)"><span>Visit Website</span><ArrowUpRight size={17}/></Link>
        <button className={styles.notificationButton} onClick={() => { setProfile(false); setSearchOpen(false); setNotifications(true); }} aria-label="Open notifications" aria-haspopup="dialog"><Bell size={19}/>{unread > 0 && <i/>}</button>
        <div className={styles.profileContainer} ref={profileRef}><button className={styles.profileTrigger} onClick={() => setProfile(!profile)} aria-label="Open admin account menu" aria-expanded={profile} aria-controls="admin-account-menu"><span className={styles.avatar}>SA</span><span className={styles.profileName}>{session.user.name}<small>Administrator</small></span><ChevronDown size={14}/></button>{profile && <div className={styles.accountMenu} id="admin-account-menu"><p>Signed in as<strong>{session.user.email}</strong></p><Link href="/admin/profile" onClick={() => setProfile(false)}><UserRound size={16}/>My profile</Link><Link href="/admin/settings" onClick={() => setProfile(false)}><Settings size={16}/>Workspace settings</Link><button type="button" onClick={() => { setProfile(false); setLogoutOpen(true); }}><LogOut size={16}/>Log out</button></div>}</div>
      </div></header>
      <main id="admin-main" className={styles.main}><div className={styles.previewStrip}><span><i/> Preview workspace</span><p>Sample data · Edits reset on reload. Website publishing is not connected.</p><small>{authState === "checking" ? "Checking session…" : "Admin session active"}</small></div>{pageNavigation && <nav className={styles.pageNavigation} aria-label={pageNavigation.label}>{pageNavigation.items.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={isAdminRouteActive(pathname, href) ? styles.pageNavActive : ""} aria-current={isAdminRouteActive(pathname, href) ? "page" : undefined}><Icon size={16}/>{label}</Link>)}</nav>}{children}<footer className={styles.workspaceFooter}><span>SolyNext workspace</span><span>Session preview · Backend not connected</span></footer></main>
    </div>
    {toast && <div className={styles.toast} role="status"><CircleCheck size={19}/>{toast}</div>}
    {logoutOpen && <AdminLogoutDialog onClose={() => setLogoutOpen(false)}/>}
    {searchOpen && <AdminDialog title="Search workspace" description="Jump to a management section." onClose={() => { setSearchOpen(false); setSearch(""); }}><div className={styles.searchDialog}><AdminSearchInput autoFocus value={search} onChange={setSearch} label="Search management sections" placeholder="Projects, inquiries, settings"/><div className={styles.searchResults}>{searchLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => { setSearchOpen(false); setSearch(""); }}><Icon size={18}/>{label}<ChevronRight size={16}/></Link>)}{!searchLinks.length && <p>No matching sections. Try another keyword.</p>}</div></div></AdminDialog>}
    {notifications && <AdminDialog title="Notifications" description="Recent delivery and client updates." onClose={() => setNotifications(false)}><div className={styles.notificationList}>{events.slice(0,5).map(item => <Link href={item.href ?? "/admin/activity"} key={item.id} onClick={() => { markRead(item.id); setNotifications(false); }}><span className={styles.notificationIcon}><Bell size={20}/></span><div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time}{!item.read ? " · Unread" : ""}</small></div></Link>)}<div className={styles.formActions}><button className={styles.textButton} onClick={() => markRead()}>Mark all as read</button><Link href="/admin/notifications" onClick={() => setNotifications(false)}>View all notifications →</Link></div></div></AdminDialog>}
  </div>;
}
