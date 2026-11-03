"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ShieldCheck, Zap, HelpCircle, Calculator } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConsultationModal } from "@/components/ui/ConsultationModal";
import styles from "./PricingClient.module.css";

export function PricingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estimator state
  const [scopeType, setScopeType] = useState<string>("web");
  const [complexity, setComplexity] = useState<string>("medium");

  const models = [
    {
      name: "Fixed-Price Milestone",
      tagline: "Best for clearly defined project scopes",
      idealFor: "MVPs, web apps, mobile apps, and defined redesigns",
      features: [
        "Fixed price with agreed milestone deadlines",
        "Clear deliverables and sprint schedule",
        "Weekly progress demos and staging access",
        "30-day post-launch warranty included",
        "100% IP and code handover upon delivery",
      ],
      ctaText: "Request Scope Estimate",
      recommended: false,
    },
    {
      name: "Dedicated Engineering Team",
      tagline: "Full-time senior engineers embedded in your workflow",
      idealFor: "Startups and companies with continuously evolving roadmaps",
      features: [
        "Dedicated senior engineers (Full-Stack, Mobile, DevOps)",
        "Daily syncs and direct Slack/Teams collaboration",
        "Flexible sprint priorities with zero change-order friction",
        "Bi-weekly sprint demos and velocity tracking",
        "Scale squad size up or down with 30-day notice",
      ],
      ctaText: "Discuss Dedicated Team",
      recommended: true,
    },
    {
      name: "Growth & SLA Retainer",
      tagline: "Ongoing maintenance, updates, and digital marketing",
      idealFor: "Live products needing ongoing improvements and SEO",
      features: [
        "Guaranteed monthly engineering and marketing hours",
        "24/7 uptime monitoring and security updates",
        "Technical SEO optimization and speed checks",
        "Monthly strategy and analytics reviews",
        "Priority turnaround on urgent requests",
      ],
      ctaText: "Review Retainer Plans",
      recommended: false,
    },
  ];

  // Calculate realistic ballpark range
  const calculateEstimate = () => {
    let base = 5000;
    if (scopeType === "mobile") base = 7500;
    if (scopeType === "enterprise") base = 12000;
    if (scopeType === "marketing") base = 3000;

    let multiplier = 1;
    if (complexity === "high") multiplier = 1.6;
    if (complexity === "complex") multiplier = 2.4;

    const min = Math.round(base * multiplier);
    const max = Math.round(min * 1.4);
    return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
  };

  return (
    <main id="main-content" className={`${styles.page} flex-1 py-16 sm:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader as="h1"
          align="left"
          kicker="ENGAGEMENT MODELS"
          title="A clear way to work together"
          description="Choose a fixed project, a dedicated team, or ongoing support."
        />

        {/* Pricing Models Grid */}
        <div className={styles.modelGrid}>
          {models.map((model) => (
            <div
              key={model.name}
              className={`${styles.modelCard} ${model.recommended ? styles.recommended : ""}`}
            >
              <div>
                {model.recommended && (
                  <div className={styles.recommendation}>
                    Recommended
                  </div>
                )}
                <h3 className={styles.modelTitle}>{model.name}</h3>
                <p className={styles.modelTagline}>{model.tagline}</p>
                <p className={styles.modelDescription}>
                  <strong>Ideal for:</strong> {model.idealFor}
                </p>

                <div className={styles.features}>
                  <p className={styles.featureLabel}>
                    What&apos;s Included:
                  </p>
                  <ul>
                    {model.features.map((f, i) => (
                      <li key={i}>
                        <Check aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`${styles.modelButton} ${model.recommended ? styles.primaryButton : ""}`}
                >
                  <span>{model.ctaText}</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Ballpark Project Estimator */}
        <section className={styles.estimator}>
          <div className={styles.estimatorInner}>
            <div className={styles.estimatorKicker}>
              <Calculator aria-hidden="true" />
              <span>PROJECT ESTIMATOR</span>
            </div>
            <h2 className={styles.estimatorTitle}>
              Get a project estimate
            </h2>
            <p className={styles.estimatorDescription}>
              Choose a few project details to see a preliminary investment range based on typical delivery scope.
            </p>

            <div className={styles.estimatorFields}>
              <div>
                <label>
                  Project type
                </label>
                <div className={styles.optionsGrid}>
                  {[
                    { id: "web", label: "Web Platform" },
                    { id: "mobile", label: "Mobile App" },
                    { id: "enterprise", label: "Enterprise ERP" },
                    { id: "marketing", label: "Marketing / SEO" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setScopeType(item.id)}
                      aria-pressed={scopeType === item.id}
                      className={styles.option}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label>
                  Project complexity
                </label>
                <div className={styles.optionsGrid}>
                  {[
                    { id: "medium", label: "Standard MVP" },
                    { id: "high", label: "Multi-Role SaaS" },
                    { id: "complex", label: "FinTech / High-Scale" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setComplexity(item.id)}
                      aria-pressed={complexity === item.id}
                      className={styles.option}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Calculation Result Box */}
              <div className={styles.estimateResult}>
                <div>
                  <p className={styles.estimateLabel}>Estimated investment range</p>
                  <p className={styles.estimateValue}>
                    {calculateEstimate()}
                  </p>
                  <p className={styles.estimateNote}>
                    Includes dedicated solution architect, full UI/UX design, and 30-day warranty.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className={styles.proposalButton}
                >
                  <span>Request Written Proposal</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* IP & Guarantee Banner */}
        <div className={styles.assurances}>
          <div className={styles.assuranceCard}>
            <ShieldCheck aria-hidden="true" />
            <div>
              <p>Standard Mutual NDA</p>
              <span>We execute formal NDAs prior to reviewing proprietary business logic or schemas.</span>
            </div>
          </div>

          <div className={styles.assuranceCard}>
            <Zap aria-hidden="true" />
            <div>
              <p>Code ownership</p>
              <span>You have access to the GitHub repository from day one. Full IP transfer upon milestone payment.</span>
            </div>
          </div>

          <div className={styles.assuranceCard}>
            <HelpCircle aria-hidden="true" />
            <div>
              <p>Flexible payment options</p>
              <span>Support for international transfers and local Pakistani PKR bank payments.</span>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

