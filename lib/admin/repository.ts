import "server-only";
import { adminMockData } from "@/data/admin/mockData";
import { requireAdmin } from "./auth/dal";
import type { AdminCollections } from "./types";

export interface AdminRepository { getCollections(): Promise<AdminCollections> }

/** Replace with an authorized database/API adapter. The public mock data is never mutated. */
export const adminRepository: AdminRepository = {
  async getCollections() {
    await requireAdmin();
    return structuredClone(adminMockData);
  },
};
