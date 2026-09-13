import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import Button from "../components/ui/Button";
import styles from "./ServicesHome.module.css";

const GROUPS = ["Zoho", "Growth", "Digital"];

export default function ServicesHome() {
  return (
    <section className="section" aria-label="Services" id="services">
      <div className="container">
        <SectionHead
          kicker="Services"
          title={<>A premium <em>service ecosystem.</em></>}
          lede="Three groups, one system. Every service ships with a value proposition, a key capability and proof — hover to feel the hierarchy."
        />
        {GROUPS.map((g) => (
          <div key={g} className={styles.group}>
            <Reveal><p className={styles.gName}>{g}</p></Reveal>
            <ul>
              {SERVICES.filter((s) => s.group === g).map((s, i) => (
                <Reveal as="li" key={s.slug} delay={0}>
                  <Link to={`/services/${s.slug}`} className={styles.row}>
                    <span className={styles.idx} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.main}>
                      <strong>{s.name}</strong>
                      <small>{s.value}</small>
                      <em>Key capability — {s.capabilities[0]}</em>
                    </span>
                    <span className={styles.more}>Learn More<ArrowRight size={16} aria-hidden="true" /></span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
        <Reveal><div style={{ marginTop: 40 }}><Button to="/services" variant="ghost">View all services</Button></div></Reveal>
      </div>
    </section>
  );
}
