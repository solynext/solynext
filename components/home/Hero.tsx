"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Globe2, Sparkles, Terminal, Activity, Layers } from "lucide-react";
import { ConsultationModal } from "../ui/ConsultationModal";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"arch" | "sla" | "security">("arch");

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32 border-b border-[#1c212f] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0a0d15] border border-[#202738]">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
              <span className="text-xs font-semibold text-white">
                Islamabad &amp; Lahore Engineering Hubs · Global Delivery
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0057FF]">Scalable Software</span> for High-Growth Teams
            </h1>

            {/* Description - minimal and clear */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              We build fast web apps, mobile solutions, and custom software with senior engineers and transparent delivery.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 text-base font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-[#0057FF]/25"
              >
                <span>Schedule a Call</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <Link
                href="/portfolio"
                className="px-7 py-4 text-base font-semibold text-white bg-[#0f131d] hover:bg-[#151b2a] border border-[#202738] hover:border-[#00D9FF] hover:text-[#00D9FF] rounded-xl transition-all inline-flex items-center justify-center gap-2.5"
              >
                <span>View Case Studies</span>
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 sm:pt-8 border-t border-[#1c212f] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0" />
                <span className="font-semibold text-white">100% IP Ownership</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                <Globe2 className="w-4 h-4 text-[#00D9FF] shrink-0" />
                <span className="font-semibold text-white">Global Timezone Sync</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                <Shield className="w-4 h-4 text-[#00D9FF] shrink-0" />
                <span className="font-semibold text-white">Signed Mutual NDA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Console & Flat Focal Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#202738] bg-[#0a0d15]">
              {/* Top Console Header Bar */}
              <div className="px-4 py-3 bg-[#06080e] border-b border-[#202738] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">solynext-v2.6 // core-engine</span>
                </div>
                
                {/* Console tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveConsoleTab("arch")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                      activeConsoleTab === "arch"
                        ? "bg-[#0057FF] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Architecture
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("sla")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                      activeConsoleTab === "sla"
                        ? "bg-[#0057FF] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    SLA
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("security")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                      activeConsoleTab === "security"
                        ? "bg-[#0057FF] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Security
                  </button>
                </div>
              </div>

              {/* Dynamic Console Content Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#05070c]">
                <Image
                  src="/images/hero-tech.jpg"
                  alt="SolyNext engineering team working on modern web architecture"
                  fill
                  priority
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />

                {/* Overlaid Tab-Specific Intelligence Chip */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0a0d15]/95 border border-[#202738]">
                  {activeConsoleTab === "arch" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#00D9FF]" />
                          Modern Full-Stack Architecture
                        </span>
                        <span className="text-[10px] font-mono text-black font-extrabold bg-[#00D9FF] px-2 py-0.5 rounded">
                          Production Ready
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        Next.js · React 19 · Node.js · PostgreSQL · Docker &amp; Cloud CI/CD
                      </p>
                    </div>
                  )}

                  {activeConsoleTab === "sla" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#00D9FF]" />
                          Delivery SLA &amp; Support
                        </span>
                        <span className="text-[10px] font-mono text-white font-bold bg-[#0057FF] px-2 py-0.5 rounded">
                          99.9% Uptime
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        14-day sprint releases · Zero-downtime deploy · 30-day warranty included.
                      </p>
                    </div>
                  )}

                  {activeConsoleTab === "security" && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#00D9FF]" />
                          Security &amp; IP Protection
                        </span>
                        <span className="text-[10px] font-mono text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/25 font-bold">
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        Mutual NDA before kickoff · Role-based access control · OWASP compliance.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Performance Metrics Ticker */}
              <div className="p-4 sm:p-5 bg-[#06080e] border-t border-[#202738]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Deployments</p>
                    <p className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">99.98%</p>
                    <p className="text-[10px] text-[#00D9FF] font-medium">High Reliability</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Delivery Velocity</p>
                    <p className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">4–8 Wks</p>
                    <p className="text-[10px] text-[#00D9FF] font-medium">Rapid MVP Launch</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0a0d15] border border-[#202738]">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Code Quality</p>
                    <p className="text-base sm:text-lg font-bold text-[#00D9FF] font-mono tabular-nums">100%</p>
                    <p className="text-[10px] text-slate-300 font-medium">TypeScript Strict</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
