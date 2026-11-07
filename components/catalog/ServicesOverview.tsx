import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { slugify } from "@/lib/catalog/model";
import styles from "./ServicesOverview.module.css";

const groups = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Websites, apps and software built around your business.",
    services: ["Business Websites", "E-commerce Stores", "Web Apps & Portals", "Mobile Apps (Android & iOS)", "Custom Software", "POS & Business Software", "AI-Powered Development"],
  },
  {
    slug: "marketing",
    title: "Marketing",
    description: "Get seen, get trusted and get customers.",
    services: ["Digital Marketing", "SEO", "Social Media Marketing", "Influencer Marketing", "Branding & Graphic Design"],
  },
  {
    slug: "business-management",
    title: "Business Management",
    description: "We run your business, so you can focus on growth.",
    services: ["Full Business Management", "Social Media Management", "Sales & Customer Management", "Online Store & Marketplace Management", "Growth Planning & Consultation"],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    description: "AI agents and automation that work for your business.",
    services: ["AI Agents & Agentic AI", "AI Chatbots & Assistants", "AI Voice Agents", "RAG Knowledge Assistants", "WhatsApp Automation", "Sales Automation", "Workflow & Business Automation", "AI-Based Software", "AI ERP & Business Systems"],
  },
];

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
            <p className={styles.intro}>Web development, marketing, business management and AI automation — from one team.</p>
          </>
        )}
        <div className={styles.grid} id={standalone ? "service-categories" : undefined}>
          {groups.map(({ slug, title, description, services }) => (
            <article className={styles.card} key={slug}>
              <div className={styles.summary}>
                <Subheading className={styles.title}>{title}</Subheading>
                <p>{description}</p>
              </div>
              <ul className={services.length > 5 ? styles.scrollList : undefined} role="list">
                {services.map(service => (
                  <li key={service}>
                    <Link
                      className={styles.serviceLink}
                      href={`${standalone ? "" : "/services"}#service-details-${slug}-${slugify(service)}`}
                    >
                      <ArrowUpRight aria-hidden="true" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className={styles.button}
                href={`${standalone ? "" : "/services"}#service-details-${slug}`}
                aria-label={`View service details for ${title}`}
              >
                View service details <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
