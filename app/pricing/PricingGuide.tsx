import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./Pricing.module.css";

const packages = [
  {
    name: "Basic",
    tagline: "Build your professional online presence.",
    price: "PKR 30,000",
    groups: [
      { title: "Social media", items: ["Facebook, Instagram and TikTok management", "Weekly posts and short videos or reels", "Professional graphic design", "Content planning, scheduling and publishing"] },
      { title: "Marketing and optimization", items: ["Meta Ads campaign setup and management", "Basic social media marketing support", "Profile optimization and SEO-friendly setup", "Professional brand presentation", "Monthly performance review"] },
    ],
    bestFor: "Small businesses and startups seeking consistent social media and a professional identity.",
  },
  {
    name: "Business Growth",
    tagline: "Build a stronger digital presence and grow.",
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
    tagline: "Your business. Our team. One complete growth solution.",
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

const otherServices = ["Graphic design and branding", "E-commerce website development", "Logo design", "Online store management", "SEO services", "Marketplace store management", "Content creation", "Custom software development", "Website management", "Business automation"];

function ServiceList({ items }: { items: string[] }) {
  return <ul className={styles.list}>{items.map(item=><li key={item}>{item}</li>)}</ul>;
}

export function PricingGuide() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.kicker}>SOLYNEXT PRICING GUIDE</p>
          <h1>Clear plans.<br/><span>Fair prices.</span></h1>
          <p className={styles.lead}>Professional digital services to help your business build an online presence, attract customers and grow. Choose a monthly package or pick only the service you need.</p>
          <Link href="/contact" className={styles.heroLink}>Talk through your needs <ArrowUpRight size={17} aria-hidden="true"/></Link>
        </header>

        <section className={styles.section} aria-labelledby="monthly-packages">
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>MONTHLY PACKAGES</p><h2 id="monthly-packages">Choose the right level of support.</h2></div><p>Every package can be customized to fit your business and requirements.</p></div>
          <div className={styles.packages}>
            {packages.map((item,index)=><article className={styles.package} key={item.name}>
              <header className={styles.packageHeader}>
                <div><span className={styles.packageLabel}>{index===0?"ESSENTIAL":index===1?"GROWTH":"FULL SERVICE"}</span><h3>{item.name}</h3><p>{item.tagline}</p></div>
                <div className={styles.price}><strong>{item.price}</strong><span>per month</span></div>
              </header>
              <div className={styles.packageBody}>
                <div className={styles.packageGroups}>{item.groups.map(group=><div className={styles.packageGroup} key={group.title}><h4>{group.title}</h4><ServiceList items={group.items}/></div>)}</div>
              </div>
              <div className={styles.bestFor}><strong>Best for:</strong> {item.bestFor}</div>
            </article>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="individual-services">
          <div className={styles.sectionHeading}><div><p className={styles.kicker}>INDIVIDUAL SERVICES</p><h2 id="individual-services">Choose only what you need.</h2></div><p>Final pricing depends on the project details and agreed scope.</p></div>
          <div className={styles.individualGrid}>
            {individualServices.map(item=><article className={styles.individual} key={item.name}>
              <header><div><h3>{item.name}</h3><p>{item.cadence}</p></div><strong>{item.price}</strong></header>
              <ServiceList items={item.items}/>
              <p className={styles.note}>{item.note}</p>
            </article>)}
          </div>
          <article className={styles.otherServices}>
            <div><h3>Other services</h3><p>Custom quotation based on your requirements.</p></div>
            <ul>{otherServices.map(item=><li key={item}>{item}</li>)}</ul>
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
    </main>
  );
}
