import {
  ServiceItem,
  CaseStudy,
  IndustrySolution,
  TechnologyItem,
  TestimonialItem,
  BlogPost,
  JobOpening,
  FAQItem,
} from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Engineering & Platforms",
    category: "web",
    tagline: "High-performance web apps and scalable portals",
    shortDescription:
      "Fast, secure web apps built with Next.js, React, and modern APIs.",
    fullDescription:
      "We engineer fast, scalable web applications for high-growth businesses. From customer-facing platforms to complex internal dashboards, our codebases are built for speed, security, and effortless scaling.",
    iconName: "Globe",
    problemSolved:
      "Slow, outdated websites that fail to convert visitors or crash under sudden traffic spikes.",
    solution:
      "Modern Next.js architecture with sub-second page loads, automated CI/CD, and robust testing.",
    keyBenefits: [
      "Sub-second load times with Next.js and optimized CDNs",
      "Full mobile, tablet, and desktop responsiveness",
      "Enterprise security with OAuth and role-based access",
      "Built-in SEO architecture for organic search rankings",
    ],
    features: [
      "Custom Full-Stack Web Apps (Next.js, React, Node.js)",
      "Headless E-Commerce & Payment Gateway Integrations",
      "Enterprise Admin Portals with Role-Based Access",
      "Microservice & API Architectures with Docker",
      "Content Management Systems with Custom Workflows",
    ],
    processSteps: [
      { step: "01", title: "Architecture", description: "Define data schemas, API contracts, and hosting topology." },
      { step: "02", title: "UI Components", description: "Build reusable, accessible components in Figma and React." },
      { step: "03", title: "Integration", description: "Connect APIs, databases, authentication, and caching layers." },
      { step: "04", title: "Testing & Launch", description: "Run automated tests, optimize speed, and deploy live." },
    ],
    deliverables: [
      "Clean TypeScript codebase with unit and integration tests",
      "Complete API documentation and Postman collections",
      "Automated CI/CD deployment pipelines on GitHub Actions",
      "30-day post-launch warranty and technical support",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker"],
    featuredImage: "/images/hero-tech.jpg",
    estimatedTimeline: "4 - 10 weeks",
    startingPriceTier: "Milestone-based or dedicated team",
  },
  {
    id: "software-development",
    slug: "software-development",
    title: "Custom Software Engineering",
    category: "software",
    tagline: "Custom backend systems, SaaS engines, and automation tools",
    shortDescription:
      "Tailored enterprise software and APIs engineered to automate business workflows.",
    fullDescription:
      "When off-the-shelf software falls short, we build custom systems from scratch. We engineer reliable backend services, database architectures, and admin tools that eliminate manual bottlenecks.",
    iconName: "Cpu",
    problemSolved:
      "Manual spreadsheets, data entry errors, and rigid vendor software licenses.",
    solution:
      "Purpose-built software platforms with automated queues, data sync, and custom reporting.",
    keyBenefits: [
      "100% code ownership with zero recurring license fees",
      "Automated workflows eliminating hours of manual work",
      "Scalable architecture built for heavy transaction loads",
      "Strict role-based permissions and data protection",
    ],
    features: [
      "Multi-Tenant SaaS Platforms with Subscription Billing",
      "Custom ERP & Operations Management Software",
      "Task Workers & Message Queues (BullMQ / Kafka)",
      "Legacy Code Modernization & Database Migrations",
      "Automated ETL Pipelines and Third-Party API Integrations",
    ],
    processSteps: [
      { step: "01", title: "Discovery", description: "Map business rules, operational flows, and integration needs." },
      { step: "02", title: "Data Modeling", description: "Design normalized database schemas and API specifications." },
      { step: "03", title: "Development", description: "Build backend services with automated testing coverage." },
      { step: "04", title: "Deployment", description: "Verify end-to-end user flows and deploy to cloud servers." },
    ],
    deliverables: [
      "Modular backend services and database schema migrations",
      "Administrative dashboard and reporting interface",
      "System administration and backup documentation",
      "Technical architecture documentation and diagrams",
    ],
    technologies: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Docker", "AWS"],
    featuredImage: "/images/engineering-dev.jpg",
    estimatedTimeline: "6 - 16 weeks",
    startingPriceTier: "Sprint-based sprint contracts",
  },
  {
    id: "mobile-development",
    slug: "mobile-development",
    title: "Mobile App Development",
    category: "mobile",
    tagline: "Cross-platform iOS and Android mobile apps",
    shortDescription:
      "Smooth, native-feeling mobile applications built with React Native.",
    fullDescription:
      "We build intuitive mobile apps for iOS and Android. With smooth 60fps animations, biometric login, and offline sync, we deliver apps users love keeping on their devices.",
    iconName: "Smartphone",
    problemSolved:
      "Sluggish hybrid apps, high dual-codebase costs, and frequent mobile crashes.",
    solution:
      "Unified React Native codebases with native speed, offline caching, and instant notifications.",
    keyBenefits: [
      "One unified codebase saving up to 40% in development costs",
      "Fast offline storage and seamless data synchronization",
      "Guaranteed App Store & Google Play submission approval",
      "Integrated push notifications and user analytics",
    ],
    features: [
      "Universal iOS & Android Apps with Native Gestures",
      "Biometric Login (FaceID / Fingerprint) & Keychain Security",
      "Offline-First Data Storage with Auto Sync",
      "In-App Purchases, Apple Pay, and Google Pay",
      "Live Location Tracking, Maps, and Push Notifications",
    ],
    processSteps: [
      { step: "01", title: "UX Flows", description: "Map touch-friendly screens and navigation transitions." },
      { step: "02", title: "Prototype", description: "Set up native navigation and offline storage layers." },
      { step: "03", title: "Build & Sync", description: "Connect APIs, biometric auth, and push notification feeds." },
      { step: "04", title: "Store QA", description: "Test on real devices and manage App Store submissions." },
    ],
    deliverables: [
      "Production-ready IPA and APK/AAB build files",
      "Configured App Store Connect and Google Play listings",
      "Automated CI/CD build pipelines on GitHub Actions",
      "Integrated crash reporting and performance telemetry",
    ],
    technologies: ["React Native", "TypeScript", "Expo", "iOS Swift", "Android Kotlin", "Firebase"],
    featuredImage: "/images/uiux-design.jpg",
    estimatedTimeline: "6 - 12 weeks",
    startingPriceTier: "Fixed milestone packages",
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX & Product Design",
    category: "design",
    tagline: "User research, design systems, and conversion-focused interfaces",
    shortDescription:
      "Intuitive digital product design that balances aesthetics with frictionless user journeys.",
    fullDescription:
      "We design clean, intuitive interfaces for web and mobile products. From user interviews to interactive Figma prototypes and design tokens, we build products that users love using.",
    iconName: "Palette",
    problemSolved:
      "Confusing user journeys, drop-offs during onboarding, and inconsistent design files.",
    solution:
      "Fast design sprints with clickable Figma prototypes, accessible components, and dev-ready specs.",
    keyBenefits: [
      "Reduced user onboarding friction and support requests",
      "Comprehensive design systems speeding up development by 2x",
      "WCAG 2.1 AA accessibility compliance across all screens",
      "Pixel-perfect developer handoff with inspectable design tokens",
    ],
    features: [
      "User Journey Mapping and Interactive Wireframes",
      "Clickable High-Fidelity Prototypes in Figma",
      "Scalable Design Systems and UI Component Kits",
      "B2B SaaS Dashboard and Data Visualization UX",
      "Usability Testing and User Feedback Iteration",
    ],
    processSteps: [
      { step: "01", title: "User Research", description: "Audit user pain points and define key screen flows." },
      { step: "02", title: "Wireframes", description: "Map out structural layout and core navigation." },
      { step: "03", title: "Visual Design", description: "Establish colors, typography, and atomic UI tokens." },
      { step: "04", title: "Dev Handoff", description: "Prepare interactive prototypes and component specs." },
    ],
    deliverables: [
      "Organized Figma source file with interactive components",
      "Design system documentation and token specifications",
      "Clickable prototype link for user testing and stakeholder demos",
      "Exported vector SVG icons and production assets",
    ],
    technologies: ["Figma", "Design Systems", "Prototyping", "User Research", "WCAG AA"],
    featuredImage: "/images/uiux-design.jpg",
    estimatedTimeline: "3 - 8 weeks",
    startingPriceTier: "Sprint-based or project scope",
  },
  {
    id: "graphic-design-branding",
    slug: "graphic-design-branding",
    title: "Brand Identity & Graphic Design",
    category: "design",
    tagline: "Distinct visual identities, logos, and brand guidelines",
    shortDescription:
      "Memorable brand identities, logos, and marketing assets that build credibility.",
    fullDescription:
      "We craft cohesive brand identities that make companies look professional and established. From custom logos to brand guidelines and pitch decks, we make your visual identity memorable.",
    iconName: "Layers",
    problemSolved:
      "Inconsistent visuals, low-res logos, and generic branding that damages credibility.",
    solution:
      "End-to-end brand guidelines with vector logo packages, typography rules, and social templates.",
    keyBenefits: [
      "Consistent, premium market presence across all channels",
      "Master vector logo files ready for digital and print use",
      "Reusable templates allowing anyone on your team to stay on brand",
      "Higher perceived brand trust in sales conversations",
    ],
    features: [
      "Custom Logo Suite (Primary, Secondary, Icon, Favicon)",
      "Brand Guidelines (Color, Typography, Voice, Logo Usage)",
      "Corporate Stationery and Digital Email Signatures",
      "Investor Pitch Decks and Presentation Templates",
      "Social Media Graphic Packs and Ad Creatives",
    ],
    processSteps: [
      { step: "01", title: "Positioning", description: "Define your brand values, audience, and industry niche." },
      { step: "02", title: "Concepts", description: "Explore 3 distinct creative directions and logo sketches." },
      { step: "03", title: "Refinement", description: "Refine selected direction with geometric precision." },
      { step: "04", title: "Brand Assets", description: "Export master asset kits and comprehensive guidelines." },
    ],
    deliverables: [
      "Master vector logo files in AI, EPS, SVG, PNG, and PDF",
      "Brand Identity Manual detailing correct usage rules",
      "Custom presentation templates in PowerPoint & Google Slides",
      "Reusable social media template library in Figma",
    ],
    technologies: ["Adobe Illustrator", "Photoshop", "InDesign", "Figma", "Vector Art"],
    featuredImage: "/images/uiux-design.jpg",
    estimatedTimeline: "2 - 5 weeks",
    startingPriceTier: "Fixed brand package",
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Performance Digital Marketing & SEO",
    category: "marketing",
    tagline: "Customer acquisition, technical SEO, and conversion funnels",
    shortDescription:
      "Data-driven marketing and SEO campaigns that drive qualified leads and revenue.",
    fullDescription:
      "We grow customer acquisition through high-intent search campaigns, technical SEO, and landing page optimization with a clear focus on ROI and lower acquisition costs.",
    iconName: "TrendingUp",
    problemSolved:
      "Wasted ad spend on low-intent clicks, low organic rankings, and poor conversion rates.",
    solution:
      "Targeted Google and Meta ad campaigns paired with technical SEO and conversion testing.",
    keyBenefits: [
      "Clear revenue attribution and tracking in GA4 dashboards",
      "Long-term organic traffic growth targeting buyers with high intent",
      "Optimized landing pages reducing cost per acquisition by 30%+",
      "Continuous A/B testing of headlines, creatives, and offers",
    ],
    features: [
      "Technical SEO Audits & Core Web Vitals Optimization",
      "Google Search & Display Ads (PPC) Management",
      "Meta Ads (Facebook & Instagram) with Audience Retargeting",
      "Conversion Rate Optimization (CRO) and Heatmap Analysis",
      "Lead Generation Funnels and Landing Page Development",
    ],
    processSteps: [
      { step: "01", title: "Audit", description: "Audit current tracking, GA4 events, and past campaigns." },
      { step: "02", title: "Strategy", description: "Identify high-intent keywords and target buyer audiences." },
      { step: "03", title: "Launch", description: "Deploy targeted ad campaigns and optimized landing pages." },
      { step: "04", title: "Optimize", description: "Review performance weekly and reallocate budget to winners." },
    ],
    deliverables: [
      "Live Looker Studio performance dashboard",
      "Monthly campaign reviews and conversion reports",
      "Continuous ad creative production and copy variants",
      "Technical SEO checklist and keyword ranking tracker",
    ],
    technologies: ["Google Ads", "Meta Ads", "GA4", "SEMrush", "Looker Studio", "HubSpot"],
    featuredImage: "/images/marketing-growth.jpg",
    estimatedTimeline: "Monthly recurring retainer",
    startingPriceTier: "Monthly growth retainer",
  },
  {
    id: "social-media-management",
    slug: "social-media-management",
    title: "Social Media Strategy & Management",
    category: "marketing",
    tagline: "Content creation, community growth, and publishing",
    shortDescription:
      "End-to-end social media management covering content calendars, copywriting, and graphics.",
    fullDescription:
      "We manage your brand across LinkedIn, Twitter/X, Instagram, and Facebook with consistent content, custom graphics, and prompt community engagement.",
    iconName: "Share2",
    problemSolved:
      "Inconsistent posting schedules, lack of engagement, and internal team burnout.",
    solution:
      "Structured content pipelines delivering weekly batches of high-value industry posts and graphics.",
    keyBenefits: [
      "Consistent posting 4-5 times weekly across priority platforms",
      "Executive thought-leadership content on LinkedIn",
      "Prompt responses to comments, messages, and inquiries",
      "Monthly analytics tracking follower growth and engagement",
    ],
    features: [
      "Monthly Content Calendar & Strategic Theme Planning",
      "Custom Graphic Carousels, Infographics, and Visuals",
      "Executive Ghostwriting & LinkedIn Post Creation",
      "Daily Community Monitoring and Response Handling",
      "Monthly Reach, Follower Growth, and Engagement Reports",
    ],
    processSteps: [
      { step: "01", title: "Pillars", description: "Define your brand voice, content themes, and target tags." },
      { step: "02", title: "Batching", description: "Create monthly content calendars with copy and visuals." },
      { step: "03", title: "Publishing", description: "Schedule posts automatically at peak audience engagement times." },
      { step: "04", title: "Community", description: "Monitor discussions and reply to followers promptly." },
    ],
    deliverables: [
      "Shared editorial calendar with approval workflows",
      "16-24 custom social graphics and carousels per month",
      "Monthly growth, reach, and engagement KPI reports",
      "Direct message escalation for warm business leads",
    ],
    technologies: ["Buffer", "Hootsuite", "Figma", "Canva", "LinkedIn Creator", "Meta Suite"],
    featuredImage: "/images/marketing-growth.jpg",
    estimatedTimeline: "Monthly retainer",
    startingPriceTier: "Tiered monthly packages",
  },
  {
    id: "video-production-motion",
    slug: "video-production-motion",
    title: "Video Production & Motion Graphics",
    category: "marketing",
    tagline: "Product explainers, motion graphics, and social video ads",
    shortDescription:
      "Engaging video production and 2D/3D motion graphics that explain complex products simply.",
    fullDescription:
      "We produce product demos, animated SaaS explainers, and video ads that hook attention in the first three seconds and clearly communicate your value.",
    iconName: "Video",
    problemSolved:
      "Complex technical products that prospects fail to grasp and low engagement on text ads.",
    solution:
      "Story-driven video explainers with custom animations, voiceovers, and clear calls to action.",
    keyBenefits: [
      "Higher landing page conversion rates with video explainers",
      "Clear explanation of complex software features in under 90 seconds",
      "Optimized formats for 16:9 desktop and 9:16 vertical reels",
      "Commercial music, professional voice talent, and sound design included",
    ],
    features: [
      "SaaS UI Product Walkthroughs and Feature Teasers",
      "2D/3D Motion Graphic Explainer Videos with Custom Animation",
      "High-Conversion Social Video Ads (Reels, TikTok, Shorts)",
      "Corporate Overview and Client Case Study Videos",
      "Logo Animation and Video Intro/Outro Packs",
    ],
    processSteps: [
      { step: "01", title: "Script", description: "Write clear, narrative scripts and visual storyboards." },
      { step: "02", title: "Voice & Audio", description: "Record professional voiceovers and select licensed tracks." },
      { step: "03", title: "Animation", description: "Animate vector assets and render fluid scene transitions." },
      { step: "04", title: "Delivery", description: "Master in 4K resolution with captions for silent autoplay." },
    ],
    deliverables: [
      "Master video files in 4K UHD and 1080p (MP4 format)",
      "Short cut-down clips optimized for social media feeds",
      "Synchronized closed captions (.SRT files) for autoplay",
      "Full commercial rights to voiceover, audio, and animations",
    ],
    technologies: ["After Effects", "Premiere Pro", "Blender", "DaVinci Resolve", "Audition"],
    featuredImage: "/images/marketing-growth.jpg",
    estimatedTimeline: "2 - 4 weeks per video",
    startingPriceTier: "Fixed per-video or monthly pack",
  },
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "finedge-payments",
    slug: "finedge-payments",
    title: "FinEdge: Cross-Border B2B Payment Gateway & Settlement Engine",
    client: "FinEdge Technologies Ltd.",
    clientLocation: "London, UK & Islamabad",
    industry: "FinTech & Financial Services",
    summary:
      "Architected and deployed an ISO 20022 compliant B2B cross-border payments orchestrator processing $12M+ monthly transaction volume with sub-2-second bank ledger synchronization.",
    challenge:
      "FinEdge was losing institutional clients due to high latency in multi-currency settlement and manual reconciliation spreadsheets between UK, UAE, and Pakistani banking corridors. Their legacy PHP platform could not pass institutional penetration audits.",
    solution:
      "SolyNext engineered a resilient microservice backend using Go and Node.js with distributed transaction idempotency, integrated automated AML/KYC verification webhooks, and built an intuitive Next.js institutional treasury portal.",
    keyResults: [
      { metric: "$12M+", label: "Monthly Processed Volume" },
      { metric: "1.8s", label: "Average Settlement Sync Time" },
      { metric: "99.98%", label: "Uptime Over 14 Months" },
      { metric: "-78%", label: "Manual Reconciliation Overhead" },
    ],
    technologies: ["Go", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS KMS"],
    featuredImage: "/images/fintech-enterprise.jpg",
    architectureDetails: [
      "Event-driven architecture with zero-data-loss Apache Kafka event log",
      "Two-phase commit protocol across distributed multi-currency accounts",
      "Client-side AES-256 field encryption for sensitive banking identifiers",
      "Automated automated failover across multi-region AWS availability zones",
    ],
    testimonial: {
      quote:
        "SolyNext's engineering rigor transformed our fintech vision into bank-grade infrastructure. Their team in Pakistan worked seamlessly alongside our London compliance officers to deliver a secure, lightning-fast settlement engine ahead of schedule.",
      author: "Tariq Malik",
      role: "Chief Technology Officer",
      company: "FinEdge UK",
    },
  },
  {
    id: "meditrack-clinical",
    slug: "meditrack-clinical",
    title: "MediTrack: HIPAA-Compliant Multi-Clinic Electronic Health Records Portal",
    client: "MediTrack Healthcare Network",
    clientLocation: "Dubai, UAE & Chicago, USA",
    industry: "Healthcare & Telemedicine",
    summary:
      "Built a unified EHR and telemedicine portal connecting 28 specialized clinics, enabling real-time video consultations, prescription routing, and automated patient appointment reminders.",
    challenge:
      "Patient records were fragmented across three disparate proprietary databases, leading to double-booked appointments and doctors spending up to 20 minutes manually transcribing lab test results before each consultation.",
    solution:
      "We built a HIPAA-compliant web and tablet app featuring encrypted WebRTC video streaming, automated HL7/FHIR health record sync, and an automated SMS/WhatsApp appointment confirmation engine.",
    keyResults: [
      { metric: "45,000+", label: "Active Monthly Patients" },
      { metric: "28", label: "Connected Clinic Locations" },
      { metric: "-62%", label: "Patient No-Show Rate" },
      { metric: "100%", label: "HIPAA Security Audit Pass" },
    ],
    technologies: ["React", "Node.js", "WebRTC", "PostgreSQL", "Tailwind CSS", "AWS HealthLake"],
    featuredImage: "/images/engineering-dev.jpg",
    architectureDetails: [
      "End-to-end encrypted WebRTC audio/video consultations with automated bandwidth throttling",
      "Role-based audit logging tracking every record read, export, or edit",
      "Redis caching layer reducing patient file query time from 4.2s to 120ms",
      "Mobile-responsive tablet interface optimized for one-handed nurse intake",
    ],
    testimonial: {
      quote:
        "The difference in clinic operations was immediate within the first week of rollout. Doctors were actually finishing patient notes on time, and our no-show rate fell by more than half.",
      author: "Dr. Ayesha Siddiqui",
      role: "Medical Director",
      company: "MediTrack Network",
    },
  },
  {
    id: "swiftcart-marketplace",
    slug: "swiftcart-marketplace",
    title: "SwiftCart: High-Scale B2B Wholesale Marketplace & Inventory Sync",
    client: "SwiftCart Global Distribution",
    clientLocation: "Karachi, Pakistan & Toronto, Canada",
    industry: "E-Commerce & Wholesale Distribution",
    summary:
      "Engineered an omni-channel B2B wholesale platform processing 8,000+ daily SKU orders with live warehouse ERP sync, tiered volume discounts, and localized cash-on-delivery and card payment routes.",
    challenge:
      "Wholesale distributors struggled with inventory discrepancies between physical warehouses and online orders, frequently selling out-of-stock items and losing high-value retail clients.",
    solution:
      "SolyNext designed a headless commerce platform backed by Next.js and Redis inventory reservation locks, preventing race conditions during flash wholesale orders and providing distributors with live sales tracking.",
    keyResults: [
      { metric: "8,500+", label: "Daily Wholesale Orders" },
      { metric: "35,000+", label: "Active Listed SKUs" },
      { metric: "0%", label: "Inventory Overselling Incidents" },
      { metric: "+185%", label: "Repeat Merchant Orders in 6 Mo." },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Redis", "PostgreSQL", "Stripe", "Docker"],
    featuredImage: "/images/cloud-infrastructure.jpg",
    architectureDetails: [
      "Optimistic locking with atomic Redis counter checks for instant stock reservation",
      "Dynamic PDF invoice generator rendering 100-item tax receipts in under 300ms",
      "Localized multilingual interface supporting English, Urdu, and Arabic",
      "Elasticsearch cluster returning instant autocomplete results across 35k SKUs in <40ms",
    ],
    testimonial: {
      quote:
        "SolyNext understood the chaotic reality of wholesale distribution in emerging markets. They built a rock-solid platform that never glitched even during our biggest Black Friday bulk promos.",
      author: "Kamran Qureshi",
      role: "Operations Director",
      company: "SwiftCart Global",
    },
  },
  {
    id: "buildcore-erp",
    slug: "buildcore-erp",
    title: "BuildCore: Construction & Real Estate Project Management ERP",
    client: "BuildCore Properties Group",
    clientLocation: "Riyadh, Saudi Arabia & Lahore",
    industry: "Real Estate & Civil Engineering",
    summary:
      "Created a centralized construction project tracking suite allowing site engineers to log daily contractor progress, material deliveries, and budget variances from mobile devices directly to the executive boardroom.",
    challenge:
      "Project managers relied on WhatsApp messages and paper receipts from construction sites, resulting in budget overruns averaging 22% and contractors waiting weeks for invoice approvals.",
    solution:
      "We engineered an offline-first progressive web app with photo receipt tagging, GPS-verified worker check-ins, automated budget overrun alerts, and automated subcontractor payment milestones.",
    keyResults: [
      { metric: "$48M", label: "Active Project Portfolios Monitored" },
      { metric: "-19%", label: "Average Budget Variance" },
      { metric: "3 Days", label: "Invoice Approval Time (Down from 18)" },
      { metric: "420+", label: "Active On-Site Daily Users" },
    ],
    technologies: ["React", "FastAPI", "Python", "PostgreSQL", "PWA", "AWS S3", "Tailwind CSS"],
    featuredImage: "/images/marketing-growth.jpg",
    architectureDetails: [
      "IndexedDB offline storage syncing site reports automatically when 4G network reconnects",
      "Client-side image compression reducing photo payload sizes by 85% before S3 upload",
      "Automated variance detection highlighting cost overruns against baseline estimates",
      "Comprehensive permission matrix for Developers, Contractors, and Lead Architects",
    ],
    testimonial: {
      quote:
        "BuildCore ERP gave our executive board instant visibility across 14 high-rise construction sites simultaneously. The financial accountability SolyNext delivered paid for the software within two months.",
      author: "Engineer Faisal Al-Harbi",
      role: "Executive Project Sponsor",
      company: "BuildCore Developments",
    },
  },
];

export const INDUSTRY_SOLUTIONS_DATA: IndustrySolution[] = [
  {
    id: "ecommerce-retail",
    slug: "ecommerce-retail",
    title: "E-Commerce & Digital Retail",
    iconName: "ShoppingBag",
    businessChallenge:
      "Slow loading times, high cart abandonment, uncoordinated multi-warehouse inventory, and difficulty expanding into international currencies.",
    solynextSolution:
      "Headless storefronts with sub-second page transitions, dynamic currency conversion, optimized 1-step checkout flows, and automated ERP inventory sync.",
    keyCapabilities: [
      "Headless Shopify / Custom Next.js Commerce",
      "Multi-Currency & Localized Payment Gateways",
      "Automated Order Routing & Delivery Courier APIs",
      "Real-Time Inventory Reservation & Abandoned Cart Recovery",
    ],
    technologies: ["Next.js", "Shopify Plus", "Stripe", "PostgreSQL", "Tailwind CSS"],
    impactMetric: "+38% Average Checkout Conversion Rate",
  },
  {
    id: "fintech-banking",
    slug: "fintech-banking",
    title: "FinTech & Financial Platforms",
    iconName: "ShieldCheck",
    businessChallenge:
      "Strict data protection regulations, slow payment settlement, manual KYC verification bottlenecks, and high risk of fraud in high-volume transactions.",
    solynextSolution:
      "Bank-grade APIs with double-entry ledger bookkeeping, zero-trust cryptographic encryption, automated identity verification, and real-time fraud monitoring.",
    keyCapabilities: [
      "Double-Entry General Ledger Engines",
      "Automated KYC/AML Compliance Workflows",
      "Open Banking & Payment Switch Integrations",
      "Real-Time Fraud Anomaly Detection & Alerts",
    ],
    technologies: ["Go", "Node.js", "PostgreSQL", "Redis", "AWS KMS", "Docker"],
    impactMetric: "99.99% Transaction Delivery Reliability",
  },
  {
    id: "healthcare-telemedicine",
    slug: "healthcare-telemedicine",
    title: "Healthcare & Clinical Systems",
    iconName: "Activity",
    businessChallenge:
      "Disconnected medical records, severe HIPAA/GDPR compliance risks, manual paper scheduling, and patients waiting weeks for basic consultations.",
    solynextSolution:
      "Secure telemedicine platforms, HIPAA-compliant patient portals, automated digital prescription workflows, and integrated clinic practice management.",
    keyCapabilities: [
      "HIPAA-Compliant Encrypted Video Consultations",
      "FHIR / HL7 Patient Record Integration",
      "Doctor Calendar Synchronization & WhatsApp Reminders",
      "Electronic Prescription & Diagnostic Lab Dispatch",
    ],
    technologies: ["React", "WebRTC", "PostgreSQL", "Node.js", "AWS HealthLake"],
    impactMetric: "-65% Appointment No-Show Rate",
  },
  {
    id: "real-estate-proptech",
    slug: "real-estate-proptech",
    title: "Real Estate & Construction Tech",
    iconName: "Home",
    businessChallenge:
      "Manual property lead tracking, outdated listing websites, construction budget leakage, and delayed milestone payments between developers and buyers.",
    solynextSolution:
      "Interactive property portal engines, CRM pipeline automation, construction milestone ERPs, and digital mortgage pre-qualification calculators.",
    keyCapabilities: [
      "Interactive 3D Virtual Tour & Map Search",
      "Automated WhatsApp Lead Qualification Chatbots",
      "Construction Progress Tracking & Site Photo Verification",
      "Digital Contract Signing & Milestone Payment Escrow",
    ],
    technologies: ["Next.js", "Python", "PostgreSQL", "AWS S3", "Google Maps Platform"],
    impactMetric: "3x Faster Inbound Buyer Qualification",
  },
  {
    id: "saas-startups",
    slug: "saas-startups",
    title: "SaaS Products & Tech Startups",
    iconName: "Zap",
    businessChallenge:
      "Long time-to-market, messy codebases that break during scaling, lack of self-serve subscription billing, and high user churn during onboarding.",
    solynextSolution:
      "Rapid MVP development sprints, clean scalable architecture, Stripe billing integration, self-serve team workspaces, and product telemetry.",
    keyCapabilities: [
      "Multi-Tenant SaaS Foundation with Org & Team Workspaces",
      "Stripe Customer Portal & Usage-Based Metered Billing",
      "Self-Serve User Onboarding & Interactive Product Tours",
      "Product Usage Telemetry & Feature Flagging",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Docker"],
    impactMetric: "6-Week Accelerated MVP Launch Cycle",
  },
  {
    id: "logistics-supply-chain",
    slug: "logistics-supply-chain",
    title: "Logistics & Supply Chain",
    iconName: "Truck",
    businessChallenge:
      "Blind spots in fleet tracking, paper-based proof of delivery, manual driver dispatching, and high fuel waste on unoptimized delivery routes.",
    solynextSolution:
      "Live GPS fleet telematics dashboards, automated algorithmic route optimization, mobile driver apps with digital signatures, and automated SMS tracking for end customers.",
    keyCapabilities: [
      "Real-Time GPS Fleet Tracking & Geofencing",
      "Dynamic Multi-Stop Delivery Route Optimization",
      "Digital Proof of Delivery (Signatures + Photo Capture)",
      "Customer Self-Serve Live Order Tracking Links",
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Google Maps Platform", "Redis"],
    impactMetric: "-24% Fuel & Dispatch Operational Overhead",
  },
];

export const TECHNOLOGIES_DATA: TechnologyItem[] = [
  // Frontend
  { name: "Next.js", category: "Frontend", description: "Production App Router, Server Components, SSR, and dynamic edge rendering.", proficiencyLevel: "Core Expertise", popularUseCases: ["SaaS Dashboards", "Corporate Websites", "E-Commerce"] },
  { name: "React", category: "Frontend", description: "Modular UI architecture, declarative state management, custom hook lifecycles.", proficiencyLevel: "Core Expertise", popularUseCases: ["Interactive Web Apps", "Admin Portals", "Design Systems"] },
  { name: "TypeScript", category: "Frontend", description: "Strict static type safety, autocompletion, refactoring safety, and self-documenting code.", proficiencyLevel: "Core Expertise", popularUseCases: ["Enterprise Codebases", "API SDKs", "Full-Stack Teams"] },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first design tokens, responsive breakpoints, and dark mode theming.", proficiencyLevel: "Core Expertise", popularUseCases: ["Design Systems", "High-Speed UI Prototyping", "Accessible Layouts"] },
  
  // Backend
  { name: "Node.js", category: "Backend", description: "Asynchronous runtime for high-concurrency microservices and real-time APIs.", proficiencyLevel: "Core Expertise", popularUseCases: ["REST APIs", "WebSocket Servers", "B2B Middleware"] },
  { name: "Python / FastAPI", category: "Backend", description: "High-performance asynchronous Python framework with automated OpenAPI validation.", proficiencyLevel: "Core Expertise", popularUseCases: ["Data Pipelines", "AI Integration", "Enterprise ERPs"] },
  { name: "Go (Golang)", category: "Backend", description: "Compiled, ultra-fast language for concurrent network services and microservices.", proficiencyLevel: "Advanced", popularUseCases: ["Payment Gateways", "High-Throughput Proxies", "Job Queues"] },

  // Mobile
  { name: "React Native", category: "Mobile", description: "Native iOS and Android mobile applications sharing a single TypeScript codebase.", proficiencyLevel: "Core Expertise", popularUseCases: ["Consumer Apps", "Field Agent Tools", "E-Commerce Apps"] },
  { name: "iOS Swift", category: "Mobile", description: "Native Apple platform development for high-performance camera and hardware features.", proficiencyLevel: "Advanced", popularUseCases: ["Biometrics", "Native Widgets", "Watch Connectivity"] },
  { name: "Android Kotlin", category: "Mobile", description: "Modern native Android development following Material Design guidelines.", proficiencyLevel: "Advanced", popularUseCases: ["Hardware SDKs", "Background Bluetooth", "Enterprise Tablets"] },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", description: "Lightweight containerization ensuring identical runtimes from dev to production.", proficiencyLevel: "Core Expertise", popularUseCases: ["Microservices", "Reproducible Builds", "CI/CD Pipelines"] },
  { name: "Amazon Web Services (AWS)", category: "Cloud & DevOps", description: "Scalable cloud infrastructure spanning ECS, Lambda, S3, RDS, CloudFront, and IAM.", proficiencyLevel: "Core Expertise", popularUseCases: ["High-Availability Hosting", "Media Storage", "Serverless Functions"] },
  { name: "Google Cloud Platform (GCP)", category: "Cloud & DevOps", description: "Cloud Run, BigQuery, and managed database services.", proficiencyLevel: "Advanced", popularUseCases: ["Container Apps", "Analytics", "Global CDN"] },
  { name: "GitHub Actions", category: "Cloud & DevOps", description: "Automated continuous integration, unit testing, security linting, and deployments.", proficiencyLevel: "Core Expertise", popularUseCases: ["Zero-Downtime Deploys", "Automated Testing", "Staging Environments"] },

  // Database
  { name: "PostgreSQL", category: "Database", description: "World's most advanced open-source relational database with JSONB support.", proficiencyLevel: "Core Expertise", popularUseCases: ["Transactional Systems", "Financial Ledgers", "Relational Schemas"] },
  { name: "Redis", category: "Database", description: "In-memory data store for sub-millisecond caching, session storage, and rate limiting.", proficiencyLevel: "Core Expertise", popularUseCases: ["Cache Invalidation", "Session Store", "Job Queues"] },
  { name: "MongoDB", category: "Database", description: "Document-oriented database for dynamic catalogs and content-heavy platforms.", proficiencyLevel: "Production Ready", popularUseCases: ["Product Catalogs", "Event Logging", "Dynamic Schemas"] },

  // Design & Creative
  { name: "Figma", category: "Design & Creative", description: "Collaborative interface design, interactive prototyping, and component libraries.", proficiencyLevel: "Core Expertise", popularUseCases: ["UI/UX Sprints", "Design Systems", "User Testing"] },
  { name: "Adobe Illustrator", category: "Design & Creative", description: "Precision vector illustration, typography manipulation, and brand identity design.", proficiencyLevel: "Core Expertise", popularUseCases: ["Logo Design", "Icon Sets", "Vector Art"] },
  { name: "Adobe After Effects", category: "Design & Creative", description: "2D/3D motion graphics, kinetic typography, and product video animation.", proficiencyLevel: "Core Expertise", popularUseCases: ["SaaS Explainer Videos", "Logo Stings", "Social Reels"] },

  // Data & AI
  { name: "OpenAI & Gemini APIs", category: "Data & AI", description: "Server-side integration of Large Language Models for automated parsing and summarization.", proficiencyLevel: "Production Ready", popularUseCases: ["Smart Document Processing", "Customer Triage", "Search Enhancement"] },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    clientName: "David Henderson",
    role: "VP of Engineering",
    company: "Apex Media Holdings",
    location: "London, United Kingdom",
    projectScope: "Enterprise Next.js Web Portal & Headless CMS",
    quote:
      "SolyNext provided world-class software engineering at a level that easily matches top European digital consultancies. Their communication was crisp, the code was thoroughly typed and tested, and our platform handles over 2 million monthly visitors without breaking a sweat.",
    quantifiedResult: "+140% Organic Traffic & 99.99% Uptime",
  },
  {
    id: "2",
    clientName: "Farhan Zubair",
    role: "Founder & CEO",
    company: "Zulaxy Retail Solutions",
    location: "Karachi, Pakistan",
    projectScope: "Omni-Channel B2B Ordering & Point of Sale",
    quote:
      "Finding a technology partner in Pakistan that understands both local business nuances and international software standards is rare. SolyNext built our complete POS integration and inventory sync in 8 weeks flat.",
    quantifiedResult: "-85% Inventory Discrepancies Across 12 Stores",
  },
  {
    id: "3",
    clientName: "Elena Rostova",
    role: "Head of Product",
    company: "Veloce Mobility",
    location: "Munich, Germany",
    projectScope: "Cross-Platform React Native Mobile Fleet App",
    quote:
      "Working with the SolyNext team has been one of our smoothest offshore development experiences. Their daily standups, proactive problem solving, and attention to UX detail made time zones completely irrelevant.",
    quantifiedResult: "4.8 Star App Store Rating Across 18,000 Users",
  },
  {
    id: "4",
    clientName: "Mansoor Al-Rashidi",
    role: "Chief Digital Officer",
    company: "Al-Noor Logistics Services",
    location: "Riyadh, Saudi Arabia",
    projectScope: "Custom Freight Tracking & Driver PWA",
    quote:
      "The SolyNext team delivered an end-to-end logistics platform that streamlined our dispatch across the Gulf. Their engineers are thoughtful, disciplined, and genuinely committed to delivering business impact.",
    quantifiedResult: "-32% Fleet Operational Bottlenecks in 90 Days",
  },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "1",
    slug: "nextjs-app-router-enterprise-patterns",
    title: "Architecting Enterprise Next.js Applications with App Router & Server Components",
    category: "Engineering",
    publishedDate: "March 15, 2026",
    readTime: "7 min read",
    author: {
      name: "Hamza Tariq",
      role: "Lead Full-Stack Architect",
    },
    excerpt:
      "A deep dive into state isolation, data fetching caching strategies, and security boundaries when building high-traffic enterprise applications with Next.js.",
    content: [
      "When scaling modern web platforms to millions of monthly requests, architectural decisions made in the first two weeks dictate your operational overhead for the next three years.",
      "The introduction of React Server Components (RSC) fundamentally redefines the boundary between client hydration and server-rendered data. By executing data fetches on the server adjacent to your database, you eliminate client-side waterfall requests and prevent large data-fetching libraries from ever hitting the user's browser bundle.",
      "In this technical guide, we examine proven patterns for handling optimistic UI updates, authenticating cross-origin server actions, and structuring reusable component design tokens without polluting your layout bundle.",
    ],
    tags: ["Next.js", "React", "Architecture", "Performance"],
  },
  {
    id: "2",
    slug: "reducing-churn-through-b2b-saas-ux",
    title: "Reducing Churn in B2B SaaS: 5 UI/UX Principles That Keep Enterprise Users Engaged",
    category: "Design",
    publishedDate: "February 28, 2026",
    readTime: "5 min read",
    author: {
      name: "Sara Qasim",
      role: "Head of Product Design",
    },
    excerpt:
      "How to eliminate clutter in complex data tables, streamline keyboard navigation, and design onboarding flows that turn enterprise users into champions.",
    content: [
      "Enterprise software has traditionally suffered from terrible user experience: overcrowded toolbars, tiny unreadable font sizes, and confusing modal dialogues that make users feel like they are piloting a spaceship.",
      "Modern B2B buyers now expect consumer-grade design elegance combined with enterprise-grade data density. Clean information hierarchy, contextual inline actions, and consistent keyboard shortcuts are no longer luxuries — they directly impact whether an organization renews its annual contract.",
      "Learn how to design multi-column data views that respect human visual perception while preserving the analytical density financial and logistics teams require.",
    ],
    tags: ["UI/UX", "Product Design", "B2B SaaS", "User Retention"],
  },
  {
    id: "3",
    slug: "pakistan-tech-ecosystem-global-advantage",
    title: "The Strategic Advantage of Partnering with Pakistan's Rapidly Maturing Tech Hub",
    category: "Business",
    publishedDate: "January 20, 2026",
    readTime: "6 min read",
    author: {
      name: "Bilal Ahmed",
      role: "Managing Director, SolyNext",
    },
    excerpt:
      "Why international founders in North America, Europe, and the Middle East are choosing Pakistan-based engineering partners for high-stakes digital delivery.",
    content: [
      "Over the past five years, Pakistan's technology sector has undergone a massive transformation. With over 20,000 computer science graduates entering the market annually and English as the official language of commerce and higher education, the country has become one of the premier engineering talent centers globally.",
      "For international companies, working with a premier Pakistan-based technology house like SolyNext provides significant strategic advantages: overlapping working hours with Europe and the GCC, direct cultural familiarity with Western business practices, and unmatched cost-to-quality ratios.",
      "Here is how modern hybrid delivery models enable seamless cross-border technical collaboration.",
    ],
    tags: ["Global Business", "Offshore Tech", "Pakistan", "Strategy"],
  },
];

export const JOB_OPENINGS_DATA: JobOpening[] = [
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (Next.js & Node.js)",
    department: "Engineering",
    location: "Islamabad (Hybrid)",
    type: "Full-Time",
    experience: "4+ years",
    overview:
      "We are seeking an experienced full-stack engineer who takes pride in writing clean, well-architected TypeScript codebases and building responsive, accessible web applications.",
    responsibilities: [
      "Architect and build client-facing web applications using Next.js App Router and TypeScript",
      "Design robust REST and GraphQL API services backed by PostgreSQL and Redis",
      "Collaborate directly with product designers to implement pixel-perfect, accessible UI components",
      "Conduct code reviews, mentor mid-level engineers, and champion automated testing standards",
    ],
    requirements: [
      "Proven production experience with React, Next.js, and modern TypeScript",
      "Strong understanding of relational database design, indexing, and SQL queries",
      "Experience with Docker, GitHub Actions, and cloud deployment pipelines (AWS/GCP)",
      "Excellent communication skills and ability to present technical architecture clearly",
    ],
  },
  {
    id: "senior-uiux-designer",
    title: "Senior UI/UX & Product Designer",
    department: "Design",
    location: "Lahore (Hybrid)",
    type: "Full-Time",
    experience: "3+ years",
    overview:
      "Join our product design team to create thoughtful, world-class user interfaces and design systems for enterprise SaaS platforms and consumer mobile apps.",
    responsibilities: [
      "Lead UX discovery workshops with international clients to define core product requirements",
      "Create wireframes, high-fidelity mockups, and interactive clickable prototypes in Figma",
      "Build and maintain scalable design systems with tokens, auto-layout, and responsive variants",
      "Work closely with frontend engineers during sprint implementations to ensure design integrity",
    ],
    requirements: [
      "Strong portfolio demonstrating web applications, dashboards, or mobile products",
      "Deep mastery of Figma, auto-layout, components, and interactive prototyping",
      "Knowledge of WCAG 2.1 AA accessibility guidelines and design token standards",
      "Empathetic mindset with experience conducting user testing interviews",
    ],
  },
  {
    id: "digital-marketing-lead",
    title: "Performance Digital Marketing Lead",
    department: "Marketing",
    location: "Remote (Worldwide)",
    type: "Full-Time",
    experience: "3+ years",
    overview:
      "Drive customer acquisition and revenue growth for SolyNext and our international clients across Google Search, Meta Ads, and technical SEO.",
    responsibilities: [
      "Develop and execute paid acquisition strategies on Google Ads, Meta Ads, and LinkedIn",
      "Conduct technical SEO audits and keyword research to drive qualified organic traffic",
      "Collaborate with copywriters and designers to produce high-converting landing page variants",
      "Analyze attribution in GA4 and present weekly executive performance reports",
    ],
    requirements: [
      "Demonstrated track record managing $20k+/month profitable ad spend with verifiable ROAS",
      "Deep knowledge of GA4, Google Tag Manager, and conversion API setups",
      "Strong analytical mindset with ability to translate complex data into business actions",
      "Experience marketing B2B technology services or SaaS platforms",
    ],
  },
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: "Where is SolyNext based and how do you work with global clients?",
    answer:
      "We are based in Pakistan (Islamabad & Lahore) and work with clients across the US, UK, Europe, and the Middle East with daily syncs and overlapping hours.",
    category: "General",
  },
  {
    question: "What pricing and engagement models do you offer?",
    answer:
      "We offer three models: Fixed-Price Milestones for defined projects, Dedicated Teams for ongoing sprints, and Monthly Retainers for marketing and maintenance.",
    category: "Pricing & Contracts",
  },
  {
    question: "Who owns the code and intellectual property (IP)?",
    answer:
      "You own 100% of all code, designs, and data. We sign mutual NDAs and full IP assignment agreements before work begins.",
    category: "Pricing & Contracts",
  },
  {
    question: "What is your typical development process and cadence?",
    answer:
      "We work in two-week agile sprints with direct Slack/Teams channels, weekly video demos, and continuous staging builds.",
    category: "Services & Tech",
  },
  {
    question: "How do you ensure code quality, security, and performance?",
    answer:
      "We use strict TypeScript, automated testing, CI/CD pipelines, and OWASP security standards to ensure fast, bug-free releases.",
    category: "Services & Tech",
  },
  {
    question: "Can you take over or modernize an existing codebase?",
    answer:
      "Yes. We regularly audit, refactor, and migrate legacy codebases to modern Next.js, Node.js, and cloud systems without user downtime.",
    category: "Services & Tech",
  },
];
