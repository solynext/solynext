"use client";

import { CardMotif, cardTone } from "@/components/ui/CardMotif";

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
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader as="h1"
          kicker="Tech Stack"
          title="Technologies We Use"
          description="Proven languages, frameworks, and cloud infrastructure chosen for speed and reliability."
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0a0d15] border border-[#202738] rounded-xl overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-black font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-[#121724]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#00D9FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technologies..."
              className="w-full bg-[#0a0d15] border border-[#202738] focus:border-[#00D9FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((tech) => (
            <div
              key={tech.name}
              data-card-tone={cardTone(tech.category)}
              className="visual-card p-6 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] transition-colors flex flex-col justify-between"
            >
              <CardMotif kind={tech.category}/>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-[#00D9FF] border border-[#00D9FF]/20 bg-[#00D9FF]/10 px-2 py-0.5 rounded">
                    {tech.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c212f]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Proficiency:</span>
                  <span className="text-xs font-bold text-[#00D9FF]">{tech.proficiencyLevel}</span>
                </div>

                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-500">Popular use cases: </span>
                  {tech.popularUseCases.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Principles Callout */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15]">
          <h2 className="text-xl font-bold text-white mb-4">
            Our Architectural Non-Negotiables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
            <div>
              <p className="font-bold text-[#00D9FF] mb-1">Strict TypeScript First</p>
              <p className="text-slate-400 leading-relaxed">
                Zero untyped JavaScript. Every data contract, API payload, and component prop is strictly typed to prevent runtime crashes.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#00D9FF] mb-1">Dockerized Reproducibility</p>
              <p className="text-slate-400 leading-relaxed">
                Every service runs in standardized Docker containers, ensuring identical execution on developer laptops and production clusters.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#00D9FF] mb-1">PostgreSQL Relational Safety</p>
              <p className="text-slate-400 leading-relaxed">
                We prefer ACID-compliant PostgreSQL for financial and business data, utilizing migrations to track schema alterations cleanly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

