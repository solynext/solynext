"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ServiceCategoryPage } from "@/lib/catalog/service-category-pages";
import styles from "./ServiceCategoryCarousel.module.css";

export function ServiceCategoryCarousel({ category }: { category: ServiceCategoryPage }) {
  const track = useRef<HTMLDivElement>(null);
  const { title, description, details, slug } = category;
  const sectionId = `service-details-${slug}`;
  const trackId = `${sectionId}-track`;
  const split = title.indexOf(" ");

  function move(direction: -1 | 1) {
    const node = track.current;
    const first = node?.firstElementChild;
    const second = first?.nextElementSibling;
    if (!(first instanceof HTMLElement) || !(second instanceof HTMLElement) || !node) return;

    const end = node.scrollWidth - node.clientWidth;
    const atStart = node.scrollLeft <= 1;
    const atEnd = node.scrollLeft >= end - 1;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";

    if (direction === -1 && atStart) node.scrollTo({ left: end, behavior });
    else if (direction === 1 && atEnd) node.scrollTo({ left: 0, behavior });
    else node.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft), behavior });
  }

  return (
    <section id={sectionId} className={styles.section} aria-labelledby={`${sectionId}-title`}>
      <header className={styles.heading}>
        <h2 id={`${sectionId}-title`}>
          {split === -1 ? <span>{title}</span> : <>{title.slice(0, split)} <span>{title.slice(split + 1)}</span></>}
        </h2>
        <p>{description}</p>
        <Link className={styles.detailLink} href={category.href}>View {title} details</Link>
      </header>
      <div className={styles.track} id={trackId} ref={track} role="group" aria-label={`${title} services`} tabIndex={0}>
        {details.map(({ name, description, includes, slug: serviceSlug, href, image }) => {
          return (
            <article className={styles.card} id={`${sectionId}-${serviceSlug}`} key={serviceSlug}>
              <div className={styles.image}>
                <Image
                  src={image}
                  alt=""
                  fill
                  unoptimized
                />
              </div>
              <div className={styles.body}>
                <h3>{name}</h3>
                <p>{description}</p>
                <details className={styles.includes}>
                  <summary>What’s included</summary>
                  <ul>{includes.map(item => <li key={item}>{item}</li>)}</ul>
                </details>
              </div>
              <Link className={styles.cardAction} href={href} aria-label={`View service details for ${name}`}>
                View service details <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} aria-controls={trackId} aria-label={`Previous ${title} services`}>
          <ArrowLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-controls={trackId} aria-label={`Next ${title} services`}>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
