import React from "react";
import Link from "next/link";
import { Mail, MapPin, Globe, Shield } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#000000] border-t border-[#1a1f2b] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1a1f2b]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white inline-block"
            >
              SolyNext<span className="text-[#00D9FF]">.</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Software engineering company building fast web apps, mobile solutions, and custom software for clients worldwide.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                <span className="text-slate-300">Hubs: Islamabad &amp; Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <span className="text-slate-300">Global Delivery: US, UK, Europe &amp; GCC</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                <span className="text-slate-300">100% Code &amp; IP Ownership</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/web-development" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Web Engineering
                </Link>
              </li>
              <li>
                <Link href="/services/software-development" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Custom Software &amp; ERPs
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-development" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Mobile Apps (iOS/Android)
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  UI/UX &amp; Product Design
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Performance SEO &amp; PPC
                </Link>
              </li>
              <li>
                <Link href="/services/graphic-design-branding" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Branding &amp; Visual Identity
                </Link>
              </li>
              <li>
                <Link href="/services/video-production-motion" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Motion &amp; Video Production
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Industries */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/solutions#ecommerce-retail" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  E-Commerce &amp; Retail
                </Link>
              </li>
              <li>
                <Link href="/solutions#fintech-banking" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  FinTech &amp; Payments
                </Link>
              </li>
              <li>
                <Link href="/solutions#healthcare-telemedicine" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Healthcare &amp; EHR Portals
                </Link>
              </li>
              <li>
                <Link href="/solutions#real-estate-proptech" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Real Estate &amp; Construction
                </Link>
              </li>
              <li>
                <Link href="/solutions#saas-startups" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  SaaS Startups &amp; MVPs
                </Link>
              </li>
              <li>
                <Link href="/solutions#logistics-supply-chain" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Logistics &amp; Fleet Systems
                </Link>
              </li>
              <li>
                <Link href="/technologies" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Technology Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company &amp; Contact
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  About SolyNext
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Case Studies &amp; Proof
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Pricing &amp; Models
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Careers &amp; Hiring
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-[#00D9FF] transition-colors">
                  Engineering Insights
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:solynextsolutions@gmail.com"
                  className="flex items-center gap-1.5 text-[#00D9FF] hover:underline font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>solynextsolutions@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} SolyNext Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#00D9FF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#00D9FF] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-[#00D9FF] transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
