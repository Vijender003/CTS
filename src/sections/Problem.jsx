import { X, Check } from "lucide-react";
import { PROBLEM } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <section className="section" aria-label="The business problem">
      <div className="container">
        <SectionHead kicker={PROBLEM.kicker} title={<>Fragmented tools. <em>Scattered data.</em> Stalled growth.</>} lede={PROBLEM.lede} />
        <div className={styles.panels}>
          <Reveal className={styles.before}>
            <p className={styles.pKick}>Before</p>
            <h3 className="display">{PROBLEM.before.title}</h3>
            <ul>{PROBLEM.before.items.map((i) => <li key={i}><X size={16} aria-hidden="true" />{i}</li>)}</ul>
          </Reveal>
          <Reveal delay={1} className={styles.arrow} aria-hidden="true">↓</Reveal>
          <Reveal delay={1} className={styles.after}>
            <p className={styles.pKick}>With CTS</p>
            <h3 className="display">{PROBLEM.after.title}</h3>
            <ul>{PROBLEM.after.items.map((i) => <li key={i}><Check size={16} aria-hidden="true" />{i}</li>)}</ul>
          </Reveal>
        </div>
        <Reveal delay={1}>
          <ul className={styles.systems} aria-label="Systems CTS connects">
            {PROBLEM.systems.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
