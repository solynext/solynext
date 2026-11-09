"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import theme from "./HomeOfferingsOverview.module.css";
import styles from "./ProcessSection.module.css";

const steps = [
  {
    name: "Free consultation",
    title: "Tell us your goal",
    description: "Talk to our team about your idea, needs, budget and future plans. If you already run a business, we look at how it works today and what you have tried before.",
    outcome: "a clear picture of what you need.",
  },
  {
    name: "Research and feasibility",
    title: "We find the right path",
    description: "Our business and software experts study the market, costs, risks and options. We share the findings and agree on the best fit for you.",
    outcome: "the best option, backed by research.",
  },
  {
    name: "Plan and approval",
    title: "Review and approve",
    description: "We prepare a full report with scope, budget, timeline, milestones and testing. Nothing starts until you approve it.",
    outcome: "a clear plan you have approved.",
  },
  {
    name: "Start and progress",
    title: "We put the plan into action",
    description: "We build the foundation, do the work and test as we go. At every key stage, we show you the progress and take your feedback.",
    outcome: "visible progress, step by step.",
  },
  {
    name: "Delivery and support",
    title: "We deliver and stay with you",
    description: "We hand over the finished work and help you get started. After handover, we keep supporting you with fixes, updates, training and guidance. Support can continue for one or two years, or longer as a partner.",
    outcome: "a supported launch and long-term growth.",
    badge: "Support continues",
  },
];

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % steps.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + steps.length) % steps.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = steps.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className={theme.section} aria-labelledby="process-section-title">
      <div className={theme.container}>
        <div className={theme.intro}>
          <p className={theme.eyebrow}>HOW WE WORK</p>
          <h2 id="process-section-title" className={styles.heading}>From first talk to <span>long-term support.</span></h2>
          <p className={styles.intro}>Every project starts with a free consultation. We understand your goals, check what is possible, and agree on a plan before any work begins. And after we deliver, we stay with you.</p>
          <div className={styles.tabs} role="tablist" aria-label="The 5 steps">
            {steps.map(({ name }, index) => (
              <button
                key={name}
                ref={element => { tabRefs.current[index] = element; }}
                className={`${theme.tab} ${styles.tab}`}
                id={`home-process-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`home-process-panel-${index}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={event => handleTabKeyDown(event, index)}
              >
                <span className={theme.tabIcon} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className={theme.tabCopy}><strong>{name}</strong></span>
                <ArrowRight className={theme.tabArrow} size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          {steps.map(({ name, title, description, outcome, badge }, index) => (
            <div
              key={name}
              className={activeIndex === index ? theme.detail : undefined}
              role="tabpanel"
              id={`home-process-panel-${index}`}
              aria-labelledby={`home-process-tab-${index}`}
              hidden={activeIndex !== index}
              tabIndex={0}
            >
              <div className={styles.meta}>
                <span className={theme.detailHeading}>Step {String(index + 1).padStart(2, "0")} / 05</span>
                {badge && <span className={styles.badge}>{badge}</span>}
              </div>
              <h3>{title}</h3>
              <p className={theme.description}>{description}</p>
              <p className={styles.outcome}><Check size={18} aria-hidden="true" /><span><strong>You get:</strong> {outcome}</span></p>
            </div>
          ))}
          <div className={styles.consultation}>
            <Link href="/contact" className={theme.action}>Book a free consultation <ArrowRight size={18} aria-hidden="true" /></Link>
            <p>Free, no obligation. Tell us your goal and we will guide you, from the first talk to long after launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
