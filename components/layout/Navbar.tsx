"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { ConsultationModal } from "../ui/ConsultationModal";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  // Shortcut key listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#050505] group-hover:text-[#0057FF] transition-colors">
              SolyNext<span className="text-[#0057FF]">.</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200">
              Tech House
            </span>
          </Link>

          {/* Zone 2: Primary text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#374151]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? "text-[#0057FF] font-semibold"
                      : "hover:text-[#0057FF]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#0057FF] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Subtle More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
                className="flex items-center gap-1 hover:text-[#0057FF] py-1 transition-colors cursor-pointer text-[#374151]"
                aria-expanded={isMoreDropdownOpen}
              >
                <span>Company</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isMoreDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-52 bg-white border border-slate-200 rounded-xl py-2 z-50">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs font-medium text-[#374151] hover:text-[#0057FF] hover:bg-slate-50 transition-colors"
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
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#374151] hover:text-[#050505] bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#0057FF]" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Call Action Button - Selective Gradient */}
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 text-[#374151] hover:text-[#050505] hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {isMobileOpen ? <X className="w-5 h-5 text-[#0057FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {isMobileOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-3.5 py-2.5 text-sm rounded-xl font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#0057FF] bg-[#0057FF]/10 border border-[#0057FF]/20 font-semibold"
                      : "text-[#374151] hover:text-[#050505] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1">
              <p className="px-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Company &amp; Resources
              </p>
              {moreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3.5 py-2 text-sm text-[#374151] hover:text-[#0057FF] hover:bg-slate-50 rounded-lg transition-colors"
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
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all cursor-pointer"
              >
                <span>Schedule Discovery Call</span>
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
