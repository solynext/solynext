import {
  Building2,
  Globe2,
  Landmark,
  Layers,
  ShoppingBag,
  Stethoscope,
  Truck,
} from "lucide-react";

const industries = [
  { label: "FinTech", icon: Landmark },
  { label: "Healthcare", icon: Stethoscope },
  { label: "E-Commerce", icon: ShoppingBag },
  { label: "Real Estate", icon: Building2 },
  { label: "Logistics", icon: Truck },
  { label: "SaaS", icon: Layers },
];

export function TrustBar() {
  return (
    <section className="home-trust border-b border-[#1c212f] bg-[#000000]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="home-trust-eyebrow">
            <Globe2 aria-hidden="true" className="h-4 w-4" />
            Islamabad &amp; Lahore · Working with teams worldwide
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {industries.map(({ label, icon: Icon }) => (
              <span className="home-industry" key={label}>
                <Icon aria-hidden="true" className="h-4 w-4" />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="home-trust-commitments">
          <span>Full IP ownership</span>
          <span>Mutual NDA</span>
          <span>30-day warranty</span>
        </div>
      </div>
    </section>
  );
}
