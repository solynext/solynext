import { FAQS_DATA } from "@/data/mockData";
import { getPageMetadata } from "@/lib/seo/metadata";
import styles from "./FAQs.module.css";

export async function generateMetadata() { return getPageMetadata("/faqs"); }

export default function FAQsPage() {
  return <main id="main-content" className={`premium-home ${styles.page}`}>
    <section className="premium-section" aria-labelledby="faqs-title">
      <div className="premium-container">
        <header className={styles.heading}>
          <p className={styles.kicker}>HELPFUL ANSWERS</p>
          <h1 id="faqs-title">Frequently asked <span>questions.</span></h1>
          <p>Quick answers about our services, pricing, and how we work.</p>
        </header>
        <div className={styles.list}>
          {FAQS_DATA.map((faq) => <details className={styles.item} key={faq.question}>
            <summary><span>{faq.question}</span><span className={styles.toggle} aria-hidden="true">+</span></summary>
            <div className={styles.answer}><p>{faq.answer}</p><span>{faq.category}</span></div>
          </details>)}
        </div>
      </div>
    </section>
  </main>;
}
