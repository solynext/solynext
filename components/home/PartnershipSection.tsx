import Link from "next/link";
import { ArrowUpRight, Building2, Check, GraduationCap, Handshake, Package, UsersRound } from "lucide-react";
import styles from "./PartnershipSection.module.css";

const partnerships = [
  {
    title: "Product partnerships",
    detail: "Bring a software idea or an existing product. We can build together, introduce it to new customers, and grow it over time.",
    points: ["Build together", "List your product", "Share growth"],
    action: "For product owners",
    href: "/contact?solution=Product%20partnership",
    icon: Package,
    tone: "blue",
  },
  {
    title: "Service collaboration",
    detail: "Work with us on client projects, share complementary services, or bring our team into your delivery.",
    points: ["Share clients", "Deliver together", "Expert support"],
    action: "For agencies & experts",
    href: "/contact?solution=Service%20collaboration",
    icon: Handshake,
    tone: "teal",
  },
  {
    title: "Business partnerships",
    detail: "Explore a new venture, find ways to grow an existing business, or discuss an investment with our team.",
    points: ["New ventures", "Business growth", "Investment options"],
    action: "For partners & investors",
    href: "/contact?solution=Business%20partnership",
    icon: Building2,
    tone: "violet",
  },
];

const partnerTypes = [
  { label: "Agencies", icon: UsersRound },
  { label: "Experts", icon: GraduationCap },
  { label: "Product owners", icon: Package },
  { label: "Investors", icon: Building2 },
];

export function PartnershipSection() {
  return <section className={styles.section} aria-labelledby="partnership-title">
    <div className="premium-container">
      <header className={styles.heading}>
        <p className={styles.eyebrow}>PARTNERSHIPS &amp; COLLABORATION</p>
        <h2 id="partnership-title">More ways to work<br/><span>with SolyNext.</span></h2>
        <p>We partner on products, services, and new business ideas. Whether you are an agency, expert, product owner, or investor, we can build together.</p>
      </header>

      <div className={styles.grid}>
        {partnerships.map(({ title, detail, points, action, href, icon: Icon, tone }) =>
          <article className={styles.card} data-tone={tone} key={title}>
            <span className={styles.cardIcon}><Icon size={25} strokeWidth={1.8} aria-hidden="true"/></span>
            <h3>{title}</h3>
            <p className={styles.detail}>{detail}</p>
            <ul>{points.map(point => <li key={point}><Check size={16} aria-hidden="true"/>{point}</li>)}</ul>
            <Link href={href} className={styles.cardLink}>{action}<ArrowUpRight size={16} aria-hidden="true"/></Link>
          </article>
        )}
      </div>

      <div className={styles.audience} aria-label="Who we work with">
        {partnerTypes.map(({ label, icon: Icon }) => <span key={label}><Icon size={19} aria-hidden="true"/>{label}</span>)}
      </div>

      <div className={styles.callout}>
        <div><h3>Have an idea, product, or partnership in mind?</h3><p>Let’s talk about how we can build it together.</p></div>
        <Link href="/contact?solution=General%20partnership">Start a partnership<ArrowUpRight size={17} aria-hidden="true"/></Link>
      </div>
    </div>
  </section>;
}
