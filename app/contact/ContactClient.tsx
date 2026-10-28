"use client";
import { Mail, MapPin, ArrowUpRight, MessageSquare, Check } from "lucide-react";
import { ProjectForm } from "@/components/ui/ProjectForm";
import styles from "./Contact.module.css";
export function ContactClient() {
 return <main id="main-content" className={`premium-contact ${styles.page}`}><div className="premium-container"><div className={styles.layout}>
  <section className={styles.intro}><p className="eyebrow">LET&apos;S TALK</p><h1>Your next idea.<br/><span>Starts here.</span></h1><p className={styles.description}>A new website, a stronger brand, or your next digital product. Tell us what you have in mind.</p>
   <a className={styles.emailCard} href="mailto:solynextsolutions@gmail.com"><span className={styles.icon}><Mail size={21}/></span><span><small>Email our team</small><strong>solynextsolutions@gmail.com</strong></span><ArrowUpRight size={18}/></a>
   <div className={styles.location}><MapPin size={17}/><span>Islamabad &amp; Lahore, Pakistan</span></div>
   <div className={styles.next}><h2>A clear path forward</h2><ul><li><Check size={16}/>Share your goals</li><li><Check size={16}/>Explore the right approach</li><li><Check size={16}/>Build a plan together</li></ul></div>
  </section>
  <section className={`contact-form-panel ${styles.panel}`} aria-labelledby="contact-form-heading"><div className={styles.formHeading}><span className={styles.icon}><MessageSquare size={21}/></span><div><h2 id="contact-form-heading">Tell us about your project</h2><p>A few details to get the conversation started.</p></div></div><ProjectForm/></section>
 </div></div></main>;
}
