import type { AdminRecord } from "@/lib/admin/types";
import { TESTIMONIALS_DATA } from "@/data/mockData";

const statuses = ["Pending", "Approved", "Rejected", "Hidden", "Published", "Draft", "Archived"];
const clean = (value: unknown, field: string, max: number, required = false) => {
  if (value == null) value = "";
  if (typeof value !== "string" || value.length > max || (required && !value.trim())) throw new Error(`Review: check ${field}.`);
  return value.trim();
};

export function validateReview(value: unknown): AdminRecord {
  if (!value || typeof value !== "object") throw new Error("Review: enter review details.");
  const input = value as Record<string, unknown>;
  const id = clean(input.id, "identifier", 100, true);
  if (!/^[a-zA-Z0-9-]+$/.test(id)) throw new Error("Review: invalid identifier.");
  const updatedAt = clean(input.updatedAt, "updated date", 40, true);
  if (!Number.isFinite(Date.parse(updatedAt))) throw new Error("Review: enter a valid updated date.");
  const status = clean(input.status, "status", 30, true);
  if (!statuses.includes(status)) throw new Error("Review: choose a valid status.");
  const rating = Number(input.rating ?? 5);
  if (!Number.isInteger(rating * 2) || rating < 1 || rating > 5) throw new Error("Review: rating must be from 1 to 5 in half-star steps.");
  const image = clean(input.image, "image", 2048);
  if (image && !image.startsWith("/images/") && !image.startsWith("/api/catalog-images/") && !/^https:\/\//i.test(image)) throw new Error("Review: use a local image or HTTPS image URL.");
  return {
    id,
    title: clean(input.title, "client name", 180, true),
    category: clean(input.category, "project scope", 120, true),
    description: clean(input.description, "testimonial", 5000, true),
    status,
    updatedAt,
    role: clean(input.role, "role", 180),
    company: clean(input.company, "company", 180),
    clientId: clean(input.clientId, "client", 100),
    rating,
    image,
    featured: input.featured === true,
  };
}

export function upsertReview(items: AdminRecord[], value: unknown): AdminRecord[] {
  const review = validateReview(value);
  if (items.some(item => item.id === review.id)) return items.map(item => item.id === review.id ? { ...review, updatedAt: new Date().toISOString() } : item);
  if (items.length >= 500) throw new Error("Review: the limit is 500 records.");
  return [{ ...review, updatedAt: new Date().toISOString() }, ...items];
}

const restoredReviews: AdminRecord[] = [
  {
    id: "legacy-review-david-henderson", title: "David Henderson", role: "VP of Engineering", company: "Apex Media Holdings",
    category: "Enterprise Next.js Web Portal & Headless CMS",
    description: "SolyNext provided world-class software engineering at a level that easily matches top European digital consultancies. Their communication was crisp, the code was thoroughly typed and tested, and our platform handles over 2 million monthly visitors without breaking a sweat.",
    status: "Approved", updatedAt: "2026-10-06T08:30:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-01.jpg", featured: true,
  },
  {
    id: "legacy-review-farhan-zubair", title: "Farhan Zubair", role: "Founder & CEO", company: "Zulaxy Retail Solutions",
    category: "Omni-Channel B2B Ordering & Point of Sale",
    description: "Finding a technology partner in Pakistan that understands both local business nuances and international software standards is rare. SolyNext built our complete POS integration and inventory sync in 8 weeks flat.",
    status: "Approved", updatedAt: "2026-10-06T08:29:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-02.jpg", featured: true,
  },
  {
    id: "legacy-review-elena-rostova", title: "Elena Rostova", role: "Head of Product", company: "Veloce Mobility",
    category: "Cross-Platform React Native Mobile Fleet App",
    description: "Working with the SolyNext team has been one of our smoothest offshore development experiences. Their daily standups, proactive problem solving, and attention to UX detail made time zones completely irrelevant.",
    status: "Approved", updatedAt: "2026-10-06T08:28:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-03.jpg", featured: true,
  },
  {
    id: "legacy-review-mansoor-al-rashidi", title: "Mansoor Al-Rashidi", role: "Chief Digital Officer", company: "Al-Noor Logistics Services",
    category: "Custom Freight Tracking & Driver PWA",
    description: "The SolyNext team delivered an end-to-end logistics platform that streamlined our dispatch across the Gulf. Their engineers are thoughtful, disciplined, and committed to delivering business impact.",
    status: "Approved", updatedAt: "2026-10-06T08:27:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-04.jpg", featured: true,
  },
  {
    id: "review-ahmed-raza-ecommerce", title: "Ahmed Raza", role: "Co-founder", company: "Kaghaz Studio",
    category: "E-commerce website & payment integration",
    description: "We needed a store that our small team could actually keep up to date. SolyNext helped us simplify the product pages and sort out checkout. A few details took an extra round, but the team stayed responsive and the handover was easy to follow.",
    status: "Approved", updatedAt: "2026-10-15T10:00:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-05.jpg", featured: true,
  },
  {
    id: "review-ayesha-shah-product-design", title: "Ayesha Shah", role: "Product Lead", company: "Raabta Health",
    category: "UI/UX research & product design",
    description: "The design workshops gave us a much clearer picture of where new patients were getting stuck. I appreciated that the team asked practical questions instead of jumping straight into screens. We needed a couple of revisions after testing, and those were handled well.",
    status: "Approved", updatedAt: "2026-10-16T10:00:00.000Z", rating: 4, image: "/images/reviews/reviewer-06.jpg", featured: true,
  },
  {
    id: "review-usman-khalid-mobile", title: "Usman Khalid", role: "Operations Manager", company: "Safar Fleet",
    category: "Mobile app development",
    description: "Our drivers now have one place to check their daily routes and report delivery issues. The first version was straightforward to use, and the team fixed the small Android issues we found during rollout without making the process complicated.",
    status: "Approved", updatedAt: "2026-10-17T10:00:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-07.jpg", featured: true,
  },
  {
    id: "review-hira-malik-digital-marketing", title: "Hira Malik", role: "Marketing Manager", company: "Mehr Home",
    category: "SEO & digital marketing",
    description: "The monthly plan gave us a better routine for publishing and reviewing our content. I liked getting clear notes on what had changed and what still needed work. It took us a little while to see which topics were bringing the right visitors, so we adjusted the plan together.",
    status: "Approved", updatedAt: "2026-10-18T10:00:00.000Z", rating: 3.5, image: "/images/reviews/reviewer-08.jpg", featured: true,
  },
  {
    id: "review-bilal-siddiqui-crm", title: "Bilal Siddiqui", role: "Director", company: "Northline Supplies",
    category: "Custom CRM & workflow software",
    description: "We were tracking leads in a mix of sheets and messages, which was getting hard to manage. The CRM now covers the steps we use every day. The team listened when we asked to keep the first release simple, and the training notes have been useful for new staff.",
    status: "Approved", updatedAt: "2026-10-19T10:00:00.000Z", rating: 4, image: "/images/reviews/reviewer-09.jpg", featured: true,
  },
  {
    id: "review-maryam-nadeem-branding", title: "Maryam Nadeem", role: "Founder", company: "Mitti & Co.",
    category: "Brand identity & graphic design",
    description: "I came in with a rough idea and a folder of references. The designers helped us settle on a direction that feels like us, then prepared the files for packaging and social posts. One concept missed the mark at first, but the next review got much closer.",
    status: "Approved", updatedAt: "2026-10-20T10:00:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-10.jpg", featured: true,
  },
  {
    id: "review-faraz-abbasi-cloud", title: "Faraz Abbasi", role: "Engineering Manager", company: "LedgerSpring",
    category: "Cloud infrastructure & deployment",
    description: "The deployment setup is easier for our developers to understand and maintain now. We had to spend extra time clarifying one part of the monitoring setup, but the team worked through it with us and documented the final configuration.",
    status: "Approved", updatedAt: "2026-10-21T10:00:00.000Z", rating: 3.5, image: "/images/reviews/reviewer-11.jpg", featured: true,
  },
  {
    id: "review-zainab-iqbal-web", title: "Zainab Iqbal", role: "Communications Officer", company: "Sehar Foundation",
    category: "Website redesign & content management",
    description: "Updating the site used to mean asking someone technical for help. The new pages are clearer, and our team can change routine content ourselves. We had a few questions after launch and got useful answers without a long back and forth.",
    status: "Approved", updatedAt: "2026-10-22T10:00:00.000Z", rating: 4, image: "/images/reviews/reviewer-12.jpg", featured: true,
  },
  {
    id: "review-hamza-javed-pos", title: "Hamza Javed", role: "Managing Partner", company: "Saffron Table",
    category: "Point-of-sale & inventory software",
    description: "The stock view is much more useful for our shop managers than the old end-of-day spreadsheet. SolyNext took time to understand how we handle returns before building around the workflow. We are still adding a few reports, but the core system is working well for us.",
    status: "Approved", updatedAt: "2026-10-23T10:00:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-13.jpg", featured: true,
  },
  {
    id: "review-sana-ashraf-automation", title: "Sana Ashraf", role: "Customer Experience Lead", company: "Daira Learning",
    category: "AI assistant & business process automation",
    description: "The assistant now handles the repeated course questions our support team used to answer by hand. We worked through its wording and escalation steps together before making it available to learners. A helpful addition to the workflow, and the controls are easy for our team to understand.",
    status: "Approved", updatedAt: "2026-10-24T10:00:00.000Z", rating: 4, image: "/images/reviews/reviewer-14.jpg", featured: true,
  },
  {
    id: "review-omar-farooq-web-app", title: "Omar Farooq", role: "Founder", company: "Bazaar Desk",
    category: "Web application development",
    description: "The team helped turn our internal booking process into a tool the whole office can use. Planning was clear, and we could try working builds before sign-off. There were a couple of small scope changes along the way, which they flagged early so we could decide what to defer.",
    status: "Approved", updatedAt: "2026-10-25T10:00:00.000Z", rating: 4.5, image: "/images/reviews/reviewer-15.jpg", featured: true,
  },
];

export const reviewSeeds: AdminRecord[] = [...restoredReviews, ...TESTIMONIALS_DATA.map(item => ({
  id: item.id, title: item.clientName, category: item.projectScope, description: item.quote,
  status: "Approved", updatedAt: "2026-10-06T08:30:00.000Z", role: item.role, company: item.company,
  rating: 4.5, image: item.avatarUrl, featured: true,
}))];
