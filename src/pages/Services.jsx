import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import FinalCta from "../sections/FinalCta";
import styles from "./Services.module.css";

const GROUPS = ["Zoho", "Growth", "Digital"];

export default function Services() {
  useSeo({ title: "Services", description: "Zoho implementation, growth and digital services: Zoho One, CRM, Books, Creator, Desk, Bigin, performance marketing, fractional CMO, websites and applications.", path: "/services" });
  return (
    <main>
      <PageHero kicker="Services" title={<>Everything revenue <em>runs on.</em></>} lede="Zoho, growth and digital — eleven services, one connected system. Open any service for problem, solution, capabilities, process, proof and FAQs." />
      <section className="section"><div className="container">
        {GROUPS.map((g) => (
          <div key={g} className={styles.group}>
            <Reveal><h2 className={`display ${styles.g}`}>{g}</h2></Reveal>
            <div className={styles.grid}>
              {SERVICES.filter((s) => s.group === g).map((s, i) => (
                <Reveal key={s.slug} delay={Math.min(i % 3, 2)}>
                  <Link to={`/services/${s.slug}`} className={styles.card}>
                    <span className={styles.n} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.name}</h3>
                    <p>{s.value}</p>
                    <span className={styles.go}>Learn More<ArrowUpRight size={15} aria-hidden="true" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div></section>
      <FinalCta />
    </main>
  );
}
