import type { ServiceIntent } from "./analysis";

/** Curated from SERVICES_DATA / TECHNOLOGIES_DATA in data/mockData.ts. No price or delivery promises. */
export const capabilities: Record<ServiceIntent, { label: string; slug: string; summary: string; technologies: string[] }> = {
  web: { label: "website", slug: "web-development", summary: "Responsive business websites, web applications, and customer portals", technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"] },
  ecommerce: { label: "e-commerce website", slug: "web-development", summary: "Online stores with product management, shopping carts, checkout, and user accounts", technologies: ["Next.js", "React", "TypeScript", "PostgreSQL"] },
  mobile: { label: "mobile app", slug: "mobile-development", summary: "Mobile applications for Android and iOS with APIs, accounts, payments, and notifications scoped to your needs", technologies: ["React Native", "Expo", "TypeScript", "Swift", "Kotlin", "Firebase"] },
  software: { label: "software system", slug: "software-development", summary: "Custom software, SaaS products, business systems, dashboards, APIs, databases, and workflow automation", technologies: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "AWS"] },
  ux: { label: "product design", slug: "ui-ux-design", summary: "User research, wireframes, prototypes, user interfaces, and design systems", technologies: ["Figma"] },
  graphics: { label: "brand design", slug: "graphic-design-branding", summary: "Logos, brand identities, social media graphics, and digital brand materials", technologies: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma"] },
  marketing: { label: "digital marketing", slug: "digital-marketing", summary: "SEO, content strategy, performance campaigns, and analytics", technologies: ["Google Ads", "Meta Ads", "GA4", "SEMrush", "HubSpot"] },
  social: { label: "social media strategy", slug: "social-media-management", summary: "Content planning, publishing, brand presence, and community management", technologies: ["Buffer", "Hootsuite", "Canva", "Meta Suite"] },
  video: { label: "video production", slug: "video-production-motion", summary: "Video editing, product explainers, social videos, and motion graphics", technologies: ["After Effects", "Premiere Pro", "Blender", "DaVinci Resolve"] },
};
