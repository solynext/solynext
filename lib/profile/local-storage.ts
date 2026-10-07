import type { ProfileStorageAdapter } from "./types";

export const PROFILE_STORAGE_KEY = "solynext.user-profile.v1";

export const localProfileAdapter: ProfileStorageAdapter = {
  async read() {
    if (typeof window === "undefined") return null;
    try {
      const value = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  async write(profile) {
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      throw new Error("Your browser could not save this profile. Free up storage or allow local storage, then try again.");
    }
  },
};
