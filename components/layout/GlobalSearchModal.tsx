"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Layers, FileText, Cpu, Briefcase } from "lucide-react";
import { SERVICES_DATA, CASE_STUDIES_DATA, TECHNOLOGIES_DATA, BLOG_POSTS_DATA } from "@/data/mockData";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredServices = query
    ? SERVICES_DATA.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedQuery) ||
          s.shortDescription.toLowerCase().includes(normalizedQuery) ||
          s.technologies.some((t) => t.toLowerCase().includes(normalizedQuery))
      ).slice(0, 3)
    : [];

  const filteredProjects = query
    ? CASE_STUDIES_DATA.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.summary.toLowerCase().includes(normalizedQuery) ||
          p.industry.toLowerCase().includes(normalizedQuery) ||
          p.technologies.some((t) => t.toLowerCase().includes(normalizedQuery))
      ).slice(0, 3)
    : [];

  const filteredTech = query
    ? TECHNOLOGIES_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(normalizedQuery) ||
          t.description.toLowerCase().includes(normalizedQuery) ||
          t.category.toLowerCase().includes(normalizedQuery)
      ).slice(0, 4)
    : [];

  const filteredBlog = query
    ? BLOG_POSTS_DATA.filter(
        (b) =>
          b.title.toLowerCase().includes(normalizedQuery) ||
          b.excerpt.toLowerCase().includes(normalizedQuery)
      ).slice(0, 2)
    : [];

  const hasResults =
    filteredServices.length > 0 ||
    filteredProjects.length > 0 ||
    filteredTech.length > 0 ||
    filteredBlog.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl overflow-hidden z-10 text-[#050505]">
        <div className="flex items-center px-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-[#0057FF] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SolyNext services, case studies, tech, or insights..."
            className="w-full py-4 text-sm text-[#050505] placeholder-slate-400 bg-transparent focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-black rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p className="mb-2">Type keywords like &quot;Next.js&quot;, &quot;FinTech&quot;, &quot;Mobile&quot;, or &quot;Design&quot;...</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
                {["Web Engineering", "React Native", "PostgreSQL", "HIPAA", "E-Commerce"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-[#0057FF] rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No matching records found for &quot;{query}&quot;. Try another search term.
            </div>
          ) : (
            <>
              {filteredServices.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Services</span>
                  </div>
                  <div className="space-y-1">
                    {filteredServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors">
                            {service.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {service.shortDescription}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0057FF] transition-colors shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Case Studies &amp; Portfolio</span>
                  </div>
                  <div className="space-y-1">
                    {filteredProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/portfolio/${project.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors">
                            {project.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {project.industry} · {project.clientLocation}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0057FF] transition-colors shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredTech.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Technologies &amp; Frameworks</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredTech.map((tech) => (
                      <Link
                        key={tech.name}
                        href="/technologies"
                        onClick={onClose}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-[#0057FF] bg-slate-50 transition-colors group"
                      >
                        <p className="text-sm font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors">{tech.name}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{tech.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredBlog.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Engineering Insights</span>
                  </div>
                  <div className="space-y-1">
                    {filteredBlog.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors">
                            {post.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {post.publishedDate} · {post.readTime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0057FF] transition-colors shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Press ESC to exit search</span>
          <span className="text-[#0057FF] font-semibold">SolyNext Knowledge Base</span>
        </div>
      </div>
    </div>
  );
}
