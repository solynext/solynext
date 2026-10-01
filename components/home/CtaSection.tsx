"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Shield, Clock, Sparkles } from "lucide-react";
import { ConsultationModal } from "../ui/ConsultationModal";

export function CtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-[#000000]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="p-8 sm:p-14 lg:p-20 rounded-3xl border border-[#202738] bg-[#0a0d15] relative text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/25 text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Build?</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance leading-[1.1]">
            Ready to Build Your Next Project?
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Get in touch with our engineering team for a clear roadmap, estimate, and timeline.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-9 py-4 text-base font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-[#0057FF]/25"
            >
              <span>Schedule a Call</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#0f131d] hover:bg-[#151b2a] border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF] rounded-xl transition-all duration-200 inline-flex items-center justify-center"
            >
              <span>View Pricing &amp; Plans</span>
            </Link>
          </div>

          {/* Trust Guarantees Row */}
          <div className="pt-8 border-t border-[#1c212f] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <Clock className="w-4 h-4 text-[#00D9FF]" />
              &lt; 24h Response Time
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <Shield className="w-4 h-4 text-[#00D9FF]" />
              Mutual NDA Guarantee
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">·</span>
            <a
              href="mailto:solynextsolutions@gmail.com"
              className="text-[#00D9FF] hover:underline flex items-center gap-1.5 font-bold transition-colors"
            >
              <Mail className="w-4 h-4" />
              solynextsolutions@gmail.com
            </a>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
