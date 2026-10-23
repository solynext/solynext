import Link from "next/link";
import { ArrowRight, Store, Shirt, Wrench, ShoppingBasket, Coffee, Building2 } from "lucide-react";
import styles from "./ClientTicker.module.css";

const marks = { Store, Shirt, Wrench, ShoppingBasket, Coffee, Building2 };

export function ClientTicker({ clients }: { clients: { id: string; title: string; category: string; icon?: string }[] }) {
  if (!clients.length) return null;
  return <section className={styles.section} aria-labelledby="client-ticker-title">
    <div className={`premium-container ${styles.layout}`}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>SELECTED CLIENTS</span>
        <h2 id="client-ticker-title" className={styles.title}>Built on <span>trust.</span></h2>
        <p className={styles.description}>We build lasting partnerships through thoughtful work, clear communication, and results that move businesses forward.</p>
        <Link href="/portfolio" className={styles.workLink}>Explore the work <ArrowRight size={20} aria-hidden="true" /></Link>
      </div>
      <div className={styles.visual}>
        <div className={styles.orbits} aria-hidden="true"><i /><i /><i /><b /><b /></div>
        <ul className={styles.cards}>
          {clients.slice(0, 6).map(({ id, title: name, category, icon }, index) => {
            const Mark = marks[icon as keyof typeof marks] ?? Store;
            return <li key={id} className={styles.card} data-tone={index}>
            <div className={styles.wordmark}>
              <span className={styles.logoMark} aria-hidden="true"><Mark size={28} strokeWidth={1.8}/></span>
              <strong>{name}</strong>
              <small>{category}</small>
            </div>
          </li>;
          })}
        </ul>
      </div>
    </div>
  </section>;
}
