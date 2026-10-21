import Link from "next/link";
import { ArrowUpRight, Lightbulb, Layers3, Rocket } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import styles from "./ProjectCTA.module.css";

export function ProjectCTA() {
  return <section className={styles.section} aria-labelledby="project-cta-title"><div className="premium-container"><div className={`${styles.card} visual-card card-surface`} data-card-tone="pink">
    <div className={styles.copy}><span className={styles.eyebrow}><span/>LET&apos;S BUILD WHAT&apos;S NEXT</span><h2 id="project-cta-title">Big idea?<br/><span>Let&apos;s make it real.</span></h2><p>Tell us where you want to go. We&apos;ll help you figure out how to get there.</p><Link href="/contact" className={styles.button}>Start a project<span><ArrowUpRight size={21} aria-hidden="true"/></span></Link><span className={styles.caption}>A conversation is a great place to start.</span></div>
    <div className={styles.visual} aria-hidden="true"><div className={styles.orbit}/><div className={styles.innerOrbit}/><div className={styles.logo}><BrandLogo size={96}/></div><span className={`${styles.chip} ${styles.idea}`}><Lightbulb size={18}/>Your idea</span><span className={`${styles.chip} ${styles.plan}`}><Layers3 size={18}/>A clear plan</span><span className={`${styles.chip} ${styles.launch}`}><Rocket size={18}/>What&apos;s next</span><span className={styles.dotOne}/><span className={styles.dotTwo}/></div>
  </div></div></section>;
}
