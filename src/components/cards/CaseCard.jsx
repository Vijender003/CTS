import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import styles from "./CaseCard.module.css";

/* Numbered brutalist case module — home grid, listing, related rows. */
export default function CaseCard({ c, delay = 0, featured = false, index }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/case-studies/${c.slug}`} className={`${styles.card} ${featured ? styles.featured : ""}`}>
        <div className={styles.top}>
          <span className={styles.num} aria-hidden="true">{index || c.category.slice(0, 2).toUpperCase()}</span>
          <span className={styles.ind}>{c.industry}</span>
        </div>
        <h3 className="display">{c.client}</h3>
        <p className={styles.challenge}>{c.challenge}</p>
        <div className={styles.metric}>
          <strong>{c.metric}</strong><span>{c.metricLabel}</span>
        </div>
        <span className={styles.go}>Read case study<ArrowUpRight size={16} aria-hidden="true" /></span>
      </Link>
    </Reveal>
  );
}
