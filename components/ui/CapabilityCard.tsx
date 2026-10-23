import { cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export function CapabilityCard({ icon: Icon, title, description, href }: {
  icon: LucideIcon; title: string; description: string; tags: string[]; href: string; index: number;
}) {
  return <Link href={href} className="capability-card visual-card" data-card-tone={cardTone(title)}><div className="capability-card-top"><span className="capability-icon"><Icon size={23} /></span></div><h3>{title}</h3><p>{description}</p><span className="capability-card-link">Explore solution <ArrowUpRight size={18} /></span></Link>;
}
