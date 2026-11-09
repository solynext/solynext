import Link from "next/link";
import { ArrowUpRight, Compass, Search, Store, TrendingUp } from "lucide-react";
import styles from "./WhySolyNext.module.css";

const reasons = [
  { title: "We run businesses.", description: "We have our own successful businesses in different industries. Our advice comes from real experience, not theory.", icon: Store },
  { title: "We focus on your growth.", description: "Our goal is not just to deliver a service. We work for more sales, more revenue and a stronger business.", icon: TrendingUp },
  { title: "Experts who know your industry.", description: "Our marketing, web and social media experts study your market, your problems and your potential before they start.", icon: Search },
  { title: "Guidance that avoids mistakes.", description: "We advise on strategy, policy and daily operations, so you avoid the common mistakes that hold businesses back.", icon: Compass },
];

export function WhySolyNext() {
  return (
    <section className={styles.section} aria-labelledby="why-solynext-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>WHY SOLYNEXT</p>
          <h2 id="why-solynext-title">Experience that <span>grows your business.</span></h2>
          <p className={styles.subheading}>Many businesses can’t manage an IT team, lack experienced people, or can’t afford a full expert team. SolyNext solves this with one affordable team of tech, design and marketing experts. We run our own businesses, so we know what works, and we focus on real sales and growth.</p>
          <Link href="/contact" className={styles.link}>
            Let’s build your next step <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </header>
        <ul className={styles.reasons} role="list">
          {reasons.map(({ title, description, icon: Icon }) => (
            <li className={styles.reason} key={title}>
              <div className={styles.icon}>
                <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
