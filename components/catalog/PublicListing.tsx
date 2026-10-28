"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight,Search } from "lucide-react";
import { categories,type Service,type Industry,type ServicesPageSettings,type IndustriesPageSettings } from "@/lib/catalog/model";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CatalogIcon } from "./CatalogIcon";
import c from "./Catalog.module.css";
export function PublicListing({entity,items,industries=[],settings}:{entity:"services"|"industries";items:Service[]|Industry[];industries?:Industry[];settings:ServicesPageSettings|IndustriesPageSettings}){
 const[search,setSearch]=useState("");const[category,setCategory]=useState("all");const servicePage=entity==="services";const options=settings as ServicesPageSettings;
 const filtered=items.filter(item=>(category==="all"||("category" in item && item.category===category))&&`${item.name} ${item.tagline} ${item.card_summary}`.toLowerCase().includes(search.trim().toLowerCase()));
 const groups=servicePage&&options.group_by_category?categories.map(name=>({name,items:filtered.filter(item=>"category"in item&&item.category===name)})).filter(group=>group.items.length):[{name:"",items:filtered}];
 const services=items as Service[];const steps=servicePage?services[0]?.approach_steps||[]:[];const engagements=servicePage?[...new Set(services.flatMap(item=>item.engagement_options))]:[];
 const faqs=[...new Map(items.flatMap(item=>item.faqs).map(item=>[item.question,item])).values()].slice(0,8);
 return <main id="main-content" className={`premium-home internal-premium ${c.page}`}><div className="premium-container"><h1 className={c.srOnly}>{servicePage?"Services":"Industries"}</h1>
 <div className={c.filters}><label className={c.search}><Search size={18} aria-hidden="true"/><span className={c.srOnly}>Search {entity}</span><input type="search" value={search} onChange={event=>setSearch(event.target.value)} placeholder={`Search ${entity}`}/></label>{servicePage&&<div className={c.chips} aria-label="Service category"><button aria-pressed={category==="all"} onClick={()=>setCategory("all")}>All services</button>{categories.map(value=><button key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{value}</button>)}</div>}</div>
 {groups.map(group=><section key={group.name||"all"} className={c.listGroup}>{group.name&&<h2 className={c.groupTitle}>{group.name}</h2>}<div className={c.cardGrid}>{group.items.map(item=>servicePage?<ServiceCard key={item.id} service={item as Service}/>:<Link key={item.id} className={c.industryCard} href={`/solutions/${item.slug}`}><span className={c.cardIcon}><CatalogIcon name={item.icon}/></span><h3>{item.name}</h3><p>{item.card_summary}</p><span className={c.cardLink}>Explore industry<ArrowUpRight size={16}/></span></Link>)}</div></section>)}
 {!filtered.length&&<p className={c.empty} role="status">{items.length?"No matches. Try another search.":servicePage?"New services are on the way.":"Industry details are being prepared."}</p>}
 {servicePage&&options.show_industries_section&&industries.length>0&&<section className={c.section}><h2>Industries We Serve</h2><div className={c.chips}>{industries.map(item=><Link key={item.id} href={`/solutions/${item.slug}`}>{item.name}</Link>)}</div><Link className="p-text-link" href="/solutions">All industries <ArrowUpRight size={16}/></Link></section>}
 {servicePage&&options.show_process_section&&steps.length>0&&<section className={c.section}><h2>Our Process</h2><div className={c.steps}>{steps.map((step,index)=><article key={index}><small>0{index+1}</small><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></section>}
 {servicePage&&options.show_engagement_models&&<section className={c.section}><h2>Engagement Models</h2><div className={c.cardGrid}>{engagements.map(name=><Link href="/pricing" className={c.industryCard} key={name}><h3>{name}</h3><span className={c.cardLink}>Explore model<ArrowUpRight size={16}/></span></Link>)}</div></section>}
 {servicePage&&options.show_faq&&faqs.length>0&&<section className={c.section}><h2>Frequently Asked Questions</h2>{faqs.map(faq=><details className={c.faq} key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
 <section className={c.finalCta}><h2>{settings.final_cta_heading}</h2><p>{settings.final_cta_text}</p><Link className="p-button" href="/contact">Start a Project<ArrowUpRight size={18}/></Link></section>
 </div></main>;
}

