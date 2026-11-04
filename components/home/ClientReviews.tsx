"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Star } from "lucide-react";
import styles from "./ClientReviews.module.css";

type Review = { id: string; quote: string; author: string; role: string; company?: string; project?: string; slug?: string; rating?: number; image?: string };

export function ClientReviews({ reviews, limit, showAllLink = false, autoScroll = false, title = "Good work. Clear communication.", description = "Feedback from teams building their next step with SolyNext." }: { reviews: Review[]; limit?: number; showAllLink?: boolean; autoScroll?: boolean; title?: string; description?: string }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const visibleEntries = typeof limit === "number" ? reviews.slice(0, limit) : reviews;
  if (!visibleEntries.length) return null;
  const renderReview = (review: Review, index: number, copyIndex = 0) => {
    const loopCopy = copyIndex > 0;
    const isExpanded = expanded.includes(review.id);
    const quoteId = `review-copy-${review.id}${loopCopy ? `-loop-${copyIndex}` : ""}`;
    return <article className={styles.review} key={`${review.id}${loopCopy ? `-loop-${copyIndex}` : ""}`} aria-hidden={loopCopy || undefined}>
      <div className={styles.identity}>
        {review.image ? <span className={styles.avatarImage}><Image src={review.image} alt="" fill sizes="44px" unoptimized/></span> : <span className={styles.avatar} data-tone={index % 4} aria-hidden="true">{review.author.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("")}</span>}
        <div className={styles.person}><h3>{review.author}</h3><p>{[review.role, review.company].filter(Boolean).join(" · ")}</p></div>
      </div>
      <div className={styles.reviewActions}>
        <span className={styles.rating} aria-label={`${review.rating ?? 5} out of 5 stars`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" aria-hidden="true" style={{ opacity: i < (review.rating ?? 5) ? 1 : 0.25 }} />)}</span>
        <button type="button" className={styles.expandButton} tabIndex={loopCopy ? -1 : undefined} aria-label={`${isExpanded ? "Collapse" : "Expand"} review by ${review.author}`} aria-expanded={isExpanded} aria-controls={quoteId} onClick={() => setExpanded(current => isExpanded ? current.filter(id => id !== review.id) : [...current, review.id])}><ChevronDown size={18} aria-hidden="true"/></button>
      </div>
      <p id={quoteId} className={`${styles.quote} ${isExpanded ? styles.quoteExpanded : ""}`}>“{review.quote}”</p>
    </article>;
  };
  return <section className={`premium-section ${styles.section}`} aria-labelledby="client-reviews-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <p className="eyebrow">CLIENT REVIEWS</p>
        <h2 id="client-reviews-title">{title}</h2>
        <p>{description}</p>
      </header>
      <div className={styles.reviewPanel}>
        <div className={styles.panelTitle}><span className={styles.panelHeading}>Reviews</span>{showAllLink ? <Link href="/reviews" className={styles.seeAll}>See all reviews <ArrowRight size={16} aria-hidden="true"/></Link> : <span className={styles.panelCaption}>Client feedback</span>}</div>
        <div className={styles.list} data-auto-scroll={autoScroll}>
          {autoScroll ? <div className={styles.reviewTrack}>{Array.from({ length: 8 }, (_, copyIndex) => <div key={`review-loop-${copyIndex}`}>{visibleEntries.map((review, index) => renderReview(review, index, copyIndex))}</div>)}</div> : visibleEntries.map((review, index) => renderReview(review, index))}
        </div>
      </div>
    </div>
  </section>;
}
