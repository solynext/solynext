"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Industry } from "@/lib/catalog/model";
import c from "./Catalog.module.css";

const fallbackImages: Record<string, string> = {
  "transport-automotive": "/images/industry-automotive.jpg",
  "real-estate": "/images/industry-real-estate.jpg",
  furniture: "/images/industry-furniture.jpg",
  ecommerce: "/images/marketing-growth.jpg",
  "organic-food-wellness": "/images/hero-tech.jpg",
  "travel-tourism": "/images/digital-growth-globe.webp",
  education: "/images/engineering-dev.jpg",
  "retail-trading": "/images/fintech-enterprise.jpg",
};

export function HomeIndustriesCarousel({ industries, subheading }: { industries: Industry[]; subheading: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const onScroll = () => {
    const node = track.current;
    if (!node) return;
    const first = node.querySelector<HTMLElement>("[data-industry-card]");
    if (first) setPosition(Math.min(industries.length - 1, Math.round(node.scrollLeft / (first.offsetWidth + 24))));
  };
  const move = (direction: number) => {
    const node = track.current;
    const first = node?.querySelector<HTMLElement>("[data-industry-card]");
    if (node && first) node.scrollBy({ left: direction * (first.offsetWidth + 24), behavior: "smooth" });
  };

  return <section className={`premium-section ${c.homeIndustryCarousel}`} id="industries" aria-labelledby="home-industries-heading">
    <div className={c.homeIndustryContainer}>
      <header className={c.homeIndustryHeader}>
        <div>
          <p className={c.homeIndustryEyebrow}>INDUSTRIES WE SERVE</p>
          <h2 id="home-industries-heading">Built around <span>your industry.</span></h2>
          <p className={c.homeIndustrySubheading}>{subheading || "Digital solutions for the way your business works."}</p>
        </div>
        <div className={c.homeIndustryControls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous industries" aria-controls="home-industries-track" disabled={position === 0}><ArrowLeft size={22}/></button>
          <button type="button" onClick={() => move(1)} aria-label="Next industries" aria-controls="home-industries-track" disabled={position >= industries.length - 1}><ArrowRight size={22}/></button>
        </div>
      </header>
      <div className={c.homeIndustryTrack} id="home-industries-track" ref={track} onScroll={onScroll} aria-label="Industries">
        {industries.map((industry, index) => <Link className={c.homeIndustryCard} href={`/solutions/${industry.slug}`} key={industry.id} data-industry-card>
          <div className={c.homeIndustryImage}>
            <Image src={industry.hero_image || fallbackImages[industry.slug] || "/images/hero-tech.jpg"} alt="" fill sizes="(max-width: 700px) 82vw, (max-width: 1100px) 48vw, 30vw" unoptimized={Boolean(industry.hero_image?.startsWith("https://"))}/>
          </div>
          <div className={c.homeIndustryBody}>
            <span className={c.homeIndustryNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{industry.name}</h3>
            <p>{industry.card_summary}</p>
            <span className={c.homeIndustryArrow} aria-hidden="true"><ArrowUpRight size={23}/></span>
          </div>
        </Link>)}
      </div>
      <Link href="/contact" className={c.homeIndustryLink}>Discuss your industry <ArrowUpRight size={19} aria-hidden="true"/></Link>
    </div>
  </section>;
}
