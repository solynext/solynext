import { getPageMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Eye, Globe, Handshake, MapPin, Target, UsersRound } from "lucide-react";
import styles from "./About.module.css";

export async function generateMetadata() { return getPageMetadata("/about"); }

const values = [
  { title: "Business Goals First", description: "Every website, design, and campaign is shaped around your goals, audience, and brand.", icon: Target },
  { title: "Clear Communication", description: "Straightforward planning, regular updates, and a clear view of the work in progress.", icon: Handshake },
  { title: "Consistent Brand Quality", description: "Thoughtful design and messaging help your brand stay consistent across every channel.", icon: Check },
  { title: "Practical Collaboration", description: "A responsive team that listens, shares ideas, and keeps projects moving.", icon: UsersRound },
];

const leadership = [
  { name: "Bilal Ahmed", role: "Managing Director", bio: "12+ years leading software engineering and digital transformation projects across the UK, GCC, and South Asia.", location: "Islamabad, Pakistan" },
  { name: "Hamza Tariq", role: "Lead Architect", bio: "Specializes in high-concurrency Node.js, Go, and Next.js microservices with sub-second response times.", location: "Lahore, Pakistan" },
  { name: "Sara Qasim", role: "Head of Product Design", bio: "Expert in enterprise user journeys, accessible design systems, and conversion-focused UI/UX.", location: "Islamabad, Pakistan" },
];

export default function AboutPage() {
  return <main id="main-content" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span />ABOUT SOLYNEXT</p>
            <h1>A digital partner for <span>business growth.</span></h1>
            <p className={styles.heroLead}>Helping businesses grow online through web development, creative design, digital marketing, and social media management.</p>
            <Link href="/contact" className={styles.primaryLink}>Talk with our team <ArrowRight size={18} aria-hidden="true" /></Link>
            <div className={styles.heroMeta}><span><MapPin size={16} aria-hidden="true" /> Islamabad &amp; Lahore, Pakistan</span><i aria-hidden="true" /><span>Working with teams worldwide</span></div>
          </div>
          <div className={styles.heroVisual}>
            <Image src="/images/hero-tech.jpg" alt="A modern digital workspace" fill priority sizes="(max-width: 800px) 100vw, 48vw" className={styles.heroImage} />
            <div className={styles.imageNote}><span className={styles.imageMark}>SN</span><span>Creative thinking.<br />Practical digital work.</span><ArrowUpRight size={18} aria-hidden="true" /></div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.storySection}>
      <div className={styles.container}>
        <div className={styles.storyGrid}>
          <div className={styles.sectionHeading}><p className={styles.kicker}>OUR STORY</p><h2>One team across your <span>digital journey.</span></h2></div>
          <div className={styles.storyCopy}>
            <p>Based in Islamabad and Lahore, Pakistan, SolyNext helps businesses build a stronger online presence with thoughtful digital services.</p>
            <p>Our team brings web development, design, digital marketing, and social media management together in a clear, collaborative process.</p>
            <p>From a new website or brand identity to ongoing campaigns and social content, we tailor each engagement to your goals and audience.</p>
          </div>
        </div>
        <div className={styles.capabilities} aria-label="Our capabilities"><span>Web development</span><span>Design &amp; branding</span><span>Digital marketing</span><span>Social media</span></div>
      </div>
    </section>

    <section className={styles.missionSection}>
      <div className={styles.container}>
        <div className={styles.missionGrid}>
          <article className={styles.missionCard}><span className={styles.largeIcon}><Target size={23} aria-hidden="true" /></span><p className={styles.cardKicker}>OUR MISSION</p><h2>Digital work that moves business forward.</h2><p>To help businesses communicate clearly, reach the right audiences, and grow through effective digital experiences and marketing.</p></article>
          <article className={styles.missionCard}><span className={styles.largeIcon}><Eye size={23} aria-hidden="true" /></span><p className={styles.cardKicker}>OUR VISION</p><h2>A trusted digital solutions partner.</h2><p>To be a trusted digital partner for businesses seeking thoughtful creative work and sustainable online growth.</p></article>
        </div>
      </div>
    </section>

    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <div className={styles.centerHeading}><p className={styles.kicker}>WHAT GUIDES US</p><h2>Principles behind <span>every project.</span></h2><p>The way we work matters as much as what we deliver.</p></div>
        <div className={styles.valuesGrid}>{values.map(({ title, description, icon: Icon }, index) => <article className={styles.valueCard} key={title}><span className={styles.valueNumber}>0{index + 1}</span><span className={styles.valueIcon}><Icon size={20} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.centerHeading}><p className={styles.kicker}>THE PEOPLE BEHIND THE WORK</p><h2>Meet the <span>leadership team.</span></h2><p>A multidisciplinary team with a shared focus on useful, thoughtful digital work.</p></div>
        <div className={styles.teamGrid}>{leadership.map((member) => <article className={styles.teamCard} key={member.name}><div className={styles.teamTop}><span className={styles.avatar}>{member.name.split(" ").map(part => part[0]).join("")}</span><span className={styles.location}><MapPin size={14} aria-hidden="true" />{member.location}</span></div><h3>{member.name}</h3><p className={styles.teamRole}>{member.role}</p><p className={styles.teamBio}>{member.bio}</p></article>)}</div>
      </div>
    </section>

    <section className={styles.globalSection}>
      <div className={styles.container}>
        <div className={styles.globalCard}><div className={styles.globalIcon}><Globe size={25} aria-hidden="true" /></div><p className={styles.cardKicker}>BASED IN PAKISTAN · WORKING WORLDWIDE</p><h2>Good work travels.</h2><p>We work with businesses near and far to build effective digital experiences and reach their audiences online.</p><Link href="/contact" className={styles.globalLink}>Get in touch <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>
  </main>;
}
