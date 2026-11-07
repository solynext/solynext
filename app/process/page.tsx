import { getPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { ArrowRight, Check, Code2, Database, Layers3, PenTool, RefreshCw, Rocket, Search, ShieldCheck } from "lucide-react";
import styles from "./Process.module.css";

export async function generateMetadata() { return getPageMetadata("/process"); }

export default function ProcessPage() {
  const fullSteps = [
    {
      title: "Discovery & Needs Analysis",
      timing: "Week 1",
      description:
        "We conduct structured discovery sessions to unpack your business model, customer workflows, regulatory constraints, and technical goals. We define clear success metrics.",
      deliverables: ["Product Requirement Document (PRD)", "User Persona Maps", "Technical Scope & Milestones Matrix"],
      icon: Search,
    },
    {
      title: "Technical Feasibility & Research",
      timing: "Week 1 - 2",
      description:
        "Our senior architects evaluate third-party API capabilities, benchmark database read/write loads, and test integration edge cases to de-risk development early.",
      deliverables: ["Technical Feasibility Report", "Third-Party Integration Contracts", "Risk Mitigation Strategy"],
      icon: Layers3,
    },
    {
      title: "System Architecture & Data Modeling",
      timing: "Week 2",
      description:
        "We draft normalized relational database schemas, define microservice communication protocols, and design secure OAuth/RBAC authorization boundaries.",
      deliverables: ["Entity Relationship Diagram (ERD)", "API Swagger / OpenAPI Spec", "Cloud Infrastructure Topology"],
      icon: Database,
    },
    {
      title: "UI/UX Prototyping & Design Systems",
      timing: "Week 2 - 4",
      description:
        "We translate user flows into clickable Figma prototypes. We author atomic design tokens for typography, spacing, and colors to ensure developer fidelity.",
      deliverables: ["Clickable Interactive Figma Prototype", "Design Token & Component Library", "Usability Test Summary"],
      icon: PenTool,
    },
    {
      title: "Agile Sprint Engineering",
      timing: "Week 4 - 8+",
      description:
        "We execute in two-week bi-weekly sprints. Every sprint produces test-backed, deployed code accessible on private staging preview environments.",
      deliverables: ["Bi-Weekly Sprint Review Demos", "Clean TypeScript Codebase in GitHub", "Automated CI/CD Test Pipeline"],
      icon: Code2,
    },
    {
      title: "QA, Security & Performance Hardening",
      timing: "Final Sprint",
      description:
        "We run automated end-to-end tests, execute synthetic load stress tests, verify WCAG accessibility, and conduct dependency vulnerability scans.",
      deliverables: ["Quality Assurance Audit Report", "Lighthouse 90+ Score Proof", "OWASP Security Verification"],
      icon: ShieldCheck,
    },
    {
      title: "Production Deployment & Cutover",
      timing: "Launch Week",
      description:
        "We orchestrate blue/green or rolling zero-downtime releases, configure real-time error telemetry (Sentry), and verify domain SSL certs and DNS propagation.",
      deliverables: ["Production Cloud Environment", "Automated Database Backup Policies", "Launch Checklist Signoff"],
      icon: Rocket,
    },
    {
      title: "30-Day Warranty & Evolution SLA",
      timing: "Post-Launch",
      description:
        "Every project includes a 30-day bug warranty where our engineers address any unexpected edge cases. Ongoing SLA maintenance retainers are available.",
      deliverables: ["30-Day Post-Launch Bug Warranty", "Technical Maintenance Runbook", "Quarterly Growth Roadmap"],
      icon: RefreshCw,
    },
  ];

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}><span/>DELIVERY FRAMEWORK</p>
          <h1>Our Delivery Process</h1>
          <p>A transparent engineering roadmap from initial discovery to launch and ongoing support.</p>
        </header>

        <div className={styles.timeline}>
          {fullSteps.map((step) => {
            const StepIcon = step.icon;
            return <article className={styles.stage} key={step.title}>
              <div className={styles.stageIcon}><StepIcon size={19} strokeWidth={1.8} aria-hidden="true"/></div>
              <div className={styles.stageHeading}>
                <h2>{step.title}</h2>
                <span>{step.timing}</span>
              </div>
              <p className={styles.stageDescription}>{step.description}</p>
              <div className={styles.deliverables}>
                <h3>Stage deliverables</h3>
                <ul>{step.deliverables.map((deliverable) => <li key={deliverable}><Check size={14} aria-hidden="true"/><span>{deliverable}</span></li>)}</ul>
              </div>
            </article>;
          })}
        </div>

        <section className={styles.collaboration}>
          <div><p className={styles.eyebrow}><span/>WORKING TOGETHER</p><h2>Transparent collaboration.</h2><p>We work directly in your Slack or Teams channels, host weekly sprint demos, and provide live staging access.</p></div>
          <Link href="/contact">Start your project <ArrowRight size={17} aria-hidden="true"/></Link>
        </section>
      </div>
    </main>
  );
}

