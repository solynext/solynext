import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — SolyNext",
  description: "Privacy policy and client data protection practices for SolyNext Technologies.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0057FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-3xl font-bold text-[#050505] mb-4">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-mono mb-8">Last Updated: March 2026</p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">1. Scope of Privacy Commitment</h2>
            <p>
              SolyNext Technologies (&quot;SolyNext&quot;, &quot;we&quot;, &quot;our&quot;) respects the privacy and confidentiality of visitors, clients, and partners. This policy outlines how information gathered through our web platform and client scoping questionnaires is handled.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">2. Information Collected</h2>
            <p>
              When you submit a project inquiry, discovery request, or career application through our platform, we collect identifiable information provided voluntarily, including full name, business email, contact number, company name, and project specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">3. Use of Project Information & Confidentiality</h2>
            <p>
              Project descriptions, architectural schemas, and trade information submitted to SolyNext are treated as strictly confidential commercial information. We do not sell, license, or share inquiry data with third-party advertisers. All data is utilized exclusively for generating technical scopes, engineering estimates, or executing mutual contracts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">4. Data Security</h2>
            <p>
              We implement industry-standard encryption protocols (TLS/HTTPS) across all digital channels and internal repositories to protect data from unauthorized access or leakage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#050505]">5. Direct Inquiries</h2>
            <p>
              For questions regarding privacy, data deletion, or NDA requests, contact our compliance officer at{" "}
              <a href="mailto:solynextsolutions@gmail.com" className="text-[#0057FF] hover:underline font-semibold">
                solynextsolutions@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
