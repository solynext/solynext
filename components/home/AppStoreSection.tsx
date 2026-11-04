import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./AppStoreSection.module.css";

const collections = [
  { image: "/images/appstore-business.jpg", alt: "Business management dashboard preview", title: "Run your business better", detail: "POS, ERP, billing & inventory", href: "/solynext-apps", tone: "blue" },
  { image: "/images/appstore-website.jpg", alt: "Modern online store and website preview", title: "Find your next website", detail: "Stores, business sites & web apps", href: "/services/web-development", tone: "sand" },
  { image: "/images/appstore-inspiration.jpg", alt: "Property and travel website references", title: "Start with the right inspiration", detail: "Reference websites & live demos", href: "/portfolio", tone: "lilac" },
];

export function AppStoreSection() {
  return <section className={styles.section} aria-labelledby="app-store-heading">
    <div className={styles.container}>
      <header className={styles.heading}>
        <h2 id="app-store-heading">Your business needs it.<br/><span>Find it here.</span></h2>
        <Link className={styles.headingLink} href="/solynext-apps">Explore all apps <ArrowUpRight size={17} aria-hidden="true"/></Link>
      </header>
      <nav className={styles.categories} aria-label="Explore SolyNext collections">
        <Link href="/solynext-apps" className={styles.active}>Business software</Link>
        <Link href="/services/web-development">Websites</Link>
        <Link href="/services/software-development">Web apps &amp; SaaS</Link>
        <Link href="/portfolio">Reference demos</Link>
      </nav>
      <div className={styles.grid}>
        {collections.map((item) => <Link className={styles.card} data-tone={item.tone} href={item.href} key={item.title}>
          <span className={styles.preview}><Image src={item.image} alt={item.alt} fill sizes="(max-width:650px) 92vw, (max-width:1000px) 46vw, 32vw"/></span>
          <span className={styles.cardCopy}><span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowUpRight size={22} aria-hidden="true"/></span>
        </Link>)}
      </div>
    </div>
  </section>;
}
