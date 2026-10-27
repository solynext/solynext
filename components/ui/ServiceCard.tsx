import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogIcon } from "@/components/catalog/CatalogIcon";
import type { Service } from "@/lib/catalog/model";
import styles from "@/components/home/GrowthHero.module.css";
export function ServiceCard({service}:{service:Service}){return <Link href={`/services/${service.slug}`} className={styles.card} data-service-tone={service.category==="design"?"purple":service.category==="grow"?"teal":"blue"}><span className={styles.icon}><CatalogIcon name={service.icon}/></span><small style={{fontSize:10,letterSpacing:1,color:"#6b7f98",marginBottom:9}}>{service.tag}</small><h3>{service.name}</h3><p>{service.card_summary}</p><span className={styles.cardArrow} aria-hidden="true"><ArrowRight/></span><span style={{fontSize:11,color:"#2464bf",marginTop:8}}>Learn more</span></Link>;}