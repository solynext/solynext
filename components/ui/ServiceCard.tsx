import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CatalogIcon } from "@/components/catalog/CatalogIcon";
import type { Service } from "@/lib/catalog/model";
import c from "@/components/catalog/Catalog.module.css";
export function ServiceCard({service}:{service:Service}){const offerings=service.sub_services?.length?service.sub_services.map(row=>row.name):service.what_we_deliver;return <Link href={`/services/${service.slug}`} className={c.serviceCard} data-tone={service.category}><div className={c.serviceTop}><span className={c.cardIcon}><CatalogIcon name={service.icon}/></span><span className={c.serviceTag}>{service.tag}</span><ArrowUpRight size={20} className={c.serviceArrow}/></div><h3>{service.name}</h3><p>{service.card_summary}</p><ul>{offerings.slice(0,3).map(name=><li key={name}>{name}</li>)}</ul><span className={c.cardLink}>Explore service <span>{offerings.length} capabilities</span></span></Link>;}
