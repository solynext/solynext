"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { CASE_STUDIES_DATA } from "@/data/mockData";

export function FeaturedProjects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterTabs = ["All", "FinTech", "Healthcare", "E-Commerce", "Real Estate"];

  const filteredCases = selectedFilter === "All"
    ? CASE_STUDIES_DATA.slice(0, 3)
    : CASE_STUDIES_DATA.filter((c) =>
        c.industry.toLowerCase().includes(selectedFilter.toLowerCase())
      ).slice(0, 3);

  const flagshipCase = CASE_STUDIES_DATA[0];

  return (
    <section className="py-20 lg:py-32 border-b border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <SectionHeader
            align="left"
            kicker="Case Studies"
            title="Featured Client Projects"
            description="Real results delivered across finance, healthcare, and e-commerce."
            className="mb-0"
          />

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#050505] bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-all"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 text-[#0057FF]" />
            </Link>
          </div>
        </div>

        {/* Filter Pills - Flat and High Contrast */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedFilter === tab
                  ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                  : "bg-slate-100 text-slate-600 hover:text-[#050505] border border-slate-200 hover:border-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 1. Flagship Spotlight Case Study */}
        {selectedFilter === "All" && (
          <div className="mb-12 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:p-10 hover:border-[#0057FF] transition-all duration-200 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual image */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
                  <Image
                    src={flagshipCase.featuredImage}
                    alt={flagshipCase.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-xs font-bold text-[#0057FF]">
                      {flagshipCase.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-700 bg-white/95 p-3 rounded-lg border border-slate-200 font-medium">
                    <span className="font-bold text-[#050505]">{flagshipCase.client}</span>
                    <span className="text-slate-500">{flagshipCase.clientLocation}</span>
                  </div>
                </div>
              </div>

              {/* Content description */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0057FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Project</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#050505] tracking-tight leading-snug group-hover:text-[#0057FF] transition-colors">
                  {flagshipCase.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  {flagshipCase.summary}
                </p>

                {/* 4 Quantified ROI Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {flagshipCase.keyResults.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-slate-200">
                      <p className="text-base sm:text-lg font-bold text-[#0057FF] font-mono tabular-nums">
                        {res.metric}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        {res.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies and Action Button */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    {flagshipCase.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${flagshipCase.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0057FF] hover:text-[#0066FF] transition-colors"
                  >
                    <span>Read Architectural Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Secondary Distinct Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(selectedFilter === "All" ? CASE_STUDIES_DATA.slice(1, 3) : filteredCases).map((study) => (
            <div
              key={study.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] overflow-hidden transition-all duration-200 group"
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
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-xs font-bold text-[#0057FF]">
                      {study.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-700 bg-white/95 p-2 rounded-lg border border-slate-200 font-medium">
                    <span className="font-bold text-[#050505]">{study.client}</span>
                    <span className="text-slate-500">{study.clientLocation}</span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors mb-3 leading-snug">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-6">
                    {study.summary}
                  </p>

                  {/* Impact Results */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 mb-6">
                    {study.keyResults.slice(0, 2).map((res, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#0057FF]" />
                          <p className="text-lg font-bold text-[#0057FF] font-mono tabular-nums">
                            {res.metric}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                          {res.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  {study.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/portfolio/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057FF] hover:text-[#0066FF] transition-colors"
                  aria-label={`Read case study for ${study.title}`}
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
