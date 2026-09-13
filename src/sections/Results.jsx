import { RESULTS } from "../data/content";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import styles from "./Results.module.css";

export default function Results() {
  return (
    <section className={styles.results} aria-label="Results in numbers">
      <div className="container">
        <Reveal><p className={`kicker ${styles.k}`}>{RESULTS.kicker}</p></Reveal>
        <Reveal delay={1}><h2 className={`display ${styles.title}`}>{RESULTS.title}</h2></Reveal>
        <dl className={styles.grid}>
          {RESULTS.stats.map((s, i) => (
            <Reveal as="div" key={s.label} delay={Math.min(i, 3)} className={styles.stat}>
              <dt><Counter value={s.value} suffix={s.suffix} /></dt>
              <dd>{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
