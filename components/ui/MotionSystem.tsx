"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains visible without JavaScript. */
export function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const selector = ".hero-copy, .product-visual, .p-section-heading, .premium-service, .premium-project, .premium-process article, .about-principles article, .premium-quote blockquote, .internal-heading, .internal-service, .portfolio-project, .contact-form-panel, .section-header, .capability-card, .engagement-card, .insight-card, .deliverable-item, .partnership-capability";
    const reveal = (element: Element) => {
      if (seen.has(element) || preference.matches) return;
      seen.add(element);
      const siblings = Array.from(element.parentElement?.children ?? []);
      const delay = Math.min(siblings.indexOf(element), 3) * 65;
      const animation = element.animate(
        [{ opacity: 0, transform: "translateY(22px) scale(.985)" }, { opacity: 1, transform: "none" }],
        { duration: 650, delay, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const scan = () => {
      if (preference.matches) return;
      document.querySelectorAll(selector).forEach((element) => {
        if (seen.has(element)) return;
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) reveal(element);
        else observer?.observe(element);
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    scan();
    const mutations = new MutationObserver(scan);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    const simplify = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
        observer?.disconnect();
      } else scan();
    };
    preference.addEventListener("change", simplify);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", simplify);
    };
  }, [pathname]);

  return null;
}
