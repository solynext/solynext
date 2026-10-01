"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { ConsultationModal } from "../ui/ConsultationModal";
import { GlobalSearchModal } from "./GlobalSearchModal";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Technologies", href: "/technologies" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
  ];

  const moreLinks = [
    { label: "Pricing & Models", href: "/pricing" },
    { label: "Insights & Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1c212f] bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#00D9FF] transition-colors">
              SolyNext<span className="text-[#00D9FF]">.</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium text-slate-400 bg-[#0f131d] border border-[#202738]">
              Tech House
            </span>
          </Link>

          {/* Zone 2: Primary text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? "text-[#00D9FF] font-semibold"
                      : "hover:text-[#00D9FF]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#00D9FF] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Subtle More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
                className="flex items-center gap-1 hover:text-[#00D9FF] py-1 transition-colors cursor-pointer text-slate-300"
                aria-expanded={isMoreDropdownOpen}
              >
                <span>Company</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isMoreDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-52 bg-[#0a0d15] border border-[#1f2637] rounded-xl py-2 z-50">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-[#00D9FF] hover:bg-[#121724] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3">
            {/* Quick search button with keyboard hint */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#0f131d] hover:bg-[#151b2a] border border-[#202738] hover:border-[#0057FF] rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#05070c] border border-[#202738] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Call Action Button - Selective Gradient */}
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-[#0f131d] border border-transparent hover:border-[#202738] rounded-lg transition-colors cursor-pointer"
            >
              {isMobileOpen ? <X className="w-5 h-5 text-[#00D9FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {isMobileOpen && (
          <div className="lg:hidden border-b border-[#1c212f] bg-[#000000] px-5 pt-3 pb-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-3.5 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#00D9FF] bg-[#0057FF]/15 border border-[#0057FF]/30 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-[#0f131d]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1c212f] space-y-1">
              <p className="px-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Company &amp; Resources
              </p>
              {moreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3.5 py-2 text-sm text-slate-300 hover:text-[#00D9FF] hover:bg-[#0f131d] rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsConsultationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all cursor-pointer"
              >
                <span>Schedule a Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
