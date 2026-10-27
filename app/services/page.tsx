import { publicOfferings,publicSection } from "@/lib/catalog/repository";
import type { Service,Industry,ServicesPageSettings } from "@/lib/catalog/model";
import { PublicListing } from "@/components/catalog/PublicListing";
export async function generateMetadata(){const settings=await publicSection("services_page") as ServicesPageSettings;return{title:settings.hero_heading+" | SolyNext",description:settings.hero_text};}
export default async function ServicesPage(){const[items,industries,settings]=await Promise.all([publicOfferings("services"),publicOfferings("industries"),publicSection("services_page")]);return <PublicListing entity="services" items={items as Service[]} industries={industries as Industry[]} settings={settings as ServicesPageSettings}/>;}