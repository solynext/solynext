import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { reviewSeeds } from "./model";
import { createReviewStore } from "./storage";

export const reviewStore = createReviewStore(path.join(process.env.REVIEW_DATA_DIR || path.join(process.cwd(), ".data", "reviews"), "reviews.json"), reviewSeeds);

export async function getPublicReviews(featuredOnly = false) {
  await connection();
  const records = await reviewStore.read();
  return records
    .filter(review => ["Approved", "Published"].includes(review.status) && (!featuredOnly || review.featured))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.updatedAt.localeCompare(a.updatedAt))
    .map(review => ({
      id: review.id,
      author: review.title,
      quote: review.description,
      role: review.role ?? "",
      company: review.company ?? "",
      rating: review.rating ?? 5,
      image: review.image,
    }));
}
