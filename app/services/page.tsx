import { getPageMetadata } from "@/lib/seo/metadata";
import { ServiceCard } from "@/components/ui/ServiceCard";
import serviceStyles from "@/components/home/GrowthHero.module.css";
﻿import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/data/mockData";
export async function generateMetadata() { return getPageMetadata("/services"); }
export default function ServicesPage(){return <main id="main-content" className="premium-home internal-premium"><div className="premium-container"><div className="internal-heading"><p className="eyebrow">OUR DIGITAL SERVICES</p><h1>Build your presence.<br/>Grow your business.</h1><p>Web development, creative design, digital marketing, and social media support, coordinated around your goals.</p></div><div className={serviceStyles.cards}>{SERVICES_DATA.map(service=><ServiceCard key={service.id} slug={service.slug} title={service.title} description={service.shortDescription}/>)}</div><div className="internal-end-cta services-end-cta"><div className="services-end-copy"><p className="eyebrow">START A CONVERSATION</p><h2>Not sure where to start?</h2><p>Tell us what you need to achieve. We can help define the right approach.</p></div><Link className="p-button" href="/contact">Start a project <ArrowUpRight size={18}/></Link></div></div></main>}
