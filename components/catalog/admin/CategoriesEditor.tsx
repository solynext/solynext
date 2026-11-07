"use client";

import { useState } from "react";
import { slugify, type ServiceCategory } from "@/lib/catalog/model";
import styles from "./Manager.module.css";

export function CategoriesEditor({
  initialItems, token, canDelete, onChange,
}: {
  initialItems: ServiceCategory[];
  token: string;
  canDelete: boolean;
  onChange: (items: ServiceCategory[]) => void;
}) {
  const [items, setItems] = useState(initialItems);
  const [current, setCurrent] = useState<ServiceCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function save(remove?: string) {
    if (!remove && !current) return;
    if (remove && !window.confirm("Delete this service category?")) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/services/categories${remove ? `/${remove}` : ""}`, {
        method: remove ? "DELETE" : creating ? "POST" : "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: remove ? undefined : JSON.stringify(current),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save the category.");
      setItems(data.items);
      onChange(data.items);
      setCurrent(null);
      setMessage(remove ? "Category deleted." : creating ? "Category created." : "Category updated.");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className={styles.categoryPanel}>
      <summary>Manage service categories</summary>
      <p>Manage the categories used by the Services admin. Move assigned services before deleting a category.</p>
      <button type="button" disabled={busy} onClick={() => {
        setCreating(true);
        setCurrent({ slug: "", name: "", display_order: items.length });
      }}>Add category</button>
      {message && <p role="status">{message}</p>}
      <div className={styles.categoryRows}>
        {items.map(item => (
          <div key={item.slug}>
            <strong>{item.name}</strong>
            <small>/{item.slug}</small>
            <button type="button" disabled={busy} onClick={() => { setCreating(false); setCurrent(item); }}>Edit</button>
            {canDelete && <button type="button" disabled={busy} onClick={() => void save(item.slug)}>Delete</button>}
          </div>
        ))}
      </div>
      {current && (
        <form className={styles.formGrid} onSubmit={event => { event.preventDefault(); void save(); }}>
          <label>Category name
            <input required maxLength={80} value={current.name}
              onChange={event => setCurrent({ ...current, name: event.target.value, ...(creating ? { slug: slugify(event.target.value) } : {}) })} />
          </label>
          {creating && <label>Category key
            <input required maxLength={60} value={current.slug}
              onChange={event => setCurrent({ ...current, slug: event.target.value })} />
          </label>}
          <label>Display order
            <input type="number" min={0} max={9999} required value={current.display_order}
              onChange={event => setCurrent({ ...current, display_order: Number(event.target.value) })} />
          </label>
          <div>
            <button disabled={busy} className={styles.primary}>{creating ? "Create category" : "Update category"}</button>
            <button type="button" disabled={busy} onClick={() => setCurrent(null)}>Cancel</button>
          </div>
        </form>
      )}
    </details>
  );
}
