import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Globe,
  Layers,
  Palette,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { SERVICES_DATA } from "@/data/mockData";

const serviceIcons: Record<string, LucideIcon> = {
  Globe,
  Cpu,
  Smartphone,
  Palette,
  Layers,
  TrendingUp,
};

export function ServicesSection() {
  const featuredServices = SERVICES_DATA.slice(0, 4);

  return (
    <section className="home-services py-20 lg:py-28 border-b border-[#1c212f] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            kicker="What We Build"
            title="Software for the work that matters"
            description="From customer-facing products to the systems behind them, we design and build around your business."
            className="mb-0"
          />
          <Link
            href="/services"
            className="home-section-link shrink-0"
          >
            Explore all services
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => {
            const Icon = serviceIcons[service.iconName] ?? Globe;

            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="home-service-card group"
              >
                <span className="home-service-icon">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <span className="home-service-arrow" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
