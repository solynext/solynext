import { getPageMetadata } from "@/lib/seo/metadata";
import { CareersClient } from "./CareersClient";

export async function generateMetadata() {
  return getPageMetadata("/careers", {
    title: "Careers at SolyNext | Build thoughtful digital work",
    description: "Explore engineering, design, and digital growth roles with SolyNext in Islamabad, Lahore, and remote locations.",
  });
}

export default function CareersPage() {
  return <CareersClient />;
}
