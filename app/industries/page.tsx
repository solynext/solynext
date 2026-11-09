import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeIndustriesCarousel } from "@/components/catalog/HomeIndustriesCarousel";
import c from "@/components/catalog/Catalog.module.css";
import { publicOfferings, publicSection } from "@/lib/catalog/repository";
import type { Industry, IndustriesPageSettings } from "@/lib/catalog/model";

export async function generateMetadata() {
  const settings = await publicSection("industries_page") as IndustriesPageSettings;
  return { title: settings.hero_heading + " | SolyNext", description: settings.hero_text };
}

export default async function IndustriesPage() {
  const [items, section] = await Promise.all([
    publicOfferings("industries"),
    publicSection("industries_page"),
  ]);
  const settings = section as IndustriesPageSettings;

  return (
    <main id="main-content" className="premium-home">
      <HomeIndustriesCarousel
        industries={items as Industry[]}
        pageHeading={settings.hero_heading}
        subheading={settings.hero_text}
      />
      <div className={c.homeIndustryContainer}>
        <section className={c.finalCta}>
          <h2>{settings.final_cta_heading}</h2>
          <p>{settings.final_cta_text}</p>
          <Link className="p-button" href="/contact">Start a Project<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>
      </div>
    </main>
  );
}
