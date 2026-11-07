import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { ServiceCategoryPage, ServicePageDetail } from "@/lib/catalog/service-category-pages";
import styles from "./ServiceDirectoryDetail.module.css";

export function ServiceDirectoryDetail({
  category,
  service,
}: {
  category: ServiceCategoryPage;
  service?: ServicePageDetail;
}) {
  const title = service?.name ?? category.title;
  const description = service?.description ?? category.description;
  const services = category.details.filter(item => item.slug !== service?.slug);

  return (
    <main id="main-content" className={`premium-home ${styles.page}`}>
      <div className="premium-container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>
          {service && <>
            <Link href={category.href}>{category.title}</Link>
            <span aria-hidden="true">/</span>
          </>}
          <span aria-current="page">{title}</span>
        </nav>
        <header className={styles.hero}>
          <div>
            <p className={styles.label}>{service ? category.title : "SolyNext Services"}</p>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
            <Link href="/contact" className={styles.action}>
              Discuss your project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.heroImage}>
            <Image src={service?.image ?? category.image} alt="" fill unoptimized />
          </div>
        </header>
        {service && service.includes.length > 0 && (
          <section className={styles.section} aria-labelledby="included-heading">
            <h2 id="included-heading">What’s included</h2>
            <ul className={styles.includes} role="list">
              {service.includes.map(item => (
                <li key={item}><Check size={18} aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </section>
        )}
        <section className={styles.section} aria-labelledby="related-services-heading">
          <h2 id="related-services-heading">{service ? `More in ${category.title}` : `Explore ${category.title} services`}</h2>
          {!services.length && <p>No other services are published in this category.</p>}
          <div className={styles.grid}>
            {services.map(item => (
              <Link href={item.href} key={item.slug} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={item.image} alt="" fill unoptimized />
                </div>
                <div className={styles.cardBody}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>View service <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
