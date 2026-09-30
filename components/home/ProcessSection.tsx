import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Milestone } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      timeline: "Days 1–5",
      title: "Discovery & Scoping",
      description: "Define technical requirements, user journeys, data schemas, and sprint goals.",
      deliverable: "Technical Scope & Plan",
    },
    {
      step: "02",
      timeline: "Days 6–12",
      title: "System Design & UI/UX",
      description: "Build interactive Figma prototypes and design database schema architecture.",
      deliverable: "Clickable Prototype",
    },
    {
      step: "03",
      timeline: "Sprints 1–2",
      title: "Core Development",
      description: "Bi-weekly sprint engineering with automated testing and live staging access.",
      deliverable: "Working Staging Build",
    },
    {
      step: "04",
      timeline: "Sprints 3–4",
      title: "API & Integrations",
      description: "Connect payment gateways, background worker queues, and third-party services.",
      deliverable: "Fully Integrated App",
    },
    {
      step: "05",
      timeline: "Week 5",
      title: "QA & Security Testing",
      description: "Load testing, device compatibility checks, and security audits before launch.",
      deliverable: "QA Sign-off",
    },
    {
      step: "06",
      timeline: "Launch + 30 Days",
      title: "Launch & Support",
      description: "Zero-downtime deployment, complete source code handover, and 30-day warranty.",
      deliverable: "Production Handover",
    },
  ];

  return (
    <section className="py-20 lg:py-32 border-b border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="How We Work"
          title="Simple, Predictable Process"
          description="Clear milestones from day one to launch and beyond."
        />

        {/* Delivery Guarantee Banner */}
        <div className="mb-14 p-5 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-[#050505]">
            <Milestone className="w-4 h-4 text-[#0057FF]" />
            <span>Delivery Standards:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#0057FF]" />
              14-Day Sprints
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
              Live Staging Builds
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0057FF]" />
              30-Day Post-Launch Warranty
            </span>
          </div>
        </div>

        {/* 6-Stage Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-7 lg:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-bold font-mono text-[#0057FF] tabular-nums">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-semibold">
                    {st.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#050505] mb-2.5 group-hover:text-[#0057FF] transition-colors">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-6">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Deliverable:
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0057FF]">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{st.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to full process page */}
        <div className="mt-14 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#050505] bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-all"
          >
            <span>View Full Delivery Framework</span>
            <ArrowRight className="w-4 h-4 text-[#0057FF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
