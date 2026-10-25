import Link from "next/link";
import { ArrowRight, Laptop, Paintbrush, ChartColumnIncreasing, Users, Layers3, Smartphone, PenTool } from "lucide-react";
import styles from "@/components/home/GrowthHero.module.css";

const appearances = {
  "web-development": { title: "Web Development", description: "Modern, high-performance websites that convert.", icon: Laptop, tone: "blue" },
  "graphic-design-branding": { title: "Graphic Design", description: "Creative designs that make your brand stand out.", icon: Paintbrush, tone: "purple" },
  "digital-marketing": { title: "Digital Marketing", description: "Data-driven strategies for real growth.", icon: ChartColumnIncreasing, tone: "teal" },
  "social-media-management": { title: "Social Media Management", description: "Engaging content that builds your community.", icon: Users, tone: "pink" },
  "software-development": { icon: Layers3, tone: "blue" },
  "mobile-development": { icon: Smartphone, tone: "teal" },
  "ui-ux-design": { icon: PenTool, tone: "purple" },
};
export const featuredServiceSlugs = ["web-development", "graphic-design-branding", "digital-marketing", "social-media-management"];
export function ServiceCard({ slug, title, description }: { slug: string; title: string; description: string }) {
  const appearance = appearances[slug as keyof typeof appearances];
  const Icon = appearance?.icon ?? Laptop;
  const displayTitle = appearance && "title" in appearance ? appearance.title : title;
  const displayDescription = appearance && "description" in appearance ? appearance.description : description;
  return <Link href={`/services/${slug}`} className={styles.card} data-service-tone={appearance?.tone ?? "blue"}>
    <span className={styles.icon}><Icon aria-hidden="true"/></span>
    <h3>{displayTitle}</h3><p>{displayDescription}</p>
    <span className={styles.cardArrow}><ArrowRight aria-hidden="true"/></span>
  </Link>;
}