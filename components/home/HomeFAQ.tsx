import Link from "next/link";
import { ArrowUpRight, MessageCircle, Plus, MessagesSquare } from "lucide-react";
import { FAQS_DATA } from "@/data/mockData";
import styles from "./HomeFAQ.module.css";

export function HomeFAQ() {
  return <section className={`premium-section ${styles.section}`} aria-labelledby="home-faq-title"><div className={`premium-container ${styles.layout}`}>
    <div className={styles.intro}><span className={styles.icon}><MessagesSquare size={25} aria-hidden="true"/></span><p className={styles.kicker}>A FEW THINGS YOU MIGHT ASK</p><h2 id="home-faq-title">Good questions.<br/><span>Clear answers.</span></h2><p className={styles.description}>A little clarity before we build something great together.</p>
      <div className={styles.contactCard}><span className={styles.contactIcon}><MessageCircle size={20} aria-hidden="true"/></span><div><strong>Have something else in mind?</strong><p>Tell us about your project.</p><Link href="/contact">Let&apos;s talk about yours<ArrowUpRight size={16} aria-hidden="true"/></Link></div></div>
    </div>
    <div className={styles.questions}>{FAQS_DATA.slice(0, 4).map((faq, index) => <details key={faq.question} className={styles.item} name="home-faq"><summary><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><span className={styles.question}>{faq.question}</span><span className={styles.toggle}><Plus size={18} aria-hidden="true"/></span></summary><div className={styles.answer}><p>{faq.answer}</p></div></details>)}</div>
  </div></section>;
}
