"use client";

import { useId } from "react";
import { Search, X, ChevronDown, type LucideIcon } from "lucide-react";
import styles from "./admin.module.css";

export function AdminSearchInput({ value, onChange, label, placeholder = "Search records", autoFocus = false }: {
  value: string; onChange: (value: string) => void; label: string; placeholder?: string; autoFocus?: boolean;
}) {
  return <div className={styles.searchControl}>
    <Search size={17} aria-hidden="true"/>
    <input type="search" value={value} onChange={event => onChange(event.target.value)} aria-label={label} placeholder={placeholder} data-autofocus={autoFocus || undefined}/>
    {value && <button type="button" aria-label={`Clear ${label.toLowerCase()}`} onClick={event => {
      onChange("");
      event.currentTarget.parentElement?.querySelector("input")?.focus();
    }}><X size={15}/></button>}
  </div>;
}

export function AdminSelectControl({ value, onChange, label, icon: Icon, children }: {
  value: string; onChange: (value: string) => void; label: string; icon: LucideIcon; children: React.ReactNode;
}) {
  const id = useId();
  return <div className={styles.selectControl}>
    <label className={styles.srOnly} htmlFor={id}>{label}</label>
    <Icon size={16} aria-hidden="true"/>
    <select id={id} value={value} onChange={event => onChange(event.target.value)}>{children}</select>
    <ChevronDown size={14} aria-hidden="true"/>
  </div>;
}
