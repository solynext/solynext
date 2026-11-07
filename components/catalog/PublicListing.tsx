"use client";
import { useState } from "react";
import Link from "next/link";
import { ServicesOverview } from "./ServicesOverview";
import { ServiceCategoryCarousel } from "./ServiceCategoryCarousel";
import { ArrowUpRight,Search,Compass,PanelsTopLeft,Code2,Rocket } from "lucide-react";
import { type ServiceCategory,type Service,type Industry,type ServicesPageSettings,type IndustriesPageSettings } from "@/lib/catalog/model";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CatalogIcon } from "./CatalogIcon";
import c from "./Catalog.module.css";
export function PublicListing({entity,items,industries=[],settings,categories=[]}:{entity:"services"|"industries";items:Service[]|Industry[];industries?:Industry[];categories?:ServiceCategory[];settings:ServicesPageSettings|IndustriesPageSettings}){
 const[search,setSearch]=useState("");const[category,setCategory]=useState("all");const servicePage=entity==="services";const options=settings as ServicesPageSettings;
 const servicePillars:{title:string;description:string;details:{name:string;description:string;includes:string[]}[]}[]=[
  {title:"Web Development",description:"Websites, apps and software built around your business.",details:[
   {name:"UI/UX Design",description:"Simple, intuitive designs for websites and apps.",includes:["User flows and wireframes","Responsive interface design","Interactive prototypes"]},
   {name:"Business Websites",description:"Professional websites for companies, shops, clinics, schools and personal brands, plus redesigns of old websites.",includes:["Custom design and development","Mobile, tablet and desktop support","On-page SEO and speed optimization","Domain setup and deployment"]},
   {name:"E-commerce Stores",description:"Online stores and multi-vendor marketplaces where customers can browse, pay and order.",includes:["Product catalog and store setup","Payments and order management","Product uploading"]},
   {name:"Web Apps & Portals",description:"Browser-based software on a subscription or fixed plan, with no installation required.",includes:["Booking systems and dashboards","Customer and admission portals","School management and SaaS products"]},
   {name:"Mobile Apps (Android & iOS)",description:"Apps for your customers, your staff or your business owners.",includes:["App design and development","Publishing support","Ongoing updates"]},
   {name:"Custom Software",description:"Software built around your business needs and ways of working, including desktop software and integrations.",includes:["Purpose-built workflows","Desktop software","Connections to the tools you already use"]},
   {name:"POS & Business Software",description:"Ready-made or custom tools for sales and daily operations, online or offline.",includes:["Point of sale","Billing and invoicing","Inventory, stock and reporting"]},
   {name:"AI-Powered Development",description:"Websites, apps and software with useful AI features built in.",includes:["AI chat and search","Smart recommendations","Document and data tools","AI agents inside your product"]},
  ]},
  {title:"Marketing",description:"Reach more of the right customers.",details:[
   {name:"Digital Marketing",description:"Planned campaigns that bring leads and sales, with results tracked and reported.",includes:["Marketing strategy and audience research","Meta Ads and Google Ads","Lead generation","Campaign monitoring and optimization","Performance reports"]},
   {name:"SEO",description:"Help customers find you on Google by making your website and profiles search-friendly.",includes:["On-page SEO and keyword planning","SEO-friendly content","Profile and page optimization","Speed and performance improvements"]},
   {name:"Social Media Marketing",description:"Grow your audience and sales on the platforms your customers use.",includes:["Facebook, Instagram, TikTok and LinkedIn","Content strategy, posts, reels and short videos","Social ads and community engagement"]},
   {name:"Influencer Marketing",description:"Reach new customers through creators your audience already follows and trusts.",includes:["Finding relevant influencers","Campaign planning and coordination","Content approval and results tracking"]},
   {name:"Branding & Graphic Design",description:"Create a professional identity that makes your business trusted and easy to remember.",includes:["Logo and brand identity","UI/UX and packaging design","Catalogs and social media creative","Brand presentation"]},
  ]},
  {title:"Business Management",description:"Daily operations, managed by one team.",details:[
   {name:"Full Business Management",description:"SolyNext runs your online operations from start to finish, so you work with one team.",includes:["Social media, website and online store","Marketplace management, customers and orders","Bookings and marketing coordination","Growth planning and consultation"]},
   {name:"Social Media Management",description:"Keep your pages active, consistent and professional with day-to-day support.",includes:["Content planning, design and publishing","Posts, reels and scheduling","Replies to messages and comments","Profile optimization and monitoring"]},
   {name:"Sales & Customer Management",description:"We handle customers from the first message through to a confirmed order.",includes:["Customer inquiries and booking management","Order receiving, processing and confirmation","Follow-ups and customer service support"]},
   {name:"Online Store & Marketplace Management",description:"Keep your store and marketplace listings updated, organized and selling.",includes:["Product uploading and catalog management","Listing optimization and order handling","Website SEO and performance"]},
   {name:"Growth Planning & Consultation",description:"Get clear advice and a plan for the next step of your business.",includes:["Online sales growth strategies","Customer experience improvement","Ongoing consultation"]},
  ]},
  {title:"AI & Automation",description:"AI agents and workflows that save time.",details:[
   {name:"AI Agents & Agentic AI",description:"Agents that plan and complete tasks using your tools and data, with approval where it matters.",includes:["Task and workflow agents","Multi-agent systems","Connections to your apps and tools","Monitoring and human approval steps"]},
   {name:"AI Chatbots & Assistants",description:"Chatbots for your website, app and social media, plus AI assistants for your team.",includes:["Setup trained on your business","Question answering and lead capture","Booking capture and handover to your team"]},
   {name:"AI Voice Agents",description:"AI that answers and makes phone calls in a natural voice.",includes:["Call answering and appointment booking","Lead qualification and follow-up calls","Handover to a person"]},
   {name:"RAG Knowledge Assistants",description:"AI that answers from your documents, website and data so responses match your business.",includes:["Knowledge bases from files and pages","Answers grounded in your data","Internal or customer-facing assistants"]},
   {name:"WhatsApp Automation",description:"Automated WhatsApp messaging that supports customers around the clock.",includes:["Auto replies and WhatsApp chatbots","Order, booking and follow-up messages","Lead capture and broadcasts"]},
   {name:"Sales Automation",description:"A sales process that follows up on every lead without manual work.",includes:["Lead capture and automatic follow-ups","CRM updates, quotations and invoices","Reminders and sales reports"]},
   {name:"Workflow & Business Automation",description:"Connect your tools and remove repeated manual tasks.",includes:["Workflows using n8n, Make and Zapier","Integrations between your tools","Smart reports and dashboards"]},
   {name:"AI-Based Software",description:"Custom software with AI at its core, built as web, mobile or desktop products.",includes:["SaaS products","Web and mobile apps","AI features, models and integrations"]},
   {name:"AI ERP & Business Systems",description:"ERP, CRM, POS and business systems with AI support and your team in control.",includes:["Orders, inventory and billing","Reporting and daily operations","Dashboards and approval steps"]},
  ]},
 ];
 const filtered=items.filter(item=>(category==="all"||("category" in item && item.category===category))&&`${item.name} ${item.tagline} ${item.card_summary} ${"sub_services" in item?item.sub_services.map(row=>row.name+" "+row.businesses).join(" "):item.business_segments.map(row=>row.name+" "+row.solutions).join(" ")}`.toLowerCase().includes(search.trim().toLowerCase()));
 const groups=servicePage&&options.group_by_category?categories.map(category=>({name:category.name,items:filtered.filter(item=>"category"in item&&item.category===category.slug)})).filter(group=>group.items.length):[{name:"",items:filtered}];
 const services=items as Service[];const steps=servicePage?services[0]?.approach_steps||[]:[];const engagements=servicePage?[...new Set(services.flatMap(item=>item.engagement_options))]:[];
 const faqs=[...new Map(items.flatMap(item=>item.faqs).map(item=>[item.question,item])).values()].slice(0,8);
 if(servicePage) {
   return (
     <main id="main-content" className={`premium-home internal-premium ${c.page}`}>
       <ServicesOverview standalone />
       {servicePillars.map(pillar => <ServiceCategoryCarousel key={pillar.title} {...pillar} />)}
     </main>
   );
 }
 return <main id="main-content" className={`premium-home internal-premium ${c.page} ${!servicePage?c.industriesPage:""}`}><div className="premium-container">{!servicePage&&<header className={`${c.hero} ${c.listHero}`}><p className="eyebrow">INDUSTRIES WE SERVE</p><h1>{settings.hero_heading}</h1><p>{settings.hero_text}</p><div className={c.actions}><Link className="p-button" href="/contact">Discuss your industry<ArrowUpRight size={18}/></Link><span className={c.catalogCount}>{items.length} {entity} · One connected team</span></div></header>}
 <div className={c.filters}><label className={c.search}><Search size={18} aria-hidden="true"/><span className={c.srOnly}>Search {entity}</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder={`Search ${entity}`}/></label>{servicePage&&<div className={c.chips} aria-label="Service category"><button aria-pressed={category==="all"} onClick={()=>setCategory("all")}>All services</button>{categories.map(value=><button key={value.slug} aria-pressed={category===value.slug} onClick={()=>setCategory(value.slug)}>{value.name}</button>)}</div>}</div>
 <p className={c.results} role="status" aria-live="polite">Showing {filtered.length} of {items.length} {entity}{(search||category!=="all")&&<button onClick={()=>{setSearch("");setCategory("all");}}>Clear filters</button>}</p>
 {groups.map(group=><section key={group.name||"all"} className={c.listGroup}>{group.name&&<h2 className={c.groupTitle}>{group.name}</h2>}<div className={c.cardGrid}>{group.items.map(item=>servicePage?<ServiceCard key={item.id} service={item as Service}/>:<Link key={item.id} className={c.industryCard} href={`/industries/${item.slug}`}><span className={c.cardIcon}><CatalogIcon name={item.icon}/></span><h3>{item.name}</h3><p>{item.card_summary}</p><div className={c.segmentPreview}>{(item as Industry).business_segments.slice(0,3).map(segment=><span key={segment.name}>{segment.name}</span>)}</div><span className={c.cardLink}>Explore industry<ArrowUpRight size={16}/></span></Link>)}</div></section>)}
 {!filtered.length&&<p className={c.empty} role="status">{items.length?"No matches. Try another search.":servicePage?"New services are on the way.":"Industry details are being prepared."}</p>}
 {servicePage&&options.show_industries_section&&industries.length>0&&<section className={c.section}><h2>Industries We Serve</h2><div className={c.chips}>{industries.map(item=><Link key={item.id} href={`/industries/${item.slug}`}>{item.name}</Link>)}</div><Link className="p-text-link" href="/industries">All industries <ArrowUpRight size={16}/></Link></section>}
 {servicePage&&options.show_process_section&&steps.length>0&&<section className={c.section}><h2>Our Process</h2><div className={c.steps}>{steps.map((step,index)=>{const title=step.title.toLowerCase();const StepIcon=title.includes("discover")||title.includes("strategy")?Compass:title.includes("design")||title.includes("plan")?PanelsTopLeft:title.includes("develop")||title.includes("build")?Code2:title.includes("launch")||title.includes("evolve")?Rocket:[Compass,PanelsTopLeft,Code2,Rocket][index%4];return <article key={index}><span className={c.stepMarker} aria-hidden="true"><StepIcon size={17} strokeWidth={1.8}/></span><h3>{step.title}</h3><p>{step.description}</p></article>})}</div></section>}
 {servicePage&&options.show_engagement_models&&<section className={c.section}><h2>Engagement Models</h2><div className={c.cardGrid}>{engagements.map(name=><Link href="/pricing" className={c.industryCard} key={name}><h3>{name}</h3><span className={c.cardLink}>Explore model<ArrowUpRight size={16}/></span></Link>)}</div></section>}
 {servicePage&&options.show_faq&&faqs.length>0&&<section className={c.section}><h2>Frequently Asked Questions</h2>{faqs.map(faq=><details className={c.faq} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
 <section className={c.finalCta}><h2>{settings.final_cta_heading}</h2><p>{settings.final_cta_text}</p><Link className="p-button" href="/contact">Start a Project<ArrowUpRight size={18}/></Link></section>
 </div></main>;
}

