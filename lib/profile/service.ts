import { localProfileAdapter } from "./local-storage";
import { DEFAULT_PROFILE, type ProfileStorageAdapter, type ProfileUpdate, type UserProfile } from "./types";

export function validateProfile(input: ProfileUpdate): Partial<Record<keyof ProfileUpdate, string>> {
  const errors: Partial<Record<keyof ProfileUpdate, string>> = {};
  if (!input.name.trim()) errors.name = "Enter your full name.";
  else if (input.name.trim().length > 80) errors.name = "Use 80 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()) || input.email.length > 254) errors.email = "Enter a valid email address.";
  if (input.profileImage !== null && (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(input.profileImage) || input.profileImage.length > 1_500_000)) errors.profileImage = "Choose a valid profile image.";
  return errors;
}

function restore(value: unknown): UserProfile {
  if (!value || typeof value !== "object") return { ...DEFAULT_PROFILE };
  const p = value as UserProfile;
  if (typeof p.id !== "string" || !p.id || typeof p.name !== "string" || typeof p.email !== "string" || (p.profileImage !== null && typeof p.profileImage !== "string") || (p.updatedAt !== null && (typeof p.updatedAt !== "string" || !Number.isFinite(Date.parse(p.updatedAt))))) return { ...DEFAULT_PROFILE };
  return Object.keys(validateProfile(p)).length ? { ...DEFAULT_PROFILE } : { id: p.id, name: p.name, email: p.email, profileImage: p.profileImage, updatedAt: p.updatedAt };
}

export function createProfileService(adapter: ProfileStorageAdapter) {
  return {
    async getUserProfile(): Promise<UserProfile> { return restore(await adapter.read()); },
    async updateUserProfile(input: ProfileUpdate): Promise<UserProfile> {
      const errors = validateProfile(input);
      if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
      const current = await this.getUserProfile();
      const next = { ...current, name: input.name.trim(), email: input.email.trim(), profileImage: input.profileImage, updatedAt: new Date().toISOString() };
      await adapter.write(next);
      return next;
    },
    async updateProfileImage(image: string): Promise<UserProfile> {
      return this.updateUserProfile({ ...await this.getUserProfile(), profileImage: image });
    },
    async removeProfileImage(): Promise<UserProfile> {
      return this.updateUserProfile({ ...await this.getUserProfile(), profileImage: null });
    },
  };
}

const service = createProfileService(localProfileAdapter);
export const getUserProfile = () => service.getUserProfile();
export const updateUserProfile = (input: ProfileUpdate) => service.updateUserProfile(input);
export const updateProfileImage = (image: string) => service.updateProfileImage(image);
export const removeProfileImage = () => service.removeProfileImage();
