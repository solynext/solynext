import type { ChatMessage, ChatReply } from "./types";
import { analyzeQuestion, normalizeQuestion, type QuestionAnalysis, type ServiceIntent } from "./analysis";
import { capabilities } from "./capabilities";

export const welcomeMessage = "Hi! I'm the SolyNext assistant. I can help you explore our technology services and digital solutions. What would you like to build?";
export const quickActions = ["What can you develop?", "Our Services", "Website Development", "Mobile Apps", "UI/UX Design", "Start a Project"];

const contact = { label: "Discuss your project", href: "/contact" };
const serviceReply = (text: string, intent: ServiceIntent): ChatReply => ({ text, links: [{ label: "Explore this service", href: `/services/${capabilities[intent].slug}` }, contact] });
const scopeReply: ChatReply = { text: "Sorry, I can only help with SolyNext's technology services and digital solutions. I can help with websites, mobile apps, software, UI/UX design, graphics, marketing, social media, and video. What would you like to build?" };
const projectName = (analysis: QuestionAnalysis) => {
  const { solution, industry } = analysis.context;
  return `${industry ? `${industry} ` : ""}${solution ? capabilities[solution].label : "digital project"}`;
};

function bridgeBusiness(analysis: QuestionAnalysis): ChatReply {
  const { industry, solution } = analysis.context;
  if (industry === "restaurant") return serviceReply("For a restaurant business, SolyNext can help with the technology side: a website, digital menu, online ordering, branding, and social media content. Would you like to start with a website, an ordering system, or your brand presence?", "web");
  if (industry === "clothing" || industry === "retail") return serviceReply("From a technology perspective, your business could benefit from an e-commerce website, digital marketing, social media management, and product graphics. SolyNext can help with those solutions. Do you already have an online store, or mainly sell through social media?", solution === "marketing" ? "marketing" : "ecommerce");
  if (solution === "software") return serviceReply("That workflow could benefit from custom software to organize information, track work, and reduce repetitive steps. SolyNext builds business systems and automation tools. Which process takes the most time or causes the most errors?", "software");
  if (solution === "marketing") return serviceReply("From a digital perspective, SolyNext can help with SEO, marketing campaigns, social media, and a clearer online customer experience. Which channels bring you customers today, and what would you like to improve?", "marketing");
  return serviceReply(`For ${industry ? `your ${industry} business` : "your business"}, SolyNext can help with a professional website, relevant online workflows, branding, and digital marketing. What would you like customers to be able to do online?`, "web");
}

function technologyReply(message: string, analysis: QuestionAnalysis): ChatReply {
  const text = normalizeQuestion(message);
  if (/\b(what is|what are|explain|how does|how do)\b/.test(text)) {
    if (/\bapi\b/.test(text)) return serviceReply("An API lets software systems exchange information. SolyNext can build or integrate APIs to connect your website, app, and business tools. Which systems do you need to connect?", "software");
    if (/\bdatabase\b/.test(text)) return serviceReply("A database organizes information such as customers, products, and orders. SolyNext can build software around your data and access needs. What information does your project need to manage?", "software");
    if (/\bsaas\b/.test(text)) return serviceReply("SaaS is software customers access online, often through a subscription. SolyNext builds custom SaaS platforms and business workflows. What would your product help its users do?", "software");
    if (/\bautomation\b/.test(text)) return serviceReply("Automation uses software to handle repetitive steps, such as moving data between tools or processing routine tasks. SolyNext can help identify a suitable workflow. What would you like to automate?", "software");
  }
  const solution = analysis.context.solution ?? "web";
  return serviceReply(`Our published ${capabilities[solution].label} stack includes ${capabilities[solution].technologies.join(", ")}. The right choice depends on your requirements. If you need a particular framework or platform, the team should confirm its suitability before committing. What are you planning to build?`, solution);
}

function directService(analysis: QuestionAnalysis): ChatReply {
  const { intent, context, usedContext } = analysis;
  const solution = intent as ServiceIntent;
  if (usedContext && context.features.length) return serviceReply(`For your ${projectName(analysis)}, we can scope ${context.features.join(", ")} around your users and workflow. Which features are essential for the first release?`, solution);
  switch (solution) {
    case "ecommerce": return serviceReply(`Yes. SolyNext can develop an e-commerce website${context.industry ? ` for your ${context.industry} business` : ""} with product management, categories, shopping carts, checkout, and user accounts based on your requirements. What products will you sell, and which payment or delivery options do you need?`, solution);
    case "web": {
      if (context.industry === "clothing" || context.industry === "retail") return serviceReply("For your clothing or retail business, we can build a website to present your products and brand, or an e-commerce store with a cart and checkout. Do you want customers to buy online or send inquiries?", solution);
      if (context.industry === "travel agency") return serviceReply("Absolutely. SolyNext can build a travel agency website with services, tour packages, contact options, and booking and payment integrations based on your requirements. Should visitors book online or request a tailored trip?", solution);
      if (context.industry === "restaurant") return serviceReply("Yes. We can build a restaurant website with your menu, contact information, and ordering or reservation features based on your requirements. Do you need a digital menu, online orders, or table reservations?", solution);
      if (context.industry === "hotel") return serviceReply("Yes. We can develop a hotel website to showcase rooms and services, with booking and payment integrations scoped to your requirements. Do you need direct bookings or a connection to an existing system?", solution);
      return serviceReply("Yes. SolyNext can design and develop responsive websites, web applications, and customer portals. What type of website do you need, and what should visitors be able to do?", solution);
    }
    case "mobile": return serviceReply(`Yes. We can develop ${context.platform ? `an ${context.platform} application` : "a mobile application"}${context.industry ? ` for your ${context.industry} business` : ""} based on your requirements.${context.industry === "car rental" ? " Features could include vehicle listings, availability, booking, and payments." : ""} ${context.platform ? "What are the main features you need?" : "Tell me your app idea, its main features, and whether you need Android, iOS, or both."}`, solution);
    case "software": return serviceReply("We build custom software, SaaS products, management systems, dashboards, APIs, databases, and automation tools. Which business process should the system support, and what tools does it need to connect with?", solution);
    case "ux": return serviceReply("We can help with UI/UX design, user flows, wireframes, prototypes, and design systems. Is this a new product or a redesign, and what do users find difficult today?", solution);
    case "graphics": return serviceReply("Yes. SolyNext provides graphic design, including logos, social media graphics, brand identities, and digital branding materials. Tell me about your business and the visuals you need first.", solution);
    case "marketing": return serviceReply("Our digital marketing services cover SEO, content strategy, performance campaigns, and analytics. What is your business, who are your customers, and is your main goal more traffic, inquiries, or online sales?", solution);
    case "social": return serviceReply("We help with social media strategy, content planning, publishing, and community management. Which platforms do you use, and what would you like your content to achieve?", solution);
    case "video": return serviceReply("We can help with video editing, product explainers, social videos, and motion graphics. What is the video for, where will it be used, and do you already have footage or a script?", solution);
  }
}

/** Analysis metadata stays internal. The UI receives only text and vetted links. */
export function getPredefinedReply(message: string, history: ChatMessage[] = []): ChatReply {
  const analysis = analyzeQuestion(message, history);
  if (analysis.relevance === "irrelevant") return scopeReply;
  if (analysis.intent === "greeting") return { text: welcomeMessage };
  if (analysis.intent === "acknowledgement") {
    if (analysis.context.solution === "mobile" && normalizeQuestion(message) === "both") return serviceReply(`We can plan your ${analysis.context.industry ? `${analysis.context.industry} ` : ""}app for Android and iOS. What should users be able to do in the first release?`, "mobile");
    return { text: analysis.context.solution ? `What would you like to clarify next about your ${projectName(analysis)}: features, design, or project requirements?` : "You're welcome! What digital product or service would you like to explore?" };
  }
  if (analysis.intent === "estimate") return { text: `The cost and delivery time for your ${projectName(analysis)} depend on the scope, features, integrations, and platforms. Share your essential features, target launch date, and budget range. The team can review these and provide a tailored estimate.`, links: [{ label: "Request a project estimate", href: "/contact" }] };
  if (analysis.intent === "technology") return technologyReply(message, analysis);
  if (analysis.intent === "ai") return serviceReply("SolyNext's published capabilities include AI API integration for document parsing, summarization, customer triage, and search enhancement. The team would need to review your data, workflow, and scope before confirming a specific AI solution. What task would you like it to help with?", "software");
  if (analysis.intent === "services") return { text: "SolyNext develops websites, mobile apps, and custom software. We also provide UI/UX design, graphic design, digital marketing, social media management, and video editing. Which solution would you like to explore?", links: [{ label: "Explore all services", href: "/services" }] };
  if (analysis.intent === "project") return { text: "Tell me what you want to build, who will use it, and the main problem it should solve. We can then explore the right website, app, software, or creative service for your project.", links: [{ label: "Send a project inquiry", href: "/contact" }] };
  if (analysis.intent === "clarify") return { text: analysis.context.features.length ? `You mentioned ${analysis.context.features.join(", ")}. Is this for a website, mobile app, or custom business system, and who will use it? We can then scope the first release.` : "What would you like help with: a website, mobile app, business software, design, or digital marketing? Tell me the main goal before we choose a solution.", links: [contact] };
  if (analysis.relevance === "partially-relevant") return bridgeBusiness(analysis);
  return directService(analysis);
}
