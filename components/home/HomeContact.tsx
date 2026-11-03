import { ArrowUpRight, Check, Mail } from "lucide-react";
import { ProjectForm } from "@/components/ui/ProjectForm";
import styles from "./HomeContact.module.css";

export function HomeContact() {
  return <section className={styles.section} id="contact" aria-labelledby="home-contact-title">
    <div className="premium-container">
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>LET&apos;S TALK</p>
          <h2 id="home-contact-title">Let&apos;s talk about<br /><span>your project.</span></h2>
          <p className={styles.description}>Tell us what you need. We&apos;ll help you plan the next step.</p>
          <p className={styles.consultation}><span><Check size={15} /></span>Free first consultation</p>
          <a className={styles.contactItem} href="mailto:solynextsolutions@gmail.com"><span className={styles.mailIcon}><Mail size={21} /></span><span className={styles.emailCopy}><small>EMAIL OUR TEAM</small><strong>solynextsolutions@gmail.com</strong></span><ArrowUpRight className={styles.emailArrow} size={19} aria-hidden="true" /></a>
        </div>
        <div className={styles.panel}>
          <p className={styles.panelEyebrow}>YOUR NEXT STEP</p>
          <h3>Start a conversation</h3>
          <p className={styles.panelLead}>Share a few details and we&apos;ll take it from there.</p>
          <ProjectForm />
        </div>
      </div>
    </div>
  </section>;
}
