import "server-only";
import { adminMockData } from "@/data/admin/mockData";
import { requireAdmin } from "./auth/dal";
import type { AdminCollections } from "./types";
import { portfolioStore } from "@/lib/portfolio/repository";

export interface AdminRepository { getCollections(): Promise<AdminCollections> }

/** Replace with an authorized database/API adapter. The public mock data is never mutated. */
export const adminRepository: AdminRepository = {
  async getCollections() {
    await requireAdmin();
    const collections = structuredClone(adminMockData);
    try {
      collections.portfolio = (await portfolioStore.read()).map(project => ({ id: project.id, title: project.title, category: project.industry, description: project.summary, status: project.status, updatedAt: project.updatedAt, image: project.featuredImage, url: project.projectUrl, projectId: project.projectId || undefined, technologies: project.technologies, completionDate: project.completionDate, featured: project.featured, displayOrder: project.displayOrder }));
    } catch { collections.portfolio = []; }
    return collections;
  },
};
