"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, AppWindow, BadgeDollarSign, Boxes, Code2, Globe2, Handshake, Layers3, Package, Palette, Rocket, Search, Share2, Store, TrendingUp, Users, Workflow } from "lucide-react";
import styles from "./HomeOfferingsOverview.module.css";

const offerings = [
  {
    number: "01",
    label: "Services",
    summary: "Web, marketing, management & AI",
    title: "Everything to start, run and grow.",
    description: "Web development, marketing, business management and AI automation from one expert team. Use one service or let us manage everything.",
    points: [
      { label: "Websites & online stores", icon: Globe2 },
      { label: "Digital marketing & SEO", icon: Search },
      { label: "Social media management", icon: Share2 },
      { label: "Business management", icon: TrendingUp },
      { label: "AI agents & automation", icon: Workflow },
      { label: "Branding & graphic design", icon: Palette },
    ],
    action: "Explore services",
    href: "/services",
    icon: Globe2,
  },
  {
    number: "02",
    label: "Software products",
    summary: "Ready-made apps, SaaS & tools",
    title: "Software you can start using today.",
    description: "Ready-made apps, SaaS and websites built by us and our partners, listed in one app store. Customize any product or request your own.",
    points: [
      { label: "SaaS & web apps", icon: Layers3 },
      { label: "Offline & desktop software", icon: Code2 },
      { label: "Mobile apps (Android & iOS)", icon: AppWindow },
      { label: "Websites & online stores", icon: Globe2 },
      { label: "Games & utility tools", icon: Package },
      { label: "SolyNext App Store", icon: Store },
    ],
    action: "Explore apps",
    href: "/solynext-apps",
    icon: Boxes,
  },
  {
    number: "03",
    label: "SolyNext businesses",
    summary: "Own businesses, open to partners",
    title: "Start a business. Grow it with us.",
    description: "We start and run our own businesses in different industries, and we can run yours too. Join with an idea, skills or investment.",
    points: [
      { label: "Bring your idea", icon: Rocket },
      { label: "Invest as a partner", icon: BadgeDollarSign },
      { label: "Work with us", icon: Users },
      { label: "Partner on your business", icon: Handshake },
      { label: "Hand it over to us", icon: Workflow },
      { label: "Use only our services", icon: Globe2 },
    ],
    action: "Start a partnership",
    href: "/contact?solution=Business%20partnership",
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

  return <section id="home-more-ways-to-grow" className={styles.section} aria-labelledby="home-offerings-title">
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2 id="home-offerings-title">More ways to <span>grow.</span></h2>
        <p className={styles.introText}>Need a service, a software tool, or a business partner? SolyNext brings all three together, so you can build, launch, and grow in one place.</p>
        <div className={styles.tabs} role="tablist" aria-label="Explore how SolyNext can help">
          {offerings.map(({ number, label, summary, icon: Icon }, index) => <button
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
            <span className={styles.tabCopy}><strong><span aria-hidden="true">{number}. </span>{label}</strong><small>{summary}</small></span>
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
