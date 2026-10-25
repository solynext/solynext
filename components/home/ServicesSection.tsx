import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ServiceCards } from "./ServiceCards";
export function ServicesSection() {
  return <section className="home-services py-20 lg:py-28"><div className="premium-container">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-8">
      <SectionHeader align="left" kicker="OUR SERVICES" title="Everything You Need to Grow Your Brand" className="mb-0"/>
      <Link href="/services" className="home-section-link shrink-0">Explore all services <ArrowRight aria-hidden="true" className="h-4 w-4"/></Link>
    </div><ServiceCards/>
  </div></section>;
}