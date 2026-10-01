import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, ShieldCheck, Activity, Home, Zap, Truck, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { INDUSTRY_SOLUTIONS_DATA } from "@/data/mockData";

export const metadata = {
  title: "Industry Solutions & Problem Solving — SolyNext",
  description:
    "Tailored technology solutions designed for E-Commerce, FinTech, Healthcare, Real Estate, SaaS, and Logistics.",
};

export default function SolutionsPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShoppingBag": return <ShoppingBag className="w-5 h-5 text-[#00D9FF]" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5 text-[#00D9FF]" />;
      case "Activity": return <Activity className="w-5 h-5 text-[#00D9FF]" />;
      case "Home": return <Home className="w-5 h-5 text-[#00D9FF]" />;
      case "Zap": return <Zap className="w-5 h-5 text-[#00D9FF]" />;
      case "Truck": return <Truck className="w-5 h-5 text-[#00D9FF]" />;
      default: return <Zap className="w-5 h-5 text-[#00D9FF]" />;
    }
  };

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Industry Solutions"
          title="Solutions by Industry"
          description="Tailored software architectures designed for specific regulatory and operational needs."
        />

        <div className="space-y-12">
          {INDUSTRY_SOLUTIONS_DATA.map((solution, idx) => (
            <div
              key={solution.id}
              id={solution.slug}
              className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#06080e] border border-[#202738]">
                      {getIcon(solution.iconName)}
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold tabular-nums">
                      Sector 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {solution.title}
                  </h2>

                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                    <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                      The Operational Pain Point
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {solution.businessChallenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#00D9FF]/5 border border-[#00D9FF]/20">
                    <p className="text-[11px] font-bold text-[#00D9FF] uppercase tracking-wider mb-1">
                      The SolyNext Technical Solution
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {solution.solynextSolution}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-mono text-[#00D9FF] font-bold">
                      Target Impact: {solution.impactMetric}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#06080e] p-6 sm:p-8 rounded-2xl border border-[#202738]">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                    Architectural Capabilities &amp; Integrations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {solution.keyCapabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#00D9FF] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#1c212f] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <span className="text-slate-500">Stack:</span>
                      {solution.technologies.map((tech, i) => (
                        <span key={tech} className="font-mono text-slate-300">
                          {tech}{i < solution.technologies.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 px-4 py-2 rounded-xl transition-all shadow-lg shadow-[#0057FF]/25"
                    >
                      <span>Inquire for {solution.title.split("&")[0].trim()}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
