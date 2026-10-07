import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MapPin, Shield } from "lucide-react";
import styles from "./Footer.module.css";

const serviceLinks = [
  { label: "Web engineering", href: "/services/web-development" },
  { label: "Custom software", href: "/services/software-development" },
  { label: "Mobile applications", href: "/services/mobile-development" },
  { label: "UI/UX & product design", href: "/services/ui-ux-design" },
];

const companyLinks = [
  { label: "About SolyNext", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case studies", href: "/portfolio" },
  { label: "Our process", href: "/process" },
  { label: "Pricing & models", href: "/pricing" },
  { label: "Engineering insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <span className={styles.eyebrow}>YOUR NEXT CHAPTER</span>
            <h2>Great ideas deserve<br />a great build<span>.</span></h2>
          </div>
          <Link href="/contact" className={styles.cta}>Let’s build together <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </div>
        <div className={styles.grid}>
          <div className="space-y-4">
            <Link
              href="/"
              className={styles.brand}
            >
              SolyNext<span className="text-[#00D9FF]">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Software engineering for web, mobile, and custom digital products.
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
            <h2 className={styles.heading}>Services</h2>
            <ul className={styles.links}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
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
            <h2 className={styles.heading}>Company</h2>
            <ul className={styles.links}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <h2 className={styles.heading}>Get in touch</h2>
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
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/technologies">Technology stack</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
