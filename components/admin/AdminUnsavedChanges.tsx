"use client";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert, X, ArrowRight } from "lucide-react";
import { AdminButton } from "./AdminUI";
import styles from "./admin.module.css";

type DiscardRequest = { resolve: (discard: boolean) => void };

const baselines = new WeakMap<HTMLFormElement, string>();
const fields = 'input:not([type="submit"]):not([type="button"]):not([type="hidden"]), textarea, select';

function snapshot(form: HTMLFormElement) {
  return JSON.stringify(Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(fields)).map(field => {
    if (field instanceof HTMLInputElement) {
      if (field.type === "checkbox" || field.type === "radio") return field.checked;
      if (field.type === "file") return Array.from(field.files ?? []).map(file => [file.name, file.size, file.lastModified]);
    }
    if (field instanceof HTMLSelectElement && field.multiple) return Array.from(field.selectedOptions).map(option => option.value);
    return field.value;
  }));
}

export function markAdminFormSaved(form: HTMLFormElement) {
  baselines.set(form, snapshot(form));
}

export async function confirmAdminDiscard(scope: ParentNode = document): Promise<boolean> {
  const dirty = Array.from(scope.querySelectorAll<HTMLFormElement>("form")).filter(form => baselines.has(form) && baselines.get(form) !== snapshot(form));
  if (!dirty.length) return true;
  const discard = await new Promise<boolean>(resolve => window.dispatchEvent(new CustomEvent<DiscardRequest>("admin:confirm-discard", { detail: { resolve } })));
  if (!discard) return false;
  dirty.forEach(markAdminFormSaved);
  return true;
}

/** Tracks editor forms; search and filter controls outside forms are excluded. */
export function AdminUnsavedChanges() {
  const [request, setRequest] = useState<DiscardRequest | null>(null);
  const pending = useRef<DiscardRequest | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const finish = (discard: boolean) => {
    const current = pending.current;
    pending.current = null;
    setRequest(null);
    current?.resolve(discard);
  };
  useEffect(() => {
    if (!request) return;
    const dialog = dialogRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLButtonElement>('[data-keep-editing]')?.focus();
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, [request]);
  useEffect(() => {
    const showConfirmation = (event: Event) => {
      const next = (event as CustomEvent<DiscardRequest>).detail;
      if (pending.current) { next.resolve(false); return; }
      pending.current = next;
      setRequest(next);
    };
    window.addEventListener("admin:confirm-discard", showConfirmation);
    const register = () => document.querySelectorAll<HTMLFormElement>("form").forEach(form => {
      if (!baselines.has(form)) markAdminFormSaved(form);
    });
    register();
    const observer = new MutationObserver(register);
    observer.observe(document.body, { childList: true, subtree: true });
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || event.defaultPrevented) return;
      if (event.target.closest('[data-discard-confirmation]')) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      const button = event.target.closest<HTMLButtonElement>("button");
      let leaving = false;
      if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0 && !link.download && (!link.target || link.target === "_self")) {
        const url = new URL(link.href);
        leaving = url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search;
      }
      if (button && !button.disabled) {
        const label = button.textContent?.trim() ?? "";
        leaving ||= /^(cancel|close|log out|sign out)$/i.test(label) || button.getAttribute("aria-label") === "Close dialog" || button.getAttribute("aria-pressed") === "false";
      }
      const dirty = Array.from(document.querySelectorAll<HTMLFormElement>("form")).some(form => baselines.has(form) && baselines.get(form) !== snapshot(form));
      if (leaving && dirty) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const target = link ?? button;
        void confirmAdminDiscard().then(discard => { if (discard && target?.isConnected) target.click(); });
      }
    };
    const beforeUnload = (event: BeforeUnloadEvent) => {
      const dirty = Array.from(document.querySelectorAll<HTMLFormElement>("form")).some(form => baselines.has(form) && baselines.get(form) !== snapshot(form));
      if (dirty) { event.preventDefault(); event.returnValue = ""; }
    };
    document.addEventListener("click", click, true);
    window.addEventListener("beforeunload", beforeUnload);
    // The Navigation API lets supported browsers cancel same-document Back/Forward.
    const navigation = (window as Window & { navigation?: EventTarget & { traverseTo: (key: string) => unknown } }).navigation;
    const navigate = (event: Event) => {
      const navigationEvent = event as Event & { navigationType?: string; destination?: { key: string } };
      const dirty = Array.from(document.querySelectorAll<HTMLFormElement>("form")).some(form => baselines.has(form) && baselines.get(form) !== snapshot(form));
      if (navigationEvent.navigationType === "traverse" && event.cancelable && dirty && navigationEvent.destination) {
        event.preventDefault();
        const key = navigationEvent.destination.key;
        void confirmAdminDiscard().then(discard => { if (discard) navigation?.traverseTo(key); });
      }
    };
    navigation?.addEventListener("navigate", navigate);
    return () => { observer.disconnect(); document.removeEventListener("click", click, true); window.removeEventListener("beforeunload", beforeUnload); navigation?.removeEventListener("navigate", navigate); window.removeEventListener("admin:confirm-discard", showConfirmation); pending.current?.resolve(false); pending.current = null; };
  }, []);
  return request ? <dialog ref={dialogRef} className={styles.discardDialog} data-discard-confirmation role="alertdialog" aria-modal="true" aria-labelledby="admin-discard-title" aria-describedby="admin-discard-description" onCancel={event => { event.preventDefault(); finish(false); }}>
    <button type="button" className={`${styles.iconButton} ${styles.discardClose}`} aria-label="Keep editing and close confirmation" onClick={() => finish(false)}><X size={19}/></button>
    <div className={styles.discardContent}><span className={styles.discardIcon}><TriangleAlert size={28}/></span><span className={styles.discardEyebrow}>UNSAVED CHANGES</span><h2 id="admin-discard-title">Leave without saving?</h2><p id="admin-discard-description">You have changes that haven’t been saved. Keep editing to finish your work, or discard them to continue.</p><div className={styles.discardNote}>Your changes will be lost if you leave.</div></div>
    <div className={styles.discardActions}><AdminButton variant="secondary" data-keep-editing onClick={() => finish(false)}>Keep editing</AdminButton><AdminButton variant="danger" onClick={() => finish(true)}>Discard changes<ArrowRight size={16}/></AdminButton></div>
  </dialog> : null;
}
