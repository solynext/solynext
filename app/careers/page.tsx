import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { CareersClient } from "./CareersClient";

export async function generateMetadata() { return getPageMetadata("/careers"); }

export default function CareersPage() {
  return <CareersClient />;
}
