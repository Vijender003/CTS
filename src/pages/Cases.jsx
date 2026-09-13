import { useState } from "react";
import { CASE_FILTERS, CASES } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import CaseCard from "../components/cards/CaseCard";
import Reveal from "../components/ui/Reveal";
import FinalCta from "../sections/FinalCta";
import styles from "./Cases.module.css";

export default function Cases() {
  useSeo({ title: "Case Studies", description: "Client, industry, challenge, solution, result — CTS case studies across Zoho, marketing, technology and automation.", path: "/case-studies" });
  const [f, setF] = useState("All");
  const items = CASES.filter((c) => f === "All" || c.category === f);

  return (
    <main>
      <PageHero kicker="Case Studies" title={<>Proof, <em>not promises.</em></>} lede="Twelve engagements. Same honest template every time: client, industry, challenge, solution, result." />
      <section className="section"><div className="container">
        <div className={styles.filters} role="group" aria-label="Filter case studies">
          {CASE_FILTERS.map((x) => (
            <button key={x} className={`${styles.chip} ${f === x ? styles.on : ""}`}
              aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>
          ))}
        </div>
        <p className={styles.count} aria-live="polite">Showing {items.length} of {CASES.length}</p>
        {items.length > 0 ? (
          <div className={styles.grid}>{items.map((c, i) => <CaseCard key={c.slug} c={c} delay={Math.min(i % 3, 2)} index={String(i + 1).padStart(2, "0")} />)}</div>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary-ink/40 bg-white px-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">No studies in this filter yet.</p>
            <button onClick={() => setF("All")} className="mt-4 font-semibold text-primary-ink underline underline-offset-4">Reset filters</button>
          </div>
        )}
        <Reveal><p className={styles.note}>“Build your next growth system.” — every engagement above started with a free consultation.</p></Reveal>
      </div></section>
      <FinalCta />
    </main>
  );
}
