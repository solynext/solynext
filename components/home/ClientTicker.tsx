import Link from "next/link";
import { ArrowRight, Store, Shirt, Wrench, ShoppingBasket, Coffee, Building2 } from "lucide-react";
import styles from "./ClientTicker.module.css";

const businesses = [
  { name: "Al Madina Traders", category: "Wholesale & Retail", Mark: Store },
  { name: "Noor Boutique", category: "Fashion & Clothing", Mark: Shirt },
  { name: "Pak Auto Parts", category: "Automotive", Mark: Wrench },
  { name: "Fresh Basket", category: "Grocery & Mart", Mark: ShoppingBasket },
  { name: "Urban Chai", category: "Café & Restaurant", Mark: Coffee },
  { name: "Prime Property Hub", category: "Real Estate", Mark: Building2 },
];

export function ClientTicker() {
  return <section className={styles.section} aria-labelledby="client-ticker-title">
    <div className={`premium-container ${styles.layout}`}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>SELECTED CLIENTS</span>
        <h2 id="client-ticker-title" className={styles.title}>Built on <span>trust.</span></h2>
        <Link href="/portfolio" className={styles.workLink}>Explore the work <ArrowRight size={20} aria-hidden="true" /></Link>
      </div>
      <div className={styles.visual}>
        <div className={styles.orbits} aria-hidden="true"><i /><i /><i /><b /><b /></div>
        <ul className={styles.cards}>
          {businesses.map(({ name, category, Mark }, index) => <li key={name} className={styles.card} data-tone={index}>
            <div className={styles.wordmark}>
              <span className={styles.cardNumber} aria-hidden="true">0{index + 1}</span>
              <span className={styles.logoMark} aria-hidden="true"><Mark size={28} strokeWidth={1.8}/></span>
              <strong>{name}</strong>
              <small>{category}</small>
            </div>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
