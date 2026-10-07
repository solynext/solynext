"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HeaderSearch } from "./HeaderSearch";
import { UserProfileMenu } from "@/components/profile/UserProfileMenu";
const links = [{href:"/",label:"Home"},{href:"/services",label:"Services"},{href:"/portfolio",label:"Our work"},{href:"/about",label:"About"},{href:"/blog",label:"Insights"},{href:"/contact",label:"Contact"}];
export function Navbar() {
 const [open,setOpen]=useState(false);
 const pathname=usePathname();
 useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[open]);
 return <><a href="#main-content" className="skip-link">Skip to content</a><header className="premium-header"><div className="premium-container premium-nav"><Link href="/" className="premium-logo" aria-label="SolyNext home"><span className="brand-symbol" aria-hidden="true">s<span>↗</span></span>SolyNext<span className="logo-period">.</span></Link><nav className="premium-desktop-nav" aria-label="Primary navigation">{links.map(link=><Link key={link.href} href={link.href} aria-current={(link.href==="/"?pathname==="/":pathname.startsWith(link.href))?"page":undefined}>{link.label}</Link>)}</nav><div className="premium-nav-actions"><HeaderSearch /><Link href="/contact" className="p-button nav-cta" aria-label="Contact SolyNext"><span>Let&apos;s talk</span> <ArrowUpRight size={16}/></Link><button className="premium-menu-toggle" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="premium-mobile-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><UserProfileMenu /></div></div>{open&&<nav id="premium-mobile-nav" className="premium-mobile-nav" aria-label="Mobile navigation">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} aria-current={(link.href==="/"?pathname==="/":pathname.startsWith(link.href))?"page":undefined}>{link.label}<ArrowUpRight size={17}/></Link>)}</nav>}</header></>;
}
