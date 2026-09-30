import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS_DATA } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} — SolyNext Insights`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0057FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
            <span className="text-[#0057FF] font-bold uppercase tracking-wider">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#050505] mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-200 text-xs text-slate-500">
            <div>
              <p className="font-semibold text-[#050505]">{post.author.name}</p>
              <p className="text-slate-500">{post.author.role}</p>
            </div>
            <div className="flex items-center gap-2">
              {post.tags.map((t) => (
                <span key={t} className="font-mono text-slate-500">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed border-l-2 border-[#0057FF] bg-slate-50 p-4 rounded-r-xl italic">
            {post.excerpt}
          </p>

          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] my-8">
            <h3 className="text-sm font-bold text-[#050505] mb-2">Key Architectural Takeaway</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When designing software systems expected to scale beyond initial prototype loads, invest in strong schema definitions and end-to-end type safety before optimizing for marginal runtime throughput.
            </p>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 p-6 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Author</p>
            <p className="text-sm font-semibold text-[#050505]">{post.author.name}</p>
            <p className="text-xs text-slate-500">{post.author.role} at SolyNext Technologies</p>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 text-xs font-semibold text-[#0057FF] hover:text-white border border-[#0057FF]/30 bg-[#0057FF]/10 rounded-lg hover:bg-[#0057FF] transition-colors"
          >
            Connect with Team
          </Link>
        </div>
      </div>
    </main>
  );
}
