import Link from "next/link";
import { ArrowUpRight, PenTool, Code2, TrendingUp, MessagesSquare } from "lucide-react";
import styles from "./PartnershipSection.module.css";

const capabilities = [
  { title: "Web development", detail: "Build a polished, responsive website for your business.", icon: Code2, href: "/services/web-development", stage: "BUILD" },
  { title: "Creative design", detail: "Create a distinctive identity and consistent brand assets.", icon: PenTool, href: "/services/graphic-design-branding", stage: "CREATE" },
  { title: "Digital marketing", detail: "Reach the right audience with search and digital campaigns.", icon: TrendingUp, href: "/services/digital-marketing", stage: "GROW" },
  { title: "Social media management", detail: "Plan content and build stronger online communities.", icon: MessagesSquare, href: "/services/social-media-management", stage: "CONNECT" },
];

export function PartnershipSection() {
  return <section className={styles.section} aria-labelledby="partnership-title">
    <div className="premium-container">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}><span aria-hidden="true" />ONE DIGITAL PARTNER.</p><h2 id="partnership-title" className={styles.title}>From first impression <span>to lasting growth.</span></h2></div>
        <p className={styles.intro}>One connected team. <br />A stronger presence at every step.</p>
      </div>
      <div className={styles.grid}>{capabilities.map(({ title, detail, icon: Icon, href, stage }) =>
        <Link href={href} className={styles.card} key={title}>
          <div className={styles.cardTop}><span className={styles.icon}><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className={styles.stage}>{stage}</span></div>
          <h3>{title}</h3><p>{detail}</p>
          <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>
      )}</div>
    </div>
  </section>;
}
