import { AdSystem } from "@/components/admin/AdSystem";
import { listAds } from "@/lib/ads/actions";

export const runtime = "nodejs";
export default async function AdsPage() {
  return <AdSystem initial={await listAds()}/>;
}
