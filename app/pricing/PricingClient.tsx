"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ShieldCheck, Zap, HelpCircle, Calculator } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

export function PricingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estimator state
  const [scopeType, setScopeType] = useState<string>("web");
  const [complexity, setComplexity] = useState<string>("medium");

  const models = [
    {
      name: "Fixed-Price Milestone",
      tagline: "Best for clearly defined project scopes",
      idealFor: "MVPs, web apps, mobile apps, and defined redesigns",
      features: [
        "Fixed price with agreed milestone deadlines",
        "Clear deliverables and sprint schedule",
        "Weekly progress demos and staging access",
        "30-day post-launch warranty included",
        "100% IP and code handover upon delivery",
      ],
      ctaText: "Request Scope Estimate",
      recommended: false,
    },
    {
      name: "Dedicated Engineering Team",
      tagline: "Full-time senior engineers embedded in your workflow",
      idealFor: "Startups and companies with continuously evolving roadmaps",
      features: [
        "Dedicated senior engineers (Full-Stack, Mobile, DevOps)",
        "Daily syncs and direct Slack/Teams collaboration",
        "Flexible sprint priorities with zero change-order friction",
        "Bi-weekly sprint demos and velocity tracking",
        "Scale squad size up or down with 30-day notice",
      ],
      ctaText: "Discuss Dedicated Team",
      recommended: true,
    },
    {
      name: "Growth & SLA Retainer",
      tagline: "Ongoing maintenance, updates, and digital marketing",
      idealFor: "Live products needing ongoing improvements and SEO",
      features: [
        "Guaranteed monthly engineering and marketing hours",
        "24/7 uptime monitoring and security updates",
        "Technical SEO optimization and speed checks",
        "Monthly strategy and analytics reviews",
        "Priority turnaround on urgent requests",
      ],
      ctaText: "Review Retainer Plans",
      recommended: false,
    },
  ];

  // Calculate realistic ballpark range
  const calculateEstimate = () => {
    let base = 5000;
    if (scopeType === "mobile") base = 7500;
    if (scopeType === "enterprise") base = 12000;
    if (scopeType === "marketing") base = 3000;

    let multiplier = 1;
    if (complexity === "high") multiplier = 1.6;
    if (complexity === "complex") multiplier = 2.4;

    const min = Math.round(base * multiplier);
    const max = Math.round(min * 1.4);
    return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
  };

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Pricing &amp; Plans"
          title="Flexible Engagement Models"
          description="Choose the right model for your project: fixed price, dedicated team, or ongoing retainer."
        />

        {/* Pricing Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {models.map((model) => (
            <div
              key={model.name}
              className={`p-8 rounded-2xl flex flex-col justify-between border transition-all ${
                model.recommended
                  ? "border-[#00D9FF] bg-[#0a0d15] relative ring-1 ring-[#00D9FF]"
                  : "border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF]"
              }`}
            >
              <div>
                {model.recommended && (
                  <div className="inline-block px-3 py-1 rounded text-[11px] font-bold text-black bg-[#00D9FF] uppercase tracking-wider mb-4">
                    Most Popular for Startups &amp; Scaleups
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
                <p className="text-xs text-[#00D9FF] font-bold mb-4">{model.tagline}</p>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  <strong className="text-white">Ideal for:</strong> {model.idealFor}
                </p>

                <div className="pt-4 border-t border-[#1c212f] mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    What&apos;s Included:
                  </p>
                  <ul className="space-y-2.5">
                    {model.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                        <Check className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    model.recommended
                      ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-black hover:brightness-110 shadow-lg shadow-[#0057FF]/25"
                      : "bg-[#0f131d] hover:bg-[#151b2a] text-white border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF]"
                  }`}
                >
                  <span>{model.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Ballpark Project Estimator */}
        <div className="p-8 sm:p-12 rounded-2xl border border-[#202738] bg-[#0a0d15] mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Scope &amp; Budget Estimator</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Calculate Ballpark Engineering Investment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Select your parameters below to get an immediate ballpark estimate based on historical delivery timelines.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  1. Project Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "web", label: "Web Platform" },
                    { id: "mobile", label: "Mobile App" },
                    { id: "enterprise", label: "Enterprise ERP" },
                    { id: "marketing", label: "Marketing / SEO" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScopeType(item.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        scopeType === item.id
                          ? "border-[#00D9FF] bg-[#00D9FF]/15 text-[#00D9FF]"
                          : "border-[#202738] bg-[#06080e] text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  2. Architecture Complexity:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "medium", label: "Standard MVP" },
                    { id: "high", label: "Multi-Role SaaS" },
                    { id: "complex", label: "FinTech / High-Scale" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setComplexity(item.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        complexity === item.id
                          ? "border-[#00D9FF] bg-[#00D9FF]/15 text-[#00D9FF]"
                          : "border-[#202738] bg-[#06080e] text-slate-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Calculation Result Box */}
              <div className="p-6 rounded-xl border border-[#202738] bg-[#06080e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Estimated Ballpark Investment:</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#00D9FF] font-mono tabular-nums">
                    {calculateEstimate()}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Includes dedicated solution architect, full UI/UX design, and 30-day warranty.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-[#0057FF]/25"
                >
                  <span>Request Written Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* IP & Guarantee Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-5 rounded-xl border border-[#202738] bg-[#0a0d15] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-1">Standard Mutual NDA</p>
              <p className="text-slate-400">We execute formal NDAs prior to reviewing proprietary business logic or schemas.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#202738] bg-[#0a0d15] flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-1">No Hostage Code</p>
              <p className="text-slate-400">You have access to the GitHub repository from Day 1. Full IP transfer upon milestone payment.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#202738] bg-[#0a0d15] flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white mb-1">Custom Payment Corridors</p>
              <p className="text-slate-400">Support for international wire transfers (USD, GBP, EUR, AED) and local Pakistani PKR bank routes.</p>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
