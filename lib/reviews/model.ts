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
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Review: rating must be from 1 to 5.");
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
    status: "Approved", updatedAt: "2026-10-06T08:30:00.000Z", rating: 5, featured: true,
  },
  {
    id: "legacy-review-farhan-zubair", title: "Farhan Zubair", role: "Founder & CEO", company: "Zulaxy Retail Solutions",
    category: "Omni-Channel B2B Ordering & Point of Sale",
    description: "Finding a technology partner in Pakistan that understands both local business nuances and international software standards is rare. SolyNext built our complete POS integration and inventory sync in 8 weeks flat.",
    status: "Approved", updatedAt: "2026-10-06T08:29:00.000Z", rating: 5, featured: true,
  },
  {
    id: "legacy-review-elena-rostova", title: "Elena Rostova", role: "Head of Product", company: "Veloce Mobility",
    category: "Cross-Platform React Native Mobile Fleet App",
    description: "Working with the SolyNext team has been one of our smoothest offshore development experiences. Their daily standups, proactive problem solving, and attention to UX detail made time zones completely irrelevant.",
    status: "Approved", updatedAt: "2026-10-06T08:28:00.000Z", rating: 5, featured: true,
  },
  {
    id: "legacy-review-mansoor-al-rashidi", title: "Mansoor Al-Rashidi", role: "Chief Digital Officer", company: "Al-Noor Logistics Services",
    category: "Custom Freight Tracking & Driver PWA",
    description: "The SolyNext team delivered an end-to-end logistics platform that streamlined our dispatch across the Gulf. Their engineers are thoughtful, disciplined, and committed to delivering business impact.",
    status: "Approved", updatedAt: "2026-10-06T08:27:00.000Z", rating: 5, featured: true,
  },
];

export const reviewSeeds: AdminRecord[] = [...restoredReviews, ...TESTIMONIALS_DATA.map(item => ({
  id: item.id, title: item.clientName, category: item.projectScope, description: item.quote,
  status: "Approved", updatedAt: "2026-10-06T08:30:00.000Z", role: item.role, company: item.company,
  rating: 5, image: item.avatarUrl, featured: true,
}))];
