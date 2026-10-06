import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { TECHNOLOGIES_DATA } from "@/data/mockData";

const categories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Cloud & DevOps",
  "Database",
] as const;

export function TechStackSection() {
  return (
    <section className="home-tech py-20 lg:py-28 border-b border-[#1c212f] bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            kicker="Technology"
            title="Tools chosen for the job"
            description="A focused set of proven technologies for reliable, maintainable digital products."
            className="mb-0"
          />
          <Link href="/technologies" className="home-section-link shrink-0">
            Explore the full stack
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const tools = TECHNOLOGIES_DATA.filter(
              (technology) => technology.category === category,
            ).slice(0, 4);

            if (tools.length === 0) return null;

            return (
              <div className="home-tech-group" key={category}>
                <h3>{category}</h3>
                <ul>
                  {tools.map((technology) => (
                    <li key={technology.name}>{technology.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
