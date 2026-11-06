"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MapPin, Sparkles, X } from "lucide-react";
import { JOB_OPENINGS_DATA } from "@/data/mockData";
import type { JobOpening } from "@/types";
import styles from "./Careers.module.css";

const filters = ["All roles", "Engineering", "Design", "Marketing"] as const;
const waysOfWorking = [
  { title: "Business goals first", description: "Build around real needs, the people using the work, and the outcome it should support." },
  { title: "Clear communication", description: "Share context, explain decisions, and keep the work easy to follow." },
  { title: "Practical collaboration", description: "Bring engineering, design, and growth together to solve connected problems." },
];

export function CareersClient() {
  const [department, setDepartment] = useState<(typeof filters)[number]>("All roles");
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantProfile, setApplicantProfile] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visibleJobs = useMemo(() => department === "All roles" ? JOB_OPENINGS_DATA : JOB_OPENINGS_DATA.filter(job => job.department === department), [department]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedJob && !dialog.open) dialog.showModal();
    if (!selectedJob && dialog.open) dialog.close();
  }, [selectedJob]);

  const closeApplication = () => {
    setSelectedJob(null);
    setDraftReady(false);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantProfile("");
  };

  const prepareApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedJob) return;
    const subject = encodeURIComponent(`Application: ${selectedJob.title}`);
    const body = encodeURIComponent(`Role: ${selectedJob.title}\nName: ${applicantName}\nEmail: ${applicantEmail}\nPortfolio / LinkedIn / GitHub: ${applicantProfile}\n\nI will attach my CV or resume before sending.`);
    window.location.href = `mailto:solynextsolutions@gmail.com?subject=${subject}&body=${body}`;
    setDraftReady(true);
  };

  return <main id="main-content" className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span/>CAREERS AT SOLYNEXT</p>
            <h1>Make digital work<br/><span>move business forward.</span></h1>
            <p className={styles.heroLead}>Bring your craft to work across engineering, design, and digital growth. Help businesses solve practical problems and build better online experiences.</p>
            <div className={styles.heroActions}><Link href="#open-roles" className={styles.primaryLink}>Explore open roles <ArrowRight size={17} aria-hidden="true"/></Link><a href="mailto:solynextsolutions@gmail.com?subject=Career%20inquiry" className={styles.secondaryLink}>Share your profile <ArrowUpRight size={16} aria-hidden="true"/></a></div>
            <div className={styles.locationLine}><MapPin size={16} aria-hidden="true"/><span>Islamabad &amp; Lahore, Pakistan</span><i aria-hidden="true"/><span>Some roles are remote</span></div>
          </div>
          <div className={styles.heroVisual} aria-label="SolyNext brings engineering, design, and growth together">
            <div className={styles.visualTop}><span><i/> DIGITAL WORK, BUILT TOGETHER</span><Sparkles size={17} aria-hidden="true"/></div>
            <div className={styles.visualHeadline}>One team.<br/><span>Many disciplines.</span></div>
            <p className={styles.visualCopy}>From the first idea to the experience people use.</p>
            <div className={styles.disciplineTrack} aria-hidden="true"><span>Engineering</span><b/><span>Design</span><b/><span>Growth</span></div>
            <div className={styles.visualGrid} aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>
            <div className={styles.visualFooter}><span>ISLAMABAD · LAHORE</span><span>WORKING WORLDWIDE</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.workSection} aria-labelledby="work-heading">
      <div className={styles.container}>
        <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>HOW WE WORK</p><h2 id="work-heading">Good work starts<br/><span>with clear thinking.</span></h2></div><p>We bring different skills together around business goals, useful experiences, and work that can make a real difference.</p></div>
        <div className={styles.valuesGrid}>{waysOfWorking.map((value,index)=><article className={styles.valueCard} key={value.title}><span className={styles.valueMarker} aria-hidden="true">{String.fromCharCode(65+index)}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div>
        <div className={styles.capabilityRow}><span>Web development</span><span>Product design</span><span>Digital marketing</span><span>Social media</span><Link href="/about">About SolyNext <ArrowUpRight size={15} aria-hidden="true"/></Link></div>
      </div>
    </section>

    <section id="open-roles" className={styles.rolesSection} aria-labelledby="roles-heading">
      <div className={styles.container}>
        <div className={styles.rolesHeading}>
          <div><p className={styles.sectionKicker}>OPEN POSITIONS</p><h2 id="roles-heading">Find your next role.</h2><p>Explore the current opportunities and see where your skills can contribute.</p></div>
          <span className={styles.roleCount}>{JOB_OPENINGS_DATA.length} current roles</span>
        </div>
        <div className={styles.roleFilters} role="group" aria-label="Filter open roles">{filters.map(filter=><button key={filter} type="button" aria-pressed={department===filter} onClick={()=>setDepartment(filter)}>{filter}</button>)}</div>
        <div className={styles.jobList}>
          {visibleJobs.map(job=><article className={styles.jobCard} key={job.id}>
            <div className={styles.jobMain}>
              <div className={styles.jobMeta}><span>{job.department}</span><i/><span>{job.type}</span><i/><span><MapPin size={13} aria-hidden="true"/>{job.location}</span><i/><span>{job.experience}</span></div>
              <h3>{job.title}</h3>
              <p className={styles.jobOverview}>{job.overview}</p>
              <details className={styles.jobDetails}>
                <summary>Role details <ArrowDown size={15} aria-hidden="true"/></summary>
                <div className={styles.jobDetailGrid}>
                  <div><h4>What you’ll work on</h4><ul>{job.responsibilities.map(item=><li key={item}>{item}</li>)}</ul></div>
                  <div><h4>What you’ll bring</h4><ul>{job.requirements.map(item=><li key={item}>{item}</li>)}</ul></div>
                </div>
              </details>
            </div>
            <button type="button" className={styles.applyButton} onClick={()=>setSelectedJob(job)}>Apply for this role <ArrowUpRight size={16} aria-hidden="true"/></button>
          </article>)}
          {visibleJobs.length===0&&<p className={styles.emptyRoles}>No roles in this area right now. Share your profile for future opportunities.</p>}
        </div>
      </div>
    </section>

    <section className={styles.applySection} aria-labelledby="apply-heading">
      <div className={styles.container}>
        <div className={styles.applyPanel}>
          <div><p className={styles.sectionKicker}>YOUR APPLICATION</p><h2 id="apply-heading">A clear way to get started.</h2><p>Choose a role, review what it involves, and share your experience with our team. The application form prepares an email draft so you can attach your CV or resume before sending.</p></div>
          <div className={styles.applySteps}><div><span>Choose a role</span><p>Find the opening that fits your experience.</p></div><div><span>Share your work</span><p>Add a profile link and relevant examples.</p></div><div><span>Send your email</span><p>Review the draft and attach your CV.</p></div></div>
        </div>
        <div className={styles.generalApplication}><div><h3>Don’t see the right opening?</h3><p>Send a short introduction and a link to your work. We’ll keep your profile in mind for relevant roles.</p></div><a href="mailto:solynextsolutions@gmail.com?subject=Career%20inquiry">Email our team <ArrowUpRight size={16} aria-hidden="true"/></a></div>
      </div>
    </section>

    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="application-title" onCancel={event=>{event.preventDefault();closeApplication();}} onClick={event=>{if(event.target===event.currentTarget)closeApplication();}}>
      {selectedJob&&<div className={styles.dialogContent}>
        <button type="button" className={styles.dialogClose} aria-label="Close application" onClick={closeApplication}><X size={20} aria-hidden="true"/></button>
        {draftReady?<div className={styles.draftSuccess}><span><Check size={21} aria-hidden="true"/></span><p className={styles.sectionKicker}>APPLICATION DRAFT</p><h2 id="application-title">Your email is ready.</h2><p>Review the message in your email app, attach your CV or resume, and send it to complete your application for <strong>{selectedJob.title}</strong>.</p><a href="mailto:solynextsolutions@gmail.com?subject=Career%20application">Open email again <ArrowUpRight size={16} aria-hidden="true"/></a></div>:<>
          <p className={styles.sectionKicker}>APPLY FOR A ROLE</p><h2 id="application-title">{selectedJob.title}</h2><p className={styles.dialogMeta}>{selectedJob.department} · {selectedJob.location} · {selectedJob.experience}</p>
          <form className={styles.applicationForm} onSubmit={prepareApplication}>
            <label>Full name<input required autoComplete="name" value={applicantName} onChange={event=>setApplicantName(event.target.value)} placeholder="Your name"/></label>
            <label>Email address<input required type="email" autoComplete="email" value={applicantEmail} onChange={event=>setApplicantEmail(event.target.value)} placeholder="you@example.com"/></label>
            <label>LinkedIn, GitHub or portfolio URL<input required type="url" value={applicantProfile} onChange={event=>setApplicantProfile(event.target.value)} placeholder="https://"/></label>
            <p className={styles.formNote}>The site prepares an email draft. Attach your CV or resume before sending.</p>
            <div className={styles.formActions}><button type="button" className={styles.cancelButton} onClick={closeApplication}>Cancel</button><button type="submit" className={styles.submitButton}>Prepare email draft <ArrowRight size={16} aria-hidden="true"/></button></div>
          </form>
        </>}
      </div>}
    </dialog>
  </main>;
}
