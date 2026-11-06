import { getPageMetadata } from "@/lib/seo/metadata";
import { PricingGuide } from "./PricingGuide";

export async function generateMetadata() {
  return getPageMetadata("/pricing", {
    title: "Pricing Guide | SolyNext",
    description: "Explore SolyNext monthly digital service packages, individual service pricing, and custom quotations in Pakistani Rupees.",
  });
}

export default function PricingPage() {
  return <PricingGuide />;
}
