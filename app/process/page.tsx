import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Delivery Process & Engineering Methodology — SolyNext",
  description:
    "Learn about our 8-stage software delivery workflow, from discovery workshops to automated testing and post-launch support.",
};

export default function ProcessPage() {
  const fullSteps = [
    {
      num: "01",
      title: "Discovery & Needs Analysis",
      timing: "Week 1",
      description:
        "We conduct structured discovery sessions to unpack your business model, customer workflows, regulatory constraints, and technical goals. We define clear success metrics.",
      deliverables: ["Product Requirement Document (PRD)", "User Persona Maps", "Technical Scope & Milestones Matrix"],
    },
    {
      num: "02",
      title: "Technical Feasibility & Research",
      timing: "Week 1 - 2",
      description:
        "Our senior architects evaluate third-party API capabilities, benchmark database read/write loads, and test integration edge cases to de-risk development early.",
      deliverables: ["Technical Feasibility Report", "Third-Party Integration Contracts", "Risk Mitigation Strategy"],
    },
    {
      num: "03",
      title: "System Architecture & Data Modeling",
      timing: "Week 2",
      description:
        "We draft normalized relational database schemas, define microservice communication protocols, and design secure OAuth/RBAC authorization boundaries.",
      deliverables: ["Entity Relationship Diagram (ERD)", "API Swagger / OpenAPI Spec", "Cloud Infrastructure Topology"],
    },
    {
      num: "04",
      title: "UI/UX Prototyping & Design Systems",
      timing: "Week 2 - 4",
      description:
        "We translate user flows into clickable Figma prototypes. We author atomic design tokens for typography, spacing, and colors to ensure developer fidelity.",
      deliverables: ["Clickable Interactive Figma Prototype", "Design Token & Component Library", "Usability Test Summary"],
    },
    {
      num: "05",
      title: "Agile Sprint Engineering",
      timing: "Week 4 - 8+",
      description:
        "We execute in two-week bi-weekly sprints. Every sprint produces test-backed, deployed code accessible on private staging preview environments.",
      deliverables: ["Bi-Weekly Sprint Review Demos", "Clean TypeScript Codebase in GitHub", "Automated CI/CD Test Pipeline"],
    },
    {
      num: "06",
      title: "QA, Security & Performance Hardening",
      timing: "Final Sprint",
      description:
        "We run automated end-to-end tests, execute synthetic load stress tests, verify WCAG accessibility, and conduct dependency vulnerability scans.",
      deliverables: ["Quality Assurance Audit Report", "Lighthouse 90+ Score Proof", "OWASP Security Verification"],
    },
    {
      num: "07",
      title: "Production Deployment & Cutover",
      timing: "Launch Week",
      description:
        "We orchestrate blue/green or rolling zero-downtime releases, configure real-time error telemetry (Sentry), and verify domain SSL certs and DNS propagation.",
      deliverables: ["Production Cloud Environment", "Automated Database Backup Policies", "Launch Checklist Signoff"],
    },
    {
      num: "08",
      title: "30-Day Warranty & Evolution SLA",
      timing: "Post-Launch",
      description:
        "Every project includes a 30-day bug warranty where our engineers address any unexpected edge cases. Ongoing SLA maintenance retainers are available.",
      deliverables: ["30-Day Post-Launch Bug Warranty", "Technical Maintenance Runbook", "Quarterly Growth Roadmap"],
    },
  ];

  return (
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader as="h1"
          kicker="Delivery Framework"
          title="Our 8-Stage Process"
          description="A transparent engineering roadmap from initial discovery to launch and ongoing support."
        />

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 sm:before:left-8 before:w-0.5 before:bg-[#202738] before:hidden md:before:block">
          {fullSteps.map((step) => (
            <div
              key={step.num}
              data-card-tone={cardTone(step.title)}
              className="visual-card relative p-6 sm:p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] transition-colors"
            >
              <CardMotif kind={step.title}/>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono text-[#00D9FF] tabular-nums">
                    {step.num}.
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    {step.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-[#06080e] px-2.5 py-1 rounded-full border border-[#202738] font-semibold self-start sm:self-auto">
                  {step.timing}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {step.description}
              </p>

              <div className="p-4 rounded-xl bg-[#06080e] border border-[#202738]">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Stage Deliverables:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-200">
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Guarantee */}
        <div className="mt-16 p-8 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Transparent Collaboration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            We work directly in your Slack or Teams channels, host weekly sprint demos, and provide live staging access.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all shadow-lg shadow-[#0057FF]/25"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </Link>
        </div>
      </div>
    </main>
  );
}

