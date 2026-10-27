"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Layers3, Building2, BriefcaseBusiness, Users, BookOpen, Mail, ChevronRight, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { HeaderSearch } from "./HeaderSearch";
import { WebsiteNotificationBell } from "@/components/notifications/WebsiteNotificationBell";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const links = [{href:"/",label:"Home",icon:Home},{href:"/services",label:"Services",icon:Layers3},{href:"/solutions",label:"Industries",icon:Building2},{href:"/portfolio",label:"Our work",icon:BriefcaseBusiness},{href:"/about",label:"About",icon:Users},{href:"/blog",label:"Insights",icon:BookOpen},{href:"/contact",label:"Contact",icon:Mail}];

function subscribeToScroll(onChange: () => void) {
 window.addEventListener("scroll", onChange, { passive: true });
 return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

export function Navbar() {
 const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
 const [open, setOpen] = useState(false);
 const [inquiryOpen, setInquiryOpen] = useState(false);
 const drawer = useRef<HTMLDialogElement>(null);
 const pathname = usePathname();
 const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

 useEffect(() => {
  if (!open) return;
  const dialog = drawer.current;
  dialog?.showModal();
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  const desktop = window.matchMedia("(min-width: 1001px)");
  const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
  desktop.addEventListener("change", closeOnDesktop);
  return () => {
   dialog?.close();
   document.body.style.overflow = previousOverflow;
   desktop.removeEventListener("change", closeOnDesktop);
  };
 }, [open]);

 return <>
  <a href="#main-content" className="skip-link">Skip to content</a>
  <header className="premium-header" data-home={pathname === "/"} data-scrolled={scrolled}>
   <div className="premium-container premium-nav">
    <div className="premium-nav-brand">
     <button className="premium-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="premium-mobile-nav" onClick={() => setOpen(!open)}><span className="mobile-menu-lines" aria-hidden="true"><span/><span/><span/></span></button>
    <Link href="/" className="premium-logo" aria-label="SolyNext home"><BrandWordmark/></Link>
    </div>
    <nav className="premium-desktop-nav" aria-label="Primary navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <div className="premium-nav-actions">
     <Link href="/solynext-apps" className="header-apps-link" aria-label="SolyNext Apps" title="SolyNext Apps" aria-current={pathname === "/solynext-apps" ? "page" : undefined}><Image src="/icons/solynext-apps-blue.png" alt="" width={36} height={36}/></Link>
     <HeaderSearch />
     <WebsiteNotificationBell />
     <button type="button" className="p-button nav-cta" aria-haspopup="dialog" onClick={() => setInquiryOpen(true)}><span>Let&apos;s talk</span></button>
    </div>
   </div>
  </header>
  <dialog ref={drawer} className="premium-mobile-drawer" aria-label="Mobile navigation" onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
   <div className="premium-mobile-panel">
    <div className="premium-mobile-heading"><span>Navigation</span><button type="button" className="premium-drawer-close" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={22}/></button></div>
    <nav id="premium-mobile-nav" className="premium-mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}><span className="drawer-link-label"><link.icon size={20} strokeWidth={1.7} aria-hidden="true"/><span>{link.label}</span></span><ChevronRight className="drawer-link-chevron" size={16} aria-hidden="true"/></Link>)}</nav>
    <div className="mobile-sidebar-footer"><button type="button" className="p-button mobile-sidebar-cta" aria-haspopup="dialog" onClick={() => { setOpen(false); setInquiryOpen(true); }}>Let&apos;s talk<ChevronRight size={18} aria-hidden="true"/></button></div>
   </div>
  </dialog>
  <ConsultationModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} defaultService="" inquiryCard />
 </>;
}


