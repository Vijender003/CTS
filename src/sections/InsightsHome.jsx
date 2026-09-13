import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { INSIGHT_CATS, INSIGHTS } from "../data/content";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import Button from "../components/ui/Button";
import styles from "./InsightsHome.module.css";

export default function InsightsHome() {
  const [feat, ...rest] = INSIGHTS;
  return (
    <section className="section" aria-label="Insights and strategies" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead kicker="Insights & Strategies" title={<>Thinking that <em>compounds.</em></>} lede="Operations, automation, CRM, AI and growth — written by operators." />
        <div className={styles.cats} aria-label="Topics">
          {INSIGHT_CATS.map((c) => <span key={c}>{c}</span>)}
        </div>
        <div className={styles.grid}>
          <Reveal>
            <Link to={`/insights/${feat.slug}`} className={styles.feat}>
              <span className={styles.cat}>{feat.category}</span>
              <h3 className="display">{feat.title}</h3>
              <p>{feat.excerpt}</p>
              <span className={styles.go}>Read the essay<ArrowUpRight size={15} aria-hidden="true" /></span>
            </Link>
          </Reveal>
          <div className={styles.rest}>
            {rest.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i, 2)}>
                <Link to={`/insights/${a.slug}`} className={styles.row}>
                  <span className={styles.cat}>{a.category}</span>
                  <strong>{a.title}</strong>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal><div style={{ marginTop: 36 }}><Button to="/insights" variant="ghost">All insights</Button></div></Reveal>
      </div>
    </section>
  );
}
