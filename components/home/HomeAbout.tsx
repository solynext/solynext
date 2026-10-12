import Link from "next/link";
import { ArrowUpRight, Lightbulb, MessagesSquare, Blocks, Globe2 } from "lucide-react";
import styles from "./HomeAbout.module.css";

const principles = [
  { title: "Product thinking", description: "We connect technical decisions to the needs of your business and users.", icon: Lightbulb },
  { title: "Open collaboration", description: "Shared repositories, sprint reviews, and working builds keep you involved.", icon: MessagesSquare },
  { title: "Built for the long term", description: "Maintainable code and considered architecture make room for your next step.", icon: Blocks },
];

export function HomeAbout() {
  return <section className={`premium-section ${styles.section}`} aria-labelledby="home-about-title"><div className={`premium-container ${styles.layout}`}>
    <div className={styles.intro}><p className="eyebrow">04 / THE PEOPLE BEHIND THE PRODUCT</p><h2 id="home-about-title">Technical by nature.<br/><span>Human by design.</span></h2><p className={styles.description}>SolyNext is a Pakistan-based software and digital technology company. We bring product design, engineering, and digital growth together to help businesses build what comes next.</p><Link href="/about" className={styles.link}>Meet SolyNext<span><ArrowUpRight size={18} aria-hidden="true"/></span></Link><div className={styles.location}><span><Globe2 size={18} aria-hidden="true"/></span><div><strong>Rooted in Pakistan.</strong><p>Building for what comes next.</p></div></div></div>
    <div className={styles.principles}>{principles.map(({ title, description, icon: Icon }, index) => <article key={title} className={styles.card} data-tone={index}><span className={styles.icon}><Icon size={23} strokeWidth={1.8} aria-hidden="true"/></span><div><span className={styles.number}>0{index + 1} / OUR APPROACH</span><h3>{title}</h3><p>{description}</p></div></article>)}</div>
  </div></section>;
}
