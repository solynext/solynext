import Link from "next/link";
import { ArrowUpRight, Globe2, Mail, MapPin, Shield } from "lucide-react";

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
    <footer className="site-footer w-full bg-[#000000] border-t border-[#1a1f2b] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 border-b border-[#1a1f2b] pb-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1fr] lg:gap-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="site-footer-brand text-2xl font-black tracking-tight text-white inline-block"
            >
              SolyNext<span className="text-[#00D9FF]">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Software engineering for web, mobile, and custom digital products.
            </p>
            <div className="flex flex-col gap-2.5 pt-1 text-xs text-slate-400">
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
            <h2 className="site-footer-heading">Services</h2>
            <ul className="site-footer-links">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link className="site-footer-all-link" href="/services">
                  All services <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="site-footer-heading">Company</h2>
            <ul className="site-footer-links">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer-heading">Get in touch</h2>
            <p className="mb-4 max-w-xs text-xs leading-relaxed text-slate-400">
              Tell us what you are planning. Our team can help you work through scope, approach, and next steps.
            </p>
            <a
              href="mailto:solynextsolutions@gmail.com"
              className="site-footer-email"
            >
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>solynextsolutions@gmail.com</span>
            </a>
            <Link href="/contact" className="site-footer-contact-link">
              Contact the team <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
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
