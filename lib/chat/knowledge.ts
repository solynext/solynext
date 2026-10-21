import "server-only";
import { BLOG_POSTS_DATA, FAQS_DATA, INDUSTRY_SOLUTIONS_DATA, JOB_OPENINGS_DATA, SERVICES_DATA, TECHNOLOGIES_DATA } from "@/data/mockData";
import type { ChatLink } from "./types";

export interface KnowledgePage extends ChatLink { content: string }

export const websiteKnowledge: KnowledgePage[] = [
  { label: "About SolyNext", href: "/about", content: "Pakistan-based software and digital technology company. Based in Islamabad and Lahore; works with international clients. Product design, engineering, and digital growth. Contact: solynextsolutions@gmail.com or contact@solynext.com. Never invent phone numbers, opening hours, team availability, certifications or client results." },
  { label: "Contact our team", href: "/contact", content: "Share your goals, requirements, and timeline. The inquiry form prepares an email draft; you must send it from your email app. This chat cannot submit inquiries, book appointments, or contact the team." },
  { label: "Services", href: "/services", content: SERVICES_DATA.map(service => `${service.title}: ${service.tagline}`).join("\n") },
  ...SERVICES_DATA.map(service => ({ label: service.title, href: `/services/${service.slug}`, content: JSON.stringify({ description: service.fullDescription, benefits: service.keyBenefits, features: service.features, process: service.processSteps, deliverables: service.deliverables, technologies: service.technologies, indicativeTimeline: service.estimatedTimeline, engagementModel: service.startingPriceTier }) })),
  { label: "Technologies", href: "/technologies", content: JSON.stringify(TECHNOLOGIES_DATA) },
  { label: "Industry solutions", href: "/solutions", content: JSON.stringify(INDUSTRY_SOLUTIONS_DATA.map(({ title, businessChallenge, solynextSolution, keyCapabilities }) => ({ title, businessChallenge, solynextSolution, keyCapabilities }))) },
  { label: "How we work", href: "/process", content: "Discover goals and requirements; design the experience and architecture; develop in focused sprints with reviews; test, launch, and improve. Shared repositories, working builds, transparent sprint delivery. Clients own their code and intellectual property, with contract details confirmed by the team." },
  { label: "Pricing & engagement", href: "/pricing", content: "Project pricing depends on scope and requirements. Ask the team for a scoped quote. Do not invent fixed prices, discounts or guaranteed delivery dates. Engagement options include project scope, sprints, dedicated teams and ongoing support, subject to confirmation." },
  { label: "Frequently asked questions", href: "/", content: JSON.stringify(FAQS_DATA) },
  ...BLOG_POSTS_DATA.map(post => ({ label: post.title, href: `/blog/${post.slug}`, content: [post.excerpt, ...post.content].join("\n") })),
  { label: "Careers", href: "/careers", content: JSON.stringify(JOB_OPENINGS_DATA.map(({ title, department, location, type, experience, overview }) => ({ title, department, location, type, experience, overview }))) },
];

export function selectKnowledge(pages: KnowledgePage[], question: string, page?: string) {
  const terms = [...new Set(question.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? [])].slice(-100);
  return pages.map((entry, index) => {
    const searchable = `${entry.label} ${entry.content}`.toLowerCase();
    const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0) + (entry.label.toLowerCase().includes(term) ? 3 : 0), 0) + (entry.href === page ? 50 : 0);
    return { entry, index, score };
  }).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 10).map(({ entry }) => ({ ...entry, content: entry.content.slice(0, 6500) }));
}
