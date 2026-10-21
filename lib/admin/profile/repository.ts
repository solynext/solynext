import "server-only";
import path from "node:path";
import { createAdminPhotoStore } from "./storage";

export const adminPhotoStore = createAdminPhotoStore(process.env.ADMIN_PROFILE_DATA_DIR || path.join(process.cwd(), ".data", "admin-profile"));
