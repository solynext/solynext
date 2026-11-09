import Link from "next/link";
import { ArrowUpRight, MessageCircle, Plus, MessagesSquare } from "lucide-react";
import { FAQS_DATA } from "@/data/mockData";
import styles from "./HomeFAQ.module.css";

const paths = [
  { title: "I run a business.", description: "We provide services such as marketing, web, software, operations and consulting, built around your growth.", href: "/services" },
  { title: "I need software.", description: "We study your needs and budget, then customize a ready product or build a new one for you.", href: "/solynext-apps" },
  { title: "I have an idea or want to start a business.", description: "We check feasibility, then build it together as partners.", href: "/businesses" },
  { title: "I want to invest.", description: "We show you running and upcoming businesses and software products, and you join as a partner.", href: "/businesses" },
];

const expectations = [
  { title: "Free first step.", description: "The consultation costs nothing." },
  { title: "Plain communication.", description: "Simple updates, no confusing jargon." },
  { title: "Research before action.", description: "We check the market, costs and risks first." },
  { title: "Your approval.", description: "No work starts without your approval." },
  { title: "Support after handover.", description: "Delivery is not the end. We stay with you for fixes, updates and advice as your business grows." },
];

const processQuestions = [
  {
    question: "Your path depends on your need",
    answer: <>
      <p>Every client starts the same way, then the plan fits your situation.</p>
      <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-relaxed">
        {paths.map(({ title, description, href }) => (
          <li key={title}><Link href={href} className="font-semibold text-blue-700 underline">{title}</Link> {description}</li>
        ))}
      </ul>
    </>,
  },
  {
    question: "What you can always expect",
    answer: <ul className="grid list-disc gap-2 pl-5 text-sm leading-relaxed">
      {expectations.map(({ title, description }) => (
        <li key={title}><strong>{title}</strong> {description}</li>
      ))}
    </ul>,
  },
];

export function HomeFAQ() {
  const questions = [...FAQS_DATA.slice(0, 4).map(faq => ({ ...faq, answer: <p>{faq.answer}</p> })), ...processQuestions];

  return <section className={`premium-section ${styles.section}`} aria-labelledby="home-faq-title"><div className={`premium-container ${styles.layout}`}>
    <div className={styles.intro}><span className={styles.icon}><MessagesSquare size={25} aria-hidden="true"/></span><p className={styles.kicker}>A FEW THINGS YOU MIGHT ASK</p><h2 id="home-faq-title">Good questions.<br/><span>Clear answers.</span></h2><p className={styles.description}>A little clarity before we build something great together.</p>
      <div className={styles.contactCard}><span className={styles.contactIcon}><MessageCircle size={20} aria-hidden="true"/></span><div><strong>Have something else in mind?</strong><p>Tell us about your project.</p><Link href="/contact">Let&apos;s talk about yours<ArrowUpRight size={16} aria-hidden="true"/></Link></div></div>
    </div>
    <div className={styles.questions}>{questions.map(faq => <details key={faq.question} className={styles.item} name="home-faq"><summary><span className={styles.question}>{faq.question}</span><span className={styles.toggle}><Plus size={18} aria-hidden="true"/></span></summary><div className={styles.answer}>{faq.answer}</div></details>)}</div>
  </div></section>;
}
