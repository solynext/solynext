"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { WebsiteAd } from "@/lib/ads/model";
import { AD_REAPPEAR_DELAY, nextAdSection } from "@/lib/ads/placement";
import { AdBlock } from "./AdBlock";
import styles from "./ads.module.css";

type Slot = { node: HTMLDivElement; card: boolean; section: Element; anchor: Element };
type PageAds = { ads: WebsiteAd[]; slots: Slot[] };

/** Only add portal hosts between content blocks, never inside a card or form. */
function buildSlots(main: HTMLElement): Slot[] {
  const heading = main.querySelector("h1");
  if (!heading) return [];
  const hero = heading.closest(".premium-hero, .internal-heading, .section-header, [data-ad-hero]")
    ?? heading.closest("section") ?? heading;
  const anchors = new Map<Element, boolean>([[hero, false]]);
  main.querySelectorAll("section").forEach(section => {
    if (!section.contains(hero) && !hero.contains(section) && !section.closest("form, [data-ad-slot]") && !section.parentElement?.closest("section")) anchors.set(section, false);
  });
  main.querySelectorAll("div").forEach(grid => {
    if (grid.closest("form, [data-ad-slot]") || !getComputedStyle(grid).display.includes("grid")) return;
    const cards = Array.from(grid.children).filter(child => child.matches("article, a"));
    if (cards.length < 2) return;
    // A card-sized placement belongs after a complete group of cards.
    const firstRowTop = cards[0].getBoundingClientRect().top;
    const columns = cards.filter(card => Math.abs(card.getBoundingClientRect().top - firstRowTop) < 2).length;
    anchors.set(cards[Math.max(0, columns - 1)], true);
    anchors.set(grid, false);
  });
  // Pages with simple content blocks also get a later placement.
  const container = hero.parentElement;
  if (container) Array.from(container.children).forEach(child => {
    if (child !== hero && child.matches("div, section, article") && !child.hasAttribute("data-ad-slot") && !child.contains(hero) && !child.closest("form") && child.querySelector("h2")) anchors.set(child, false);
  });
  const ordered = Array.from(anchors).filter(([anchor]) => anchor === hero || (!hero.contains(anchor) && Boolean(hero.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING)))
    .sort(([a], [b]) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  const slots = ordered.map(([anchor, card]) => {
    const node = document.createElement("div");
    node.setAttribute("data-ad-slot", "");
    node.className = card ? styles.cardSlot : styles.sectionSlot;
    anchor.after(node);
    return { node, card, anchor, section: anchor.closest("section") ?? (card ? anchor.parentElement! : anchor) };
  });
  if (slots.length < 2) {
    const node = document.createElement("div");
    node.setAttribute("data-ad-slot", ""); node.className = styles.sectionSlot;
    main.append(node); slots.push({ node, card: false, section: main, anchor: main });
  }
  return slots.sort((a, b) => a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
}

export function PublicAds() {
  const [page, setPage] = useState<PageAds>({ ads: [], slots: [] });
  const [positions, setPositions] = useState<Record<string, Element | null>>({});
  const currentPage = useRef<PageAds>({ ads: [], slots: [] });
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  useEffect(() => {
    const activeTimers = timers.current;
    return () => { activeTimers.forEach(clearTimeout); activeTimers.clear(); };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let slots: Slot[] = [];
    let observer: MutationObserver | undefined;
    let sizing: ResizeObserver | undefined;
    let frame = 0;
    fetch("/api/ads", { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() : { ads: [] })
      .then(data => {
        if (controller.signal.aborted) return;
        const pathname = window.location.pathname;
        const ads = (data.ads as WebsiteAd[] ?? []).filter(ad => ad.page === "*" || ad.page === pathname || (ad.page !== "/" && pathname.startsWith(`${ad.page}/`)));
        if (!ads.length) return;
        const refresh = () => {
          const main = document.querySelector<HTMLElement>("main#main-content, main");
          if (!main || controller.signal.aborted) return;
          // Rebuild only if page content removed a host (e.g. a filtered card).
          if (slots.length && slots.every(slot => slot.node.isConnected)) return;
          sizing?.disconnect();
          slots.forEach(slot => slot.node.remove());
          slots = buildSlots(main);
          const fitCards = () => {
            slots.filter(slot => slot.card).forEach(slot => {
              const siblings = Array.from(slot.node.parentElement?.children ?? []).filter(child => child.matches("article, a"));
              const heights = siblings.map(card => card.getBoundingClientRect().height).filter(height => height > 0).sort((a, b) => a - b);
              if (heights.length) slot.node.style.setProperty("--ad-card-height", `${heights[Math.floor(heights.length / 2)]}px`);
            });
          };
          fitCards();
          sizing = new ResizeObserver(fitCards);
          slots.filter(slot => slot.card).forEach(slot => {
            Array.from(slot.node.parentElement?.children ?? []).filter(child => child.matches("article, a")).forEach(card => sizing?.observe(card));
          });
          currentPage.current = { ads, slots };
          setPage({ ads, slots });
        };
        refresh();
        observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(refresh); });
        observer.observe(document.body, { childList: true, subtree: true });
      }).catch(() => {});
    return () => { controller.abort(); observer?.disconnect(); sizing?.disconnect(); cancelAnimationFrame(frame); slots.forEach(slot => slot.node.remove()); };
  }, []);
  return <>{page.slots.map((slot, index) => {
    const ads = page.ads.filter(ad => positions[ad.id] === undefined
      ? (ad.placement === "bottom" ? Math.min(2, page.slots.length - 1) : 0) === index
      : positions[ad.id] === slot.anchor);
    return ads.length ? createPortal(<div className={styles.slotContent}>{ads.map(ad => <AdBlock key={ad.id} ad={{ ...ad, layout: slot.card ? "card" : "banner" }} onDismiss={() => {
      clearTimeout(timers.current.get(ad.id));
      setPositions(previous => ({ ...previous, [ad.id]: null }));
      const next = nextAdSection(page.slots.map(candidate => candidate.section), index);
      if (next < 0) return;
      const targetSection = page.slots[next].section;
      timers.current.set(ad.id, setTimeout(() => {
        timers.current.delete(ad.id);
        const target = currentPage.current.slots.find(candidate => candidate.section === targetSection && candidate.node.isConnected);
        if (target) setPositions(previous => ({ ...previous, [ad.id]: target.anchor }));
      }, AD_REAPPEAR_DELAY));
    }}/>)}</div>, slot.node, String(index)) : null;
  })}</>;
}
