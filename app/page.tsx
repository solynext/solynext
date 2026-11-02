import styles from "./Home.module.css";
import { getPageMetadata } from "@/lib/seo/metadata";
import { ProjectCTA } from "@/components/home/ProjectCTA";
import { ClientReviews } from "@/components/home/ClientReviews";
import { getPublicProjects } from "@/lib/portfolio/repository";

import { HomeServices, HomeIndustries } from "@/components/catalog/HomeSections";
import { GrowthHero } from "@/components/home/GrowthHero";
import { HomeApproach } from "@/components/home/HomeApproach";
import { WhySolyNext } from "@/components/home/WhySolyNext";
import { AppStoreSection } from "@/components/home/AppStoreSection";
import { HomeContact } from "@/components/home/HomeContact";

export async function generateMetadata() { return getPageMetadata("/"); }

export default async function HomePage() {
  const projects = await getPublicProjects();
  const reviews = projects.flatMap(project => project.testimonial ? [{ id: project.id, ...project.testimonial, project: project.title, slug: project.slug }] : []);
  return <main id="main-content" className={`premium-home ${styles.home}`}>
    <GrowthHero />
    <HomeApproach />
    <HomeServices />
    <HomeIndustries />
    <WhySolyNext />
    <AppStoreSection />
    <ProjectCTA />

    <ClientReviews reviews={reviews}/>

    <HomeContact />
  </main>;
}



