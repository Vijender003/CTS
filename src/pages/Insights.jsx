import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { INSIGHT_CATS, INSIGHTS } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import FinalCta from "../sections/FinalCta";
import styles from "./Insights.module.css";

export default function Insights() {
  useSeo({ title: "Insights & Strategies", description: "Essays on operations, automation, CRM, AI and growth — written by CTS operators.", path: "/insights" });
  const [cat, setCat] = useState("All");
  const [feat, ...rest] = INSIGHTS;
  const list = (cat === "All" ? rest : INSIGHTS.filter((a) => a.category === cat && a.slug !== feat.slug));

  return (
    <main>
      <PageHero kicker="Insights & Strategies" title={<>Thinking that <em>compounds.</em></>} lede="One featured essay, supporting pieces and category navigation — written by operators, not observers." />
      <section className="section"><div className="container">
        <div className={styles.cats} role="group" aria-label="Filter by category">
          {["All", ...INSIGHT_CATS].map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={cat === c ? styles.on : ""}>{c}</button>
          ))}
        </div>
        {cat === "All" && (
          <Reveal><Link to={`/insights/${feat.slug}`} className={styles.feat}>
            <span>{feat.category} · Featured</span>
            <h2 className="display">{feat.title}</h2>
            <p>{feat.excerpt}</p>
          </Link></Reveal>
        )}
        <div className={styles.grid}>
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={Math.min(i % 3, 2)}>
              <Link to={`/insights/${a.slug}`} className={styles.card}>
                <span>{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <em>Read essay<ArrowUpRight size={14} aria-hidden="true" /></em>
              </Link>
            </Reveal>
          ))}
        </div>
      </div></section>
      <FinalCta />
    </main>
  );
}
