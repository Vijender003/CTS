import { CASES } from "../data/content";
import CaseCard from "../components/cards/CaseCard";
import SectionHead from "../components/ui/SectionHead";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import styles from "./CasesHome.module.css";

const FEATURED = ["docura", "tap-health", "unicrete", "aileron-travels"];

export default function CasesHome() {
  const items = FEATURED.map((s) => CASES.find((c) => c.slug === s));
  return (
    <section className="section" aria-label="Featured case studies" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHead
          kicker="Case studies"
          title={<>Proof, <em>not promises.</em></>}
          lede="Client, industry, challenge, solution, result — every study follows the same honest template."
        />
        <div className={styles.grid}>
          {items.map((c, i) => <CaseCard key={c.slug} c={c} delay={Math.min(i, 2)} featured={i === 0} index={String(i + 1).padStart(2, "0")} />)}
        </div>
        <Reveal><div style={{ marginTop: 40 }}><Button to="/case-studies" variant="ghost">All case studies</Button></div></Reveal>
      </div>
    </section>
  );
}
