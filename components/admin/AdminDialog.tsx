"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import styles from "./admin.module.css";
import { confirmAdminDiscard } from "./AdminUnsavedChanges";

export function AdminDialog({ title, description, onClose, children }: { title: string; description?: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const requestClose = async () => { if (!ref.current || await confirmAdminDiscard(ref.current)) onClose(); };
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal(); document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>('[data-autofocus="true"]')?.focus();
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={styles.dialog} aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} onCancel={event => { event.preventDefault(); requestClose(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose(); } }}>
    <div className={styles.dialogHeader}><div><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div><button className={styles.iconButton} onClick={requestClose} aria-label="Close dialog"><X size={19}/></button></div>{children}
  </dialog>;
}
