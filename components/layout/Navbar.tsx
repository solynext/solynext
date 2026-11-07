"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Layers3, Building2, Handshake, Users, BadgeDollarSign, ChevronRight, ChevronDown, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { HeaderSearch } from "./HeaderSearch";
import { WebsiteNotificationBell } from "@/components/notifications/WebsiteNotificationBell";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

const primaryLinks = [{href:"/",label:"Home",icon:Home},{href:"/services",label:"Services",icon:Layers3},{href:"/industries",label:"Industries",icon:Building2},{href:"/collaboration",label:"Collaboration",icon:Handshake},{href:"/about",label:"About",icon:Users},{href:"/pricing",label:"Pricing",icon:BadgeDollarSign}];
const moreGroups = [
 {label:"Explore",links:[{href:"/portfolio",label:"Portfolio"},{href:"/blog",label:"Blog"},{href:"/process",label:"Our process"},{href:"/solynext-apps",label:"SolyNext Apps"}]},
 {label:"Company",links:[{href:"/contact",label:"Contact"},{href:"/careers",label:"Careers"},{href:"/reviews",label:"Client reviews"}]},
 {label:"Legal",links:[{href:"/privacy-policy",label:"Privacy policy"},{href:"/terms",label:"Terms of service"}]},
];
const moreLinks = moreGroups.flatMap(group=>group.links);

function subscribeToScroll(onChange: () => void) {
 window.addEventListener("scroll", onChange, { passive: true });
 return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

export function Navbar() {
 const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
 const [open, setOpen] = useState(false);
 const [moreOpen, setMoreOpen] = useState(false);
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
    <nav className="premium-desktop-nav" aria-label="Primary navigation">{primaryLinks.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>)}<div className="premium-nav-more" data-open={moreOpen} onMouseEnter={()=>setMoreOpen(true)} onMouseLeave={()=>setMoreOpen(false)} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setMoreOpen(false);}}><button type="button" className="premium-nav-more-trigger" aria-haspopup="true" aria-expanded={moreOpen} aria-current={moreLinks.some(link=>isActive(link.href))?"page":undefined} onClick={()=>setMoreOpen(value=>!value)} onFocus={()=>setMoreOpen(true)} onKeyDown={event=>{if(event.key==="Escape")setMoreOpen(false);}}>More<ChevronDown size={14} aria-hidden="true"/></button><div className="premium-nav-more-menu">{moreLinks.map(link=><Link key={link.href} href={link.href} aria-current={isActive(link.href)?"page":undefined} onClick={()=>setMoreOpen(false)}>{link.label}</Link>)}</div></div></nav>
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
    <nav id="premium-mobile-nav" className="premium-mobile-nav" aria-label="Mobile navigation">{primaryLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? "page" : undefined}><span className="drawer-link-label"><link.icon size={20} strokeWidth={1.7} aria-hidden="true"/><span>{link.label}</span></span><ChevronRight className="drawer-link-chevron" size={16} aria-hidden="true"/></Link>)}<details className="premium-mobile-more"><summary><span>More</span><ChevronDown size={14} aria-hidden="true"/></summary><div className="premium-mobile-more-links">{moreLinks.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} aria-current={isActive(link.href)?"page":undefined}>{link.label}</Link>)}</div></details></nav>
    <div className="mobile-sidebar-footer"><button type="button" className="p-button mobile-sidebar-cta" aria-haspopup="dialog" onClick={() => { setOpen(false); setInquiryOpen(true); }}>Let&apos;s talk<ChevronRight size={18} aria-hidden="true"/></button></div>
   </div>
  </dialog>
  <ConsultationModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} defaultService="" inquiryCard />
 </>;
}


