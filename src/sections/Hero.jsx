import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { HERO } from "../data/content";
import { useReducedMotion } from "../hooks/useReveal";
import { heroEnter, ensureGsap } from "../animations/motion";
import Button from "../components/ui/Button";
import Counter from "../components/ui/Counter";
import Magnetic from "../components/ui/Magnetic";
import styles from "./Hero.module.css";

const NODES = [
  { label: "CRM", x: 90, y: 60 }, { label: "Marketing", x: 310, y: 30 },
  { label: "Sales", x: 310, y: 150 }, { label: "Finance", x: 90, y: 180 },
];

function EcoVisual() {
  return (
    <svg viewBox="0 0 400 230" className={styles.svg} role="img" aria-label="Connected revenue ecosystem: CRM, marketing, sales and finance flowing into revenue intelligence">
      {NODES.map((n) => (
        <line key={n.label} x1={n.x} y1={n.y} x2="200" y2="115" className={styles.flow} />
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 52} y={n.y - 19} width="104" height="38" className={styles.node} />
          <text x={n.x} y={n.y + 5} textAnchor="middle" className={styles.nodeT}>{n.label}</text>
        </g>
      ))}
      <rect x="148" y="63" width="104" height="104" className={styles.core} />
      <text x="200" y="110" textAnchor="middle" className={styles.coreT}>Revenue</text>
      <text x="200" y="128" textAnchor="middle" className={styles.coreT}>Intelligence</text>
    </svg>
  );
}

export default function Hero() {
  const scope = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (reduced) return;
    const cleanEnter = heroEnter(scope);
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.to("[data-hero='visual']", {
        y: 70, ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, scope);
    return () => { cleanEnter(); ctx.revert(); };
  }, { scope, dependencies: [reduced] });

  const parallax = (e) => {
    if (reduced) return;
    const el = scope.current?.querySelector("[data-hero='visual']");
    if (!el) return;
    const r = scope.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translate(${x * -14}px, ${y * -10}px)`;
  };

  return (
    <section className={styles.hero} onMouseMove={parallax} aria-label="Introduction">
      <div data-hero="backdrop" className={styles.bg} aria-hidden="true" />
      <div className="container" ref={scope}>
        <div className={styles.top}>
          <p data-hero="eyebrow" className={styles.eyebrow}>
            <span className={styles.tag} aria-hidden="true">SYS / 001</span>{HERO.eyebrow}
          </p>
          <p data-hero="eyebrow" className={styles.side} aria-hidden="true">Scroll to explore ↓</p>
        </div>

        <h1 className={styles.title}>
          <span data-hero="line" className={styles.line}><span>{HERO.titleA}</span></span>
          <span data-hero="line" className={styles.line}><span><em>{HERO.titleB}</em></span></span>
        </h1>

        <div className={styles.sub}>
          <div>
            <p data-hero="lede" className={styles.lede}>{HERO.lede}</p>
            <div className={styles.ctas}>
              <span data-hero="cta"><Magnetic><Button to={HERO.primaryCta.to}>{HERO.primaryCta.label}</Button></Magnetic></span>
              <span data-hero="cta"><Button to={HERO.secondaryCta.to} variant="ghost">{HERO.secondaryCta.label}</Button></span>
            </div>
          </div>
          <figure className={styles.visual} data-hero="visual">
            <figcaption><span>FIG. 01 — Revenue system</span><span className={styles.live}><i />Live diagram</span></figcaption>
            <EcoVisual />
            <div className={styles.vfoot}><span>CRM → MKT → Sales → Finance</span><span>CTS / OS</span></div>
          </figure>
        </div>

        <dl className={styles.stats}>
          {HERO.stats.map((s, i) => (
            <div data-hero="meta" key={s.label} className={styles.stat}>
              <span className={styles.sIdx} aria-hidden="true">0{i + 1}</span>
              <dt><Counter value={s.value} suffix={s.suffix} /></dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
