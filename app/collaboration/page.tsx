import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Handshake, Lightbulb, Package, UsersRound, Building2, GraduationCap } from "lucide-react";
import { getPageMetadata } from "@/lib/seo/metadata";
import styles from "./Collaboration.module.css";

export async function generateMetadata() {
  return getPageMetadata("/collaboration", {
    title: "Partnerships & Collaboration | SolyNext",
    description: "Partner with SolyNext on products, client services, and new business ideas. Explore collaboration options for agencies, experts, product owners, and investors.",
  });
}

const opportunities = [
  {
    title: "Product partnerships",
    description: "Bring a software idea or an existing product. We can work together to shape the roadmap, build the product, and reach more customers.",
    points: ["Co-build digital products", "Add technical delivery capacity", "Grow through shared opportunities"],
    audience: "For product owners",
    icon: Package,
    tone: "blue",
  },
  {
    title: "Service collaboration",
    description: "Team up on client work with a dependable digital delivery partner for web, design, and marketing services.",
    points: ["Extend your service offering", "Share delivery capacity", "Work together on client projects"],
    audience: "For agencies & experts",
    icon: Handshake,
    tone: "green",
  },
  {
    title: "Business partnerships",
    description: "Explore a new venture, support the next stage of an existing business, or discuss an investment opportunity.",
    points: ["Explore new ventures", "Support business growth", "Discuss investment opportunities"],
    audience: "For partners & investors",
    icon: Building2,
    tone: "violet",
  },
];

const audiences = [
  { label: "Agencies", icon: UsersRound },
  { label: "Independent experts", icon: GraduationCap },
  { label: "Product owners", icon: Package },
  { label: "Investors", icon: Building2 },
];

export default function CollaborationPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}><span />PARTNERSHIPS &amp; COLLABORATION</p>
          <h1>More ways to work <span>with SolyNext.</span></h1>
          <p className={styles.lead}>We partner on products, services, and new business ideas. Whether you are an agency, expert, product owner, or investor, we can build together.</p>
          <Link href="/contact?solution=General%20partnership" className={styles.primary}>Start a conversation <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className={styles.opportunities} aria-labelledby="opportunities-title">
        <div className={styles.container}>
          <header className={styles.sectionHeading}>
            <div><p className={styles.sectionKicker}>WAYS TO PARTNER</p><h2 id="opportunities-title">Good work gets better <span>together.</span></h2></div>
            <p>Bring your experience, product, or opportunity. We will bring a connected digital team and a practical approach to delivery.</p>
          </header>

          <div className={styles.cards}>
            {opportunities.map(({ title, description, points, audience, icon: Icon, tone }) => (
              <article className={styles.card} data-tone={tone} key={title}>
                <span className={styles.cardIcon}><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
                <p className={styles.cardAudience}>{audience}</p>
                <h3>{title}</h3>
                <p className={styles.cardDescription}>{description}</p>
                <ul>{points.map(point => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}</ul>
                <Link href={`/contact?solution=${encodeURIComponent(title)}`} className={styles.cardLink}>Explore this partnership <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>

          <div className={styles.audiences} aria-label="Who we work with">
            {audiences.map(({ label, icon: Icon }) => <span key={label}><Icon size={20} aria-hidden="true" />{label}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.container}>
          <div className={styles.approachCard}>
            <span className={styles.approachIcon}><Lightbulb size={23} aria-hidden="true" /></span>
            <div><p className={styles.sectionKicker}>A CLEAR START</p><h2>Start with a conversation.</h2><p>Tell us what you are building, who you serve, and where you need a partner. We will discuss fit, responsibilities, and a sensible next step—without pressure.</p></div>
            <Link href="/contact?solution=General%20partnership">Talk with our team <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
