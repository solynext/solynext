import Link from "next/link";
import { ArrowUpRight, Code2, Layers3, Megaphone, Palette, PenTool, Smartphone } from "lucide-react";
import { publicOfferings } from "@/lib/catalog/repository";
import { BrandLogo } from "@/components/ui/BrandLogo";

import styles from "./ProjectCTA.module.css";

const orbitServices = [
  { slug: "web-development", icon: Code2, tone: "idea" },
  { slug: "software-development", icon: Layers3, tone: "plan" },
  { slug: "mobile-development", icon: Smartphone, tone: "launch" },
  { slug: "ui-ux-design", icon: PenTool, tone: "code" },
  { slug: "graphic-design-branding", icon: Palette, tone: "design" },
  { slug: "digital-marketing", icon: Megaphone, tone: "settings" },
];

export async function ProjectCTA() {
  const services = await publicOfferings("services");
  return <section className={styles.section} aria-labelledby="project-cta-title"><div className="premium-container"><div className={styles.card}>
    <div className={styles.copy}><span className={styles.eyebrow}>LET&apos;S BUILD WHAT&apos;S NEXT</span><h2 id="project-cta-title">Big idea?<br/><span>Let&apos;s make it real.</span></h2><p>Tell us where you want to go. We&apos;ll help you figure out how to get there.</p><div className={styles.actions}><Link href="/contact" className={styles.button}>Start a project<ArrowUpRight size={21} aria-hidden="true"/></Link><span className={styles.caption}>A conversation is a great place to start.</span></div></div>
    <div className={styles.visual} role="group" aria-label="Explore our services">

      <div className={styles.logo}><BrandLogo size={88}/></div>
      {orbitServices.map(({ slug, icon: Icon, tone }) => {
        const service = services.find((item) => item.slug === slug);
        if (!service) return null;
        return <span key={slug} className={`${styles.orbitItem} ${styles[tone]}`}>
          <Link href={`/services/${slug}`} className={styles.chip} aria-label={service.name}>
            <Icon size={40} aria-hidden="true"/>
            <span className={styles.tooltip} aria-hidden="true">{service.name}</span>
          </Link>
        </span>;
      })}
    </div>
  </div></div></section>;
}
