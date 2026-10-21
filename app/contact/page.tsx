import { getPageMetadata } from "@/lib/seo/metadata";
import React from "react";
import { ContactClient } from "./ContactClient";

export async function generateMetadata() { return getPageMetadata("/contact"); }

export default function ContactPage() {
  return <ContactClient />;
}
