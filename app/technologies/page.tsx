import React from "react";
import { TechnologiesClient } from "./TechnologiesClient";

export const metadata = {
  title: "Technologies & Engineering Frameworks — SolyNext",
  description:
    "Explore the modern tech stack utilized by SolyNext: Next.js, React, Node.js, Python, TypeScript, PostgreSQL, Docker, AWS, and Figma.",
};

export default function TechnologiesPage() {
  return <TechnologiesClient />;
}
