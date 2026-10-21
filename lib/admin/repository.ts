import "server-only";
import { adminMockData } from "@/data/admin/mockData";
import { requireAdmin } from "./auth/dal";
import type { AdminCollections } from "./types";
import { portfolioStore } from "@/lib/portfolio/repository";
import { clientStore } from "@/lib/clients/repository";

export interface AdminRepository { getCollections(): Promise<AdminCollections> }

/** Replace with an authorized database/API adapter. The public mock data is never mutated. */
export const adminRepository: AdminRepository = {
  async getCollections() {
    await requireAdmin();
    const collections = structuredClone(adminMockData);
    collections.clients = await clientStore.read();
    try {
      collections.portfolio = (await portfolioStore.read()).map(project => ({ id: project.id, title: project.title, category: project.industry, description: project.summary, status: project.status, updatedAt: project.updatedAt, image: project.featuredImage, url: project.projectUrl, projectId: project.projectId || undefined, clientId: project.clientId, technologies: project.technologies, completionDate: project.completionDate, featured: project.featured, displayOrder: project.displayOrder }));
    } catch { collections.portfolio = []; }
    for (const section of ["projects", "portfolio", "reviews"] as const) {
      collections[section] = collections[section].map(record => record.clientId && !collections.clients.some(client => client.id === record.clientId) ? { ...record, clientId: undefined } : record);
    }
    return collections;
  },
};
