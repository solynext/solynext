import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, Check, Flag, Users, RefreshCw } from "lucide-react";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

const models = [
  { title: "Fixed-Price Milestone", icon: Flag, audience: "A clear scope. A focused launch.", description: "For MVPs, web apps, mobile apps, and defined redesigns.", features: ["Agreed milestones and deliverables", "Weekly demos and staging access", "Code and IP handover upon delivery"] },
  { title: "Dedicated Engineering Team", icon: Users, audience: "Your roadmap. Our shared momentum.", description: "For teams with continuously evolving product roadmaps.", features: ["Engineers embedded in your workflow", "Flexible sprint priorities", "Bi-weekly demos and velocity tracking"] },
  { title: "Growth & SLA Retainer", icon: RefreshCw, audience: "Beyond launch. Built for the long term.", description: "For live products needing ongoing improvements and SEO.", features: ["Monthly engineering and marketing hours", "Security updates and monitoring", "Strategy and analytics reviews"] },
];
export function EngagementSection() {
  return <section className="premium-section engagement-section" id="engagement"><div className="premium-container"><EditorialHeading kicker="A PARTNERSHIP THAT FITS" title={<>Your next chapter.<br />Your way of working.</>} description="Choose a defined project, an embedded team, or ongoing support. We align the collaboration with your priorities." href="/pricing" linkLabel="Compare engagement models" /><div className="engagement-grid">{models.map(({ title, icon: Icon, audience, description, features }, index) => <article className={`engagement-card visual-card ${index === 1 ? "engagement-featured" : ""}`} key={title} data-card-tone={cardTone(title)}><CardMotif kind={title}/><div className="engagement-card-top"><Icon size={26} /><span>{index === 1 ? "EVOLVING ROADMAPS" : `MODEL 0${index + 1}`}</span></div><p className="engagement-audience">{audience}</p><h3>{title}</h3><p>{description}</p><ul>{features.map(feature => <li key={feature}><Check size={16} /><span>{feature}</span></li>)}</ul><Link className="p-text-link" href="/pricing">Explore this model <ArrowUpRight size={18} /></Link></article>)}</div><div className="engagement-note"><span>Still figuring out the scope?</span><Link href="/pricing" className="p-text-link">Try the project estimator <ArrowUpRight size={17} /></Link></div></div></section>;
}
