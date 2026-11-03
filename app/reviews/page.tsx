import type { Metadata } from "next";
import { ClientReviews } from "@/components/home/ClientReviews";
import { getPublicReviews } from "@/lib/reviews/repository";

export const metadata: Metadata = {
  title: "Client Reviews | SolyNext",
  description: "Read feedback from teams working with SolyNext.",
};

export default async function ReviewsPage() {
  const reviews = await getPublicReviews();
  return <main id="main-content" className="premium-home">
    <ClientReviews
      reviews={reviews}
      title="What clients say about working with us"
      description="More feedback from teams building their next step with SolyNext."
    />
  </main>;
}
