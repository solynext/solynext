import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { CASE_STUDIES_DATA } from "@/data/mockData";
import { createPortfolioStore } from "./storage";
import { publicProjects, type PortfolioProject } from "./model";

export const portfolioDirectory = process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), ".data", "portfolio");
export const portfolioStore = createPortfolioStore(path.join(portfolioDirectory, "projects.json"), CASE_STUDIES_DATA.map((item, index): PortfolioProject => ({ ...item, status: "Published", featured: index < 2, displayOrder: index, imageAlt: item.title, projectUrl: "", gallery: [], completionDate: "", projectId: item.id, updatedAt: "2026-10-08T00:00:00.000Z" })));
export async function getPublicProjects() {
  await connection();
  return publicProjects(await portfolioStore.read());
}
