import Reveal from "../ui/Reveal";
import styles from "./PageHero.module.css";

/* Shared dark editorial hero for inner pages. Keeps nav-over-hero contrast consistent. */
export default function PageHero({ kicker, title, lede, meta }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <Reveal><p className={`kicker ${styles.k}`}>{kicker}</p></Reveal>
        <Reveal delay={1}><h1 className={`display ${styles.title}`}>{title}</h1></Reveal>
        <Reveal delay={1}><div className={styles.rule} aria-hidden="true"><i /><i /><i /></div></Reveal>
        {lede && <Reveal delay={2}><p className={styles.lede}>{lede}</p></Reveal>}
        {meta && (
          <Reveal delay={2}>
            <div className={styles.metaRow}>
              {String(meta).split("·").map((m) => <span key={m.trim()}>{m.trim()}</span>)}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
