"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { HeaderSearch } from "./HeaderSearch";
import { WebsiteNotificationBell } from "@/components/notifications/WebsiteNotificationBell";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const links = [{href:"/",label:"Home"},{href:"/services",label:"Services"},{href:"/portfolio",label:"Our work"},{href:"/about",label:"About"},{href:"/blog",label:"Insights"},{href:"/contact",label:"Contact"}];

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
     <button className="premium-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="premium-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <Link href="/" className="premium-logo" aria-label="SolyNext home"><BrandWordmark/></Link>
    </div>
    <nav className="premium-desktop-nav" aria-label="Primary navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
    <div className="premium-nav-actions">
     <HeaderSearch />
     <WebsiteNotificationBell />
     <button type="button" className="p-button nav-cta" aria-haspopup="dialog" onClick={() => setInquiryOpen(true)}><span>Let&apos;s talk</span></button>
    </div>
   </div>
  </header>
  <dialog ref={drawer} className="premium-mobile-drawer" aria-label="Mobile navigation" onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
   <div className="premium-mobile-panel">
    <div className="premium-mobile-heading"><span>Navigation</span><button type="button" className="premium-drawer-close" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={22}/></button></div>
    <nav id="premium-mobile-nav" className="premium-mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}<ArrowUpRight size={17}/></Link>)}</nav>
   </div>
  </dialog>
  <ConsultationModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} defaultService="" inquiryCard />
 </>;
}
