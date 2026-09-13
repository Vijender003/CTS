import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Upload, CalendarCheck } from "lucide-react";
import { WIZARD, CONTACT_PHONE, CONTACT_EMAIL } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import { track, EVENTS } from "../lib/analytics";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import f from "../components/forms/fields.module.css";
import styles from "./Contact.module.css";

const STEPS = ["Your details", "Your needs", "Scope", "Project brief", "Schedule"];

const blank = { name: "", email: "", phone: "", company: "", needs: [], budget: "", timeline: "", requirements: "", details: null, date: "", slot: "" };

export default function Contact() {
  useSeo({ title: "Book a Free Consultation", description: "Start a project with CTS: a 5-step consultation experience — details, needs, scope, brief and scheduling.", path: "/contact" });
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => {
    try { return { ...blank, ...JSON.parse(localStorage.getItem("cts_contact") || "{}"), details: null }; }
    catch { return blank; }
  });
  const [errs, setErrs] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    try { const { details, ...rest } = form; localStorage.setItem("cts_contact", JSON.stringify(rest)); } catch {}
  }, [form]);

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrs((p) => ({ ...p, [k]: undefined })); };
  const toggleNeed = (n) => setForm((p) => ({ ...p, needs: p.needs.includes(n) ? p.needs.filter((x) => x !== n) : [...p.needs, n] }));

  const valid = useMemo(() => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Please share your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Enter a valid email.";
      if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    }
    if (step === 1 && form.needs.length === 0) e.needs = "Select at least one need.";
    if (step === 2 && !form.budget) e.budget = "Choose a budget range — “Not sure yet” is fine.";
    if (step === 3 && form.details?.trim().length < 20 && form.requirements.trim().length < 20)
      e.details = "Give us at least a sentence (20+ characters) so we come prepared.";
    if (step === 4 && !form.date) e.date = "Pick a preferred date.";
    return e;
  }, [step, form]);

  const next = () => {
    setErrs(valid);
    if (Object.keys(valid).length) {
      const first = document.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (e) => {
    e.preventDefault();
    setErrs(valid);
    if (Object.keys(valid).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false); setDone(true);
      track(EVENTS.CONTACT_SUBMIT, { needs: form.needs.join(",") });
      track(EVENTS.CONSULT_BOOK, { from: "wizard" });
      try { localStorage.removeItem("cts_contact"); } catch {}
      window.scrollTo({ top: 0 });
    }, 1300);
  };

  if (done) {
    return (
      <main>
        <PageHero kicker="Consultation booked" title={<>Consider it <em>started.</em></>} />
        <section className="section"><div className="container">
          <Reveal className={styles.done}>
            <span className={styles.check}><Check size={30} aria-hidden="true" /></span>
            <h2 className="display">Thank you, {form.name.split(" ")[0] || "founder"}.</h2>
            <p>Your consultation request is in. A CTS consultant will confirm <strong>{form.date}{form.slot ? ` · ${form.slot}` : ""}</strong> at <strong>{form.email}</strong>{form.needs.length > 0 && <> to discuss <strong>{form.needs.join(", ")}</strong></>}.</p>
            <p className={styles.alt}>Prefer it faster? Call <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}>{CONTACT_PHONE}</a> or write <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </Reveal>
        </div></section>
      </main>
    );
  }

  return (
    <main>
      <PageHero kicker="Book a Free Consultation" title={<>Start with <em>intent.</em></>} lede="Five short steps. We reply to every considered enquiry — usually within two working days." />
      <section className="section"><div className="container">
        <Reveal>
          <ol className={styles.progress} aria-label="Consultation progress">
            {STEPS.map((s, i) => (
              <li key={s} className={`${styles.pStep} ${i < step ? styles.past : ""} ${i === step ? styles.now : ""}`} aria-current={i === step ? "step" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>{s}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={1} className={styles.card}>
          {step === 0 && (
            <div key="s0" className={styles.pane}>
              <h2>Who should we talk to?</h2>
              <div className={f.grid2}>
                <div className={f.field}><label htmlFor="c-name">Name *</label><input id="c-name" type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <p className={f.err}>{errs.name}</p>}</div>
                <div className={f.field}><label htmlFor="c-company">Company</label><input id="c-company" type="text" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company (optional)" autoComplete="organization" /></div>
              </div>
              <div className={f.grid2}>
                <div className={f.field}><label htmlFor="c-email">Email *</label><input id="c-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errs.email} />{errs.email && <p className={f.err}>{errs.email}</p>}</div>
                <div className={f.field}><label htmlFor="c-phone">Phone *</label><input id="c-phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 …" autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <p className={f.err}>{errs.phone}</p>}</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div key="s1" className={styles.pane}>
              <h2>What do you need?</h2>
              <div className={f.opts} role="group" aria-label="Project needs">
                {WIZARD.needs.map((n) => (
                  <label key={n} className={f.opt}><input type="checkbox" checked={form.needs.includes(n)} onChange={() => toggleNeed(n)} /><span>{n}</span></label>
                ))}
              </div>
              {errs.needs && <p className={f.err}>{errs.needs}</p>}
            </div>
          )}

          {step === 2 && (
            <div key="s2" className={styles.pane}>
              <h2>Budget, timeline, requirements</h2>
              <p className={f.legend}>Budget *</p>
              <div className={f.opts} role="radiogroup" aria-label="Budget">
                {WIZARD.budgets.map((b) => (
                  <label key={b} className={f.opt}><input type="radio" name="budget" checked={form.budget === b} onChange={() => set("budget", b)} /><span>{b}</span></label>
                ))}
              </div>
              {errs.budget && <p className={f.err}>{errs.budget}</p>}
              <div className={f.grid2} style={{ marginTop: 22 }}>
                <div className={f.field}><label htmlFor="c-time">Timeline</label>
                  <select id="c-time" value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                    <option value="">Select…</option>{WIZARD.timelines.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className={f.field}><label htmlFor="c-req">Key requirements</label><input id="c-req" type="text" value={form.requirements} onChange={(e) => set("requirements", e.target.value)} placeholder="e.g. CRM + WhatsApp in 8 weeks" /></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div key="s3" className={styles.pane}>
              <h2>Tell us about the project</h2>
              <div className={f.field}><label htmlFor="c-det">Project details *</label>
                <textarea id="c-det" value={form.details || ""} onChange={(e) => set("details", e.target.value)} placeholder="What are you building? Who is it for? What must it become?" aria-invalid={!!errs.details} />
                {errs.details && <p className={f.err}>{errs.details}</p>}
              </div>
              <div className={f.field}><label htmlFor="c-file">Attach a file <small style={{ fontWeight: 400 }}>(brief, deck, sheet — attached on submission)</small></label>
                <input id="c-file" type="file" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} aria-describedby="c-file-note" />
                {fileName ? <p className={f.err} id="c-file-note" style={{ color: "var(--color-success)" }}>Attached: {fileName}</p> : <p className={styles.hint} id="c-file-note">No file selected.</p>}
              </div>
            </div>
          )}

          {step === 4 && (
            <form key="s4" className={styles.pane} onSubmit={submit}>
              <h2><CalendarCheck size={26} aria-hidden="true" style={{ verticalAlign: "-5px", marginRight: 10 }} />Schedule your consultation</h2>
              <div className={f.grid2}>
                <div className={f.field}><label htmlFor="c-date">Preferred date *</label><input id="c-date" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!errs.date} />{errs.date && <p className={f.err}>{errs.date}</p>}</div>
                <div className={f.field}><label htmlFor="c-slot">Time slot</label>
                  <select id="c-slot" value={form.slot} onChange={(e) => set("slot", e.target.value)}>
                    <option value="">Select…</option><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option>
                  </select>
                </div>
              </div>
              <div className={styles.review}>
                <p><strong>{form.name}</strong> · {form.email} · {form.phone}</p>
                <p>{form.needs.join(" · ") || "—"} · {form.budget || "Budget flexible"} · {form.timeline || "Timeline flexible"}</p>
              </div>
            </form>
          )}

          <div className={styles.nav}>
            <button className={styles.back} onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>
              <ArrowLeft size={15} aria-hidden="true" />Back
            </button>
            {step < 4
              ? <button className={styles.next} onClick={next}>Continue<ArrowRight size={15} aria-hidden="true" /></button>
              : <button className={styles.next} onClick={submit} disabled={sending}>{sending ? "Booking…" : "Confirm consultation"}<ArrowRight size={15} aria-hidden="true" /></button>}
          </div>
        </Reveal>
      </div></section>
    </main>
  );
}
