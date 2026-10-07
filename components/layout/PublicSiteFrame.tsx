"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MotionSystem } from "@/components/ui/MotionSystem";
import { TechSolutionsChatbot } from "@/components/chat/TechSolutionsChatbot";

/** Keep public routes exactly as they are, without public chrome in the CMS. */
export function PublicSiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children;
  return <><Navbar /><MotionSystem />{children}<Footer /><TechSolutionsChatbot /></>;
}
