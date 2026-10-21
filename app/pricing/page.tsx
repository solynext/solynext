import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { PricingClient } from "./PricingClient";

export async function generateMetadata() { return getPageMetadata("/pricing"); }

export default function PricingPage() {
  return <PricingClient />;
}
