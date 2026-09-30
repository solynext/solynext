"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Clock, CheckCircle2, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactFormData } from "@/types";

export function ContactClient() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceRequired: "web-development",
    budgetRange: "$5,000 - $15,000",
    projectTimeline: "1 - 3 Months",
    projectDescription: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please provide your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please provide your work email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.projectDescription.trim()) {
      errs.projectDescription = "Please provide a brief summary of your project or requirements.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      serviceRequired: "web-development",
      budgetRange: "$5,000 - $15,000",
      projectTimeline: "1 - 3 Months",
      projectDescription: "",
    });
    setIsSubmitted(false);
  };

  return (
    <main className="flex-1 py-16 sm:py-24 bg-white text-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Contact Us"
          title="Let's Discuss Your Project"
          description="Share your requirements with our engineering team for a technical evaluation and timeline."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Direct Channels & Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-6">
              <h2 className="text-xl font-bold text-[#050505] mb-2">
                Direct Contacts &amp; Hubs
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#0057FF] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#050505]">Direct Email</p>
                    <a
                      href="mailto:solynextsolutions@gmail.com"
                      className="text-[#0057FF] hover:underline block font-medium"
                    >
                      solynextsolutions@gmail.com
                    </a>
                    <a
                      href="mailto:contact@solynext.com"
                      className="text-slate-500 hover:underline block text-xs"
                    >
                      contact@solynext.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0057FF] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#050505]">WhatsApp &amp; Direct Calls</p>
                    <p className="text-slate-700">+92 300 0000000 (Direct Inquiry)</p>
                    <p className="text-xs text-slate-500">Available Monday – Saturday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0057FF] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#050505]">Pakistan Engineering Hubs</p>
                    <p className="text-slate-700">Islamabad: Sector F-7 / Blue Area Tech Zone</p>
                    <p className="text-slate-700">Lahore: DHA Phase 5 Commercial Center</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#0057FF] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#050505]">Global Remote Availability</p>
                    <p className="text-slate-700">Dedicated overlapping support for US, UK, and GCC clients.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#0057FF] shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-[#050505]">Business Hours</p>
                    <p className="text-slate-700">09:00 – 19:00 PKT (UTC+5)</p>
                    <p className="text-xs text-slate-500">Emergency support SLA available 24/7 for active retainers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA &amp; Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We handle confidential business plans and enterprise software requirements with strict discretion. We are happy to execute mutual Non-Disclosure Agreements prior to project calls.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-white">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 bg-[#0057FF]/10 border border-[#0057FF]/30 text-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#050505] mb-2">
                    Inquiry Transmitted Successfully
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#050505]">{formData.fullName}</span>. A senior solution architect has received your brief and will respond within 24 business hours.
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 mb-6 max-w-md mx-auto space-y-1">
                    <p><strong className="text-[#050505]">Confirmation Sent To:</strong> {formData.email}</p>
                    <p><strong className="text-[#050505]">Selected Service:</strong> {formData.serviceRequired}</p>
                    <p><strong className="text-[#050505]">Budget Bracket:</strong> {formData.budgetRange}</p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-[#050505] mb-2">
                    Project Inquiry Form
                  </h2>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill in your details below for a quick technical and cost evaluation.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Full Name <span className="text-[#0057FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Asad Rehman"
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-xs text-[#050505] placeholder:text-slate-400 focus:outline-none transition-colors"
                        />
                        {errors.fullName && (
                          <p className="text-[#dc2626] text-[11px] mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Work Email <span className="text-[#0057FF]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="asad@company.com"
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-xs text-[#050505] placeholder:text-slate-400 focus:outline-none transition-colors"
                        />
                        {errors.email && (
                          <p className="text-[#dc2626] text-[11px] mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Company / Venture Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. TechCorp UK"
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-xs text-[#050505] placeholder:text-slate-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 300 ... or +44 7..."
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-xs text-[#050505] placeholder:text-slate-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Service Required
                        </label>
                        <select
                          value={formData.serviceRequired}
                          onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3 py-2 text-xs text-[#050505] focus:outline-none transition-colors"
                        >
                          <option value="web-development">Web Engineering</option>
                          <option value="software-development">Custom Software &amp; ERP</option>
                          <option value="mobile-development">Mobile App (iOS/Android)</option>
                          <option value="ui-ux-design">UI/UX &amp; Product Design</option>
                          <option value="digital-marketing">Performance SEO &amp; Marketing</option>
                          <option value="graphic-design-branding">Brand Identity Design</option>
                          <option value="video-production-motion">Video &amp; Motion Graphics</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Budget Range
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3 py-2 text-xs text-[#050505] focus:outline-none transition-colors"
                        >
                          <option value="<$5,000">&lt; $5,000</option>
                          <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                          <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                          <option value="$35,000+">$35,000+</option>
                          <option value="Monthly Retainer">Monthly Retainer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Desired Timeline
                        </label>
                        <select
                          value={formData.projectTimeline}
                          onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                          className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl px-3 py-2 text-xs text-[#050505] focus:outline-none transition-colors"
                        >
                          <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="3 - 6 Months">3 - 6 Months</option>
                          <option value="Flexible">Flexible / Ongoing</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Project Brief &amp; Business Objective <span className="text-[#0057FF]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        placeholder="Please describe the core business problem you are looking to solve, desired integrations, or any reference systems..."
                        className="w-full bg-white border border-slate-300 focus:border-[#0057FF] rounded-xl p-3 text-xs text-[#050505] placeholder:text-slate-400 focus:outline-none transition-colors resize-none"
                      />
                      {errors.projectDescription && (
                        <p className="text-[#dc2626] text-[11px] mt-1">{errors.projectDescription}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-500">
                        100% confidential. No marketing spam guaranteed.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 disabled:opacity-50 rounded-xl transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Project Request</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
