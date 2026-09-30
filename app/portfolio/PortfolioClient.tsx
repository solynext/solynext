"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CASE_STUDIES_DATA } from "@/data/mockData";

export function PortfolioClient() {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const industries = ["All", "FinTech & Financial Services", "Healthcare & Telemedicine", "E-Commerce & Wholesale Distribution", "Real Estate & Civil Engineering"];

  const filteredStudies = CASE_STUDIES_DATA.filter((study) => {
    const matchesIndustry = selectedIndustry === "All" || study.industry === selectedIndustry;
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch;
  });

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Case Studies"
          title="Our Portfolio"
          description="Explore real projects and measurable results delivered for our clients."
        />

        {/* Filter & Search Bar - Flat & High-Contrast Light Mode */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Industry tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto w-full md:w-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedIndustry === ind
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                    : "text-slate-600 hover:text-[#050505] hover:bg-slate-200/70"
                }`}
              >
                {ind === "All" ? "All Projects" : ind.split("&")[0].trim()}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#0057FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#050505] placeholder-slate-400 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredStudies.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm border border-slate-200 rounded-2xl bg-[#F8FAFC]">
            No projects matched your search criteria. Try resetting the filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] overflow-hidden transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={study.featuredImage}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-700 bg-white/95 p-2.5 rounded-lg border border-slate-200 font-medium">
                      <span className="font-bold text-[#0057FF] uppercase tracking-wider text-[11px]">
                        {study.industry}
                      </span>
                      <span className="text-slate-500">
                        {study.client} · {study.clientLocation}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors mb-3 leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-6">
                      {study.summary}
                    </p>

                    {/* Quantified Metrics Box */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 mb-6">
                      {study.keyResults.map((res, i) => (
                        <div key={i}>
                          <p className="text-base font-bold text-[#0057FF] font-mono tabular-nums">
                            {res.metric}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    {study.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech} className="font-mono text-slate-700 text-[11px] font-medium">
                        {tech}{i < 3 ? " ·" : ""}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057FF] hover:text-[#0066FF] transition-colors"
                  >
                    <span>Deep Architectural Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
