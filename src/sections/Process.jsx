import { PROCESS } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section className={styles.proc} aria-label="Transformation process">
      <div className="container">
        <SectionHead
          kicker="Process"
          title={<>From chaos to <em>compounding growth.</em></>}
          lede="Five movements, one direction. Scroll sideways on desktop — the timeline follows your hand."
        />
        <Reveal delay={1}>
          <ol className={styles.track}>
            {PROCESS.map((p) => (
              <li key={p.n} className={styles.step}>
                <span className={styles.n} aria-hidden="true">{p.n}</span>
                <h3 className="display">{p.name}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
