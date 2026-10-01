import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { CASE_STUDIES_DATA } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES_DATA.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} — SolyNext Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00D9FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Case Studies</span>
        </Link>

        {/* Hero Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-3">
            <span>{study.industry}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{study.clientLocation}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {study.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
            {study.summary}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0a0d15] border border-[#202738]">
            {study.keyResults.map((r, i) => (
              <div key={i}>
                <p className="text-xl font-bold text-[#00D9FF] font-mono tabular-nums">
                  {r.metric}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#202738] bg-[#05070c] mb-16">
          <Image
            src={study.featuredImage}
            alt={study.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
        </div>

        {/* Challenge vs Solution Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl border border-red-900/30 bg-red-950/15">
            <h2 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              The Architectural Challenge
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#00D9FF]/30 bg-[#00D9FF]/5">
            <h2 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              The SolyNext Solution
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Deep Architectural Details */}
        <div className="p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] mb-16">
          <h2 className="text-lg font-bold text-white mb-6">
            Technical Architecture &amp; Engineering Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.architectureDetails.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#06080e] border border-[#202738]">
                <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Endorsement */}
        {study.testimonial && (
          <div className="p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] mb-16">
            <div className="flex items-center gap-1 text-[#00D9FF] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-base text-slate-200 italic leading-relaxed mb-6 font-medium">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between border-t border-[#1c212f] pt-4">
              <div>
                <p className="text-sm font-bold text-white">{study.testimonial.author}</p>
                <p className="text-xs text-slate-400">{study.testimonial.role}, {study.testimonial.company}</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">{study.clientLocation}</span>
            </div>
          </div>
        )}

        {/* Technology Tags */}
        <div className="mb-16">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Technology Stack Utilized
          </h3>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 bg-[#06080e] border border-[#202738] rounded-xl text-xs font-mono text-slate-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Have a Similar Technical Challenge?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Let&apos;s evaluate your existing architecture and map out a modern engineering plan.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all shadow-lg shadow-[#0057FF]/25"
          >
            <span>Schedule Technical Review</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </Link>
        </div>
      </div>
    </main>
  );
}
