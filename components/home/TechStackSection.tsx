"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { TECHNOLOGIES_DATA } from "@/data/mockData";

export function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Mobile", "Cloud & DevOps", "Database", "Design & Creative"];

  const filteredTech = selectedCategory === "All"
    ? TECHNOLOGIES_DATA
    : TECHNOLOGIES_DATA.filter((t) => t.category === selectedCategory);

  return (
    <section className="py-20 lg:py-32 border-b border-slate-200 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Tech Stack"
          title="Modern &amp; Proven Technologies"
          description="Reliable, industry-standard frameworks chosen for speed and long-term maintainability."
        />

        {/* Technology Criteria Banner - Flat & High Contrast */}
        <div className="mb-14 p-6 rounded-2xl border border-blue-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0057FF]/10 border border-[#0057FF]/20 flex items-center justify-center text-[#0057FF] shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#050505]">Production Engineering Standards</p>
              <p className="text-xs text-[#374151]">Strict TypeScript · 100% Type Safety · Docker Containers · Automated Tests</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-[#0057FF]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Production Verified
            </span>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl max-w-4xl mx-auto mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                  : "text-slate-600 hover:text-[#050505] hover:bg-slate-200/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid with Flat, Crisp Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTech.slice(0, 8).map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#0057FF] bg-[#0057FF]/10 px-2 py-0.5 rounded border border-[#0057FF]/20">
                    {tech.category}
                  </span>
                </div>

                <p className="text-xs text-[#374151] leading-relaxed mb-5">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Common Production Uses:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tech.popularUseCases.map((u) => (
                    <span key={u} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-medium">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link to Full Tech Catalog */}
        <div className="mt-14 text-center">
          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#050505] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-all"
          >
            <span>View Full Technology Stack</span>
            <ArrowRight className="w-4 h-4 text-[#0057FF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
