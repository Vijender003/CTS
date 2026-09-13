import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./Accordion.module.css";
import Reveal from "./Reveal";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.list}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={i} delay={Math.min(i, 2)}>
            <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
              <button
                className={styles.q} aria-expanded={isOpen} aria-controls={`acc-p-${i}`} id={`acc-b-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className={styles.icon} aria-hidden="true"><Plus size={18} /></span>
              </button>
              <div className={styles.aWrap} id={`acc-p-${i}`} role="region" aria-labelledby={`acc-b-${i}`}>
                <p className={styles.a}>{it.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
