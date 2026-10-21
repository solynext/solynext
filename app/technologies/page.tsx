import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { TechnologiesClient } from "./TechnologiesClient";

export async function generateMetadata() { return getPageMetadata("/technologies"); }

export default function TechnologiesPage() {
  return <TechnologiesClient />;
}
