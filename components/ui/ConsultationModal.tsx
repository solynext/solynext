"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  defaultService = "web-development",
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    serviceRequired: defaultService,
    budgetRange: "$5,000 - $15,000",
    projectTimeline: "1 - 3 Months",
    projectDescription: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [prevDefaultService, setPrevDefaultService] = useState(defaultService);
  if (defaultService !== prevDefaultService) {
    setPrevDefaultService(defaultService);
    setFormData((prev) => ({ ...prev, serviceRequired: defaultService }));
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address";
    }
    if (!formData.projectDescription.trim()) {
      errs.projectDescription = "Please provide brief details about your project";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      serviceRequired: defaultService,
      budgetRange: "$5,000 - $15,000",
      projectTimeline: "1 - 3 Months",
      projectDescription: "",
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Flat Backdrop - No blur */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog - Flat, Sharp, Light Mode */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto text-[#050505]">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-slate-400 hover:text-[#050505] p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 bg-[#0057FF]/10 border border-[#0057FF]/30 text-[#0057FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#050505] mb-2">
              Inquiry Received Successfully
            </h3>
            <p className="text-[#374151] text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <span className="font-bold text-[#050505]">{formData.fullName}</span>. A senior SolyNext solution architect will review your project scope and schedule a 30-minute discovery call within 24 business hours.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600 mb-6 space-y-1.5">
              <p><span className="text-[#050505] font-semibold">Service Track:</span> {formData.serviceRequired}</p>
              <p><span className="text-[#050505] font-semibold">Budget Tier:</span> {formData.budgetRange}</p>
              <p><span className="text-[#050505] font-semibold">Direct Confirmation sent to:</span> {formData.email}</p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 text-white font-bold text-sm rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discovery &amp; Project Scoping</span>
              </div>
              <h3 className="text-2xl font-bold text-[#050505] tracking-tight">
                Schedule a Project Consultation
              </h3>
              <p className="text-[#374151] text-sm mt-1">
                Tell us about your technical goals, timeline, and requirements. We will prepare an initial scope evaluation.
              </p>
            </div>

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
                    placeholder="e.g. Harris Vance"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-sm text-[#050505] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
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
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-sm text-[#050505] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Acme Health Corp"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-sm text-[#050505] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567 or +1 (555)..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3.5 py-2 text-sm text-[#050505] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Service
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3 py-2 text-sm text-[#050505] focus:outline-none transition-colors"
                  >
                    <option value="web-development">Web Engineering &amp; Platforms</option>
                    <option value="software-development">Custom Software Engineering</option>
                    <option value="mobile-development">Mobile App Development</option>
                    <option value="ui-ux-design">UI/UX &amp; Product Design</option>
                    <option value="digital-marketing">Performance Digital Marketing</option>
                    <option value="graphic-design-branding">Branding &amp; Identity</option>
                    <option value="video-production-motion">Video &amp; Motion Graphics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3 py-2 text-sm text-[#050505] focus:outline-none transition-colors"
                  >
                    <option value="<$5,000">&lt; $5,000 (Small sprint / audit)</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000 (Standard MVP)</option>
                    <option value="$15,000 - $35,000">$15,000 - $35,000 (Full-scale app)</option>
                    <option value="$35,000+">$35,000+ (Enterprise platform)</option>
                    <option value="Retainer / Ongoing">Dedicated Monthly Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Timeline
                  </label>
                  <select
                    value={formData.projectTimeline}
                    onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl px-3 py-2 text-sm text-[#050505] focus:outline-none transition-colors"
                  >
                    <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="3 - 6 Months">3 - 6 Months</option>
                    <option value="Flexible / Exploratory">Flexible / Exploratory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Brief &amp; Business Goals <span className="text-[#0057FF]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Outline the main problem you are solving, core features needed, or any current technical roadblocks..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0057FF] rounded-xl p-3 text-sm text-[#050505] placeholder-slate-400 focus:outline-none transition-colors resize-none"
                />
                {errors.projectDescription && (
                  <p className="text-red-500 text-xs mt-1">{errors.projectDescription}</p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  Strict NDA &amp; IP security guaranteed. No spam ever.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-black rounded-lg hover:bg-slate-100 transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-105 disabled:opacity-50 rounded-xl transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting Scope...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
