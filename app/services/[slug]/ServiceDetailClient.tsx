"use client";

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
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0057FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Capabilities</span>
        </Link>

        {/* Hero Block */}
        <div className="p-8 sm:p-12 rounded-2xl border border-slate-200 bg-[#F8FAFC] mb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-3">
            <span>Engineering Discipline</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{service.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#050505] mb-4">
            {service.title}
          </h1>

          <p className="text-lg text-[#374151] max-w-3xl leading-relaxed mb-8">
            {service.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0057FF]" />
              <span>Typical Timeline: <strong className="text-[#050505]">{service.estimatedTimeline}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0066FF]" />
              <span>Engagement Model: <strong className="text-[#050505]">{service.startingPriceTier}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0057FF]" />
              <span>IP Ownership: <strong className="text-[#050505]">100% Client Owned</strong></span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Scope &amp; Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#050505] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-colors inline-flex items-center justify-center"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>

        {/* Problem & Solution Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl border border-red-200 bg-red-50/40">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
              The Common Business Problem
            </p>
            <h2 className="text-lg font-bold text-[#050505] mb-3">
              Why Companies Struggle in This Domain
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              {service.problemSolved}
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-blue-200 bg-blue-50/40">
            <p className="text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
              The SolyNext Architectural Solution
            </p>
            <h2 className="text-lg font-bold text-[#050505] mb-3">
              How We Engineer Sustainable Results
            </h2>
            <p className="text-sm text-[#374151] leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#050505] mb-6">
            Key Business &amp; Technical Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-200 bg-white flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0057FF] shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Delivery Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#050505] mb-6">
            Structured Delivery Workflow
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC]"
              >
                <div className="text-xl font-bold font-mono text-[#0057FF] mb-2">
                  {step.step}.
                </div>
                <h3 className="text-base font-bold text-[#050505] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#374151] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Technologies */}
        <div className="p-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-[#050505] uppercase tracking-wider mb-4">
                Concrete Project Deliverables
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF] shrink-0 mt-1.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#050505] uppercase tracking-wider mb-4">
                Primary Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                All code is written in clean, modular TypeScript with automated linting, test suites, and Docker container configurations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-10 rounded-2xl border border-blue-200 bg-white text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#050505] mb-3">
            Ready to Begin Your {service.title} Project?
          </h2>
          <p className="text-sm text-[#374151] max-w-xl mx-auto mb-6">
            Speak with our solution architects to define technical scope, budget expectations, and delivery milestones.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-7 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
