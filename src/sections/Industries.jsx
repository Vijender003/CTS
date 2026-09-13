import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { INDUSTRIES } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Industries.module.css";

export default function Industries() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];
  return (
    <section className="section" aria-label="Industries" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead
          kicker="Industries"
          title={<>Fluent in <em>your world.</em></>}
          lede="Select an industry — see its typical challenges, the relevant services and the CTS solution pattern."
        />
        <div className={styles.grid}>
          <Reveal>
            <ul className={styles.list} role="tablist" aria-label="Industries">
              {INDUSTRIES.map((x, i) => (
                <li key={x.name} role="presentation">
                  <button
                    role="tab" aria-selected={active === i} aria-controls="ind-panel"
                    className={`${styles.tab} ${active === i ? styles.on : ""}`}
                    onClick={() => setActive(i)}
                  >
                    {x.name}<ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className={styles.panel} id="ind-panel" role="tabpanel">
            <p className={styles.name}>{ind.name}</p>
            <div className={styles.block}><h3>Typical challenges</h3><p>{ind.challenges}</p></div>
            <div className={styles.block}><h3>Relevant services</h3><p>{ind.services}</p></div>
            <div className={`${styles.block} ${styles.sol}`}><h3>Recommended CTS solution</h3><p>{ind.solution}</p></div>
            <Link to="/contact" className={styles.cta}>Discuss a {ind.name.toLowerCase()} project →</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
