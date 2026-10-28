import type { Metadata } from "next";
import { getPublicApps } from "@/lib/apps/repository";
import { AppsCatalog } from "@/components/apps/AppsCatalog";
export const metadata: Metadata = { title:"SolyNext Apps | SolyNext", description:"Discover and launch web apps by SolyNext, directly in your browser." };
export default async function SolyNextAppsPage({ searchParams }: { searchParams: Promise<{ app?:string; tab?: string | string[] }> }) {
  const { tab,app } = await searchParams;
  const initialTab = tab === "downloads" ? "Downloads" : tab === "games" ? "Games" : "Apps";
  return <AppsCatalog apps={await getPublicApps()} key={app||initialTab} initialTab={initialTab} initialAppId={app}/>;
}
