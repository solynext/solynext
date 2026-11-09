import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BrainCircuit, Building2,
  Check, Compass, Handshake, HeartHandshake, Lightbulb, LineChart, Map,
  RefreshCw, ShieldCheck, Sparkles, Target, UsersRound, Wrench,
} from "lucide-react";
import { aboutPageData as data } from "@/data/about";
import styles from "./About.module.css";

export const metadata: Metadata = data.seo;

const icons = { growth: LineChart, business: Building2, software: BrainCircuit, talent: UsersRound, local: Map, community: HeartHandshake, experts: UsersRound, research: Compass, partnership: Handshake, results: Target, support: Wrench, honesty: ShieldCheck, learning: Lightbulb, flexibility: RefreshCw };

export default function AboutPage() {
  return <main id="main-content" className={styles.page}>
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroInner}`}><div className={styles.heroCopy}><p className={styles.kicker}><span/>{data.hero.eyebrow}</p><h1>{data.hero.title}</h1><p className={styles.heroLead}>{data.hero.description}</p><a className={styles.primaryLink} href="#pillars">{data.hero.action}<ArrowRight size={17}/></a><div className={styles.heroMarks}><span><Building2 size={16}/> Real businesses</span><span><Sparkles size={16}/> Expert people</span><span><BrainCircuit size={16}/> Ready software</span></div></div><div className={styles.heroVisual} aria-label="SolyNext brings services, software and businesses together"><div className={styles.visualTop}><span>SOLYNEXT GROWTH MODEL</span><span className={styles.liveDot}/></div>{data.intro.pillars.map((item,index)=>{const Icon=[Wrench,BrainCircuit,Building2][index];return <div className={styles.visualPillar} key={item.title}><span className={styles.visualIcon}><Icon size={18}/></span><div><strong>{item.title}</strong><small>{["Expertise for business needs","Tools ready to adapt","Experience in real markets"][index]}</small></div><span className={styles.visualIndex}>0{index+1}</span></div>})}<div className={styles.visualFooter}><span>One connected team</span><ArrowUpRight size={16}/></div></div></div>
    </section>

    <section id="pillars" className={`${styles.section} ${styles.intro}`}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.intro.eyebrow}</p><h2>{data.intro.title}</h2><p>{data.intro.description}</p></header><div className={styles.pillarGrid}>{data.intro.pillars.map((item,index)=>{const Icon=[Wrench,BrainCircuit,Building2][index];return <article className={`${styles.pillar} business-reveal`} key={item.title}><span className={styles.icon}><Icon size={22}/></span><small>0{index+1}</small><h3>{item.title}</h3><p>{item.text}</p><Link href={item.link}>{item.action}<ArrowUpRight size={16}/></Link></article>})}</div><p className={styles.bridge}>{data.intro.bridge}</p></div></section>

    <section className={`${styles.section} ${styles.story}`}><div className={styles.container}><div className={styles.storyGrid}><header className="section-header"><p className={styles.eyebrow}>{data.story.eyebrow}</p><h2>{data.story.title}</h2></header><div className={styles.storyCopy}>{data.story.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<div className={styles.storyNote}><span><Handshake size={20}/></span><p>Bring business experience and talent together, then make room for both to grow.</p></div></div></div></div></section>

    <section className={`${styles.section} ${styles.mission}`}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>OUR DIRECTION</p><h2>Growth with a clear purpose.</h2></header><div className={styles.missionGrid}><article className="business-reveal"><span className={styles.missionIcon}><Target/></span><div><p className={styles.eyebrow}>{data.mission.title}</p><h3>{data.mission.text}</h3></div><span className={styles.missionMark}>01</span></article><article className="business-reveal"><span className={styles.missionIcon}><Compass/></span><div><p className={styles.eyebrow}>{data.vision.title}</p><h3>{data.vision.text}</h3></div><span className={styles.missionMark}>02</span></article></div></div></section>

    <section className={styles.section}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.goals.eyebrow}</p><h2>{data.goals.title}</h2></header><div className={styles.goalGrid}>{data.goals.items.map((item,index)=>{const Icon=icons[item.icon];return <article className={`${styles.goal} business-reveal`} key={item.title}><div className={styles.goalTop}><span className={styles.icon}><Icon size={20}/></span><small>0{index+1}</small></div><h3>{item.title}</h3><p>{item.text}</p></article>})}</div></div></section>

    <section className={`${styles.section} ${styles.model}`}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.model.eyebrow}</p><h2>{data.model.title}</h2></header><div className={styles.modelList}>{data.model.items.map((item,index)=>{const Icon=icons[item.icon];return <article className="business-reveal" key={item.title}><span className={styles.modelNumber}>0{index+1}</span><span className={styles.icon}><Icon size={19}/></span><div><h3>{item.title}</h3><p>{item.text}</p></div><Check size={18} className={styles.check}/></article>})}</div></div></section>

    <section className={styles.section}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.differences.eyebrow}</p><h2>{data.differences.title}</h2></header><div className={styles.differenceGrid}>{data.differences.items.map((item,index)=><article className="business-reveal" key={item.title}><span className={styles.differenceNumber}>0{index+1}</span><BadgeCheck size={20}/><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

    <section className={`${styles.section} ${styles.values}`}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.values.eyebrow}</p><h2>{data.values.title}</h2></header><div className={styles.valueGrid}>{data.values.items.map((item,index)=>{const Icon=icons[item.icon];return <article className="business-reveal" key={item.title}><span className={styles.valueIcon}><Icon size={19}/></span><small>0{index+1}</small><h3>{item.title}</h3><p>{item.text}</p></article>})}</div></div></section>

    <section className={styles.section}><div className={styles.container}><header className="section-header"><p className={styles.eyebrow}>{data.audiences.eyebrow}</p><h2>{data.audiences.title}</h2></header><div className={styles.audienceGrid}>{data.audiences.items.map((item,index)=><article className="business-reveal" key={item.title}><small>0{index+1}</small><h3>{item.title}</h3><p>{item.text}</p><Link href={item.link}>{item.action}<ArrowUpRight size={15}/></Link></article>)}</div><p className={styles.regions}><Map size={17}/>{data.audiences.regions}</p></div></section>

    <section className={`${styles.section} ${styles.people}`}><div className={styles.container}><div className={styles.peopleCard}><span className={styles.icon}><UsersRound size={22}/></span><div><p className={styles.eyebrow}>{data.people.eyebrow}</p><h2>{data.people.title}</h2><p>{data.people.description}</p><Link href="/talent-portal">{data.people.action}<ArrowUpRight size={16}/></Link></div></div></div></section>

    <section className={styles.cta}><div className={styles.container}><div className={styles.ctaCard}><p className={styles.eyebrow}>{data.cta.eyebrow}</p><h2>{data.cta.title}</h2><p>{data.cta.description}</p><div><Link href="/contact" className={styles.ctaPrimary}>{data.cta.primary}<ArrowRight size={17}/></Link><Link href="/collaboration" className={styles.ctaSecondary}>{data.cta.secondary}<ArrowUpRight size={17}/></Link></div></div></div></section>
  </main>;
}
