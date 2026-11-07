import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { serviceCategoryPages } from "@/lib/catalog/service-category-pages";
import styles from "./ServicesOverview.module.css";

export function ServicesOverview({ standalone = false }: { standalone?: boolean }) {
  const Subheading = standalone ? "h2" : "h3";
  const headingId = standalone ? "service-pillars-title" : "growth-services-heading";

  return (
    <section id={standalone ? undefined : "services"} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.container}>
        {standalone ? (
          <header className={styles.hero}>
            <p className={styles.heroLabel}>SOLYNEXT SERVICES</p>
            <h1 id={headingId}>Build, grow, and <span>run your business.</span></h1>
            <p className={styles.heroDescription}>
              Launch a website, app, or online store. Reach more customers with marketing, get support
              with day-to-day operations, and automate repetitive work with AI. Work with one team
              from planning through launch and ongoing support.
            </p>
            <div className={styles.heroActions}>
              <Link href="#service-categories" className={styles.heroPrimary}>
                Explore services <ArrowDown aria-hidden="true" />
              </Link>
              <Link href="/contact" className={styles.heroSecondary}>
                Discuss your project <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </header>
        ) : (
          <>
            <h2 id={headingId} className={styles.heading}>Our services. <span>Your next step.</span></h2>
            <p className={styles.intro}>Web development, marketing, business management<br />and AI automation — from one team.</p>
          </>
        )}
        <div className={styles.grid} id={standalone ? "service-categories" : undefined}>
          {serviceCategoryPages.map(({ slug, title, description, href, details }) => (
            <article className={styles.card} key={slug}>
              <div className={styles.summary}>
                <Subheading className={styles.title}>{title}</Subheading>
                <p>{description}</p>
              </div>
              <ul className={details.length > 5 ? styles.scrollList : undefined} role="list">
                {details.map(service => (
                  <li key={service.slug}>
                    <Link
                      className={styles.serviceLink}
                      href={service.href}
                    >
                      <ArrowUpRight aria-hidden="true" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className={styles.button}
                href={href}
                aria-label={`View category details for ${title}`}
              >
                View category details <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
