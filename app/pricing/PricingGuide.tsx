"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, X, Orbit, Palette, ShoppingBag, PenTool, Store, Search, Boxes, Video, Code2, Settings2, Workflow } from "lucide-react";
import styles from "./Pricing.module.css";

const packages = [
  {
    name: "Basic",
    tagline: "Build a professional online presence with consistent social media and brand support.",
    price: "PKR 30,000",
    groups: [
      { title: "Social media", items: ["Facebook, Instagram and TikTok management", "Weekly posts and short videos or reels", "Professional graphic design", "Content planning, scheduling and publishing"] },
      { title: "Marketing and optimization", items: ["Meta Ads campaign setup and management", "Basic social media marketing support", "Profile optimization and SEO-friendly setup", "Professional brand presentation", "Monthly performance review"] },
    ],
    bestFor: "Small businesses and startups seeking consistent social media and a professional identity.",
  },
  {
    name: "Business Growth",
    tagline: "Bring your website, social media and digital marketing together to support steady growth.",
    price: "PKR 60,000",
    groups: [
      { title: "Social media", items: ["Facebook, Instagram, TikTok and LinkedIn", "Content planning and scheduling", "Graphic design, posts and reels", "Profile and page optimization", "SEO-friendly content"] },
      { title: "Digital marketing", items: ["Meta Ads setup and management", "Audience research and targeting", "Marketing strategy", "Campaign monitoring and optimization", "Digital growth recommendations"] },
      { title: "Website development and management", items: ["Custom business website", "Responsive design and content setup", "On-page SEO and performance optimization", "Domain setup and deployment", "Website management and maintenance"] },
      { title: "Business support", items: ["Professional digital consultation", "Online brand development", "Ongoing website and marketing support", "Business growth planning"] },
    ],
    bestFor: "Growing businesses that want a website, social media and marketing managed together.",
  },
  {
    name: "Complete Business Management",
    tagline: "Get one team to manage your online presence, marketing, customer support and business growth.",
    price: "PKR 100,000",
    groups: [
      { title: "Complete digital presence", items: ["Facebook, Instagram, TikTok, LinkedIn and other relevant platforms", "Graphic design, video and reel content", "Content planning and publishing", "Profile optimization and SEO-friendly branding"] },
      { title: "Complete digital marketing", items: ["Meta Ads campaign management", "Marketing strategy and promotional campaigns", "Audience research", "Campaign optimization and performance monitoring"] },
      { title: "Website and e-commerce management", items: ["Custom business website and maintenance", "Online store management", "Product uploading and catalog management", "Product listing optimization", "Website SEO and performance optimization", "Marketplace management"] },
      { title: "Customer and order management", items: ["Customer inquiries and social media messages", "Booking and appointment management", "Order receiving, processing and confirmation", "Follow-ups and customer coordination", "Professional customer service support"] },
      { title: "Business development", items: ["Online sales growth strategies", "Marketing coordination and operational support", "Customer experience improvement", "Ongoing consultation and growth planning"] },
    ],
    bestFor: "Businesses that want SolyNext to manage their online operations, marketing, customers and growth.",
  },
];

const individualServices = [
  {
    name: "Website Development",
    price: "PKR 30,000–50,000",
    cadence: "one-time project",
    items: ["Custom design and development with Next.js", "Mobile, tablet and desktop ready", "On-page SEO", "Speed and performance optimization", "Domain setup and deployment", "Basic technical setup"],
    note: "Price depends on website size, number of pages, design, features and integrations. E-commerce stores and advanced custom web apps are quoted separately.",
  },
  {
    name: "Meta Ads Management",
    price: "PKR 13,000–20,000",
    cadence: "based on scope",
    items: ["Ad account and campaign setup", "Facebook and Instagram ads", "Audience research and targeting", "Campaign planning and ad creatives", "Monitoring and optimization", "Performance reports"],
    note: "Ad spend paid to Meta is not included in the management fee.",
  },
  {
    name: "Social Media Management",
    price: "PKR 15,000–30,000",
    cadence: "per month",
    items: ["Facebook, Instagram, TikTok and LinkedIn", "Content planning and scheduling", "Graphic design, posts and reels", "Profile and page optimization", "SEO-friendly content", "Brand consistency and monitoring"],
    note: "Price depends on the number of platforms, weekly content, video needs and design workload.",
  },
];

const otherServices = [
  { name: "Graphic design and branding", icon: Palette },
  { name: "E-commerce website development", icon: ShoppingBag },
  { name: "Logo design", icon: PenTool },
  { name: "Online store management", icon: Store },
  { name: "SEO services", icon: Search },
  { name: "Marketplace store management", icon: Boxes },
  { name: "Content creation", icon: Video },
  { name: "Custom software development", icon: Code2 },
  { name: "Website management", icon: Settings2 },
  { name: "Business automation", icon: Workflow },
];

function ServiceList({ items }: { items: string[] }) {
  return <ul className={styles.list}>{items.map(item=><li key={item}>{item}</li>)}</ul>;
}

export function PricingGuide() {
  const [selected, setSelected] = useState<{ title: string; price: string; cadence: string; description: string; groups: { title: string; items: string[] }[]; note?: string } | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="monthly-packages">
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>MONTHLY PACKAGES</p><h2 id="monthly-packages">Choose the right level of support.</h2></div></div>
          <div className={styles.packages}>
            {packages.map((item,index)=><button type="button" className={`${styles.package} ${index===1?styles.packageFeatured:""}`} key={item.name} onClick={()=>setSelected({title:item.name,price:item.price,cadence:"per month",description:item.bestFor,groups:item.groups})} aria-label={`View ${item.name} package details`}>
              <span className={styles.packageHead}>
                <span className={styles.packageLabel}>{index===0?"ESSENTIAL":index===1?"GROWTH":"FULL SERVICE"}</span>
                <span className={styles.packageTitle}>{item.name}</span>
                <span className={styles.packagePrice}>{item.price}<small> / month</small></span>
              </span>
              <span className={styles.packageSummary}>{item.tagline}</span>
              <span className={styles.packageBottom}><span className={styles.cardAction}>View details <ArrowRight size={15} aria-hidden="true"/></span></span>
            </button>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="individual-services">
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>INDIVIDUAL SERVICES</p><h2 id="individual-services">Choose only what you need.</h2></div><p>Final pricing depends on the project details and agreed scope.</p></div>
          <div className={styles.individualGrid}>
            {individualServices.map(item=><button type="button" className={styles.individual} key={item.name} onClick={()=>setSelected({title:item.name,price:item.price,cadence:item.cadence,description:"A focused service, scoped to your goals and requirements.",groups:[{title:"What’s included",items:item.items}],note:item.note})} aria-label={`View ${item.name} details`}>
              <span className={styles.individualTop}><span><strong>{item.name}</strong><small>{item.cadence}</small></span><ArrowUpRight size={17} aria-hidden="true"/></span>
              <span className={styles.individualBottom}><strong>{item.price}</strong><span className={styles.cardAction}>View details <ArrowRight size={15} aria-hidden="true"/></span></span>
            </button>)}
          </div>
          <article className={styles.otherServices}>
            <div className={styles.otherServicesIntro}><span className={styles.otherOrbit} aria-hidden="true"><Orbit size={28} strokeWidth={1.6}/><i/><i/><i/></span><h3>Other services</h3><p>Custom quotation based on your requirements.</p></div>
            <ul>{otherServices.map(({name,icon:Icon})=><li key={name}><Icon size={16} strokeWidth={1.8} aria-hidden="true"/><span>{name}</span></li>)}</ul>
          </article>
        </section>

        <section className={styles.detailsGrid} aria-label="Plan details">
          <article className={styles.infoCard}>
            <p className={styles.kicker}>FLEXIBLE BY DESIGN</p><h2>Customize your plan.</h2>
            <p>Every business is different. Choose one service or combine several, then shape the plan around your needs.</p>
            <ul><li>Start with a monthly package and add or remove services.</li><li>Request a custom website, online store or software solution.</li><li>Get a clear quotation based on your requirements before work starts.</li></ul>
          </article>
          <article className={styles.infoCard}>
            <p className={styles.kicker}>PRICING NOTES</p><h2>What to expect.</h2>
            <ul><li>All prices are in Pakistani Rupees (PKR).</li><li>Monthly packages are billed monthly; website development prices are one-time project prices.</li><li>Meta Ads spend is separate from the management fee.</li><li>Domain and hosting renewals, premium software, paid plugins and third-party subscriptions are charged separately unless included in your quotation.</li><li>Advanced e-commerce, complex integrations and custom web apps may need additional development charges.</li><li>Deliverables, content quantities, revisions and support hours are agreed before the project starts.</li></ul>
          </article>
        </section>

        <section className={styles.cta} aria-labelledby="get-started">
          <div><p className={styles.kicker}>GET STARTED</p><h2 id="get-started">Tell us what you need.</h2><p>We’ll recommend a practical option and provide a clear quotation. Your first consultation is free.</p></div>
          <div className={styles.ctaLinks}><Link href="/contact">Start a project <ArrowRight size={17} aria-hidden="true"/></Link><a href="mailto:solynextsolutions@gmail.com">solynextsolutions@gmail.com <ArrowUpRight size={16} aria-hidden="true"/></a></div>
        </section>
        <p className={styles.footerLine}>SolyNext · Build. Innovate. Grow.</p>
      </div>
      {selected && typeof document !== "undefined" && createPortal(<div className={styles.modalBackdrop} onMouseDown={event=>{if(event.target===event.currentTarget)setSelected(null);}}>
        <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title">
          <button type="button" className={styles.modalClose} onClick={()=>setSelected(null)} aria-label="Close details"><X size={19}/></button>
          <p className={styles.kicker}>PRICING DETAILS</p><h2 id="pricing-modal-title">{selected.title}</h2>
          <p className={styles.modalDescription}>{selected.description}</p>
          <div className={styles.modalPrice}><strong>{selected.price}</strong><span>{selected.cadence}</span></div>
          <div className={styles.modalGroups}>{selected.groups.map(group=><div key={group.title}><h3>{group.title}</h3><ServiceList items={group.items}/></div>)}</div>
          {selected.note && <p className={styles.note}>{selected.note}</p>}
          <Link href="/contact" className={styles.modalCta}>Discuss this option <ArrowRight size={17}/></Link>
        </section>
      </div>, document.body)}
    </main>
  );
}
