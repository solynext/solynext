import { slugify } from "./model";

const categories = [
  {title:"Web Development",description:"Websites, apps and software built around your business.",details:[
   {name:"UI/UX Design",description:"Simple, intuitive designs for websites and apps.",includes:["User flows and wireframes","Responsive interface design","Interactive prototypes"]},
   {name:"Business Websites",description:"Professional websites for companies, shops, clinics, schools and personal brands, plus redesigns of old websites.",includes:["Custom design and development","Mobile, tablet and desktop support","On-page SEO and speed optimization","Domain setup and deployment"]},
   {name:"E-commerce Stores",description:"Online stores and multi-vendor marketplaces where customers can browse, pay and order.",includes:["Product catalog and store setup","Payments and order management","Product uploading"]},
   {name:"Web Apps & Portals",description:"Browser-based software on a subscription or fixed plan, with no installation required.",includes:["Booking systems and dashboards","Customer and admission portals","School management and SaaS products"]},
   {name:"Mobile Apps (Android & iOS)",description:"Apps for your customers, your staff or your business owners.",includes:["App design and development","Publishing support","Ongoing updates"]},
   {name:"Custom Software",description:"Software built around your business needs and ways of working, including desktop software and integrations.",includes:["Purpose-built workflows","Desktop software","Connections to the tools you already use"]},
   {name:"POS & Business Software",description:"Ready-made or custom tools for sales and daily operations, online or offline.",includes:["Point of sale","Billing and invoicing","Inventory, stock and reporting"]},
   {name:"AI-Powered Development",description:"Websites, apps and software with useful AI features built in.",includes:["AI chat and search","Smart recommendations","Document and data tools","AI agents inside your product"]},
  ]},
  {title:"Marketing",description:"Get seen, get trusted and get customers.",details:[
   {name:"Digital Marketing",description:"Planned campaigns that bring leads and sales, with results tracked and reported.",includes:["Marketing strategy and audience research","Meta Ads and Google Ads","Lead generation","Campaign monitoring and optimization","Performance reports"]},
   {name:"SEO",description:"Help customers find you on Google by making your website and profiles search-friendly.",includes:["On-page SEO and keyword planning","SEO-friendly content","Profile and page optimization","Speed and performance improvements"]},
   {name:"Social Media Marketing",description:"Grow your audience and sales on the platforms your customers use.",includes:["Facebook, Instagram, TikTok and LinkedIn","Content strategy, posts, reels and short videos","Social ads and community engagement"]},
   {name:"Influencer Marketing",description:"Reach new customers through creators your audience already follows and trusts.",includes:["Finding relevant influencers","Campaign planning and coordination","Content approval and results tracking"]},
   {name:"Branding & Graphic Design",description:"Create a professional identity that makes your business trusted and easy to remember.",includes:["Logo and brand identity","UI/UX and packaging design","Catalogs and social media creative","Brand presentation"]},
  ]},
  {title:"Business Management",description:"We run your business, so you can focus on growth.",details:[
   {name:"Full Business Management",description:"SolyNext runs your online operations from start to finish, so you work with one team.",includes:["Social media, website and online store","Marketplace management, customers and orders","Bookings and marketing coordination","Growth planning and consultation"]},
   {name:"Social Media Management",description:"Keep your pages active, consistent and professional with day-to-day support.",includes:["Content planning, design and publishing","Posts, reels and scheduling","Replies to messages and comments","Profile optimization and monitoring"]},
   {name:"Sales & Customer Management",description:"We handle customers from the first message through to a confirmed order.",includes:["Customer inquiries and booking management","Order receiving, processing and confirmation","Follow-ups and customer service support"]},
   {name:"Online Store & Marketplace Management",description:"Keep your store and marketplace listings updated, organized and selling.",includes:["Product uploading and catalog management","Listing optimization and order handling","Website SEO and performance"]},
   {name:"Growth Planning & Consultation",description:"Get clear advice and a plan for the next step of your business.",includes:["Online sales growth strategies","Customer experience improvement","Ongoing consultation"]},
  ]},
  {title:"AI & Automation",description:"AI agents and automation that work for your business.",details:[
   {name:"AI Agents & Agentic AI",description:"Agents that plan and complete tasks using your tools and data, with approval where it matters.",includes:["Task and workflow agents","Multi-agent systems","Connections to your apps and tools","Monitoring and human approval steps"]},
   {name:"AI Chatbots & Assistants",description:"Chatbots for your website, app and social media, plus AI assistants for your team.",includes:["Setup trained on your business","Question answering and lead capture","Booking capture and handover to your team"]},
   {name:"AI Voice Agents",description:"AI that answers and makes phone calls in a natural voice.",includes:["Call answering and appointment booking","Lead qualification and follow-up calls","Handover to a person"]},
   {name:"RAG Knowledge Assistants",description:"AI that answers from your documents, website and data so responses match your business.",includes:["Knowledge bases from files and pages","Answers grounded in your data","Internal or customer-facing assistants"]},
   {name:"WhatsApp Automation",description:"Automated WhatsApp messaging that supports customers around the clock.",includes:["Auto replies and WhatsApp chatbots","Order, booking and follow-up messages","Lead capture and broadcasts"]},
   {name:"Sales Automation",description:"A sales process that follows up on every lead without manual work.",includes:["Lead capture and automatic follow-ups","CRM updates, quotations and invoices","Reminders and sales reports"]},
   {name:"Workflow & Business Automation",description:"Connect your tools and remove repeated manual tasks.",includes:["Workflows using n8n, Make and Zapier","Integrations between your tools","Smart reports and dashboards"]},
   {name:"AI-Based Software",description:"Custom software with AI at its core, built as web, mobile or desktop products.",includes:["SaaS products","Web and mobile apps","AI features, models and integrations"]},
   {name:"AI ERP & Business Systems",description:"ERP, CRM, POS and business systems with AI support and your team in control.",includes:["Orders, inventory and billing","Reporting and daily operations","Dashboards and approval steps"]},
  ]},
];

export const serviceCategoryPages = categories.map(category => {
  const slug = slugify(category.title);
  const href = `/services/categories/${slug}`;

  return {
    ...category,
    slug,
    href,
    image: `/images/service-categories/${slug}.png`,
    details: category.details.map(service => {
      const serviceSlug = slugify(service.name);
      return {
        ...service,
        slug: serviceSlug,
        href: `${href}/${serviceSlug}`,
        image: `/images/service-carousels/${slug}/${serviceSlug}.webp`,
      };
    }),
  };
});

export type ServiceCategoryPage = (typeof serviceCategoryPages)[number];
export type ServicePageDetail = ServiceCategoryPage["details"][number];
