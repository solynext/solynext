import { SERVICES_DATA } from "@/data/mockData";
import { ServiceCard, featuredServiceSlugs } from "@/components/ui/ServiceCard";
import styles from "./GrowthHero.module.css";
export function ServiceCards() {
  return <div className={styles.cards}>{featuredServiceSlugs.map(slug => {
    const service = SERVICES_DATA.find(item => item.slug === slug);
    return service ? <ServiceCard key={slug} slug={slug} title={service.title} description={service.shortDescription}/> : null;
  })}</div>;
}