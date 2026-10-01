import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "About SolyNext — Software House & Technology Company",
  description:
    "Learn about SolyNext: our Pakistan engineering centers, global delivery model, core values, and mission.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Business Value First",
      description: "Every feature and line of code directly supports your business goals and user experience.",
    },
    {
      title: "Full Transparency",
      description: "Real-time access to code repositories, sprint task boards, and live staging builds.",
    },
    {
      title: "High Code Standards",
      description: "Strict TypeScript, automated testing, and maintainable modular architecture.",
    },
    {
      title: "Global Collaboration",
      description: "Daily communication and overlapping working hours with US, UK, and GCC teams.",
    },
  ];

  const leadership = [
    {
      name: "Bilal Ahmed",
      role: "Managing Director",
      bio: "12+ years leading software engineering and digital transformation projects across the UK, GCC, and South Asia.",
      location: "Islamabad, Pakistan",
    },
    {
      name: "Hamza Tariq",
      role: "Lead Architect",
      bio: "Specializes in high-concurrency Node.js, Go, and Next.js microservices with sub-second response times.",
      location: "Lahore, Pakistan",
    },
    {
      name: "Sara Qasim",
      role: "Head of Product Design",
      bio: "Expert in enterprise user journeys, accessible design systems, and conversion-focused UI/UX.",
      location: "Islamabad, Pakistan",
    },
  ];

  return (
    <main className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="About SolyNext"
          title="Engineering Excellence Worldwide"
          description="Building modern software with transparent collaboration and experienced engineers."
        />

        {/* Narrative & Image Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-2">
              Our Story &amp; Purpose
            </h2>
            <p>
              Based in Pakistan&apos;s tech hubs of Islamabad and Lahore, SolyNext delivers top-tier software engineering for ambitious global companies.
            </p>
            <p>
              We prioritize crisp communication, senior technical leadership, clean TypeScript code, and complete IP ownership on every project.
            </p>
            <p>
              Today, we partner with clients ranging from funded startups in London and Dubai to healthcare and enterprise businesses in the US and Pakistan.
            </p>
          </div>

          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#202738] bg-[#0a0d15] aspect-[4/3]">
            <Image
              src="/images/hero-tech.jpg"
              alt="SolyNext modern software studio"
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl border border-[#202738] bg-[#0a0d15]">
            <p className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              Our Mission
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              Engineering Rigor That Drives Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To solve complex commercial challenges with fast, secure, and intuitive software that drives measurable business growth.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#202738] bg-[#0a0d15]">
            <p className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              Our Vision
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              Premier Global Engineering Partner
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To be the benchmark for software engineering and product design from Pakistan, recognized globally for quality and reliability.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl border border-[#202738] bg-[#0a0d15]"
              >
                <h3 className="text-sm font-bold text-white mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl border border-[#202738] bg-[#0a0d15] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-bold text-[#00D9FF] mb-3">{member.role}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{member.bio}</p>
                </div>
                <div className="pt-3 border-t border-[#1c212f] flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>{member.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Delivery Callout */}
        <div className="p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <Globe className="w-8 h-8 text-[#00D9FF] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">
            Global Reach With Overlapping Hours
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Our engineering teams provide 4 to 6 hours of daily working overlap with the UK, Europe, and GCC, plus dedicated US sync windows.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold text-black bg-gradient-to-r from-[#0057FF] to-[#00D9FF] hover:brightness-110 rounded-xl transition-all shadow-lg shadow-[#0057FF]/25"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </Link>
        </div>
      </div>
    </main>
  );
}
