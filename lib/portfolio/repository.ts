import "server-only";
import path from "node:path";
import { connection } from "next/server";
import { CASE_STUDIES_DATA } from "@/data/mockData";
import { createPortfolioStore } from "./storage";
import { publicProjects, type PortfolioProject } from "./model";
import { clientStore } from "@/lib/clients/repository";

export const portfolioDirectory = process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), ".data", "portfolio");
export const portfolioStore = createPortfolioStore(path.join(portfolioDirectory, "projects.json"), CASE_STUDIES_DATA.map((item, index): PortfolioProject => ({ ...item, status: "Published", featured: index < 2, displayOrder: index, imageAlt: item.title, projectUrl: "", gallery: [], completionDate: "", projectId: item.id, updatedAt: "2026-10-08T00:00:00.000Z" })));
export async function getPublicProjects() {
  await connection();
  const [projects, clients] = await Promise.all([portfolioStore.read(), clientStore.read()]);
  return publicProjects(projects).map(project => {
    const client = clients.find(client => client.id === project.clientId);
    return client ? {
      ...project, client: client.title, industry: client.category,
      title: project.title.startsWith(`${project.client}:`) ? client.title + project.title.slice(project.client.length) : project.title,
    } : project;
  });
}
