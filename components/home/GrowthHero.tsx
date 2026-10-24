import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Laptop, Paintbrush, ChartColumnIncreasing, Users } from "lucide-react";
import styles from "./GrowthHero.module.css";

const services = [
  { title: "Web Development", description: "Modern, high-performance websites that convert.", slug: "web-development", icon: Laptop },
  { title: "Graphic Design", description: "Creative designs that make your brand stand out.", slug: "graphic-design-branding", icon: Paintbrush },
  { title: "Digital Marketing", description: "Data-driven strategies for real growth.", slug: "digital-marketing", icon: ChartColumnIncreasing },
  { title: "Social Media Management", description: "Engaging content that builds your community.", slug: "social-media-management", icon: Users },
];

export function GrowthHero() {
  return <section className={styles.hero} aria-labelledby="growth-heading">
    <Image src="/images/digital-growth-globe.webp" alt="" fill priority sizes="100vw" className={styles.backdrop} />
    <div className={styles.container}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>WEB · DESIGN · MARKETING · SOCIAL MEDIA</p>
        <h1 id="growth-heading"><span className={styles.headlineLine}>Web Development, Design and</span>{" "}<span className={styles.headlineLine}>Marketing That <span className={styles.accent}>Grow Your Brand</span></span>{" "}<span className={`${styles.headlineLine} ${styles.desktopEnding} ${styles.accent}`}>Digitally and Globally</span></h1>
        <p className={styles.description}><span className={styles.descriptionLine}>We provide websites, graphic design, digital marketing and social media</span>{" "}<span className={styles.descriptionLine}>management that help your brand grow digitally and globally.</span></p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>Get a Free Consultation <ArrowRight aria-hidden="true" /></Link>
          <Link href="/portfolio" className={styles.secondary}>View Our Work <ArrowRight aria-hidden="true" /></Link>
        </div>
        <p className={styles.note}><Globe2 aria-hidden="true" /> Based in Pakistan. Built for the world.</p>
      </div>
    </div>
  </section>;
}

export function GrowthServices() {
  return <section id="services" className={styles.services} aria-labelledby="growth-services-heading">
    <div className={styles.container}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}>OUR SERVICES</p><h2 id="growth-services-heading">Everything You Need<br />to Grow Your Brand</h2></div>
        <Link href="/services" className={styles.viewAll}>View All <ArrowRight aria-hidden="true" /></Link>
      </div>
      <div className={styles.cards}>{services.map(({ title, description, slug, icon: Icon }) =>
        <Link href={`/services/${slug}`} className={styles.card} key={slug}>
          <span className={styles.icon}><Icon aria-hidden="true" /></span>
          <h3>{title}</h3><p>{description}</p>
          <span className={styles.cardArrow}><ArrowRight aria-hidden="true" /></span>
        </Link>
      )}</div>
    </div>
  </section>;
}
