import { PartnershipSection } from "@/components/home/PartnershipSection";
import { getPageMetadata } from "@/lib/seo/metadata";
import styles from "./Collaboration.module.css";

export async function generateMetadata() {
  return getPageMetadata("/collaboration", {
    title: "Partnerships & Collaboration | SolyNext",
    description: "Partner with SolyNext on products, client services, and new business ideas. Explore collaboration options for agencies, experts, product owners, and investors.",
  });
}

export default function CollaborationPage() {
  return (
    <main id="main-content" className={styles.page}>
      <PartnershipSection standalone />
    </main>
  );
}
