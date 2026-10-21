"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { checkAdminSession } from "@/lib/admin/auth/actions";
import type { AdminSession } from "@/lib/admin/auth/types";
import type { AdminCollections, AdminRecord, ManagementSection, AdminActivity, AdminNotification } from "@/lib/admin/types";
import { initialActivity, initialNotifications } from "@/data/admin/activity";
import { removeRecords } from "@/lib/admin/selectors";
import { saveClient, deleteClients } from "@/lib/clients/actions";
import type { AdminPhoto } from "@/lib/admin/profile/types";

interface AdminState {
  profilePhoto: AdminPhoto; setProfilePhoto: (photo: AdminPhoto) => void;
  collections: AdminCollections; session: AdminSession; activity: AdminActivity[];
  notifications: AdminNotification[]; markRead: (id?: string) => void;
  deleteNotification: (id: string) => void; removeAllNotifications: () => void;
  authState: "authenticated" | "checking" | "expired"; toast: string;
  save: (section: ManagementSection, record: AdminRecord) => void;
  remove: (section: ManagementSection, ids: string[]) => void;
  notify: (message: string) => void;
}
const Context = createContext<AdminState | null>(null);

export function AdminProvider({ session, initialData, initialPhoto, children }: { session: AdminSession; initialData: AdminCollections; initialPhoto: AdminPhoto; children: React.ReactNode }) {
  const [profilePhoto, setProfilePhoto] = useState(initialPhoto);
  const [collections, setCollections] = useState(initialData);
  const [activity, setActivity] = useState(initialActivity);
  const [notifications, setNotifications] = useState(initialNotifications);
  const markRead = (id?: string) => setNotifications(previous => previous.map(item => !id || item.id === id ? {...item, read:true} : item));
  const deleteNotification = (id: string) => setNotifications(previous => previous.filter(item => item.id !== id));
  const removeAllNotifications = () => setNotifications([]);
  const [toast, setToast] = useState("");
  const [authState, setAuthState] = useState<AdminState["authState"]>("authenticated");
  const router = useRouter();
  const notify = useCallback((message: string) => setToast(message), []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(""), 4500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => {
    let live = true;
    let checking = false;
    const expire = () => { if (!live) return; setAuthState("expired"); router.replace("/admin/login?reason=expired"); router.refresh(); };
    const check = async () => {
      if (checking || !live) return;
      checking = true; setAuthState("checking");
      try { const result = await checkAdminSession(); if (live) { if (!result.authenticated) expire(); else setAuthState("authenticated"); } }
      catch { if (live) { setAuthState("authenticated"); notify("Session check unavailable. Your next page request will verify access."); } }
      finally { checking = false; }
    };
    const expiry = setTimeout(expire, Math.max(0, session.expiresAt * 1000 - Date.now()));
    const interval = setInterval(check, 60000);
    window.addEventListener("focus", check);
    return () => { live = false; clearTimeout(expiry); clearInterval(interval); window.removeEventListener("focus", check); };
  }, [router, session.expiresAt, notify]);
  const log = (title: string, section: ManagementSection) => { const event = {id: crypto.randomUUID(), title, detail: "Demo workspace change", time: "Just now", kind: section, href: `/admin/${section}`}; setActivity(previous => [event,...previous].slice(0,40)); setNotifications(previous => [{...event,read:false},...previous].slice(0,40)); };
  const save = (section: ManagementSection, record: AdminRecord) => {
    const exists = collections[section].some(item => item.id === record.id);
    if (section === "clients") {
      notify("Saving client…");
      void saveClient(record).then(result => {
        if (result.error || !result.items) { notify(result.error || "Could not save client."); return; }
        setCollections(previous => ({ ...previous, clients: result.items }));
        log(`${record.title} ${exists ? "updated" : "added"}`, section);
        notify("Client saved. The homepage uses the same directory.");
      }).catch(() => notify("Could not save client. Try again."));
      return;
    }
    setCollections(previous => ({ ...previous, [section]: exists ? previous[section].map(item => item.id === record.id ? record : item) : [record, ...previous[section]] }));
    log(`${record.title} ${exists ? "updated" : "added"}`, section); notify(`${exists ? "Updated" : "Added"} in this preview. The public website is unchanged.`);
  };
  const remove = (section: ManagementSection, ids: string[]) => {
    if (section === "clients") {
      notify("Removing clients…");
      void deleteClients(ids).then(result => {
        if (result.error || !result.items) { notify(result.error || "Could not remove clients."); return; }
        setCollections(previous => ({ ...removeRecords(previous, section, ids), clients: result.items }));
        log(`${ids.length} client records removed`, section);
        notify("Clients removed from storage and the homepage.");
      }).catch(() => notify("Could not remove clients. Try again."));
      return;
    }
    setCollections(previous => removeRecords(previous, section, ids));
    log(`${ids.length} ${section} record${ids.length === 1 ? "" : "s"} removed`, section); notify("Removed from this preview. The public website is unchanged.");
  };
  return <Context.Provider value={{ profilePhoto, setProfilePhoto, collections, session, activity, notifications, markRead, deleteNotification, removeAllNotifications, authState, toast, save, remove, notify }}>{children}</Context.Provider>;
}

export function useAdmin() { const value = useContext(Context); if (!value) throw new Error("Admin components must be inside AdminProvider."); return value; }
