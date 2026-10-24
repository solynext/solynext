import { getPageMetadata } from "@/lib/seo/metadata";
import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function generateMetadata() { return getPageMetadata("/about"); }

export default function AboutPage() {
  const values = [
    {
      title: "Business Goals First",
      description: "Every website, design, and campaign is shaped around your goals, audience, and brand.",
    },
    {
      title: "Clear Communication",
      description: "Straightforward planning, regular updates, and a clear view of the work in progress.",
    },
    {
      title: "Consistent Brand Quality",
      description: "Thoughtful design and messaging help your brand stay consistent across every channel.",
    },
    {
      title: "Practical Collaboration",
      description: "A responsive team that listens, shares ideas, and keeps projects moving.",
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
    <main id="main-content" className="flex-1 py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader as="h1"
          kicker="About SolyNext"
          title="A Digital Partner for Business Growth"
          description="Helping businesses grow online through web development, creative design, digital marketing, and social media management."
        />

        {/* Narrative & Image Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-2">
              Our Story &amp; Purpose
            </h2>
            <p>
              Based in Islamabad and Lahore, Pakistan, SolyNext helps businesses build a stronger online presence with thoughtful digital services.
            </p>
            <p>
              Our team brings web development, design, digital marketing, and social media management together in a clear, collaborative process.
            </p>
            <p>
              From a new website or brand identity to ongoing campaigns and social content, we tailor each engagement to your goals and audience.
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
          <div className="visual-card p-8 rounded-2xl border border-[#202738] bg-[#0a0d15]">
            <p className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              Our Mission
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              Digital Work That Moves Business Forward
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To help businesses communicate clearly, reach the right audiences, and grow through effective digital experiences and marketing.
            </p>
          </div>

          <div className="visual-card p-8 rounded-2xl border border-[#202738] bg-[#0a0d15]">
            <p className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
              Our Vision
            </p>
            <h3 className="text-xl font-bold text-white mb-2">
              A Trusted Digital Solutions Partner
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              To be a trusted digital partner for businesses seeking thoughtful creative work and sustainable online growth.
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
                data-card-tone={cardTone(v.title)}
                className="visual-card p-6 rounded-2xl border border-[#202738] bg-[#0a0d15]"
              >
              <CardMotif kind={v.title}/>
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
                data-card-tone={cardTone(member.role)}
                className="visual-card p-6 rounded-2xl border border-[#202738] bg-[#0a0d15] flex flex-col justify-between"
              >
              <CardMotif kind={member.role}/>
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
        <div className="visual-card p-8 sm:p-10 rounded-2xl border border-[#202738] bg-[#0a0d15] text-center">
          <Globe className="w-8 h-8 text-[#00D9FF] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white mb-2">
            Digital Services, Delivered Collaboratively
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Based in Pakistan, we work with businesses near and far to build effective digital experiences and reach their audiences online.
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

