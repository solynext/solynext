import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publicOfferings,publicSection } from "@/lib/catalog/repository";
import { featuredOfferings as featured,type Industry,type HomeSection } from "@/lib/catalog/model";
import { CatalogIcon } from "./CatalogIcon";
import { HomeIndustriesCarousel } from "./HomeIndustriesCarousel";
import { ServicesOverview } from "./ServicesOverview";
import c from "./Catalog.module.css";
export function HomeServices() {
  return <ServicesOverview />;
}

export async function HomeIndustries(){const[items,settings]=await Promise.all([publicOfferings("industries"),publicSection("home_industries_section")]);const section=settings as HomeSection;const rows=featured(items as Industry[],section.max_items);if(!rows.length)return null;return <HomeIndustriesCarousel industries={rows} subheading={section.subheading}/>;}
export function IndustryCard({industry}:{industry:Industry}){return <Link href={`/industries/${industry.slug}`} className={c.industryCard}><span className={c.cardIcon}><CatalogIcon name={industry.icon}/></span><h3>{industry.name}</h3><p>{industry.card_summary}</p><div className={c.segmentPreview}>{(industry.business_segments||[]).slice(0,3).map(segment=><span key={segment.name}>{segment.name}</span>)}</div><span className={c.cardLink}>Explore industry <ArrowRight size={16}/></span></Link>;}

