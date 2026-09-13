import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CASES } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import CaseCard from "../components/cards/CaseCard";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import FinalCta from "../sections/FinalCta";
import styles from "./CaseDetail.module.css";

/* Template §25: client/industry/service → challenge → solution → execution → result → tech → CTA */
export default function CaseDetail() {
  const { slug } = useParams();
  const c = CASES.find((x) => x.slug === slug);
  useSeo(c ? { title: `${c.client} — Case Study`, description: `${c.client} (${c.industry}): ${c.result}.`, path: `/case-studies/${c.slug}` } : { title: "Case Study" });

  useEffect(() => {
    if (!c) return;
    const el = document.createElement("script");
    el.type = "application/ld+json"; el.id = "case-schema";
    el.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: `${c.client} — ${c.result}`, about: c.industry, author: { "@type": "Organization", name: "Cleanomatics Tech Solutions" } });
    document.head.appendChild(el);
    return () => document.getElementById("case-schema")?.remove();
  }, [c]);

  if (!c) return <Navigate to="/case-studies" replace />;
  const related = CASES.filter((x) => x.slug !== c.slug && x.category === c.category).slice(0, 2);

  const rows = [
    ["01 — Challenge", "What was broken?", c.challenge],
    ["02 — Solution", "What CTS implemented.", c.solution],
    ["03 — Execution", "How it was delivered.", "Scoped in a systems audit, delivered in phased sprints with training and documentation — then measured against the result below."],
    ["05 — Tech / System", "Relevant systems.", `${c.category} practice · ${c.industry} playbook · CTS delivery system`],
  ];

  return (
    <main>
      <PageHero kicker={`${c.client} · ${c.industry} · ${c.category}`} title={<>{c.client}: <em>{c.result}.</em></>} lede={c.challenge} />
      <section className="section"><div className="container">
        <Reveal className={styles.metric}>
          <div><strong>{c.metric}</strong><span>{c.metricLabel}</span></div>
          <p>{c.result}</p>
        </Reveal>
        {rows.map(([k, h, p], i) => (
          <Reveal key={k} className={styles.row}>
            <p className={styles.k}>{k}</p>
            <h2 className="display">{h}</h2>
            <p className={styles.p}>{p}</p>
          </Reveal>
        ))}
        <Reveal className={styles.row}>
          <p className={styles.k}>04 — Result</p>
          <h2 className="display">Large numerical <em>outcome.</em></h2>
          <p className={styles.res}>{c.result}</p>
        </Reveal>
        <Reveal><div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
          <Button to="/contact">Build your next growth system</Button>
          <Button to="/case-studies" variant="ghost">All case studies</Button>
        </div></Reveal>
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className="display">Related studies</h2>
            <div className={styles.grid}>{related.map((r, i) => <CaseCard key={r.slug} c={r} index={String(i + 1).padStart(2, "0")} />)}</div>
          </div>
        )}
      </div></section>
      <FinalCta />
    </main>
  );
}
