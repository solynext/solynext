"use client";
import { CardMotif, cardTone } from "@/components/ui/CardMotif";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Clock, Layers } from "lucide-react";
import { ServiceItem } from "@/types";
import { ConsultationModal } from "@/components/ui/ConsultationModal";

interface ServiceDetailClientProps {
  service: ServiceItem;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00D9FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Capabilities</span>
        </Link>

        {/* Hero Block */}
        <div className="visual-card p-8 sm:p-12 rounded-2xl border border-[#202738] bg-[#0a0d15] mb-12" data-card-tone={cardTone(service.title)}><CardMotif kind={service.title}/>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-3">
            <span>Engineering Discipline</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{service.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {service.title}
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#1c212f] text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00D9FF]" />
              <span>Timeline: <strong className="text-white">{service.estimatedTimeline}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00D9FF]" />
              <span>Model: <strong className="text-white">{service.startingPriceTier}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00D9FF]" />
              <span>IP Ownership: <strong className="text-white">100% Client Owned</strong></span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0057FF]/25"
            >
              <span>Request Scope &amp; Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#0f131d] hover:bg-[#151b2a] border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF] rounded-xl transition-colors inline-flex items-center justify-center"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>

        {/* Problem & Solution Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl border border-red-900/30 bg-red-950/15">
            <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              The Common Business Problem
            </p>
            <h2 className="text-lg font-bold text-white mb-3">
              Why Companies Struggle in This Domain
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {service.problemSolved}
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#00D9FF]/30 bg-[#00D9FF]/5">
            <p className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              The SolyNext Architectural Solution
            </p>
            <h2 className="text-lg font-bold text-white mb-3">
              How We Engineer Sustainable Results
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Key Business &amp; Technical Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-[#202738] bg-[#0a0d15] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Delivery Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Structured Delivery Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-[#202738] bg-[#0a0d15]"
              >
                <div className="text-xl font-bold font-mono text-[#00D9FF] mb-2">
                  {step.step}.
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Technologies */}
        <div className="p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Concrete Project Deliverables
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0 mt-1.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Primary Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#06080e] border border-[#202738] rounded-lg text-xs text-slate-200 font-mono font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs text-slate-400 leading-relaxed">
                All code is written in clean, modular TypeScript with automated linting, test suites, and Docker container configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Begin Your {service.title} Project?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Speak with our solution architects to define technical scope, budget expectations, and delivery milestones.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-7 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0057FF]/25"
          >
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={service.slug}
      />
    </main>
  );
}

