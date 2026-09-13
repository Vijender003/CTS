import { FOOTER } from "../data/content";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Magnetic from "../components/ui/Magnetic";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section className={`${styles.cta} grain`} aria-label="Book a consultation">
      <div className="container">
        <Reveal><p className={styles.kick}>Final CTA — one click to CTS</p></Reveal>
        <Reveal delay={1}><h2 className={`display ${styles.title}`}>{FOOTER.finalCta}</h2></Reveal>
        <Reveal delay={2} className={styles.row}>
          <Magnetic><Button to="/contact" variant="solid">Book a Free Consultation</Button></Magnetic>
          <Button to="/case-studies" variant="outlineLight">See the proof</Button>
        </Reveal>
        <Reveal delay={2}><p className={styles.note}>Free 30-minute consultation · Systems audit included · No obligations</p></Reveal>
      </div>
    </section>
  );
}
