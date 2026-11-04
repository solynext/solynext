import styles from "./Home.module.css";
import { getPageMetadata } from "@/lib/seo/metadata";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ClientReviews } from "@/components/home/ClientReviews";
import { getPublicReviews } from "@/lib/reviews/repository";

import { HomeServices, HomeIndustries } from "@/components/catalog/HomeSections";
import { GrowthHero } from "@/components/home/GrowthHero";
import { HomeApproach } from "@/components/home/HomeApproach";
import { WhySolyNext } from "@/components/home/WhySolyNext";
import { AppStoreSection } from "@/components/home/AppStoreSection";
import { HomeContact } from "@/components/home/HomeContact";

export async function generateMetadata() { return getPageMetadata("/"); }

export default async function HomePage() {
  const reviews = await getPublicReviews(true);
  return <main id="main-content" className={`premium-home ${styles.home}`}>
    <GrowthHero />
    <HomeApproach />
    <HomeServices />
    <HomeIndustries />
    <WhySolyNext />
    <AppStoreSection />
    <ProjectCTA />

    <ClientReviews reviews={reviews} limit={3} showAllLink autoScroll />

    <HomeContact />
  </main>;
}



