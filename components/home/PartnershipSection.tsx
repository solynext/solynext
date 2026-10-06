import { CardMotif, cardTone } from "@/components/ui/CardMotif";
import Link from "next/link";
import { ArrowUpRight, PenTool, Code2, Cloud, GitBranch } from "lucide-react";
import styles from "./PartnershipSection.module.css";

const capabilities = [
  { title: "Product design", detail: "Turn your vision into an intuitive experience.", icon: PenTool, href: "/services/ui-ux-design", stage: "SHAPE" },
  { title: "Software engineering", detail: "Build a strong foundation for your next idea.", icon: Code2, href: "/services/software-development", stage: "BUILD" },
  { title: "Cloud & deployment", detail: "Bring your product online with confidence.", icon: Cloud, href: "/technologies", stage: "LAUNCH" },
  { title: "Long-term collaboration", detail: "Keep improving as your business evolves.", icon: GitBranch, href: "/pricing", stage: "EVOLVE" },
];

export function PartnershipSection() {
  return <section className={styles.section} aria-labelledby="partnership-title">
    <div className="premium-container">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}><span aria-hidden="true" />ONE PARTNER.</p><h2 id="partnership-title" className={styles.title}>From first sketch <span>to launch.</span></h2></div>
        <p className={styles.intro}>One connected team. <br />Every stage of your product.</p>
      </div>
      <div className={styles.grid}>{capabilities.map(({ title, detail, icon: Icon, href, stage }, index) =>
        <Link href={href} className={`${styles.card} partnership-capability visual-card`} key={title} data-card-tone={cardTone(title)}>
          <CardMotif kind={title}/>
          <div className={styles.cardTop}><span className={styles.icon}><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></span><span className={styles.stage}>0{index + 1} / {stage}</span></div>
          <h3>{title}</h3><p>{detail}</p>
          <span className={styles.arrow} aria-hidden="true"><ArrowUpRight size={18} /></span>
        </Link>
      )}</div>
    </div>
  </section>;
}
