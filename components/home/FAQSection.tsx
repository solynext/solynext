"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageSquare, HelpCircle } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { FAQS_DATA } from "@/data/mockData";
import { ConsultationModal } from "../ui/ConsultationModal";

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "General", "Contracts & IP", "Engagement", "Technical"];

  const filteredFaqs = selectedCategory === "All"
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 lg:py-32 border-b border-[#1c212f] bg-[#000000] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="FAQs"
          title="Frequently Asked Questions"
          description="Quick answers about contracts, pricing, and how we work."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-black font-extrabold"
                  : "bg-[#0a0d15] text-slate-300 hover:text-white border border-[#202738] hover:border-[#00D9FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#0f131f] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isOpen ? "rotate-180 bg-[#00D9FF] border-[#00D9FF] text-black" : "bg-[#06080e] border-[#202738] text-slate-400"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-[#1c212f]">
                    <p>{faq.answer}</p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#1c212f] text-xs text-slate-400 font-mono">
                      <span>Category: {faq.category}</span>
                      <span className="text-[#00D9FF] font-bold">✓ SolyNext Verified Standard</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instant Help Box */}
        <div className="mt-12 p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <HelpCircle className="w-8 h-8 text-[#00D9FF] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">
            Have a question not answered here?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
            Speak directly with our technical team for quick answers about your project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#0057FF]/25"
            >
              <span>Schedule a Call</span>
            </button>
            <Link
              href="/contact"
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0f131d] hover:bg-[#151b2a] border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF] rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#00D9FF]" />
              <span>Send Message</span>
            </Link>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
