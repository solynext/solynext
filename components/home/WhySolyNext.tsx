import React from "react";
import Image from "next/image";
import { Zap, Globe2, ShieldCheck, Code2, Check, X, Users, Lock } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

export function WhySolyNext() {
  const pillars = [
    {
      title: "Fast Architecture",
      description: "Optimized APIs and clean codebases built for low latency and high traffic.",
      icon: Zap,
      metric: "< 100ms APIs",
    },
    {
      title: "Senior Engineers",
      description: "Vetted senior developers in Pakistan with deep expertise and direct communication.",
      icon: Globe2,
      metric: "Top 3% Talent",
    },
    {
      title: "100% IP Ownership",
      description: "Full rights to your source code, design systems, and data with zero vendor lock-in.",
      icon: ShieldCheck,
      metric: "Full IP Rights",
    },
    {
      title: "Automated Testing",
      description: "Automated CI/CD pipelines, type checking, and security tests on every sprint.",
      icon: Code2,
      metric: "Automated QA",
    },
  ];

  const comparisonRows = [
    {
      factor: "Code & IP Ownership",
      solynext: "100% full source & IP rights",
      traditional: "Vendor lock-in or licensing fees",
    },
    {
      factor: "Team Quality",
      solynext: "Dedicated senior engineers",
      traditional: "Rotating junior contractors",
    },
    {
      factor: "Communication",
      solynext: "Direct daily chat & sprint demos",
      traditional: "Slow email ticket queues",
    },
    {
      factor: "Quality & Warranty",
      solynext: "Automated QA + 30-day warranty",
      traditional: "No post-launch guarantee",
    },
  ];

  return (
    <section className="py-20 lg:py-32 border-b border-[#1c212f] bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Why SolyNext"
          title="Built for Performance &amp; Scale"
          description="We deliver clean code, dedicated senior engineers, and full IP ownership on every build."
        />

        {/* Top 4 Impact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] hover:bg-[#0f131f] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center text-[#00D9FF]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/25 font-bold">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Large Visual & Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual focal carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#202738] bg-[#0a0d15]">
              <div className="relative aspect-[4/3] w-full bg-[#05070c]">
                <Image
                  src="/images/engineering-dev.jpg"
                  alt="SolyNext engineering team in Islamabad"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              <div className="p-6 bg-[#06080e] border-t border-[#202738]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
                  <p className="text-sm font-bold text-white">Direct Senior Engineer Access</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Work directly with experienced software engineers who understand your architecture and business goals.
                </p>
                <div className="mt-4 pt-3 border-t border-[#1c212f] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Users className="w-3.5 h-3.5 text-[#00D9FF]" />
                    No Junior Pooled Staff
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Lock className="w-3.5 h-3.5 text-[#00D9FF]" />
                    Strict Data Privacy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contrast Matrix */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#202738] bg-[#0a0d15] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#202738] pb-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Comparison
                </span>
                <div className="flex items-center gap-6 sm:gap-12">
                  <span className="text-xs font-bold text-[#00D9FF]">SolyNext Standard</span>
                  <span className="text-xs font-semibold text-slate-500">Typical Agency</span>
                </div>
              </div>

              <div className="divide-y divide-[#1c212f] space-y-4 pt-1">
                {comparisonRows.map((row) => (
                  <div key={row.factor} className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="sm:max-w-[40%]">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {row.factor}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 sm:max-w-[60%] text-xs">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[#00D9FF]">
                        <Check className="w-4 h-4 text-[#00D9FF] shrink-0" />
                        <span className="font-bold text-white">{row.solynext}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0f131d] border border-[#202738] text-slate-400">
                        <X className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
