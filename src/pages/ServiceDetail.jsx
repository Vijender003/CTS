import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { SERVICES, CASES, PROCESS } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Accordion from "../components/ui/Accordion";
import Button from "../components/ui/Button";
import CaseCard from "../components/cards/CaseCard";
import FinalCta from "../sections/FinalCta";
import styles from "./ServiceDetail.module.css";

/* Template §24: Hero / Problem / Solution / Capabilities / How It Works / Proof / FAQ / CTA */
export default function ServiceDetail() {
  const { slug } = useParams();
  const svc = SERVICES.find((s) => s.slug === slug);
  useSeo(svc ? { title: svc.name, description: svc.value, path: `/services/${svc.slug}` } : { title: "Service" });

  useEffect(() => {
    if (!svc) return;
    const el = document.createElement("script");
    el.type = "application/ld+json"; el.id = "svc-schema";
    el.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: svc.name, description: svc.value, provider: { "@type": "Organization", name: "Cleanomatics Tech Solutions" } });
    document.head.appendChild(el);
    return () => document.getElementById("svc-schema")?.remove();
  }, [svc]);

  if (!svc) return <Navigate to="/services" replace />;
  const proof = CASES.filter((c) => svc.proof.includes(c.client));

  return (
    <main>
      <PageHero kicker={`${svc.group} · Service`} title={<>{svc.tagline}</>} lede={svc.value} meta={svc.timeline || `${svc.group} practice · CTS`} />

      <section className="section"><div className="container">
        <div className={styles.two}>
          <div>
            <SectionHead kicker="01 — Problem" title={<>What is <em>broken?</em></>} align="stack"
              lede="Fragmented tools, manual follow-ups and scattered data — the same tax this service exists to remove." />
          </div>
          <div>
            <SectionHead kicker="02 — Solution" title={<>What CTS <em>implements.</em></>} align="stack" lede={svc.value} />
          </div>
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <SectionHead kicker="03 — Capabilities" title={<>What is <em>included.</em></>} />
        <ul className={styles.caps}>
          {svc.capabilities.map((c, i) => <Reveal as="li" key={c} delay={Math.min(i % 4, 2)}><Check size={17} aria-hidden="true" />{c}</Reveal>)}
        </ul>
      </div></section>

      <section className={styles.how}><div className="container">
        <SectionHead kicker="04 — How it works" title={<>Delivered in <em>five moves.</em></>} />
        <ol className={styles.steps}>
          {PROCESS.map((p) => <Reveal as="li" key={p.n}><strong>{p.n}</strong><h3>{p.name}</h3><p>{p.desc}</p></Reveal>)}
        </ol>
      </div></section>

      {proof.length > 0 && (
        <section className="section"><div className="container">
          <SectionHead kicker="05 — Results / Proof" title={<>Proven <em>in the field.</em></>} />
          <div className={styles.proof}>{proof.map((c, i) => <CaseCard key={c.slug} c={c} delay={Math.min(i, 2)} index={String(i + 1).padStart(2, "0")} />)}</div>
        </div></section>
      )}

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <SectionHead kicker="06 — FAQ" title={<>Questions, <em>answered.</em></>} />
        <Accordion items={svc.faqs} />
        <Reveal><div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Button to="/contact">Book a Free Consultation</Button>
          <Button to="/services" variant="ghost">All services</Button>
        </div></Reveal>
      </div></section>

      <FinalCta />
    </main>
  );
}
