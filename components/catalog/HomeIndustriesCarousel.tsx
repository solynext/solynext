"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
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

export function HomeIndustriesCarousel({
  industries,
  subheading,
  pageHeading,
}: {
  industries: Industry[];
  subheading: string;
  pageHeading?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });
  const standalone = pageHeading !== undefined;
  const query = search.trim().toLowerCase();
  const visible = query ? industries.filter(industry =>
    `${industry.name} ${industry.tagline} ${industry.card_summary} ${industry.business_segments.map(segment => `${segment.name} ${segment.solutions}`).join(" ")}`
      .toLowerCase().includes(query)
  ) : industries;
  const Heading = standalone ? "h1" : "h2";
  const CardHeading = standalone ? "h2" : "h3";

  useEffect(() => {
    const node = track.current;
    if (!node) return;

    const updateEdges = () => {
      setEdges({
        atStart: node.scrollLeft <= 1,
        atEnd: node.scrollLeft + node.clientWidth >= node.scrollWidth - 1,
      });
    };
    const observer = new ResizeObserver(updateEdges);
    observer.observe(node);
    node.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", updateEdges);
    };
  }, [visible.length]);

  const move = (direction: number) => {
    const node = track.current;
    const first = node?.firstElementChild;
    if (!node || !first) return;
    const gap = parseFloat(getComputedStyle(node).columnGap);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({
      left: direction * (first.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  const updateSearch = (value: string) => {
    track.current?.scrollTo({ left: 0, behavior: "instant" });
    setSearch(value);
  };

  return (
    <section className={`premium-section ${c.homeIndustryCarousel}`} id="industries" aria-labelledby="industries-heading">
      <div className={c.homeIndustryContainer}>
        <header className={c.homeIndustryHeader}>
          <div>
            <p className={c.homeIndustryEyebrow}>INDUSTRIES WE SERVE</p>
            <Heading id="industries-heading">
              {pageHeading || <>Built around <span>your industry.</span></>}
            </Heading>
            <p className={c.homeIndustrySubheading}>{subheading || "Digital solutions for the way your business works."}</p>
          </div>
          <div className={c.homeIndustryControls}>
            <button type="button" onClick={() => move(-1)} aria-label="Previous industries" aria-controls="industries-track" disabled={edges.atStart}><ArrowLeft size={22}/></button>
            <button type="button" onClick={() => move(1)} aria-label="Next industries" aria-controls="industries-track" disabled={edges.atEnd || visible.length < 2}><ArrowRight size={22}/></button>
          </div>
        </header>

        {standalone && (
          <div className={c.industrySearch}>
            <div className={c.filters}>
              <label className={c.search}>
                <Search size={18} aria-hidden="true" />
                <span className={c.srOnly}>Search industries</span>
                <input type="search" value={search} onChange={event => updateSearch(event.target.value)} placeholder="Search industries" />
              </label>
            </div>
            <p className={c.results} role="status">
              Showing {visible.length} of {industries.length} industries
              {search && <button type="button" onClick={() => updateSearch("")}>Clear filters</button>}
            </p>
            {!visible.length && <p className={c.empty}>{industries.length ? "No matches. Try another search." : "Industry details are being prepared."}</p>}
          </div>
        )}

        <div className={c.homeIndustryTrack} id="industries-track" ref={track} aria-label="Industries">
          {visible.map(industry => (
            <Link className={c.homeIndustryCard} href={`/industries/${industry.slug}`} key={industry.id} data-industry-card>
              <div className={c.homeIndustryImage}>
                <Image src={industry.hero_image || fallbackImages[industry.slug] || "/images/hero-tech.jpg"} alt="" fill sizes="(max-width: 700px) 82vw, (max-width: 1100px) 48vw, 30vw" unoptimized={Boolean(industry.hero_image?.startsWith("https://"))}/>
              </div>
              <div className={c.homeIndustryBody}>
                <CardHeading>{industry.name}</CardHeading>
                <p>{industry.card_summary}</p>
                <span className={c.homeIndustryArrow} aria-hidden="true"><ArrowUpRight size={23}/></span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/contact" className={c.homeIndustryLink}>Discuss your industry <ArrowUpRight size={19} aria-hidden="true"/></Link>
      </div>
    </section>
  );
}
