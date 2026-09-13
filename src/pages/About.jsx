import { Link } from "react-router-dom";
import { ABOUT, STORY, TRUST } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import FinalCta from "../sections/FinalCta";
import styles from "./About.module.css";

export default function About() {
  useSeo({ title: "About", description: "Silicon Valley-backed, born at UC Berkeley SkyDeck. The CTS story: leadership, expertise, awards and culture.", path: "/about" });
  return (
    <main>
      <PageHero kicker="About CTS" title={<>A consultancy with <em>a builder's hands.</em></>} lede={ABOUT.origin} meta="India + Global · 135+ companies · 90% retention" />

      <section className="section"><div className="container">
        <SectionHead kicker="Origin story" title={<>Born at <em>Berkeley SkyDeck.</em></>} lede="Backed by UC Berkeley SkyDeck, India Accelerator and MARL Accelerator — rigor from day one." />
        <ol className={styles.timeline}>
          {STORY.timeline.map((t) => (
            <Reveal as="li" key={t.year}><span>{t.year}</span><p>{t.text}</p></Reveal>
          ))}
        </ol>
      </div></section>

      <section className={`${styles.dark} grain`}><div className="container on-dark">
        <SectionHead dark kicker="Leadership" title={<>Operators, <em>not just advisors.</em></>} lede={ABOUT.leadership} />
        <div className={styles.brands}>{STORY.brands.map((b) => <Reveal key={b}><span>{b}</span></Reveal>)}</div>
        <Reveal><p className={styles.laundry}>Plus proprietary D2C laundry technology experience — we have run operations, not just advised them.</p></Reveal>
      </div></section>

      <section className="section"><div className="container">
        <SectionHead kicker="Awards & recognition" title={<>Recognized <em>where it counts.</em></>} />
        <ul className={styles.awards}>
          {TRUST.items.map((a, i) => <Reveal as="li" key={a} delay={Math.min(i % 3, 2)}><strong>{String(i + 1).padStart(2, "0")}</strong>{a}</Reveal>)}
        </ul>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <SectionHead kicker="Culture" title={<>How we <em>work.</em></>} />
        <ul className={styles.culture}>
          {ABOUT.culture.map((c, i) => <Reveal as="li" key={c} delay={Math.min(i, 2)}><span>{String(i + 1).padStart(2, "0")}</span>{c}</Reveal>)}
        </ul>
        <Reveal><div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Button to="/contact">Work with us</Button>
          <Button to="/careers" variant="ghost">Join the team</Button>
        </div></Reveal>
      </div></section>

      <FinalCta />
    </main>
  );
}
