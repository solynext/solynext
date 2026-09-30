"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight, CheckCircle2, X, Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JOB_OPENINGS_DATA } from "@/data/mockData";
import { JobOpening } from "@/types";

export function CareersClient() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantResume, setApplicantResume] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const perks = [
    { title: "Top-Tier Compensation", desc: "Competitive PKR & USD-pegged salaries reviewed bi-annually based on technical growth." },
    { title: "Modern Hardware Stack", desc: "Latest Apple MacBook Pro (M-series) + dual 4K monitors and ergonomic office setup." },
    { title: "Flexible Hybrid / Remote", desc: "Work from our Islamabad or Lahore hubs or coordinate seamlessly from home." },
    { title: "Annual Learning Stipend", desc: "$1,000 annual budget for technical certifications, book libraries, and global conferences." },
    { title: "Comprehensive Health", desc: "Full outpatient and inpatient medical insurance for you, spouse, and dependents." },
    { title: "High-Caliber Global Projects", desc: "Build systems directly for clients in London, New York, Munich, and Dubai." },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const closeApplyModal = () => {
    setIsApplying(false);
    setSelectedJob(null);
    setIsSubmitted(false);
    setApplicantName("");
    setApplicantEmail("");
  };

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Careers"
          title="Join Our Team"
          description="Build scalable software alongside experienced engineers. Hybrid and remote roles available."
        />

        {/* Culture & Perks Grid */}
        <div className="mb-20">
          <h2 className="text-xl font-bold text-[#050505] mb-6 text-center">
            Why Engineers &amp; Designers Flourish at SolyNext
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-slate-200 bg-white"
              >
                <h3 className="text-sm font-bold text-[#050505] mb-1.5">{p.title}</h3>
                <p className="text-xs text-[#374151] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#050505]">Current Open Positions</h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore available roles across our engineering, design, and growth teams.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#0057FF] bg-[#0057FF]/10 px-3 py-1 rounded-full border border-[#0057FF]/20">
              {JOB_OPENINGS_DATA.length} Openings Active
            </span>
          </div>

          <div className="space-y-4">
            {JOB_OPENINGS_DATA.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-[#0057FF] uppercase tracking-wider">{job.department}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                      {job.location}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{job.experience}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#050505] mb-2">{job.title}</h3>
                  <p className="text-xs text-[#374151] max-w-2xl leading-relaxed">{job.overview}</p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setIsApplying(true);
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl transition-all whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Callout */}
        <div className="p-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] text-center">
          <h2 className="text-lg font-bold text-[#050505] mb-2">Don&apos;t See Your Exact Role?</h2>
          <p className="text-xs text-[#374151] max-w-lg mx-auto mb-4">
            We are constantly looking for exceptional senior engineers, cloud architects, and creative directors. Send your portfolio or GitHub directly to our founders.
          </p>
          <a
            href="mailto:solynextsolutions@gmail.com?subject=Open Engineering Application"
            className="text-xs font-bold text-[#0057FF] hover:underline inline-flex items-center gap-1 transition-colors"
          >
            <span>Email solynextsolutions@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Application Modal */}
      {isApplying && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={closeApplyModal} />
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 z-10 my-8 text-[#050505]">
            <button
              onClick={closeApplyModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-black p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-[#0057FF]/10 text-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0057FF]/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#050505] mb-2">Application Received</h3>
                <p className="text-xs text-[#374151] max-w-sm mx-auto mb-6">
                  Thank you, {applicantName}. Our engineering recruitment team will review your profile for <strong className="text-[#050505]">{selectedJob.title}</strong> and reach out via email.
                </p>
                <button
                  onClick={closeApplyModal}
                  className="px-6 py-2 bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 text-white font-bold text-xs rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-1">
                  Candidate Application
                </p>
                <h3 className="text-xl font-bold text-[#050505] mb-1">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500 mb-6">
                  {selectedJob.department} · {selectedJob.location}
                </p>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#050505] focus:outline-none focus:border-[#0057FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="daniyal@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#050505] focus:outline-none focus:border-[#0057FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn or GitHub Profile *</label>
                    <input
                      type="url"
                      required
                      value={applicantResume}
                      onChange={(e) => setApplicantResume(e.target.value)}
                      placeholder="https://github.com/... or https://linkedin.com/in/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-[#050505] focus:outline-none focus:border-[#0057FF]"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
