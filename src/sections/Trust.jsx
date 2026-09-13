import { TRUST } from "../data/content";
import Reveal from "../components/ui/Reveal";
import styles from "./Trust.module.css";

export default function Trust() {
  return (
    <section className={styles.trust} aria-label="Authority and recognition">
      <div className="container">
        <Reveal><p className="kicker">{TRUST.kicker}</p></Reveal>
        <Reveal delay={1}><h2 className={`display ${styles.title}`}>{TRUST.title}</h2></Reveal>
        <ul className={styles.list}>
          {TRUST.items.map((t, i) => (
            <Reveal as="li" key={t} delay={Math.min(i % 3, 2)} className={styles.item}>
              <span className={styles.n} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {t}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
