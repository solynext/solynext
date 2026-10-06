import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      timeline: "Days 1–5",
      title: "Discover",
      description: "Align on business goals, technical needs, user journeys, and sprint goals.",
      deliverable: "Technical Scope & Plan",
    },
    {
      step: "02",
      timeline: "Days 6–12",
      title: "Plan & Design",
      description: "Shape user flows, interface prototypes, and the underlying system architecture.",
      deliverable: "Prototype & Architecture",
    },
    {
      step: "03",
      timeline: "Sprints 1–2",
      title: "Build & Integrate",
      description: "Develop in focused sprints, connect APIs, and share working staging builds.",
      deliverable: "Working Staging Build",
    },
    {
      step: "04",
      timeline: "Pre-launch",
      title: "Quality & Security",
      description: "Test key user journeys, device compatibility, performance, and security.",
      deliverable: "QA Sign-off",
    },
    {
      step: "05",
      timeline: "Launch + 30 days",
      title: "Launch & Support",
      description: "Deploy, hand over the source code, and support the release with a 30-day warranty.",
      deliverable: "Production Handover",
    },
  ];

  return (
    <section className="py-20 lg:py-32 border-b border-[#1c212f] bg-[#000000] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="How We Work"
          title="Simple, Predictable Process"
          description="Clear milestones from day one to launch and beyond."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-7 lg:p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] hover:bg-[#0f131f] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-bold font-mono text-[#00D9FF] tabular-nums">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 bg-[#06080e] px-2.5 py-1 rounded-full border border-[#202738] font-semibold">
                    {st.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#00D9FF] transition-colors">
                  {st.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c212f]">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Deliverable:
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00D9FF]">
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
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#0a0d15] hover:bg-[#0f131f] border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF] rounded-xl transition-all"
          >
            <span>View Full Delivery Framework</span>
            <ArrowRight className="w-4 h-4 text-[#00D9FF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
