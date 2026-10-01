import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, Cpu, Smartphone, Palette, TrendingUp, Layers, Video } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES_DATA } from "@/data/mockData";

export const metadata = {
  title: "Services & Technical Capabilities — SolyNext",
  description:
    "Explore SolyNext's full-spectrum services: web development, custom software, mobile apps, UI/UX design, digital marketing, and video production.",
};

export default function ServicesPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Globe": return <Globe className="w-6 h-6 text-[#00D9FF]" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-[#00D9FF]" />;
      case "Smartphone": return <Smartphone className="w-6 h-6 text-[#00D9FF]" />;
      case "Palette": return <Palette className="w-6 h-6 text-[#00D9FF]" />;
      case "Layers": return <Layers className="w-6 h-6 text-[#00D9FF]" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#00D9FF]" />;
      case "Video": return <Video className="w-6 h-6 text-[#00D9FF]" />;
      default: return <Globe className="w-6 h-6 text-[#00D9FF]" />;
    }
  };

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Capabilities"
          title="Our Services"
          description="Full-stack software engineering, intuitive product design, and digital growth."
        />

        <div className="space-y-12">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              id={service.slug}
              className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15] hover:border-[#00D9FF] transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#06080e] border border-[#202738]">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold tabular-nums">
                      0{index + 1} · {service.category.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-sm font-bold text-[#00D9FF]">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all shadow-lg shadow-[#0057FF]/25"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#06080e] p-6 rounded-xl border border-[#202738]">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                      Key Capabilities &amp; Features
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9FF] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                      Tangible Deliverables
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {service.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shrink-0 mt-1.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-[#1c212f]">
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1.5">
                        Core Technologies:
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300 font-medium">
                        {service.technologies.map((t, i) => (
                          <React.Fragment key={t}>
                            <span>{t}</span>
                            {i < service.technologies.length - 1 && (
                              <span aria-hidden="true" className="text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
