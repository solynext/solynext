import Link from "next/link";
import { ArrowRight, Code2, Layers3, Smartphone, PenTool } from "lucide-react";
import { SERVICES_DATA } from "@/data/mockData";
import { cardTone } from "@/components/ui/CardMotif";
import styles from "./ServiceCards.module.css";

const cards = [
  { icon: Code2, lead: "Web", accent: "applications", theme: "web", tags: ["Next.js", "React", "APIs"], more: "+3 more" },
  { icon: Layers3, lead: "Custom", accent: "software", theme: "software", tags: ["Node.js", "Python", "Databases"], more: "+3 more" },
  { icon: Smartphone, lead: "Mobile", accent: "applications", theme: "mobile", tags: ["React Native", "Android", "iOS"], more: "+3 more" },
  { icon: PenTool, lead: "UI/UX &", accent: "product design", theme: "design", tags: ["Figma", "Design Systems", "Prototyping"], more: "+2 more" },
];

export function ServiceCards() {
  return <div className={styles.grid}>{cards.map((card, index) => {
    const Icon = card.icon;
    const service = SERVICES_DATA[index];
    return <Link href={`/services/${service.slug}`} className={`${styles.card} ${styles[card.theme]} visual-card card-surface`} data-card-tone={cardTone(service.title)} key={service.id}>
      <div className={styles.top}><span className={styles.icon}><Icon size={38} strokeWidth={2.2}/></span><span className={styles.category}>{index === 3 ? "Design" : "Engineering"}</span></div>
      <div className={styles.copy}><h3>{card.lead} <span>{card.accent}</span></h3><p>{service.shortDescription}</p></div>
      <div className={styles.tags}>{card.tags.map(tag => <span key={tag}>{tag}</span>)}<span className={styles.more}>{card.more}</span></div>
      <span className={styles.link}>View Details <ArrowRight size={22}/><i aria-hidden="true"/></span>
    </Link>;
  })}</div>;
}
