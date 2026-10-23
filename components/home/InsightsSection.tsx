import Link from "next/link";
import { ArrowUpRight, Code2, Globe2, MousePointer2 } from "lucide-react";
import { BLOG_POSTS_DATA } from "@/data/mockData";
import styles from "./InsightsSection.module.css";

const artwork = [Code2, MousePointer2, Globe2];
const shortTitles: Record<string, string> = {
  "nextjs-app-router-enterprise-patterns": "Building better with Next.js",
  "reducing-churn-through-b2b-saas-ux": "Design that keeps users",
  "pakistan-tech-ecosystem-global-advantage": "Local talent. Global impact.",
};

export function InsightsSection() {
  return <section className={styles.section} id="insights" aria-labelledby="insights-title"><div className="premium-container">
    <div className={styles.heading}>
      <div><p className={styles.kicker}><span/>IDEAS FROM THE TEAM</p><h2 id="insights-title">Fresh ideas.<br/><span>Better decisions.</span></h2></div>
      <div className={styles.aside}><Link href="/blog" className={styles.allLink}>All insights <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
    </div>
    <div className={styles.grid}>{BLOG_POSTS_DATA.slice(0, 3).map((post, index) => {
      const Icon = artwork[index];
      return <Link key={post.id} href={`/blog/${post.slug}`} className={styles.article} data-tone={index}>
        <div className={styles.art} aria-hidden="true"><div className={styles.orbit}/><div className={styles.iconTile}><Icon size={52} strokeWidth={1.25}/></div><span className={styles.artArrow}><ArrowUpRight size={20}/></span></div>
        <div className={styles.content}><div className={styles.meta}><span>{post.category}</span><span>{post.readTime}</span></div><h3>{shortTitles[post.slug] ?? post.title}</h3>
        </div>
      </Link>;
    })}</div>
  </div></section>;
}
