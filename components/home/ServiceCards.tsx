import Link from "next/link";
import { ArrowRight, Code2, PenTool, TrendingUp, MessagesSquare } from "lucide-react";
import { SERVICES_DATA } from "@/data/mockData";
import { cardTone } from "@/components/ui/CardMotif";
import styles from "./ServiceCards.module.css";

const cards = [
  { slug: "web-development", icon: Code2, label: "WEB DEVELOPMENT", lead: "Websites", accent: "that work harder", description: "Responsive websites and web applications built for your business." },
  { slug: "graphic-design-branding", icon: PenTool, label: "DESIGN & BRANDING", lead: "Design", accent: "that stands out", description: "Memorable visual identities and creative assets for your brand." },
  { slug: "digital-marketing", icon: TrendingUp, label: "DIGITAL MARKETING", lead: "Marketing", accent: "that moves you forward", description: "Search, campaigns, and practical strategies to reach more customers." },
  { slug: "social-media-management", icon: MessagesSquare, label: "SOCIAL MEDIA", lead: "Social", accent: "made meaningful", description: "Consistent content and community management for your channels." },
];

export function ServiceCards() {
  return <div className={styles.grid}>{cards.map((card, index) => {
    const Icon = card.icon;
    const service = SERVICES_DATA.find(item => item.slug === card.slug) ?? SERVICES_DATA[index];
    return <Link href={`/services/${service.slug}`} className={`${styles.card} visual-card card-surface`} data-card-tone={cardTone(service.title)} key={service.id}>
      <div className={styles.top}><span className={styles.icon}><Icon size={22} strokeWidth={1.7} aria-hidden="true"/></span><span className={styles.category}>{card.label}</span></div>
      <div className={styles.copy}><h3>{card.lead} <span>{card.accent}</span></h3><p>{card.description}</p></div>
      <span className={styles.link}>Explore <ArrowRight size={16} aria-hidden="true"/></span>
    </Link>;
  })}</div>;
}
