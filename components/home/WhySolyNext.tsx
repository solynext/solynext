import Link from "next/link";
import { ArrowUpRight, ShieldCheck, SlidersHorizontal, Store, UsersRound } from "lucide-react";
import styles from "./WhySolyNext.module.css";

const reasons = [
  { title: <>One team.<br />Less hassle.</>, description: "Your tech, design and marketing experts, working together.", icon: UsersRound },
  { title: <>Expertise within<br />your budget.</>, description: "Flexible support matched to your goals and budget.", icon: SlidersHorizontal },
  { title: <>We build.<br />We run businesses.</>, description: "Practical experience from businesses we operate ourselves.", icon: Store },
  { title: <>Your project.<br />Your ownership.</>, description: "Clear updates, with your code, designs and data in your hands.", icon: ShieldCheck },
];

export function WhySolyNext() {
  return <section className={styles.section} aria-labelledby="why-solynext-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>WHY SOLYNEXT</p>
        <h2 id="why-solynext-title">Big expertise.<br />A <span>simpler</span> way forward.</h2>
        <p className={styles.subheading}>The right people, working together for your business.</p>
      </header>
      <div className={styles.reasons}>
        {reasons.map(({ title, description, icon: Icon }, index) => <article className={styles.reason} key={index}>
          <Icon className={styles.icon} size={56} strokeWidth={1.8} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
      <Link href="/contact" className={styles.link}><span aria-hidden="true" />Let’s build your next step <ArrowUpRight size={19} aria-hidden="true" /></Link>
    </div>
  </section>;
}
