import { publicOfferings,publicSection } from "@/lib/catalog/repository";
import type { Service,HomeSection } from "@/lib/catalog/model";
import { ServiceCard } from "@/components/ui/ServiceCard";
import styles from "./GrowthHero.module.css";
export async function ServiceCards(){const[items,settings]=await Promise.all([publicOfferings("services"),publicSection("home_services_section")]);const section=settings as HomeSection;return <div className={styles.cards}>{(items as Service[]).filter(item=>item.is_featured).sort((a,b)=>(a.featured_order??9999)-(b.featured_order??9999)).slice(0,section.max_items).map(service=><ServiceCard key={service.id} service={service}/>)}</div>;}