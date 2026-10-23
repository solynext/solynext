import { ShoppingBag, ShieldCheck, Activity, House, Zap, Truck } from "lucide-react";
import { INDUSTRY_SOLUTIONS_DATA } from "@/data/mockData";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { CapabilityCard } from "@/components/ui/CapabilityCard";
import styles from "./IndustriesSection.module.css";

const summaries: Record<string, string> = {
 "ecommerce-retail": "Online stores and smoother shopping experiences.",
 "fintech-banking": "Digital products for financial workflows.",
 "healthcare-telemedicine": "Connected tools for healthcare teams.",
 "real-estate-proptech": "Property listings and customer inquiries.",
 "saas-startups": "Scalable foundations for your product.",
 "logistics-supply-chain": "Clearer operations and delivery tracking.",
};
const icons = [ShoppingBag, ShieldCheck, Activity, House, Zap, Truck];
export function IndustriesSection() {
  return <section className={`premium-section industries-section ${styles.section}`} id="industries"><div className="premium-container"><EditorialHeading kicker="BUILT FOR YOUR WORLD" title={<>Different industries.<br />The same thoughtful craft.</>} description="Technology shaped around the way your business actually works, from everyday operations to your next stage of growth." href="/solutions" linkLabel="All industry solutions" /><div className="capability-grid">{INDUSTRY_SOLUTIONS_DATA.map((solution, index) => <CapabilityCard key={solution.id} index={index} icon={icons[index % icons.length]} title={solution.title} description={summaries[solution.id] ?? solution.solynextSolution} tags={solution.technologies.slice(0, 3)} href={`/solutions#${solution.slug}`} />)}</div></div></section>;
}
