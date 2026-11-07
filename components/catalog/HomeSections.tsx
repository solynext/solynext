import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { publicOfferings,publicSection } from "@/lib/catalog/repository";
import { featuredOfferings as featured,type Industry,type HomeSection } from "@/lib/catalog/model";
import { CatalogIcon } from "./CatalogIcon";
import { HomeIndustriesCarousel } from "./HomeIndustriesCarousel";
import c from "./Catalog.module.css";
export async function HomeServices(){
 const groups=[
  {title:"Web Development",description:"Websites, apps and software built around your business.",image:"/images/service-categories/web-development.png",services:["Business Websites","E-commerce Stores","Web Apps & Portals","Mobile Apps (Android & iOS)","Custom Software","POS & Business Software","AI-Powered Development"]},
  {title:"Marketing",description:"Get seen, get trusted and get customers.",image:"/images/service-categories/marketing.png",services:["Digital Marketing","SEO","Social Media Marketing","Influencer Marketing","Branding & Graphic Design"]},
  {title:"Business Management",description:"We run your business, so you can focus on growth.",image:"/images/service-categories/business-management.png",services:["Full Business Management","Social Media Management","Sales & Customer Management","Online Store & Marketplace Management","Growth Planning & Consultation"]},
  {title:"AI & Automation",description:"AI agents and automation that work for your business.",image:"/images/service-categories/ai-automation.png",services:["AI Agents & Agentic AI","AI Chatbots & Assistants","AI Voice Agents","RAG Knowledge Assistants","WhatsApp Automation","Sales Automation","Workflow & Business Automation","AI-Based Software","AI ERP & Business Systems"]},
 ];
 return <section id="services" className={`premium-section home-services-section ${c.homeServicesSection}`} aria-labelledby="growth-services-heading"><div className="premium-container"><div className={c.homeServicesHeading}><h2 id="growth-services-heading">Our services. <span>Your next step.</span></h2><p className={c.homeServicesIntro}>Web development, marketing, business management and AI automation — from one team.</p></div><div className={c.homeServicesGrid}>{groups.map((group,index)=><article className={c.homeServiceCard} key={group.title}><div className={c.homeServiceArt}><Image src={group.image} alt="" aria-hidden="true" width={900} height={650}/></div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.services.slice(0,index===3?4:3).map(service=><li key={service}>{service}</li>)}</ul><Link className={c.homeServiceDetails} href="/services">View service details <ArrowUpRight size={18} aria-hidden="true"/></Link></article>)}</div></div></section>;
}
export async function HomeIndustries(){const[items,settings]=await Promise.all([publicOfferings("industries"),publicSection("home_industries_section")]);const section=settings as HomeSection;const rows=featured(items as Industry[],section.max_items);if(!rows.length)return null;return <HomeIndustriesCarousel industries={rows} subheading={section.subheading}/>;}
export function IndustryCard({industry}:{industry:Industry}){return <Link href={`/industries/${industry.slug}`} className={c.industryCard}><span className={c.cardIcon}><CatalogIcon name={industry.icon}/></span><h3>{industry.name}</h3><p>{industry.card_summary}</p><div className={c.segmentPreview}>{(industry.business_segments||[]).slice(0,3).map(segment=><span key={segment.name}>{segment.name}</span>)}</div><span className={c.cardLink}>Explore industry <ArrowRight size={16}/></span></Link>;}

