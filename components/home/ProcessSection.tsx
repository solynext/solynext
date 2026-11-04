"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Code2, Compass, PanelsTopLeft, Rocket, ShieldCheck } from "lucide-react";
import styles from "./ProcessSection.module.css";

const stages = [
  { title: "Discover", timeline: "Project kickoff", description: "Align on your goals, users, scope, and measures of success.", deliverable: "A clear project plan", icon: Compass },
  { title: "Plan & design", timeline: "Product definition", description: "Map user journeys and shape the experience before development.", deliverable: "Approved designs", icon: PanelsTopLeft },
  { title: "Build & integrate", timeline: "Focused delivery", description: "Develop in clear milestones and connect the tools you rely on.", deliverable: "Working product", icon: Code2 },
  { title: "Test & refine", timeline: "Before release", description: "Check quality, usability, security, and performance across devices.", deliverable: "Launch-ready release", icon: ShieldCheck },
  { title: "Launch & support", timeline: "Ongoing partnership", description: "Go live with a smooth handover and support for what comes next.", deliverable: "A supported launch", icon: Rocket },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.24 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  const [activeStage, setActiveStage] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) return;
    const delay = activeStage === stages.length ? 2300 : 1600;
    const timer = window.setTimeout(() => {
      setActiveStage(activeStage === stages.length ? 0 : activeStage + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [visible, activeStage, reducedMotion]);

  const progress = Math.min(activeStage, stages.length - 1) / (stages.length - 1) * 100;

  return <section ref={sectionRef} className={styles.section} aria-labelledby="process-section-title" data-visible={visible}>
    <div className={styles.container}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>HOW WE WORK</p>
        <h2 id="process-section-title">A clear path from<br/><span>idea to launch.</span></h2>
        <p>Know what happens next at every stage of your project.</p>
      </header>
      <div className={styles.grid}>
        <div className={styles.rail} aria-hidden="true"><span className={styles.railProgress} style={{ width: `${progress}%` }}/><span className={styles.traveler} style={{ left: `${progress}%` }}/></div>
        {stages.map(({ title, timeline, description, deliverable, icon: Icon }, index) => {
          const state = index < activeStage ? "complete" : index === activeStage ? "active" : "upcoming";
          return <article className={styles.card} key={title} data-state={state} aria-current={state === "active" ? "step" : undefined}>
          <div className={styles.cardTop}><span className={styles.icon}><Icon size={20} strokeWidth={1.8} aria-hidden="true"/></span><span className={styles.status} aria-hidden="true">{state === "complete" ? <Check size={13}/> : state === "active" ? <span/> : null}</span><span className={styles.timeline}>{timeline}</span></div>
          <h3>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.deliverable}><Check size={15} aria-hidden="true"/><span>{deliverable}</span></div>
        </article>;
        })}
      </div>
      <Link href="/process" className={styles.link}>Explore our process <ArrowRight size={17} aria-hidden="true"/></Link>
    </div>
  </section>;
}
