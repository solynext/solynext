"use client";

import { useEffect, useState } from "react";
import { PROFILE_STORAGE_KEY } from "@/lib/profile/local-storage";
import { getUserProfile, updateUserProfile } from "@/lib/profile/service";
import { DEFAULT_PROFILE, type ProfileUpdate } from "@/lib/profile/types";

export function useUserProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    const refresh = () => { void getUserProfile().then(value => { if (active) { setProfile(value); setReady(true); } }); };
    const onStorage = (event: StorageEvent) => { if (event.key === PROFILE_STORAGE_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("solynext:profile-updated", refresh);
    return () => { active = false; window.removeEventListener("storage", onStorage); window.removeEventListener("solynext:profile-updated", refresh); };
  }, []);
  const saveProfile = async (draft: ProfileUpdate) => {
    const saved = await updateUserProfile(draft);
    setProfile(saved);
    window.dispatchEvent(new Event("solynext:profile-updated"));
  };
  return { profile, ready, saveProfile };
}
