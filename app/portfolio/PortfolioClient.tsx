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
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Case Studies"
          title="Our Portfolio"
          description="Explore real projects and measurable results delivered for our clients."
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Industry tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0a0d15] border border-[#202738] rounded-xl overflow-x-auto w-full md:w-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedIndustry === ind
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-black font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-[#121724]"
                }`}
              >
                {ind === "All" ? "All Projects" : ind.split("&")[0].trim()}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#00D9FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full bg-[#0a0d15] border border-[#202738] focus:border-[#00D9FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredStudies.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm border border-[#202738] rounded-2xl bg-[#0a0d15]">
            No projects matched your search criteria. Try resetting the filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="flex flex-col justify-between rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] overflow-hidden transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#05070c]">
                    <Image
                      src={study.featuredImage}
                      alt={study.title}
                      fill
                      className="object-cover opacity-90"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-[#0a0d15]/95 p-2.5 rounded-lg border border-[#202738] font-medium">
                      <span className="font-bold text-[#00D9FF] uppercase tracking-wider text-[11px]">
                        {study.industry}
                      </span>
                      <span className="text-slate-400">
                        {study.client} · {study.clientLocation}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors mb-3 leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {study.summary}
                    </p>

                    {/* Quantified Metrics Box */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#06080e] border border-[#202738] mb-6">
                      {study.keyResults.map((res, i) => (
                        <div key={i}>
                          <p className="text-base font-bold text-[#00D9FF] font-mono tabular-nums">
                            {res.metric}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 font-medium">
                            {res.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-[#1c212f] flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                    {study.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech} className="font-mono text-slate-300 text-[11px] font-medium">
                        {tech}{i < 3 ? " ·" : ""}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D9FF] hover:text-white transition-colors"
                  >
                    <span>Deep Breakdown</span>
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
