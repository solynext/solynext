"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Cpu, Smartphone, Palette, TrendingUp, Layers, CheckCircle2, Sparkles } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { SERVICES_DATA } from "@/data/mockData";
import { ConsultationModal } from "../ui/ConsultationModal";

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "web", label: "Web Engineering" },
    { id: "software", label: "Custom Software" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX & Branding" },
    { id: "marketing", label: "Digital Growth" },
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe": return <Globe className="w-6 h-6 text-[#0057FF]" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-[#0057FF]" />;
      case "Smartphone": return <Smartphone className="w-6 h-6 text-[#0057FF]" />;
      case "Palette": return <Palette className="w-6 h-6 text-[#0066FF]" />;
      case "Layers": return <Layers className="w-6 h-6 text-[#0057FF]" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#0066FF]" />;
      default: return <Globe className="w-6 h-6 text-[#0057FF]" />;
    }
  };

  // Flagship spotlight service
  const flagshipService = SERVICES_DATA[0];

  return (
    <section className="py-20 lg:py-32 border-b border-slate-200 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Capabilities"
          title="Software &amp; Digital Services"
          description="End-to-end engineering, product design, and digital growth."
        />

        {/* Functional Category Filter - Flat & High-Contrast Light Mode */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl max-w-3xl mx-auto mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#0057FF] to-[#00D9FF] text-white"
                  : "text-slate-600 hover:text-[#050505] hover:bg-slate-200/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric Spotlight Section for Flagship Capability - Flat & Crisp */}
        {(activeCategory === "all" || activeCategory === "web") && (
          <div className="mb-14 rounded-2xl border border-blue-200 bg-[#F8FAFC] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0057FF]/10 border border-[#0057FF]/25 text-xs font-bold text-[#0057FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Flagship Capability Spotlight</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#050505] tracking-tight leading-tight">
                  {flagshipService.title}
                </h3>

                <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
                  {flagshipService.fullDescription}
                </p>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {flagshipService.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#0057FF] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedServiceForModal(flagshipService.id)}
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Project Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/services/${flagshipService.slug}`}
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#050505] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <span>View Specifications</span>
                  </Link>
                </div>
              </div>

              {/* Right column preview photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                  <Image
                    src={flagshipService.featuredImage}
                    alt={flagshipService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Production Benchmark</p>
                    <p className="text-xs font-bold text-[#050505]">Sub-100ms API response · <span className="text-[#0057FF]">99.98% availability</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Distinctive Services Grid - Flat and Sharp */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-7 lg:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-[#0057FF] transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs font-bold text-[#0057FF] mb-3">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                  {service.keyBenefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-5 pt-4 border-t border-slate-100">
                  {service.technologies.slice(0, 4).map((tech) => (
                    <React.Fragment key={tech}>
                      <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium">
                        {tech}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057FF] hover:text-[#0066FF] transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setSelectedServiceForModal(service.id)}
                    className="text-[11px] font-semibold text-slate-700 hover:text-white hover:bg-[#0057FF] px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 hover:border-[#0057FF] transition-colors cursor-pointer"
                  >
                    Get Scope
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Catalog Footer Link */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-[#050505] bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 hover:border-[#0057FF] hover:text-[#0057FF] rounded-xl transition-all"
          >
            <span>View All Services &amp; Capabilities</span>
            <ArrowRight className="w-4 h-4 text-[#0057FF]" />
          </Link>
        </div>
      </div>

      <ConsultationModal
        isOpen={!!selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        defaultService={selectedServiceForModal || "web-development"}
      />
    </section>
  );
}
