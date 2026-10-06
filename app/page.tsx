import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Layers3, Check, Globe2, Braces, GitBranch, ShieldCheck, Terminal, Database, Cloud, Workflow } from "lucide-react";
import { CASE_STUDIES_DATA, FAQS_DATA } from "@/data/mockData";
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
      <div className="product-sidebar"><span className="mini-brand">s.</span><Layers3 size={17}/><Workflow size={17}/><Database size={17}/><div className="sidebar-bottom"><Globe2 size={17}/></div></div>
      <div className="product-dashboard"><div className="dashboard-top"><span>Product overview</span><span className="avatar-dot">S</span></div><p className="dashboard-caption">A clearer view of what&apos;s next.</p><div className="dashboard-metrics"><div><small>Build</small><strong>Thoughtfully.</strong></div><div><small>Grow</small><strong>Confidently.</strong></div></div><div className="chart-header"><span>Product momentum</span><small>Overview ↗</small></div><div className="chart-bars">{[22,36,30,48,41,58,53,75,68,85,79,100].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="dashboard-bottom"><span><span className="status-dot"/> Designed to move forward</span><ArrowUpRight size={14}/></div></div>
    </div>
    <div className="delivery-chip"><span><Check size={15}/></span><div><strong>Built around your business</strong><small>Design + engineering + delivery</small></div></div>
    <span className="visual-footnote">CONCEPT INTERFACE · NOT LIVE PRODUCT DATA</span>
  </div>;
}

export default function HomePage() {
  const testimonial = CASE_STUDIES_DATA[1].testimonial;
  return <main id="main-content" className="premium-home">
    <section className="premium-hero">
      <div className="premium-container hero-grid">
        <div className="hero-copy"><p className="eyebrow"><span/> YOUR SOFTWARE. OUR CRAFT.</p><h1>Great ideas deserve<br/> <span>exceptional</span><br/> software.</h1><p className="hero-description">We design and build web platforms, mobile apps, and custom software that move your business forward.</p><div className="hero-actions"><Link className="p-button" href="/contact">Start a project <ArrowUpRight size={18}/></Link><Link className="p-text-link" href="/portfolio">Explore our work <ArrowRight size={17}/></Link></div><div className="hero-note"><span className="hero-note-icon"><Globe2 size={17}/></span><span>Based in Pakistan. Built for the world.</span></div></div>
        <ProductVisual/>
      </div>
      <div className="premium-container hero-bottom"><span>IDEAS INTO PRODUCTS. COMPLEXITY INTO CLARITY.</span><a href="#services">Discover what we do <span>↓</span></a></div>
    </section>

    <PartnershipSection />

    <section id="services" className="premium-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">01 / WHAT WE BUILD</p><h2>Your ambition.<br/>Our engineering.</h2></div><div className="heading-aside"><p>From a new product to a better way of working, we turn complex requirements into useful software.</p><Link className="p-text-link" href="/services">All services <ArrowUpRight size={17}/></Link></div></div><ServiceCards /><div className="services-extra"><span>Need more than engineering?</span><Link href="/services/graphic-design-branding">Brand identity ↗</Link><Link href="/services/digital-marketing">Digital marketing & SEO ↗</Link><Link href="/services">Explore creative services ↗</Link></div></div></section>

    <section className="premium-section work-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">02 / SELECTED WORK</p><h2>Built with purpose.<br/>Made to make a difference.</h2></div><Link className="p-text-link" href="/portfolio">View all projects <ArrowUpRight size={17}/></Link></div><div className="premium-work-grid">{CASE_STUDIES_DATA.slice(0,2).map((project,i)=><Link href={`/portfolio/${project.slug}`} className="premium-project" key={project.id}><div className={`project-art project-art-${i}`}><div className="project-concept"><div className="concept-top"><strong>{i===0?"FinEdge":"MediTrack"}<span> / {i===0?"finance":"care"}</span></strong><span>•••</span></div><div className="concept-body"><aside><i/><i/><i/><i/></aside><div><p>{i===0?"Your business. Without borders.":"Care, connected."}</p><h4>{i===0?"Payments overview":"Clinic workspace"}</h4><div className="concept-tiles"><span><small>{i===0?"Payments":"Patient records"}</small><Code2 size={22}/></span><span><small>{i===0?"Settlements":"Appointments"}</small><Workflow size={22}/></span><span><small>{i===0?"Accounts":"Care teams"}</small><Layers3 size={22}/></span></div><div className="concept-rows">{[0,1,2].map(n=><div key={n}><span className="row-avatar"/><span className="row-line"/><span className="row-tag"/></div>)}</div></div></div></div><span className="project-art-label">ILLUSTRATIVE PRODUCT PREVIEW</span></div><div className="project-meta"><span>{project.industry}</span><ArrowUpRight size={23}/></div><h3>{i===0?"FinEdge — cross-border payments":"MediTrack — connected healthcare"}</h3><p>{i===0?"A payment gateway and settlement engine that brings international business transactions into one platform.":"A unified clinical portal for patient records, telemedicine, and appointment management."}</p><div className="project-tags">{project.technologies.slice(0,3).map(t=><span key={t}>{t}</span>)}</div></Link>)}</div></div></section>

    <IndustriesSection />

    <section className="premium-section approach-section"><div className="premium-container"><div className="p-section-heading"><div><p className="eyebrow">03 / HOW WE WORK</p><h2>A clear path.<br/>A shared direction.</h2></div><div className="heading-aside"><p>You stay close to the work, from the first conversation to the final release.</p><Link className="p-text-link" href="/process">Our process <ArrowUpRight size={17}/></Link></div></div><div className="premium-process">{steps.map(([title,description],i)=><article className="visual-card" data-card-tone={cardTone(title)} key={title}><CardMotif kind={title}/><div className="step-number">0{i+1}<span>→</span></div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="collaboration-bar"><span><ShieldCheck size={19}/> Your code. Your intellectual property.</span><span><GitBranch size={19}/> Transparent sprint delivery.</span><span><Globe2 size={19}/> Collaboration across time zones.</span></div></div></section>

    <DeliverablesSection />
    <EngagementSection />

    <section className="premium-section premium-about"><div className="premium-container about-grid"><div><p className="eyebrow">04 / THE PEOPLE BEHIND THE PRODUCT</p><h2>Technical by nature.<br/>Human by design.</h2><p className="about-description">SolyNext is a Pakistan-based software and digital technology company. We bring product design, engineering, and digital growth together to help businesses build what comes next.</p><Link className="p-text-link" href="/about">Meet SolyNext <ArrowUpRight size={18}/></Link></div><div className="about-principles">{[["Product thinking","We connect technical decisions to the needs of your business and users."],["Open collaboration","Shared repositories, sprint reviews, and working builds keep you involved."],["Built for the long term","Maintainable code and considered architecture make room for your next step."]].map(([title,copy],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className="premium-tech"><div className="premium-container"><div><p className="eyebrow">THE RIGHT TOOLS FOR THE JOB</p><p>Modern foundations. Lasting possibilities.</p></div><div className="tech-names"><span><Braces/> React</span><span><Terminal/> Next.js</span><span><Code2/> TypeScript</span><span><Database/> PostgreSQL</span><span><Cloud/> AWS</span></div><Link href="/technologies" aria-label="Explore our technology stack"><ArrowUpRight size={23}/></Link></div></section>

    {testimonial && <section className="premium-quote"><div className="premium-container"><p className="eyebrow">IN OUR CLIENT&apos;S WORDS</p><span className="quote-mark" aria-hidden="true">“</span><blockquote>{testimonial.quote}</blockquote><div className="quote-author"><span>{testimonial.author.split(" ").map(n=>n[0]).slice(0,2).join("")}</span><div><strong>{testimonial.author}</strong><p>{testimonial.role}, {testimonial.company}</p></div></div></div></section>}

    <InsightsSection />

    <section className="premium-section premium-faq"><div className="premium-container faq-grid"><div><p className="eyebrow">A FEW THINGS YOU MIGHT ASK</p><h2>Good questions.<br/>Clear answers.</h2><Link href="/contact" className="p-text-link">Let&apos;s talk about yours <ArrowUpRight size={17}/></Link></div><div>{FAQS_DATA.slice(0,4).map(faq=><details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="premium-cta"><div className="premium-container"><div><p className="eyebrow">LET&apos;S BUILD WHAT&apos;S NEXT</p><h2>Big idea?<br/>Let&apos;s make it real.</h2><p>Tell us where you want to go. We&apos;ll help you figure out how to get there.</p><Link href="/contact" className="p-button">Start a project <ArrowUpRight size={19}/></Link></div><div className="cta-symbol" aria-hidden="true">↗</div></div></section>
  </main>;
}

