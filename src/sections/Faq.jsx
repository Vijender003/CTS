import { useEffect } from "react";
import { FAQS } from "../data/content";
import Accordion from "../components/ui/Accordion";
import SectionHead from "../components/ui/SectionHead";
import styles from "./Faq.module.css";

export default function Faq() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    el.id = "faq-schema";
    document.head.appendChild(el);
    return () => document.getElementById("faq-schema")?.remove();
  }, []);

  return (
    <section className="section" aria-label="Frequently asked questions" style={{ paddingTop: 0 }}>
      <div className={`container ${styles.grid}`}>
        <div>
          <SectionHead kicker="FAQ" title={<>Asked, <em>answered.</em></>} lede="Straight answers on scope, timelines, industries and how engagements work." align="stack" />
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
