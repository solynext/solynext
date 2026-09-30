"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TECHNOLOGIES_DATA } from "@/data/mockData";

export function TechnologiesClient() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Mobile",
    "Cloud & DevOps",
    "Database",
    "Design & Creative",
    "Data & AI",
  ];

  const filtered = TECHNOLOGIES_DATA.filter((tech) => {
    const matchesCat = selectedCat === "All" || tech.category === selectedCat;
    const matchesSearch =
      tech.name.toLowerCase().includes(search.toLowerCase()) ||
      tech.description.toLowerCase().includes(search.toLowerCase()) ||
      tech.popularUseCases.some((u) => u.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Tech Stack"
          title="Technologies We Use"
          description="Proven languages, frameworks, and cloud infrastructure chosen for speed and reliability."
        />

        {/* Filters - Flat & High-Contrast Light Mode */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                    : "text-slate-600 hover:text-[#050505] hover:bg-slate-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#0057FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#050505] placeholder-slate-400 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#050505]">{tech.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-[#0057FF] border border-[#0057FF]/20 bg-[#0057FF]/10 px-2 py-0.5 rounded">
                    {tech.category}
                  </span>
                </div>

                <p className="text-xs text-[#374151] leading-relaxed mb-6">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Proficiency:</span>
                  <span className="text-xs font-bold text-[#0057FF]">{tech.proficiencyLevel}</span>
                </div>

                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400">Popular use cases: </span>
                  {tech.popularUseCases.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Principles Callout */}
        <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-[#F8FAFC]">
          <h2 className="text-xl font-bold text-[#050505] mb-4">
            Our Architectural Non-Negotiables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
            <div>
              <p className="font-bold text-[#0057FF] mb-1">Strict TypeScript First</p>
              <p className="text-slate-600 leading-relaxed">
                Zero untyped JavaScript. Every data contract, API payload, and component prop is strictly typed to prevent runtime crashes.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#0066FF] mb-1">Dockerized Reproducibility</p>
              <p className="text-slate-600 leading-relaxed">
                Every service runs in standardized Docker containers, ensuring identical execution on developer laptops and production clusters.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#0057FF] mb-1">PostgreSQL Relational Safety</p>
              <p className="text-slate-600 leading-relaxed">
                We prefer ACID-compliant PostgreSQL for financial and business data, utilizing migrations to track schema alterations cleanly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
