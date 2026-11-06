"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, AppWindow, BadgeDollarSign, Boxes, Code2, Globe2, Handshake, Layers3, LifeBuoy, Megaphone, Package, Palette, Rocket, Search, Share2, Store, TrendingUp, Users, Workflow } from "lucide-react";
import styles from "./HomeOfferingsOverview.module.css";

const offerings = [
  {
    label: "Digital services",
    summary: "Websites, design & marketing",
    title: "Grow your brand. Get found online.",
    description: "We build websites, shape visual identities, run marketing, and manage social media to help your business reach more customers.",
    points: [
      { label: "Website development", icon: Code2 },
      { label: "Social media management", icon: Share2 },
      { label: "Logo & graphic design", icon: Palette },
      { label: "Content & ad campaigns", icon: Megaphone },
      { label: "Digital marketing & SEO", icon: Search },
      { label: "Ongoing growth support", icon: TrendingUp },
    ],
    action: "Explore services",
    href: "/services",
    icon: Globe2,
  },
  {
    label: "Software & products",
    summary: "Apps, SaaS & custom software",
    title: "Find the right tools. Build what’s next.",
    description: "Start with a ready-made SolyNext app or create software designed around the way your business works.",
    points: [
      { label: "Business apps and tools", icon: AppWindow },
      { label: "Custom web applications", icon: Code2 },
      { label: "SaaS product development", icon: Layers3 },
      { label: "POS, ERP, and operations", icon: Store },
      { label: "Integrations and automation", icon: Workflow },
      { label: "Product support and growth", icon: LifeBuoy },
    ],
    action: "Explore software",
    href: "/solynext-apps",
    icon: Boxes,
  },
  {
    label: "Business partnerships",
    summary: "Build, collaborate & grow together",
    title: "Build a business together.",
    description: "Bring an idea, product, or opportunity. We work with partners to shape practical ventures and grow them over time.",
    points: [
      { label: "Product partnerships", icon: Package },
      { label: "Agency and expert collaboration", icon: Users },
      { label: "New business ventures", icon: Rocket },
      { label: "Shared project delivery", icon: Handshake },
      { label: "Growth and distribution", icon: TrendingUp },
      { label: "Investment conversations", icon: BadgeDollarSign },
    ],
    action: "Explore partnerships",
    href: "/collaboration",
    icon: Handshake,
  },
];

export function HomeOfferingsOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = offerings[activeIndex];
  const ActiveIcon = active.icon;

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let nextIndex = activeIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (activeIndex + 1) % offerings.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (activeIndex - 1 + offerings.length) % offerings.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = offerings.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return <section className={styles.section} aria-labelledby="home-offerings-title">
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2 id="home-offerings-title">More ways to <span>grow.</span></h2>
        <p className={styles.introText}>Need a service, a software tool, or a business partner? SolyNext brings all three together, so you can build, launch, and grow in one place.</p>
        <div className={styles.tabs} role="tablist" aria-label="Explore how SolyNext can help">
          {offerings.map(({ label, summary, icon: Icon }, index) => <button
            key={label}
            ref={element => { tabRefs.current[index] = element; }}
            className={styles.tab}
            id={`home-offering-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="home-offering-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={handleTabKeyDown}
          >
            <span className={styles.tabIcon}><Icon size={20} strokeWidth={1.8} aria-hidden="true"/></span>
            <span className={styles.tabCopy}><strong>{label}</strong><small>{summary}</small></span>
            <ArrowRight className={styles.tabArrow} size={19} aria-hidden="true"/>
          </button>)}
        </div>
      </div>

      <div className={styles.detail} role="tabpanel" id="home-offering-panel" aria-labelledby={`home-offering-tab-${activeIndex}`} key={active.label}>
        <div className={styles.detailHeading}>
          <span className={styles.detailIcon}><ActiveIcon size={21} strokeWidth={1.8} aria-hidden="true"/></span>
          <span>{active.label}</span>
        </div>
        <h3>{active.title}</h3>
        <p className={styles.description}>{active.description}</p>
        <ul className={styles.points}>{active.points.map(({ label, icon: PointIcon }) => <li key={label}><span><PointIcon size={15} strokeWidth={1.8} aria-hidden="true"/></span>{label}</li>)}</ul>
        <Link className={styles.action} href={active.href}>{active.action}<ArrowRight size={19} aria-hidden="true"/></Link>
      </div>
    </div>
  </section>;
}
