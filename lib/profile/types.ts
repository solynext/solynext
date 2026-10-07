export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
  updatedAt: string | null;
}

export type ProfileUpdate = Pick<UserProfile, "name" | "email" | "profileImage">;

/** Replace this adapter with an API implementation when accounts are available. */
export interface ProfileStorageAdapter {
  read(): Promise<unknown>;
  write(profile: UserProfile): Promise<void>;
}

export const DEFAULT_PROFILE: UserProfile = {
  id: "local-user",
  name: "Your name",
  email: "you@example.com",
  profileImage: null,
  updatedAt: null,
};
