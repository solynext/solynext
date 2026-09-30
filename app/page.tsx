import React from "react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySolyNext } from "@/components/home/WhySolyNext";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechStackSection } from "@/components/home/TechStackSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhySolyNext />
      <FeaturedProjects />
      <TechStackSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CtaSection />
    </main>
  );
}
