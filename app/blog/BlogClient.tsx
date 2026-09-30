"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BLOG_POSTS_DATA } from "@/data/mockData";

export function BlogClient() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Engineering", "Design", "Business"];

  const filtered = BLOG_POSTS_DATA.filter((post) => {
    const matchesCat = selectedCat === "All" || post.category === selectedCat;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Engineering Insights"
          title="Thoughts on Architecture, Design &amp; Scaling"
          description="Technical deep dives, architectural trade-offs, and product design principles authored by our senior engineering team."
        />

        {/* Filters and search - Flat & High Contrast Light Mode */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-xl w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                    : "text-slate-600 hover:text-[#050505] hover:bg-slate-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#0057FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#050505] placeholder-slate-400 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6 mb-16">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="text-[#0057FF] font-bold">{post.category}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>By {post.author.name}</span>
                </div>

                <h2 className="text-xl font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                  {post.tags.map((t) => (
                    <span key={t} className="font-mono text-slate-500">
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057FF] hover:text-[#0066FF] transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
