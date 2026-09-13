import { RESULTS } from "../data/content";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Results.module.css";

export default function Results() {
  return (
    <section className={styles.results} aria-label="Results in numbers">
      <span className={styles.ghost} aria-hidden="true">PROOF</span>
      <div className="container">
        <SectionHead dark kicker={RESULTS.kicker} title={RESULTS.title} lede="Numbers are the receipt. Every engagement is measured against pipeline, revenue, or recovery — never vanity metrics." />
        <dl className={styles.grid}>
          {RESULTS.stats.map((s, i) => (
            <Reveal as="div" key={s.label} delay={Math.min(i, 3)} className={styles.stat}>
              <span className={styles.rank} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <dt><Counter value={s.value} suffix={s.suffix} /></dt>
              <dd>{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
