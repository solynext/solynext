import { Quote, Star, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import styles from "./ClientReviews.module.css";

type Review = { id: string; quote: string; author: string; role: string; company: string; project: string; slug: string };

export function ClientReviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return <section className={`premium-section ${styles.section}`} aria-labelledby="client-reviews-title"><div className="premium-container">
    <div className={styles.heading}><div><p className="eyebrow">CLIENT REVIEWS</p><h2 id="client-reviews-title">Great work.<br/>Even better partnerships.</h2></div><p>Thoughts from the people behind the products we build.</p></div>
    <div className={styles.grid}>{reviews.map((review, index) => <article key={review.id} className={`${styles.card} visual-card card-surface`} data-card-tone={["purple", "cyan", "pink"][index % 3]}>
      <div className={styles.cardTop}><span className={styles.stars} aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16}/>)}</span><span className={styles.label}>Client feedback</span><Quote className={styles.quoteIcon} size={26} aria-hidden="true"/></div>
      <blockquote>“{review.quote}”</blockquote>
      <div className={styles.reviewer}><span className={styles.avatar} data-tone={index % 3} aria-hidden="true">{review.author.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("")}</span><div><h3>{review.author}</h3><p>{[review.role, review.company].filter(Boolean).join(" · ")}</p></div></div>
      <Link href={`/portfolio/${review.slug}`} className={styles.project}><BriefcaseBusiness size={15} aria-hidden="true"/><span>{review.project}</span><ArrowUpRight size={17} aria-hidden="true"/></Link>
    </article>)}</div>
  </div></section>;
}
