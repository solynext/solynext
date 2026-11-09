import {
  ArrowRight, BadgeCheck, BriefcaseBusiness, ChevronRight, CircleUserRound,
  ClipboardCheck, MessageSquareText, Search, UsersRound,
} from "lucide-react";
import styles from "./TalentPortal.module.css";

const talent = [
  { name: "Ayesha Khan", role: "UI/UX Designer", experience: "4 years of experience", skills: "Figma · Product design · Design systems", tone: "ayesha" },
  { name: "Hamza Ali", role: "Full-stack Engineer", experience: "5 years of experience", skills: "React · Node.js · PostgreSQL", tone: "hamza" },
  { name: "Sara Malik", role: "AI Engineer", experience: "3 years of experience", skills: "Python · LLMs · Automation", tone: "sara" },
];

const roles = [
  { title: "Frontend Developer", detail: "Full-time · Remote · 3+ years experience" },
  { title: "Product Designer", detail: "Full-time · Hybrid (Lahore) · 3+ years experience" },
];

export default function TalentPortalPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} id="how-it-works" aria-labelledby="talent-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>SOLYNEXT TALENT PORTAL</p>
          <h1 id="talent-title">Find talent. Find your next role.</h1>
          <p>Meet professionals reviewed by SolyNext, or share your profile to be considered for future opportunities.</p>
          <div className={styles.heroActions}>
            <a href="#request" className={styles.primary}>Request talent <ArrowRight size={17} aria-hidden="true" /></a>
            <a href="#profile" className={styles.secondary}>Create a talent profile <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <aside className={styles.process} aria-label="How profiles get listed">
          <h2>How profiles get listed</h2>
          <ol>
            <li><span>1</span><div><strong>Create a profile</strong><p>Add your experience, skills, and portfolio.</p></div></li>
            <li><span>2</span><div><strong>Details review &amp; interview</strong><p>We review your profile and hold a short interview.</p></div></li>
            <li><span>3</span><div><strong>Approved profiles go live</strong><p>Clients can discover your verified profile.</p></div></li>
          </ol>
          <p className={styles.feedback}><MessageSquareText size={20} aria-hidden="true" /> Get feedback on your skills and portfolio.</p>
        </aside>
      </section>

      <section className={styles.section} id="talent" aria-labelledby="talent-heading">
        <header className={styles.sectionHeader}>
          <h2 id="talent-heading">Talent ready to work</h2>
          <a href="#profile">Create your profile <ArrowRight size={17} aria-hidden="true" /></a>
        </header>
        <div className={styles.filters} aria-label="Static talent filters">
          <label><Search size={19} aria-hidden="true" /><span className={styles.srOnly}>Search talent</span><input placeholder="Search by skill or role" disabled /></label>
          <button type="button" disabled>Role <ChevronRight size={17} aria-hidden="true" /></button>
          <button type="button" disabled>Availability <ChevronRight size={17} aria-hidden="true" /></button>
        </div>
        <div className={styles.talentGrid}>
          {talent.map(person => <article className={styles.talentCard} key={person.name}>
            <span className={`${styles.avatar} ${styles[person.tone]}`} aria-label={`${person.name} profile photo`} role="img" />
            <div><h3>{person.name}</h3><p>{person.role}</p><p>{person.experience}</p><p className={styles.skills}>{person.skills}</p><div className={styles.badges}><span className={styles.available}>● Open to work</span><span><BadgeCheck size={17} aria-hidden="true" /> SolyNext reviewed</span></div><a href="#request">View portfolio <ArrowRight size={16} aria-hidden="true" /></a></div>
          </article>)}
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={styles.roles} id="roles">
          <h2><BriefcaseBusiness size={25} aria-hidden="true" /> Open roles</h2>
          {roles.map(role => <article key={role.title}><div><h3>{role.title}</h3><p>{role.detail}</p></div><a href="#profile">Apply <ArrowRight size={17} aria-hidden="true" /></a></article>)}
        </div>
        <aside className={styles.request} id="request">
          <UsersRound size={28} aria-hidden="true" /><h2>Need someone for your team?</h2>
          <p>Tell us the role and skills you need. SolyNext will discuss the request with you before listing it.</p>
          <a href="mailto:solynextsolutions@gmail.com?subject=Talent%20request" className={styles.primary}>Submit hiring request <ArrowRight size={17} aria-hidden="true" /></a>
        </aside>
      </section>

      <section className={styles.profile} id="profile" aria-labelledby="profile-heading">
        <CircleUserRound size={26} aria-hidden="true" />
        <div><h2 id="profile-heading">Create your talent profile</h2><p>Share your experience, portfolio, and the work you want to do. SolyNext reviews every profile before it is listed and can guide you on skills, portfolio, and career direction.</p></div>
        <a href="mailto:solynextsolutions@gmail.com?subject=Talent%20profile" className={styles.secondary}>Start your profile <ArrowRight size={17} aria-hidden="true" /></a>
      </section>

      <p className={styles.note}><ClipboardCheck size={17} aria-hidden="true" /> This is a preview of the SolyNext Talent Portal. Profiles and roles shown here are sample listings.</p>
    </main>
  );
}
