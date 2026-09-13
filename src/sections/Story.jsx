import { Link } from "react-router-dom";
import { STORY } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import Button from "../components/ui/Button";
import styles from "./Story.module.css";

export default function Story() {
  return (
    <section className="section" aria-label="Company story">
      <div className="container">
        <SectionHead kicker={STORY.kicker} title={<>Silicon Valley-backed. <em>Built for ambitious businesses.</em></>} lede={STORY.lede} />
        <div className={styles.cols}>
          <ol className={styles.timeline}>
            {STORY.timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={0} className={styles.tItem}>
                <span>{t.year}</span>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </ol>
          <div>
            <Reveal className={styles.panel}>
              <p className={styles.pT}>Leadership roots</p>
              <div className={styles.chips}>{STORY.schools.map((s) => <span key={s}>{s}</span>)}</div>
            </Reveal>
            <Reveal delay={1} className={styles.panel}>
              <p className={styles.pT}>Operators from brands like</p>
              <div className={styles.chips}>{STORY.brands.map((s) => <span key={s}>{s}</span>)}</div>
            </Reveal>
            <Reveal delay={2}><Button to="/about" variant="ghost">Our full story</Button></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
