import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { ROI_COPY } from "../data/content";
import { track, EVENTS } from "../lib/analytics";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import Button from "../components/ui/Button";
import styles from "./Roi.module.css";

const fmt = (n) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr`
  : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function Roi() {
  const [leads, setLeads] = useState(300);
  const [conv, setConv] = useState(4);
  const [deal, setDeal] = useState(80000);
  const [touched, setTouched] = useState(false);

  const out = useMemo(() => {
    const current = leads * (conv / 100) * deal;
    const improvedConv = Math.min(conv * 1.5, 25);
    const potential = leads * (improvedConv / 100) * deal;
    return { current, potential, uplift: potential - current, improvedConv };
  }, [leads, conv, deal]);

  const touch = () => { if (!touched) { setTouched(true); track(EVENTS.ROI_USE); } };

  const slider = (label, v, set, min, max, step, disp) => (
    <label className={styles.field}>
      <span className={styles.fTop}>{label}<strong>{disp}</strong></span>
      <input type="range" min={min} max={max} step={step} value={v}
        onChange={(e) => { touch(); set(Number(e.target.value)); }} aria-label={label} />
    </label>
  );

  return (
    <section className="section" aria-label="ROI estimator">
      <div className="container">
        <SectionHead kicker={ROI_COPY.kicker} title={<>Estimate <em>your upside.</em></>} lede={ROI_COPY.lede} />
        <div className={styles.grid}>
          <Reveal className={styles.inputs}>
            <p className={styles.paneT}><Calculator size={16} aria-hidden="true" />Your funnel today</p>
            {slider("Monthly leads", leads, setLeads, 20, 2000, 10, leads)}
            {slider("Conversion rate", conv, setConv, 1, 20, 0.5, `${conv}%`)}
            {slider("Average deal value", deal, setDeal, 10000, 1000000, 10000, fmt(deal))}
            <p className={styles.hint}>Model assumes connected follow-up lifts conversion up to 1.5× — directionally, based on recovery patterns like 90% lead recovery.</p>
          </Reveal>
          <Reveal delay={1} className={styles.outputs} aria-live="polite">
            <p className={styles.paneT}>Estimated opportunity</p>
            <div className={styles.big}><span>Potential monthly revenue</span><strong>{fmt(out.potential)}</strong></div>
            <div className={styles.row2}>
              <div><span>Current pace</span><strong>{fmt(out.current)}</strong></div>
              <div><span>Potential uplift</span><strong className={styles.gold}>+{fmt(out.uplift)}</strong></div>
            </div>
            <p className={styles.disc}>{ROI_COPY.disclaimer}</p>
            <Button to="/contact" variant="solid">Discuss my numbers</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
