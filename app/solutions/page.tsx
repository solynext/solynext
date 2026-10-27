import { publicOfferings,publicSection } from "@/lib/catalog/repository";
import type { Industry,IndustriesPageSettings } from "@/lib/catalog/model";
import { PublicListing } from "@/components/catalog/PublicListing";
export async function generateMetadata(){const settings=await publicSection("industries_page") as IndustriesPageSettings;return{title:settings.hero_heading+" | SolyNext",description:settings.hero_text};}
export default async function IndustriesPage(){const[items,settings]=await Promise.all([publicOfferings("industries"),publicSection("industries_page")]);return <PublicListing entity="industries" items={items as Industry[]} settings={settings as IndustriesPageSettings}/>;}