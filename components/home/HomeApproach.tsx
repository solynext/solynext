import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./HomeApproach.module.css";

const outcomes = [
  { title: <>Reach more<br />customers</>, detail: "Websites, branding and marketing that work together." },
  { title: <>Find the right<br />software</>, detail: "Ready-made tools or a custom solution built for your business." },
  { title: <>Simplify<br />everyday work</>, detail: "AI automation and connected systems that save time." },
];

export function HomeApproach() {
  return <section className={styles.section} aria-labelledby="home-approach-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <h2 id="home-approach-title">What your business needs.<br/>Connected in <span>one place.</span></h2>
      </header>
      <div className={styles.outcomes}>
        {outcomes.map((outcome, index) => <article className={styles.outcome} key={index}>
          <span className={styles.outcomeNumber}>0{index + 1}</span>
          <div className={styles.circleContent}>
            <h3>{outcome.title}</h3>
            <p>{outcome.detail}</p>
          </div>
          <span className={styles.outcomeMark} aria-hidden="true"><ArrowUpRight size={17}/></span>
        </article>)}
      </div>
    </div>
  </section>;
}
