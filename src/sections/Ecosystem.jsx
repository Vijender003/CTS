import { SOLUTION } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Ecosystem.module.css";

export default function Ecosystem() {
  return (
    <section className={`${styles.eco} grain`} aria-label="Solution ecosystem">
      <div className="container on-dark">
        <SectionHead dark kicker={SOLUTION.kicker} title={<>One connected <em>growth ecosystem.</em></>} lede={SOLUTION.lede} />
        <ol className={styles.flows}>
          {SOLUTION.flows.map((f, i) => (
            <Reveal as="li" key={f.from} delay={Math.min(i, 2)} className={styles.flow}>
              <span className={styles.step} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.pair}>{f.from}<span aria-hidden="true"> → </span>{f.to}</p>
              <p className={styles.note}>{f.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
