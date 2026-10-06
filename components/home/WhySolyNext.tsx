import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Globe2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const strengths = [
  {
    title: "Experienced engineers",
    description:
      "Work directly with senior engineers across web, mobile, and custom software.",
    icon: Users,
  },
  {
    title: "Your code stays yours",
    description:
      "Source code, design systems, and project data remain under your ownership.",
    icon: ShieldCheck,
  },
  {
    title: "Clear, visible delivery",
    description:
      "Follow progress through regular sprint reviews, shared task boards, and staging builds.",
    icon: Globe2,
  },
  {
    title: "Built to be maintained",
    description:
      "Typed code, automated testing, and modular architecture support long-term changes.",
    icon: Code2,
  },
];

export function WhySolyNext() {
  return (
    <section className="home-about py-20 lg:py-28 border-b border-[#1c212f] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              align="left"
              kicker="A little about us"
              title="A software team built around your goals"
              description="Based in Islamabad and Lahore, SolyNext works with businesses worldwide to solve real product and engineering challenges."
              className="mb-6"
            />
            <Link href="/about" className="home-section-link">
              About SolyNext
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {strengths.map((strength) => {
              const Icon = strength.icon;

              return (
                <article className="home-strength-card" key={strength.title}>
                  <span className="home-service-icon">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </article>
              );
            })}
            <div className="home-ownership-note sm:col-span-2">
              <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>
                Every engagement includes complete source-code ownership and a
                30-day post-launch warranty.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
