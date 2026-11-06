import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPageMetadata } from "@/lib/seo/metadata";
import styles from "./Terms.module.css";

const sections = [
  { id: "agreement", title: "Agreement and scope" },
  { id: "website", title: "Using this website" },
  { id: "services", title: "Services and engagement models" },
  { id: "estimates", title: "Estimates and proposals" },
  { id: "fees", title: "Fees and payment" },
  { id: "responsibilities", title: "Working together" },
  { id: "changes", title: "Scope and timelines" },
  { id: "approval", title: "Review and acceptance" },
  { id: "ownership", title: "Intellectual property" },
  { id: "warranty", title: "Warranty and ongoing support" },
  { id: "third-parties", title: "Third-party services" },
  { id: "confidentiality", title: "Confidentiality and privacy" },
  { id: "cancellation", title: "Pausing or ending work" },
  { id: "liability", title: "Availability and liability" },
  { id: "updates", title: "Updates to these terms" },
  { id: "contact", title: "Contact SolyNext" },
];

export async function generateMetadata() {
  return getPageMetadata("/terms", {
    title: "Terms of Service | SolyNext",
    description: "Terms for using the SolyNext website and engaging our digital services, software, design, and growth support.",
  });
}

export default function TermsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/" className={styles.back}><ArrowLeft size={15} aria-hidden="true"/>Back to SolyNext</Link>
          <p className={styles.eyebrow}>LEGAL · SOLYNEXT TECHNOLOGIES</p>
          <h1>Terms of Service</h1>
          <p className={styles.intro}>Clear expectations help good work move forward. These terms explain how to use our website and what to expect when you work with our team.</p>
          <div className={styles.meta}><span>Last updated November 6, 2026</span><span>For website visitors, clients, and partners</span></div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.contents} aria-label="On this page">
          <p>ON THIS PAGE</p>
          <nav>{sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
        </aside>

        <article className={styles.document}>
          <section id="agreement">
            <h2>Agreement and scope</h2>
            <p>These Terms of Service apply when you visit or use the SolyNext website, including its service and industry pages, project estimator, articles, and SolyNext Apps directory. They also describe the general basis on which SolyNext Technologies discusses and delivers client work.</p>
            <p>A proposal, statement of work, or other written project agreement may set additional terms for a specific engagement. If it conflicts with this page, the project agreement controls that engagement. A project starts only after its scope and commercial terms are accepted in writing by both sides.</p>
          </section>

          <section id="website">
            <h2>Using this website</h2>
            <p>You may browse and share links to our public pages for lawful business or personal use. Please do not use the site to break the law, interfere with its operation, probe or bypass security, distribute malicious code, misrepresent your identity, or infringe another person’s rights.</p>
            <p>Website text, designs, branding, and other materials belong to SolyNext or their respective owners. You may not republish or commercially reuse them without permission. Third-party names and marks remain the property of their owners.</p>
          </section>

          <section id="services">
            <h2>Services and engagement models</h2>
            <p>SolyNext brings together website and software development, app and product work, design and branding, digital marketing, search optimization, consulting, and ongoing support. We also discuss product, service, and business partnerships. The exact work available for a project depends on its written scope and the team’s confirmation.</p>
            <p>Our website describes fixed-price milestone projects, dedicated engineering teams, and ongoing growth or support retainers. These are ways to structure an engagement; the proposal or project agreement sets the actual deliverables, availability, hours, service levels, and responsibilities.</p>
          </section>

          <section id="estimates">
            <h2>Estimates and proposals</h2>
            <p>The website’s scope and budget estimator provides an initial ballpark based on the options selected. It is for planning only and is not a final quote, promise of delivery, or commitment to take on a project. A reliable estimate may require a discussion of requirements, integrations, content, and constraints.</p>
            <p>Any written proposal will state its validity period, assumptions, planned scope, and pricing. Work outside those assumptions may require a revised estimate.</p>
          </section>

          <section id="fees">
            <h2>Fees and payment</h2>
            <p>Project fees, payment currency, invoice dates, deposits, milestones, applicable taxes, and payment methods are set out in the accepted proposal or project agreement. SolyNext supports project discussions for local Pakistani PKR payments and international transfers; the available method and any bank or provider charges will be confirmed for each engagement.</p>
            <p>Please raise any invoice question promptly. If an agreed payment is overdue, the parties will discuss a resolution; work may be paused where the project agreement allows it. No additional fee or late charge applies unless it has been agreed in writing.</p>
          </section>

          <section id="responsibilities">
            <h2>Working together</h2>
            <p>Clients help projects succeed by providing accurate requirements, timely decisions, appropriate access, and materials they are authorized to use. This may include brand assets, copy, product data, account credentials, or feedback. Please use a secure channel for credentials and do not send passwords, API keys, payment details, or sensitive business information through public website forms or the assistant.</p>
            <p>Each side will identify a contact for decisions and approvals. Client delays, incomplete materials, or delayed access can affect the schedule and may require the plan to be adjusted.</p>
          </section>

          <section id="changes">
            <h2>Scope and timelines</h2>
            <p>Project work is planned against the agreed scope, milestones, and dependencies. If priorities or requirements change, we will review the impact on deliverables, cost, and timing before proceeding with the additional work. Changes should be confirmed in writing.</p>
            <p>Dates are planned in good faith and may depend on client approvals, third-party providers, or other stated assumptions. We will communicate material changes and agree on a practical next step.</p>
          </section>

          <section id="approval">
            <h2>Review and acceptance</h2>
            <p>Where a project includes staged reviews, the proposal will describe how to review work and provide feedback. Clients should report issues clearly, with the affected page, feature, or steps to reproduce where possible. A review milestone does not add new features or change the agreed scope unless both sides approve the change.</p>
            <p>Delivery and acceptance criteria, including any response period, are defined in the project agreement. If the agreement does not define them, the parties will confirm acceptance in writing as the work progresses.</p>
          </section>

          <section id="ownership">
            <h2>Intellectual property</h2>
            <p>After the applicable agreed milestone payment, ownership of custom code, designs, and other project deliverables intended for transfer will pass to the client as described in the proposal or project agreement. SolyNext will provide the agreed project handover, such as source code or design files.</p>
            <p>Each side keeps the materials, tools, know-how, and intellectual property it owned or developed independently before the project. If SolyNext’s existing tools or reusable components are included in a deliverable, the client receives the rights needed to use that deliverable as agreed, while SolyNext retains ownership of those underlying materials.</p>
            <p>Open-source and other third-party components remain subject to their own licenses. Clients retain ownership of the content, data, and brand assets they supply and confirm they have permission for SolyNext to use them to perform the work.</p>
          </section>

          <section id="warranty">
            <h2>Warranty and ongoing support</h2>
            <p>Where included in the accepted project offer, SolyNext provides a 30-day post-launch bug warranty for reproducible defects in delivered work against the agreed requirements. It does not cover new features, changed requirements, issues caused by third-party services, or modifications made outside the agreed delivery.</p>
            <p>Maintenance, hosting, monitoring, security updates, and ongoing marketing or engineering support are provided only when included in an active agreement. Support response times and service levels are whatever the written agreement specifies.</p>
          </section>

          <section id="third-parties">
            <h2>Third-party services</h2>
            <p>Projects may rely on hosting, domains, cloud platforms, APIs, payment providers, advertising networks, app stores, or other third-party services. Those providers have their own terms, availability, fees, and privacy practices. Unless the project agreement says otherwise, the client is responsible for accounts and charges in its own name.</p>
            <p>SolyNext can help select or integrate third-party tools, but cannot control their independent availability, pricing, policies, or changes.</p>
          </section>

          <section id="confidentiality">
            <h2>Confidentiality and privacy</h2>
            <p>Each side should protect non-public information shared for a project and use it only for that work. If you need a non-disclosure agreement before sharing confidential materials, contact us before sending them. Do not submit secrets or sensitive information through public forms or the website assistant.</p>
            <p>Our <Link href="/privacy-policy">Privacy Policy</Link> explains how website inquiries and assistant conversations are handled. It also describes browser-saved chat history and the use of an external AI provider when that feature is enabled.</p>
          </section>

          <section id="cancellation">
            <h2>Pausing or ending work</h2>
            <p>The project agreement should set out how either side may pause or end an engagement, including notice, outstanding fees, and handover. If it does not, the parties will confirm these points in writing before work is paused or ended. Fees for completed work and approved non-cancellable costs remain payable as agreed.</p>
          </section>

          <section id="liability">
            <h2>Availability and liability</h2>
            <p>We aim to keep the website useful and available, but pages, tools, and listings may change or be temporarily unavailable. Website examples, service descriptions, reviews, and estimator results are general information; they do not guarantee a particular business result, search ranking, conversion, or project outcome.</p>
            <p>Any warranties, risk allocation, and liability limits for paid work should be set out in the project agreement. Nothing in these terms limits a right or responsibility that cannot be limited under applicable law.</p>
          </section>

          <section id="updates">
            <h2>Updates to these terms</h2>
            <p>We may update this page when our website or services change. The “Last updated” date at the top identifies the current version. Updated website terms apply from publication; an existing project continues under its accepted agreement unless both sides agree to change it.</p>
          </section>

          <section id="contact" className={styles.contactSection}>
            <h2>Contact SolyNext</h2>
            <p>For questions about these terms, a proposal, or a project agreement, email our team. For a new project, you can also send us a short brief and we will help identify a practical next step.</p>
            <div className={styles.contactActions}><a href="mailto:solynextsolutions@gmail.com">solynextsolutions@gmail.com <ArrowUpRight size={16} aria-hidden="true"/></a><Link href="/contact">Discuss a project <ArrowUpRight size={16} aria-hidden="true"/></Link></div>
          </section>
        </article>
      </div>
    </main>
  );
}
