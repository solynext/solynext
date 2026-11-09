import styles from "./Home.module.css";
import { getPageMetadata } from "@/lib/seo/metadata";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ClientReviews } from "@/components/home/ClientReviews";
import { getPublicReviews } from "@/lib/reviews/repository";

import { HomeServices, HomeIndustries } from "@/components/catalog/HomeSections";
import { GrowthHero } from "@/components/home/GrowthHero";
import { HomeOfferingsOverview } from "@/components/home/HomeOfferingsOverview";
import { WhySolyNext } from "@/components/home/WhySolyNext";
import { AppStoreSection } from "@/components/home/AppStoreSection";
import { PartnershipSection } from "@/components/home/PartnershipSection";
import { ProcessSection } from "@/components/home/ProcessSection";

export async function generateMetadata() { return getPageMetadata("/"); }

export default async function HomePage() {
  const reviews = await getPublicReviews(true);
  return <main id="main-content" className={`premium-home ${styles.home}`}>
    <GrowthHero />
    <HomeOfferingsOverview />
    <HomeServices />
    <HomeIndustries />
    <WhySolyNext />
    <AppStoreSection />
    <ProcessSection />
    <PartnershipSection />
    <ProjectCTA />
    <ClientReviews reviews={reviews} limit={4} showAllLink autoScroll />
  </main>;
}



