import Link from "next/link";
import { ArrowRight, Code2, Layers3, Smartphone, PenTool } from "lucide-react";
import { SERVICES_DATA } from "@/data/mockData";
import { cardTone } from "@/components/ui/CardMotif";
import styles from "./ServiceCards.module.css";

const cards = [
  { icon: Code2, label: "WEB DEVELOPMENT", lead: "Web", accent: "applications", description: "Fast, responsive websites and web apps." },
  { icon: Layers3, label: "CUSTOM SOFTWARE", lead: "Custom", accent: "software", description: "Software shaped around your workflows." },
  { icon: Smartphone, label: "MOBILE PRODUCTS", lead: "Mobile", accent: "applications", description: "Mobile experiences for iOS and Android." },
  { icon: PenTool, label: "PRODUCT DESIGN", lead: "UI/UX &", accent: "product design", description: "Clear interfaces and thoughtful user experiences." },
];

export function ServiceCards() {
  return <div className={styles.grid}>{cards.map((card, index) => {
    const Icon = card.icon;
    const service = SERVICES_DATA[index];
    return <Link href={`/services/${service.slug}`} className={`${styles.card} visual-card card-surface`} data-card-tone={cardTone(service.title)} key={service.id}>
      <div className={styles.top}><span className={styles.icon}><Icon size={22} strokeWidth={1.7} aria-hidden="true"/></span><span className={styles.category}>{card.label}</span></div>
      <div className={styles.copy}><h3>{card.lead} <span>{card.accent}</span></h3><p>{card.description}</p></div>
      <span className={styles.link}>Explore <ArrowRight size={16} aria-hidden="true"/></span>
    </Link>;
  })}</div>;
}
