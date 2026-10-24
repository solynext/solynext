import Link from "next/link";
import { ArrowUpRight, Lightbulb, MessagesSquare, Blocks, Globe2 } from "lucide-react";
import styles from "./HomeAbout.module.css";

const principles = [
  { title: "Product thinking", description: "Technology guided by your business and users.", icon: Lightbulb },
  { title: "Open collaboration", description: "Clear communication and regular progress updates.", icon: MessagesSquare },
  { title: "Built for the long term", description: "Maintainable foundations for your next step.", icon: Blocks },
];

export function HomeAbout() {
  return <section className={`premium-section ${styles.section}`} aria-labelledby="home-about-title"><div className={`premium-container ${styles.layout}`}>
    <div className={styles.intro}><p className="eyebrow">YOUR DIGITAL GROWTH PARTNER</p><h2 id="home-about-title">Creative thinking.<br/><span>Measurable progress.</span></h2><p className={styles.description}>SolyNext is a Pakistan-based digital solutions company. We bring web development, creative design, digital marketing, and social media management together to help businesses build a clear, consistent online presence.</p><Link href="/about" className={styles.link}>Meet SolyNext<span><ArrowUpRight size={18} aria-hidden="true"/></span></Link><div className={styles.location}><span><Globe2 size={18} aria-hidden="true"/></span><div><strong>Rooted in Pakistan.</strong><p>Supporting businesses everywhere.</p></div></div></div>
    <div className={styles.principles}>{principles.map(({ title, description, icon: Icon }, index) => <article key={title} className={`${styles.card} visual-card card-surface`} data-card-tone={["purple", "cyan", "pink"][index]} data-tone={index}><span className={styles.icon}><Icon size={23} strokeWidth={1.8} aria-hidden="true"/></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
  </div></section>;
}
