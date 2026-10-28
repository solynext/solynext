import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MapPin, Shield, Building2, Layers3, BriefcaseBusiness, ListChecks, BadgeDollarSign, BookOpen, Users, Code2, Palette, Megaphone, MessagesSquare, Scale } from "lucide-react";
import styles from "./Footer.module.css";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BrandWordmark } from "@/components/ui/BrandWordmark";

const companyLinks = [
  { label: "About SolyNext", icon: Building2, href: "/about" },
  { label: "Solutions", icon: Layers3, href: "/solutions" },
  { label: "Case studies", icon: BriefcaseBusiness, href: "/portfolio" },
  { label: "Our process", icon: ListChecks, href: "/process" },
  { label: "Pricing & models", icon: BadgeDollarSign, href: "/pricing" },
  { label: "Digital insights", icon: BookOpen, href: "/blog" },
  { label: "Careers", icon: Users, href: "/careers" },
];

export function Footer() {
  const currentYear = 2026;
  const [serviceLinks,setServiceLinks] = useState<{label:string;href:string}[]>([]);
  useEffect(() => { const controller=new AbortController(); void fetch("/api/services",{signal:controller.signal}).then(response=>response.ok?response.json():{items:[]}).then((data:{items:{name:string;slug:string;is_featured:boolean;featured_order:number|null}[]})=>setServiceLinks(data.items.filter(item=>item.is_featured).sort((a,b)=>(a.featured_order??9999)-(b.featured_order??9999)).slice(0,4).map(item=>({label:item.name,href:`/services/${item.slug}`})))).catch(()=>{});return()=>controller.abort(); },[]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.intro} aria-labelledby="footer-next-heading">
          <div>
            <span className={styles.eyebrow}>YOUR NEXT CHAPTER</span>
            <h2 id="footer-next-heading">Build your brand.<br /><span>Grow your business.</span></h2>
          </div>
          <div className={styles.introAction}><p>A fresh perspective. A clear path forward.</p><Link href="/contact" className={styles.cta}>Let’s build together<span className={styles.ctaIcon}> <ArrowUpRight size={20} aria-hidden="true" /></span></Link></div>
        </div>
        <div className={styles.grid}>
          <div className="space-y-4">
            <Link
              href="/"
              className={styles.brand}
            >
              <BrandWordmark/><span className="brand-mobile-identity"><BrandLogo size={44}/><span>SolyNext<span className="text-[#00D9FF]">.</span></span></span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Web development, creative design, digital marketing, and social media management for growing businesses.
            </p>
            <div className={styles.details}>
              <span className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" />
                <span>Islamabad &amp; Lahore, Pakistan</span>
              </span>
              <span className="flex items-start gap-2">
                <Globe2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" />
                <span>Working with teams in the US, UK, Europe &amp; GCC</span>
              </span>
              <span className="flex items-start gap-2">
                <Shield aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#00D9FF]" />
                <span>Full code and IP ownership</span>
              </span>
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className={styles.heading}><Layers3 size={17} aria-hidden="true"/>Services</h2>
            <ul className={styles.links}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{/design|brand/i.test(link.label)?<Palette size={16} aria-hidden="true"/>:/marketing/i.test(link.label)?<Megaphone size={16} aria-hidden="true"/>:/social/i.test(link.label)?<MessagesSquare size={16} aria-hidden="true"/>:<Code2 size={16} aria-hidden="true"/>}<span>{link.label}</span></Link>
                </li>
              ))}
              <li>
                <Link className={styles.accentLink} href="/services">
                  All services <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className={styles.heading}><Building2 size={17} aria-hidden="true"/>Company</h2>
            <ul className={styles.links}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}><link.icon size={16} aria-hidden="true"/><span>{link.label}</span></Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <h2 className={styles.heading}><MessagesSquare size={17} aria-hidden="true"/>Get in touch</h2>
            <p className="mb-4 max-w-xs text-xs leading-relaxed text-slate-400">
              Tell us what you are planning. Our team can help you work through scope, approach, and next steps.
            </p>
            <a
              href="mailto:solynextsolutions@gmail.com"
              className={styles.email}
            >
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>solynextsolutions@gmail.com</span>
            </a>
            <Link href="/contact" className={styles.contactLink}>
              Contact the team <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} SolyNext Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy"><Shield size={14} aria-hidden="true"/>Privacy Policy</Link>
            <Link href="/terms"><Scale size={14} aria-hidden="true"/>Terms of Service</Link>
            <Link href="/technologies"><Code2 size={14} aria-hidden="true"/>Technology stack</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

