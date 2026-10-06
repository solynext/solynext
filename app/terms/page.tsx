import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — SolyNext",
  description: "Terms of Service and commercial engagement standards for SolyNext Technologies.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0057FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-3xl font-bold text-[#050505] mb-4">Terms of Service</h1>
        <p className="text-xs text-slate-500 font-mono mb-8">Last Updated: March 2026</p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">1. Engagement Overview</h2>
            <p>
              By accessing the SolyNext web platform or contracting engineering services from SolyNext Technologies, you agree to comply with standard professional commercial terms governing engagement scoping, intellectual property, and warranties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">2. Intellectual Property (IP) Ownership</h2>
            <p>
              Unless otherwise agreed in a customized Master Services Agreement (MSA), SolyNext assigns 100% of all custom-developed source code, database architectures, graphics, and design assets to the client upon satisfactory receipt of agreed milestone payments. SolyNext retains no proprietary claim over client business logic.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">3. Warranty & Defect Remediation</h2>
            <p>
              Standard software engineering deliveries from SolyNext include an explicit 30-day post-launch bug warranty during which reproducible defects against the signed Product Requirement Document (PRD) are resolved at zero additional charge.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">4. Governing Law</h2>
            <p>
              Formal commercial contracts may be executed under mutual international jurisdictions or Pakistani commercial arbitration laws as specified in the individual project Statement of Work (SOW).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

