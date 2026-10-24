import { getPageMetadata } from "@/lib/seo/metadata";
import { ClientTicker } from "@/components/home/ClientTicker";
import { HomeAbout } from "@/components/home/HomeAbout";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { ClientReviews } from "@/components/home/ClientReviews";
import { cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import Image from "next/image";
import { getPublicProjects } from "@/lib/portfolio/repository";
import { getPublicClients } from "@/lib/clients/repository";
import { ArrowUpRight, Code2, Globe2, Braces, GitBranch, ShieldCheck, Terminal, Database, Cloud } from "lucide-react";

import { IndustriesSection } from "@/components/home/IndustriesSection";
import { EngagementSection } from "@/components/home/EngagementSection";
import { DeliverablesSection } from "@/components/home/DeliverablesSection";
import { InsightsSection } from "@/components/home/InsightsSection";
import { PartnershipSection } from "@/components/home/PartnershipSection";
import { GrowthHero, GrowthServices } from "@/components/home/GrowthHero";

const steps = [
  ["Discover", "Understand your users, goals, and the problem worth solving."],
  ["Design", "Shape the experience, prototype the product, and define the architecture."],
  ["Develop", "Build in focused sprints with reviews and working software."],
  ["Launch & evolve", "Test, deploy, and keep improving as your business grows."],
];

export async function generateMetadata() { return getPageMetadata("/"); }

export default async function HomePage() {
  const [projects, clients] = await Promise.all([getPublicProjects(), getPublicClients()]);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 4);
  const reviews = projects.flatMap(project => project.testimonial ? [{ id: project.id, ...project.testimonial, project: project.title, slug: project.slug }] : []);
  return <main id="main-content" className="premium-home">
    <GrowthHero />
    <GrowthServices />

    <ClientTicker clients={clients} />
    <PartnershipSection />

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

