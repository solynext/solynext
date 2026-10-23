import { getPageMetadata } from "@/lib/seo/metadata";
import { HeroVideo } from "@/components/home/HeroVideo";
import { ClientTicker } from "@/components/home/ClientTicker";
import { HomeAbout } from "@/components/home/HomeAbout";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { ClientReviews } from "@/components/home/ClientReviews";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import Image from "next/image";
import { getPublicProjects } from "@/lib/portfolio/repository";
import { getPublicClients } from "@/lib/clients/repository";
import { ArrowRight, ArrowUpRight, Code2, Layers3, Check, Globe2, Braces, GitBranch, ShieldCheck, Terminal, Database, Cloud, Workflow } from "lucide-react";

import { IndustriesSection } from "@/components/home/IndustriesSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { DeliverablesSection } from "@/components/home/DeliverablesSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { PartnershipSection } from "@/components/home/PartnershipSection";
import { ServiceCards } from "@/components/home/ServiceCards";

const steps = [
  ["Discover", "Understand your users, goals, and the problem worth solving."],
  ["Design", "Shape the experience, prototype the product, and define the architecture."],
  ["Develop", "Build in focused sprints with reviews and working software."],
  ["Launch & evolve", "Test, deploy, and keep improving as your business grows."],
];

function ProductVisual() {
  return <div className="product-visual" role="img" aria-label="Illustrative software architecture and product interface">
    <div className="visual-grid" />
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="visual-label"><span className="status-dot" /> FROM IDEA TO IMPACT</div>
    <div className="code-window">
      <div className="window-bar"><span /><span /><span /><small>product.ts</small><Braces size={14} /></div>
      <div className="code-lines"><p><em>const</em> product = <em>await</em> build(&#123;</p><p>&nbsp;&nbsp;vision: <b>&apos;Your next big idea&apos;</b>,</p><p>&nbsp;&nbsp;design: <b>&apos;Made for people&apos;</b>,</p><p>&nbsp;&nbsp;engineering: <b>&apos;Built to scale&apos;</b></p><p>&#125;);</p><p className="code-comment">{"// Thoughtfully designed. Carefully built."}</p></div>
    </div>
    <div className="product-window">
      <div className="product-sidebar"><BrandLogo size={22}/><Layers3 size={17}/><Workflow size={17}/><Database size={17}/><div className="sidebar-bottom"><Globe2 size={17}/></div></div>
      <div className="product-dashboard"><div className="dashboard-top"><span>Product overview</span><span className="avatar-dot">S</span></div><p className="dashboard-caption">A clearer view of what&apos;s next.</p><div className="dashboard-metrics"><div><small>Build</small><strong>Thoughtfully.</strong></div><div><small>Grow</small><strong>Confidently.</strong></div></div><div className="chart-header"><span>Product momentum</span><small>Overview ↗</small></div><div className="chart-bars">{[22,36,30,48,41,58,53,75,68,85,79,100].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="dashboard-bottom"><span><span className="status-dot"/> Designed to move forward</span><ArrowUpRight size={14}/></div></div>
    </div>
    <div className="delivery-chip"><span><Check size={15}/></span><div><strong>Built around your business</strong><small>Design + engineering + delivery</small></div></div>
    <span className="visual-footnote">CONCEPT INTERFACE · NOT LIVE PRODUCT DATA</span>
  </div>;
}

export async function generateMetadata() { return getPageMetadata("/"); }

export default async function HomePage() {
  const [projects, clients] = await Promise.all([getPublicProjects(), getPublicClients()]);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 4);
  const reviews = projects.flatMap(project => project.testimonial ? [{ id: project.id, ...project.testimonial, project: project.title, slug: project.slug }] : []);
  return <main id="main-content" className="premium-home">
    <section className="premium-hero">
      <HeroVideo />
      <div className="premium-container hero-grid">
        <div className="hero-copy"><p className="eyebrow"><span/> YOUR SOFTWARE. OUR CRAFT.</p><h1>Great ideas deserve<br/> <span>exceptional</span><br/> software.</h1><p className="hero-description">We design and build web platforms, mobile apps, and custom software that move your business forward.</p><div className="hero-actions"><Link className="p-button" href="/contact">Start a project <ArrowUpRight size={18}/></Link><Link className="p-text-link" href="/portfolio">Explore our work <ArrowRight size={17}/></Link></div><div className="hero-note"><span className="hero-note-icon"><Globe2 size={17}/></span><span>Based in Pakistan. Built for the world.</span></div></div>
        <ProductVisual/>
      </div>
      <div className="premium-container hero-bottom"><span>IDEAS INTO PRODUCTS. COMPLEXITY INTO CLARITY.</span><a href="#services">Discover what we do <span>↓</span></a></div>
    </section>

    <ClientTicker clients={clients} />
    <PartnershipSection />

    <section id="services" className="premium-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">WHAT WE BUILD</p><h2>Your ambition.<br/>Our engineering.</h2></div><div className="heading-aside"><p>From a new product to a better way of working, we turn complex requirements into useful software.</p><Link className="p-text-link" href="/services">All services <ArrowUpRight size={17}/></Link></div></div><ServiceCards /><div className="services-extra"><span>Need more than engineering?</span><Link href="/services/graphic-design-branding">Brand identity ↗</Link><Link href="/services/digital-marketing">Digital marketing & SEO ↗</Link><Link href="/services">Explore creative services ↗</Link></div></div></section>

    <section className="premium-section work-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Built with purpose.<br/>Made to make a difference.</h2></div><Link className="p-text-link" href="/portfolio">View all projects <ArrowUpRight size={17}/></Link></div><div className="premium-work-grid">{featuredProjects.map((project)=><Link href={`/portfolio/${project.slug}`} className="premium-project visual-card card-surface" data-card-tone={cardTone(project.industry)} key={project.id}><div className="project-art portfolio-home-image"><Image src={project.featuredImage} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" unoptimized={project.featuredImage.startsWith("https://")} className="object-cover"/></div><div className="project-meta"><span>{project.industry}</span><ArrowUpRight size={23}/></div><h3>{project.title}</h3><p>{project.summary}</p></Link>)}</div></div></section>

    <IndustriesSection />

    <section className="premium-section approach-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">HOW WE WORK</p><h2>A clear path.<br/>A shared direction.</h2></div><div className="heading-aside"><p>You stay close to the work, from the first conversation to the final release.</p><Link className="p-text-link" href="/process">Our process <ArrowUpRight size={17}/></Link></div></div><div className="premium-process">{steps.map(([title,description])=><article className="visual-card" data-card-tone={cardTone(title)} key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><div className="collaboration-bar"><span><ShieldCheck size={19}/> Your code. Your intellectual property.</span><span><GitBranch size={19}/> Transparent sprint delivery.</span><span><Globe2 size={19}/> Collaboration across time zones.</span></div></div></section>

    <DeliverablesSection />
    <EngagementSection />

    <HomeAbout/>

    <section className="premium-tech"><div className="premium-container"><div><p className="eyebrow">THE RIGHT TOOLS FOR THE JOB</p><p>Modern foundations. Lasting possibilities.</p></div><div className="tech-names"><span><Braces/> React</span><span><Terminal/> Next.js</span><span><Code2/> TypeScript</span><span><Database/> PostgreSQL</span><span><Cloud/> AWS</span></div><Link href="/technologies" aria-label="Explore our technology stack"><ArrowUpRight size={23}/></Link></div></section>

    <ClientReviews reviews={reviews}/>

    <InsightsSection />

    <HomeFAQ/>

    <ProjectCTA/>
  </main>;
}

