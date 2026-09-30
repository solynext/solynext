import React from "react";
import { Landmark, Stethoscope, ShoppingBag, Building2, Truck, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export function TrustBar() {
  const industries = [
    { label: "FinTech", icon: Landmark, footprint: "US & UK", metric: "$14M+ Volume" },
    { label: "Healthcare", icon: Stethoscope, footprint: "US & UAE", metric: "HIPAA Compliant" },
    { label: "E-Commerce", icon: ShoppingBag, footprint: "Global", metric: "120k+ Orders" },
    { label: "Real Estate", icon: Building2, footprint: "GCC & PK", metric: "Enterprise ERP" },
    { label: "Logistics", icon: Truck, footprint: "GCC Network", metric: "Live Tracking" },
    { label: "SaaS Platforms", icon: Layers, footprint: "Worldwide", metric: "Multi-Tenant" },
  ];

  const standards = [
    "100% IP Ownership",
    "Security Audited",
    "Signed NDA",
    "Sub-Second Latency",
  ];

  return (
    <section className="py-14 sm:py-16 border-b border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with global footprint note */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-[#0057FF] uppercase tracking-wider mb-1">
              Global Footprint
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-[#050505] tracking-tight">
              Trusted by Founders &amp; Engineering Teams Worldwide
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600">
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">
              🇵🇰 Pakistan (Islamabad &amp; Lahore)
            </span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">
              🇬🇧 United Kingdom
            </span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">
              🇺🇸 United States
            </span>
            <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 font-medium">
              🇦🇪 UAE &amp; GCC
            </span>
          </div>
        </div>

        {/* Industry Cards Grid - Flat, high contrast */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-8">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0057FF] transition-all group cursor-pointer"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#0057FF]/10 border border-[#0057FF]/20 flex items-center justify-center text-[#0057FF] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#050505] group-hover:text-[#0057FF] transition-colors block leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {item.footprint}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-mono text-[#0057FF] font-bold">
                    {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Guarantees Bar */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-[#050505]">
            <ShieldCheck className="w-4 h-4 text-[#0057FF]" />
            <span>Engineering Commitments:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {standards.map((std) => (
              <div key={std} className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF] shrink-0" />
                <span>{std}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
