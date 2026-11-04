import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { BlogClient } from "./BlogClient";

export async function generateMetadata() { return getPageMetadata("/insights"); }

export default function BlogPage() {
  return <BlogClient />;
}
