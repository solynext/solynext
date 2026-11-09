"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, X } from "lucide-react";
import styles from "./PartnershipSection.module.css";

export function PartnershipAreaPopover({ title, subtitle, icon, children }: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !area.current?.contains(event.target)) setOpen(false);
    };

    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);

  const close = () => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  return (
    <div
      className={styles.areaAnchor}
      ref={area}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={event => {
        if (open && event.key === "Escape") {
          event.stopPropagation();
          close();
        }
      }}
    >
      <button
        type="button"
        className={styles.areaPanel}
        ref={trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(value => !value)}
      >
        <span className={styles.icon}>{icon}</span>
        <span className={styles.areaLabel}>
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <div className={styles.areaPopover} id={id} hidden={!open}>
        <header className={styles.popoverHeader}>
          <h4>{title}</h4>
          <button type="button" className={styles.popoverClose} aria-label={`Close ${title} details`} onClick={close}>
            <X size={16} aria-hidden="true" />
          </button>
        </header>
        <div className={styles.areaContent}>{children}</div>
      </div>
    </div>
  );
}
