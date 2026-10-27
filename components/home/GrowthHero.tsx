import Image from "next/image";
import { Geist } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./GrowthHero.module.css";



const heroFont = Geist({ subsets: ["latin"], display: "swap", variable: "--font-growth-hero" });



const titleLines = ["Web Development, Design &", "Marketing for brands ready", "to grow your brand"];
function TypedTitleLines({ mobile = false }: { mobile?: boolean }) {
  let characterIndex = 0;
  const characterCount = titleLines.join("").length;
  return <span className={mobile ? styles.mobileHeading : styles.desktopHeading} aria-hidden="true">{titleLines.map((line, lineIndex) => <span className={styles.headlineLine} key={line}>{Array.from(line).map((character, index) => {
    const delay = characterIndex++ * (1.68 / (characterCount - 1));
    return <span key={index} className={`${styles.typedCharacter} ${lineIndex === 2 && index >= 3 ? styles.typedAccent : ""}`} style={{ animationDelay: `${delay}s` }}>{character}</span>;
  })}</span>)}</span>;
}
export function GrowthHero() {
  return <section className={`${styles.hero} ${heroFont.variable}`} aria-labelledby="growth-heading">
    <Image src="/images/digital-growth-globe.webp" alt="" fill priority sizes="100vw" className={styles.backdrop} />
    <div className={styles.container}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>WEB · DESIGN · MARKETING · SOCIAL MEDIA</p>
        <h1 id="growth-heading" aria-label="Web Development, Design &amp; Marketing. For brands ready to grow your brand"><TypedTitleLines/><TypedTitleLines mobile/></h1>
        <p className={styles.description}><span className={styles.desktopDescription}><span className={styles.descriptionLine}>We provide websites, graphic design, digital marketing and social media</span>{" "}<span className={styles.descriptionLine}>management that help your brand grow digitally and globally.</span></span><span className={styles.mobileDescription}><span>We provide websites, graphic design, digital marketing</span>{" "}<span>and social media management that help your brand</span>{" "}<span>grow digitally and globally.</span></span></p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>Discuss Your Project <ArrowRight aria-hidden="true" /></Link>
          <Link href="/portfolio" className={styles.secondary}>Explore Our Work <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  </section>;
}

export { HomeServices as GrowthServices } from "@/components/catalog/HomeSections";
