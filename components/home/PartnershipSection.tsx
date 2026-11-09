import Link from "next/link";
import {
  ArrowUpRight, Briefcase, Building2, Check, ClipboardCheck, GraduationCap,
  Handshake, Lightbulb, Package, Settings2, TrendingUp, UsersRound,
} from "lucide-react";
import { PartnershipAreaPopover } from "./PartnershipAreaPopover";
import styles from "./PartnershipSection.module.css";

const partnership = {
  label: "PARTNERSHIPS & COLLABORATION",
  heading: { start: "Work with SolyNext,", accent: "your way." },
  introAction: "Talk through an idea",
  description: "We have no fixed rules for every case. Each partnership is shaped around your idea, your needs and your goals. Whether you bring a team, a company, a product, an investment or only your skills, we find the right way to build together.",
  areas: {
    heading: "Choose your area",
    items: [
      {
        title: "Services",
        subtitle: "Client delivery",
        detail: "Work with us on client projects, share your services, or bring our team into your delivery.",
        points: ["Share clients", "Deliver together", "Hire our experts"],
        action: "For agencies & experts",
        href: "/contact?solution=Service%20collaboration",
        icon: Handshake,
      },
      {
        title: "Software products",
        subtitle: "Product development",
        detail: "Bring a software idea or a ready product. We build together, list it in the SolyNext App Store, and grow it with shared revenue.",
        points: ["Build together", "List your product", "Share growth"],
        action: "For product owners",
        href: "/contact?solution=Product%20partnership",
        icon: Package,
      },
      {
        title: "Businesses",
        subtitle: "Ventures and investment",
        detail: "Start a new business, grow an existing one, or invest in a business we run or plan to launch.",
        points: ["New ventures", "Business growth", "Investment options"],
        action: "For partners & investors",
        href: "/contact?solution=Business%20partnership",
        icon: Building2,
      },
    ],
  },
  ways: {
    heading: "Find your way to join",
    items: [
      {
        title: "An expert or agency",
        detail: "Deliver and share work with our team.",
        explanation: "Refer a client, bring SolyNext into a project you lead, or work with our team on delivery. Tell us which services you offer and where you need support so we can agree on who handles each part of the project.",
        action: "Collaborate on projects",
        solution: "Service collaboration",
        icon: UsersRound,
      },
      {
        title: "A product owner",
        detail: "Build and sell software with SolyNext.",
        explanation: "Bring a software idea, a prototype, or an existing product. We can discuss what to build together, whether the SolyNext App Store is a fit, and how to divide product responsibilities and revenue.",
        action: "Discuss your product",
        solution: "Product partnership",
        icon: Package,
      },
      {
        title: "A business partner",
        detail: "Start or grow a business together.",
        explanation: "Share a venture you want to launch or a business you already run. We can explore where SolyNext can help, from setting up digital operations to reaching customers, and agree on what each partner brings.",
        action: "Explore a partnership",
        solution: "Business partnership",
        icon: Building2,
      },
      {
        title: "An investor",
        detail: "Grow with our businesses and products.",
        explanation: "Tell us which ventures or software products interest you and how involved you want to be. We can discuss opportunities that fit and review the proposed terms and responsibilities together.",
        action: "Discuss investing",
        solution: "Investment",
        icon: TrendingUp,
      },
      {
        title: "A team member",
        detail: "Join our team as an employee or contractor.",
        explanation: "Share your skills, work samples, and availability, along with the kind of role you want. We can discuss how your experience fits our team or a specific project and what the role would involve.",
        action: "Express interest",
        solution: "Careers and contracting",
        icon: Briefcase,
      },
      {
        title: "A student",
        detail: "Train with us and learn by doing.",
        explanation: "Choose a services, product, or business track based on what you want to learn. Tell us what you already know and where you want to improve so we can discuss training or internship opportunities that fit.",
        action: "Ask about training",
        solution: "Training and internship",
        icon: GraduationCap,
      },
    ],
  },
  policy: {
    heading: "Flexible by design",
    items: [
      { title: "Rules that fit the project.", detail: "Terms depend on the problem we solve and the idea we build, not a fixed template.", icon: Settings2 },
      { title: "Your value matters.", detail: "If you bring a strong option, we listen and adjust.", icon: Lightbulb },
      { title: "Clear agreement first.", detail: "Roles, profit share and responsibilities are written down before we start.", icon: ClipboardCheck },
    ],
    note: "See how we shape each partnership.",
  },
  training: {
    heading: "Learn and grow with SolyNext",
    intro: "Young people and new business owners can train with us and gain real experience. You can stay with SolyNext, work for your own business, or join another organization.",
    tracks: [
      { title: "Services track", detail: "Training and internships for people who want a job in marketing, web, design and software.", icon: Handshake },
      { title: "Product track", detail: "Training for engineers who want to become product owners, develop strong ideas and solve real problems.", icon: Package },
      { title: "Business track", detail: "Training for business owners and beginners on how to start and run a business in the age of mobile, AI and social media.", icon: Building2 },
    ],
    action: "Join as a student",
    href: "/contact?solution=Training%20and%20internship",
  },
  tags: {
    label: "Who we work with",
    items: [
      { label: "Agencies", icon: UsersRound },
      { label: "Experts", icon: GraduationCap },
      { label: "Product owners", icon: Package },
      { label: "Investors", icon: TrendingUp },
      { label: "Business owners", icon: Building2 },
      { label: "Students", icon: GraduationCap },
    ],
  },
  cta: {
    heading: "Have an idea, product or skill?",
    detail: "Tell us what you have in mind. We will find the best way to build it together.",
    action: "Start a partnership",
    href: "/contact?solution=General%20partnership",
  },
};

export function PartnershipSection({ standalone = false }: { standalone?: boolean }) {
  const { label, heading, description, introAction, areas, ways, policy, training, tags, cta } = partnership;
  const Heading = standalone ? "h1" : "h2";
  const BlockHeading = standalone ? "h2" : "h3";
  const CardHeading = standalone ? "h3" : "h4";

  const areaOptions = (
    <div>
      {standalone && <BlockHeading className={styles.blockHeading}>{areas.heading}</BlockHeading>}
      <div className={styles.grid}>
        {areas.items.map(({ title, subtitle, detail, points, action, href, icon: Icon }) => {
          const content = (
            <>
              <p>{detail}</p>
              <ul className={styles.points}>
                {points.map(point => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}
              </ul>
              <Link href={href} className={styles.textLink}>
                {action}<ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </>
          );

          return standalone ? (
            <article className={styles.card} data-partnership-reveal key={title}>
              <span className={styles.icon}><Icon aria-hidden="true" /></span>
              <CardHeading>{title}</CardHeading>
              {content}
            </article>
          ) : (
            <PartnershipAreaPopover key={title} title={title} subtitle={subtitle} icon={<Icon aria-hidden="true" />}>
              {content}
            </PartnershipAreaPopover>
          );
        })}
      </div>
    </div>
  );

  const details = (
    <div className={`${styles.container} ${styles.details}`}>
      {areaOptions}

      <div>
        <BlockHeading id="partnership-policy" className={styles.blockHeading}>{policy.heading}</BlockHeading>
        <ul className={`${styles.grid} ${styles.policy}`}>
          {policy.items.map(({ title, detail, icon: Icon }) => (
            <li className={styles.card} data-partnership-reveal key={title}>
              <span className={styles.icon}><Icon aria-hidden="true" /></span>
              <CardHeading>{title}</CardHeading>
              <p>{detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <BlockHeading className={styles.blockHeading}>{training.heading}</BlockHeading>
        <p className={styles.lead}>{training.intro}</p>
        <div className={styles.grid}>
          {training.tracks.map(({ title, detail, icon: Icon }) => (
            <article className={styles.card} data-partnership-reveal key={title}>
              <span className={styles.icon}><Icon aria-hidden="true" /></span>
              <CardHeading>{title}</CardHeading>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <Link href={training.href} className={styles.primary}>
          {training.action}<ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <ul className={styles.tags} aria-label={tags.label}>
        {tags.items.map(({ label, icon: Icon }) => (
          <li key={label}><Icon size={16} aria-hidden="true" />{label}</li>
        ))}
      </ul>

      <div className={styles.cta} data-partnership-reveal>
        <div>
          <BlockHeading className={styles.blockHeading}>{cta.heading}</BlockHeading>
          <p>{cta.detail}</p>
        </div>
        <Link href={cta.href} className={styles.primary}>
          {cta.action}<ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="partnership-title">
      <div className={styles.join}>
        <div className={`${styles.container} ${styles.layout}`}>
          <header className={styles.intro}>
            <p className={styles.label}>{label}</p>
            <Heading id="partnership-title" className={styles.title}>
              {heading.start} <span>{heading.accent}</span>
            </Heading>
            <p className={styles.description}>{description}</p>
            <Link href={cta.href} className={styles.primary}>
              {introAction}<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </header>
          <div>
            <BlockHeading className={styles.roleHeading}>{ways.heading}</BlockHeading>
            <div className={styles.grid}>
              {ways.items.map(({ title, detail, explanation, action, solution, icon: Icon }) => (
                <article className={styles.card} data-partnership-reveal key={title}>
                  <span className={styles.icon}><Icon aria-hidden="true" /></span>
                  <CardHeading>{title}</CardHeading>
                  <p>{standalone ? explanation : detail}</p>
                  <Link className={styles.textLink} href={`/contact?solution=${encodeURIComponent(solution)}`}>
                    {action}<ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
            {standalone ? (
              <p className={styles.note} data-partnership-reveal>
                <a href="#partnership-policy">{policy.heading}.</a> {policy.note}
              </p>
            ) : (
              <div className={styles.homeAreas}>{areaOptions}</div>
            )}
          </div>
        </div>
      </div>

      {standalone && details}
    </section>
  );
}
