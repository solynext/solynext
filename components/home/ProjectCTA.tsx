import Link from "next/link";
import { ArrowUpRight, Lightbulb, Layers3, Rocket } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import styles from "./ProjectCTA.module.css";

export function ProjectCTA() {
  return <section className={styles.section} aria-labelledby="project-cta-title"><div className="premium-container"><div className={styles.card}>
    <div className={styles.copy}><span className={styles.eyebrow}>LET&apos;S BUILD WHAT&apos;S NEXT</span><h2 id="project-cta-title">Big idea?<br/><span>Let&apos;s make it real.</span></h2><p>Tell us where you want to go. We&apos;ll help you figure out how to get there.</p><div className={styles.actions}><Link href="/contact" className={styles.button}>Start a project<ArrowUpRight size={21} aria-hidden="true"/></Link><span className={styles.caption}>A conversation is a great place to start.</span></div></div>
    <div className={styles.visual} aria-hidden="true"><div className={styles.logo}><BrandLogo size={88}/></div><span className={`${styles.orbitItem} ${styles.idea}`}><span className={styles.chip}><Lightbulb size={18}/>Your idea</span></span><span className={`${styles.orbitItem} ${styles.plan}`}><span className={styles.chip}><Layers3 size={18}/>A clear plan</span></span><span className={`${styles.orbitItem} ${styles.launch}`}><span className={styles.chip}><Rocket size={18}/>What&apos;s next</span></span></div>
  </div></div></section>;
}
