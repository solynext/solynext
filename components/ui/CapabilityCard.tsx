import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function CapabilityCard({ icon: Icon, title, description, tags, href, index }: {
  icon: LucideIcon; title: string; description: string; tags: string[]; href: string; index: number;
}) {
  return <Link href={href} className="capability-card visual-card" data-card-tone={cardTone(title)}><CardMotif kind={title}/><div className="capability-card-top"><span className="capability-icon"><Icon size={23} /></span><span className="capability-index">0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><ul className="capability-tags">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul><span className="capability-card-link">Explore solution <ArrowUpRight size={18} /></span></Link>;
}
