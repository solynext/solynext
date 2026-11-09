import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
      <section className={c.industriesHero} aria-labelledby="industries-page-title">
        <div>
          <p>INDUSTRIES WE SERVE</p>
          <h1 id="industries-page-title">Your industry. <span>Technology that fits.</span></h1>
          <p className={c.industriesHeroCopy}>Websites, apps, AI tools, and business support tailored to how your industry works.</p>
          <div className={c.industriesHeroActions}>
            <a href="#industries" className={c.industriesHeroPrimary}>Explore industries <ArrowDown size={22} aria-hidden="true" /></a>
            <Link href="/contact" className={c.industriesHeroSecondary}>Discuss your project <ArrowUpRight size={22} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <HomeIndustriesCarousel
        industries={items as Industry[]}
        subheading="Digital solutions for the way your industry works."
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
