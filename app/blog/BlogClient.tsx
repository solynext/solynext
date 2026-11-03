"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BLOG_POSTS_DATA } from "@/data/mockData";
import styles from "./Blog.module.css";

export function BlogClient() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Engineering", "Design", "Business"];

  const filtered = BLOG_POSTS_DATA.filter((post) => {
    const matchesCat = selectedCat === "All" || post.category === selectedCat;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query) || post.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  return <main id="main-content" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.kicker}>INSIGHTS</p>
        <h1>Ideas and perspectives for digital teams</h1>
        <p className={styles.heroDescription}>Practical thinking on engineering, design, and growing a business online.</p>
      </div>
    </section>

    <section className={styles.library} aria-label="Articles">
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <div className={styles.filters} aria-label="Filter articles by category">
            {categories.map((category) => <button type="button" key={category} onClick={() => setSelectedCat(category)} aria-pressed={selectedCat === category} className={selectedCat === category ? styles.activeFilter : ""}>{category}</button>)}
          </div>
          <label className={styles.search}><Search size={17} aria-hidden="true" /><span className={styles.srOnly}>Search articles</span><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search articles" /></label>
        </div>
        <div className={styles.resultsLine}><h2>Articles</h2><p>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p></div>
        {filtered.length ? <div className={styles.articleList}>{filtered.map((post) => <article className={styles.article} key={post.id}>
          <div className={styles.meta}><span className={styles.category}>{post.category}</span><span>{post.publishedDate}</span><span>{post.readTime}</span></div>
          <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.articleFooter}><p>By <strong>{post.author.name}</strong><span>{post.author.role}</span></p><Link className={styles.readLink} href={`/blog/${post.slug}`}>Read article <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </article>)}</div> : <div className={styles.empty}><h3>No articles found</h3><p>Try another search or select a different category.</p><button type="button" onClick={() => { setSearchQuery(""); setSelectedCat("All"); }}>Clear filters</button></div>}
      </div>
    </section>
  </main>;
}
