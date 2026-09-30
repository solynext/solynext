export type ServiceCategory =
  | "software"
  | "web"
  | "mobile"
  | "design"
  | "marketing"
  | "cloud";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  problemSolved: string;
  solution: string;
  keyBenefits: string[];
  features: string[];
  processSteps: { step: string; title: string; description: string }[];
  deliverables: string[];
  technologies: string[];
  featuredImage: string;
  estimatedTimeline: string;
  startingPriceTier: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  clientLocation: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  keyResults: { metric: string; label: string }[];
  technologies: string[];
  featuredImage: string;
  architectureDetails: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface IndustrySolution {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  businessChallenge: string;
  solynextSolution: string;
  keyCapabilities: string[];
  technologies: string[];
  impactMetric: string;
}

export interface TechnologyItem {
  name: string;
  category: "Frontend" | "Backend" | "Mobile" | "Cloud & DevOps" | "Database" | "Design & Creative" | "Data & AI";
  description: string;
  proficiencyLevel: "Core Expertise" | "Advanced" | "Production Ready";
  popularUseCases: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  avatarUrl?: string;
  projectScope: string;
  quote: string;
  quantifiedResult: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: "Engineering" | "Design" | "Product" | "Marketing";
  location: "Islamabad (Hybrid)" | "Lahore (Hybrid)" | "Remote (Worldwide)";
  type: "Full-Time" | "Contract";
  experience: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Services & Tech" | "Pricing & Contracts" | "International Delivery";
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceRequired: string;
  budgetRange: string;
  projectTimeline: string;
  projectDescription: string;
}
