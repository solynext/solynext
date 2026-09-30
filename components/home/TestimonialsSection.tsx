import React from "react";
import { Star, Quote, CheckCircle2, TrendingUp } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { TESTIMONIALS_DATA } from "@/data/mockData";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 border-b border-slate-200 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Testimonials"
          title="What Our Clients Say"
          description="Trusted by founders and engineering teams around the world."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all duration-200 flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#0057FF]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 font-mono">
                    {t.location}
                  </span>
                </div>

                <div className="relative mb-8">
                  <Quote className="w-8 h-8 text-blue-100 absolute -top-4 -left-2 -z-10" />
                  <p className="text-base sm:text-lg text-[#374151] leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0057FF] to-[#00D9FF] flex items-center justify-center text-white font-extrabold text-sm">
                    {t.clientName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#050505] flex items-center gap-1.5">
                      <span>{t.clientName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
                    </p>
                    <p className="text-xs text-slate-600">
                      {t.role}, <span className="text-[#050505] font-semibold">{t.company}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t.projectScope}</p>
                  </div>
                </div>

                <div className="sm:text-right p-3 rounded-xl bg-slate-50 border border-slate-200 sm:min-w-[140px]">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    Verified ROI
                  </p>
                  <p className="text-sm font-bold text-[#0057FF] font-mono flex items-center sm:justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t.quantifiedResult}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
