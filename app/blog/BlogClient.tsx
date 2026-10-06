"use client";

import { CardMotif, cardTone } from "@/components/ui/CardMotif";

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
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader as="h1"
          kicker="Engineering Insights"
          title="Thoughts on Architecture, Design &amp; Scaling"
          description="Technical deep dives, architectural trade-offs, and product design principles authored by our senior engineering team."
        />

        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-1.5 p-1 bg-[#0a0d15] border border-[#202738] rounded-xl w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-black font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-[#121724]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#00D9FF] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[#0a0d15] border border-[#202738] focus:border-[#00D9FF] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-medium"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6 mb-16">
          {filtered.map((post) => (
            <article
              key={post.id}
              data-card-tone={cardTone(post.category)}
              className="visual-card p-6 sm:p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] transition-all flex flex-col justify-between group"
            >
              <CardMotif kind={post.category}/>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-[#00D9FF] font-bold">{post.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{post.readTime}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>By {post.author.name}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c212f] flex items-center justify-between">
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  {post.tags.map((t) => (
                    <span key={t} className="font-mono text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D9FF] hover:text-white transition-colors"
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

