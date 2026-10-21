/** Editable, public company facts only. Do not add credentials or internal documents here. */
export interface KnowledgeEntry {
  id: string;
  title: string;
  href: string;
  keywords: string[];
  content: string;
}

export const companyKnowledge: KnowledgeEntry[] = [
  { id: "company", title: "About SolyNext", href: "/about", keywords: ["company", "location", "Pakistan", "Islamabad", "Lahore", "about"], content: "SolyNext is a Pakistan-based software and digital technology company, based in Islamabad and Lahore. It brings product design, engineering and digital growth together and works with international clients. Source: public About, Contact and home pages." },
  { id: "contact", title: "Contact SolyNext", href: "/contact", keywords: ["contact", "email", "inquiry", "meeting", "رابطہ", "rabta"], content: "Public email addresses: solynextsolutions@gmail.com and contact@solynext.com. The project inquiry form prepares an email draft; the visitor must send it from their email application. Chat cannot send an inquiry, schedule a meeting or contact the team. No verified telephone number or business hours are provided." },
  { id: "quotation", title: "Project scope and quotations", href: "/pricing", keywords: ["price", "pricing", "cost", "quote", "quotation", "budget", "estimate", "قیمت", "kitna", "qeemat"], content: "Final pricing requires team confirmation after scope review. No approved fixed numeric price list is configured for the assistant. Ask only for missing essentials: business goal, audience, platform, essential features, integrations, existing assets, target timeline and optional budget range. Never invent prices, discounts, availability, guarantees, contractual policies or delivery commitments. Published timelines and engagement models are indicative. Do not collect passwords, payment details, private keys or sensitive personal information." },
  { id: "process", title: "Development process", href: "/process", keywords: ["process", "discovery", "sprint", "delivery", "planning", "requirements"], content: "Discover the user's goals and requirements, design the experience and architecture, develop in focused sprints with reviews and working builds, then test, launch and improve. Published FAQs describe two-week agile sprints, weekly demos, continuous staging builds and direct collaboration. Confirm terms and schedules with the team." },
  { id: "platform-guidance", title: "Choosing an e-commerce platform", href: "/services/web-development", keywords: ["ecommerce", "e-commerce", "shopify", "woocommerce", "wordpress", "store", "products", "آن لائن", "dukan"], content: "General consulting guidance: Shopify, WooCommerce and a custom-built application are possible e-commerce approaches. Compare catalog size, payment/shipping integrations, ownership, content needs, budget and maintenance. These options are general guidance, not confirmation that SolyNext offers every named platform. Team review is required before confirming an unsupported platform or integration." },
];

export const projectRequirements = ["Goal and audience", "Website, mobile app or internal system", "Essential launch features", "Integrations and existing assets", "Target timeline", "Budget range, if comfortable sharing"];
