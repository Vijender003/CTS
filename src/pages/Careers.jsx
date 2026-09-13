import { useState } from "react";
import { Check, Send } from "lucide-react";
import { CAREERS } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import SectionHead from "../components/ui/SectionHead";
import Reveal from "../components/ui/Reveal";
import FinalCta from "../sections/FinalCta";
import f from "../components/forms/fields.module.css";
import styles from "./Careers.module.css";

export default function Careers() {
  useSeo({ title: "Careers", description: "Life at CTS: culture, values, benefits, open positions and the talent community.", path: "/careers" });
  const [sent, setSent] = useState(!!localStorage.getItem("cts_talent"));
  const [form, setForm] = useState({ name: "", email: "", interest: "", note: "" });
  const [errs, setErrs] = useState({});

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrs((p) => ({ ...p, [k]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    setErrs(next);
    if (Object.keys(next).length) {
      document.getElementById(next.name ? "t-name" : "t-email")?.focus();
      return;
    }
    localStorage.setItem("cts_talent", JSON.stringify({ ...form, at: Date.now() }));
    setSent(true);
  };

  return (
    <main>
      <PageHero kicker="Careers" title={<>{CAREERS.title}</>} lede={CAREERS.lede} />
      <section className="section"><div className="container">
        <SectionHead kicker="Values" title={<>What we <em>optimize for.</em></>} />
        <div className={styles.values}>
          {CAREERS.values.map((v, i) => <Reveal key={v.name} delay={Math.min(i, 3)} className={styles.val}><span>{String(i + 1).padStart(2, "0")}</span><h3>{v.name}</h3><p>{v.desc}</p></Reveal>)}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <SectionHead kicker="Benefits" title={<>Built for <em>builders.</em></>} />
        <ul className={styles.benefits}>{CAREERS.benefits.map((b) => <Reveal as="li" key={b}><Check size={16} aria-hidden="true" />{b}</Reveal>)}</ul>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className={styles.split}>
          <div>
            <SectionHead kicker="Open positions" title={<>No open roles <em>right now.</em></>} align="stack"
              lede="We hire deliberately and in small numbers. When a role opens, it appears here — meanwhile the talent community is the fastest way in." />
          </div>
          <Reveal delay={1} className={styles.formCard}>
            {sent ? (
              <div className={styles.done}><Check size={28} aria-hidden="true" /><h3>You're in the community.</h3><p>We'll reach out when there's a fit. Thank you for thinking of CTS.</p></div>
            ) : (
              <form onSubmit={submit} aria-label="Talent community">
                <p className={styles.fT}>Join the talent community</p>
                <div className={f.field}><label htmlFor="t-name">Name *</label><input id="t-name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <p className={f.err}>{errs.name}</p>}</div>
                <div className={f.field}><label htmlFor="t-email">Email *</label><input id="t-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <p className={f.err}>{errs.email}</p>}</div>
                <div className={f.field}><label htmlFor="t-int">Area of interest</label>
                  <select id="t-int" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                    <option value="">Select…</option><option>Zoho Consulting</option><option>Engineering</option><option>Design</option><option>Performance Marketing</option><option>Operations</option>
                  </select>
                </div>
                <button type="submit" className={styles.submit}>Introduce yourself<Send size={15} aria-hidden="true" /></button>
              </form>
            )}
          </Reveal>
        </div>
      </div></section>
      <FinalCta />
    </main>
  );
}
