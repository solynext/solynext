/* eslint-disable @next/next/no-img-element */
import type { AdInput } from "@/lib/ads/model";
import { safeAdUrl } from "@/lib/ads/model";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import type { CSSProperties } from "react";
import { readableAdColors } from "@/lib/ads/colors";
import styles from "./ads.module.css";
export function AdBlock({ ad, preview = false, onDismiss }: { ad: AdInput; preview?: boolean; onDismiss?: () => void }) {
  const colors = readableAdColors("#f2f4f7", "#171d23");
  const palette = { backgroundColor: colors.background, color: colors.foreground, "--ad-background": colors.background, "--ad-foreground": colors.foreground } as CSSProperties;
  return <aside aria-label={ad.label || "Advertisement"} className={`${styles.ad} ${styles[ad.layout]}`} style={palette}>
    {(onDismiss || preview) && <button type="button" className={styles.close} onClick={onDismiss} disabled={preview} aria-label={`Dismiss advertisement: ${ad.title}`}><X size={18}/></button>}
    {!ad.image && <span className={styles.emblem} aria-hidden="true"><Sparkles size={25} strokeWidth={1.5}/></span>}
    {ad.image && safeAdUrl(ad.image) && <img className={styles.image} src={ad.image} alt="" loading="lazy" referrerPolicy="no-referrer"/>}
    <div className={styles.copy}><span className={styles.label}>{ad.label || "Advertisement"}</span><h2>{ad.title}</h2>{ad.description && <p>{ad.description}</p>}</div>
    {ad.button && (preview ? <span className={styles.cta}>{ad.button}<ArrowUpRight size={17}/></span> : safeAdUrl(ad.url) ? <a className={styles.cta} href={ad.url} target="_blank" rel="noopener noreferrer" aria-label={`${ad.button} (opens in a new tab)`}>{ad.button}<ArrowUpRight size={17}/></a> : null)}
  </aside>;
}
