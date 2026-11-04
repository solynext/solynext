import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { CASE_STUDIES_DATA } from "@/data/mockData";
import styles from "./FeaturedProjects.module.css";

export function FeaturedProjects() {
  const [featured, ...supporting] = CASE_STUDIES_DATA.slice(0, 3);
  if (!featured) return null;

  return <section className={styles.section} aria-label="Featured client work">
    <div className={styles.container}>
      <article className={styles.featured}>
        <Link href={`/portfolio/${featured.slug}`} className={styles.featuredImage} aria-label={`View ${featured.title}`}>
          <Image src={featured.featuredImage} alt={featured.title} fill sizes="(max-width: 850px) 100vw, 54vw" />
          <span className={styles.imageLabel}>{featured.industry}</span>
        </Link>
        <div className={styles.featuredCopy}>
          <div className={styles.clientLine}><span>{featured.client}</span><span>{featured.clientLocation}</span></div>
          <h3><Link href={`/portfolio/${featured.slug}`}>{featured.title}</Link></h3>
          <p className={styles.summary}>{featured.summary}</p>
          <div className={styles.results} aria-label="Project outcomes">
            {featured.keyResults.slice(0, 3).map(result => <div key={`${result.metric}-${result.label}`}><TrendingUp size={15} aria-hidden="true"/><strong>{result.metric}</strong><span>{result.label}</span></div>)}
          </div>
          <div className={styles.featuredFooter}>
            <div className={styles.tags}>{featured.technologies.slice(0, 3).map(technology => <span key={technology}>{technology}</span>)}</div>
            <Link href={`/portfolio/${featured.slug}`} className={styles.caseLink}>View case study <ArrowUpRight size={16} aria-hidden="true"/></Link>
          </div>
        </div>
      </article>

      {supporting.length > 0 && <div className={styles.grid}>{supporting.map(project => <article className={styles.projectCard} key={project.id}>
        <Link href={`/portfolio/${project.slug}`} className={styles.cardImage} aria-label={`View ${project.title}`}>
          <Image src={project.featuredImage} alt={project.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
          <span className={styles.imageLabel}>{project.industry}</span>
        </Link>
        <div className={styles.cardBody}>
          <div className={styles.clientLine}><span>{project.client}</span><span>{project.clientLocation}</span></div>
          <h3><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.summary}</p>
          <div className={styles.cardFooter}>
            {project.keyResults[0] && <span className={styles.outcome}><TrendingUp size={14} aria-hidden="true"/><strong>{project.keyResults[0].metric}</strong>{project.keyResults[0].label}</span>}
            <Link href={`/portfolio/${project.slug}`} className={styles.iconLink} aria-label={`View case study: ${project.title}`}><ArrowUpRight size={18} aria-hidden="true"/></Link>
          </div>
        </div>
      </article>)}</div>}
    </div>
  </section>;
}
