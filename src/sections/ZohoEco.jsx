import { Link } from "react-router-dom";
import { ZOHO } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import styles from "./ZohoEco.module.css";

export default function ZohoEco() {
  return (
    <section className="section" aria-label="Zoho ecosystem" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead kicker={ZOHO.kicker} title={<>One connected <em>operating system</em> for your business.</>} lede={ZOHO.lede} />
        <div className={styles.grid}>
          {ZOHO.apps.map((a, i) => (
            <Reveal key={a} delay={Math.min(i % 4, 2)} className={`${styles.app} ${i === 0 ? styles.core : ""}`}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <strong>{a}</strong>
            </Reveal>
          ))}
        </div>
        <Reveal delay={1} className={styles.tags} aria-label="Industries served by the Zoho practice">
          {ZOHO.industries.map((t) => <Link key={t} to="/case-studies">{t}</Link>)}
        </Reveal>
      </div>
    </section>
  );
}
