import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Sparkles, Send, X, ArrowUpRight } from "lucide-react";
import { WHATSAPP_NUMBER, ZOEY_INTENTS, ZOEY_FALLBACK } from "../../data/content";
import { track, EVENTS } from "../../lib/analytics";
import styles from "./Floaters.module.css";

function brain(input) {
  const t = input.toLowerCase();
  for (const it of ZOEY_INTENTS) {
    if (it.keys.some((k) => t.includes(k))) return it;
  }
  return null;
}

function Zoey() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "zoey", text: "How can I help you today?" }]);
  const [val, setVal] = useState("");
  const [leadMode, setLeadMode] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [leadDone, setLeadDone] = useState(() => !!localStorage.getItem("cts_zoey_lead"));
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      track(EVENTS.CHAT_OPEN);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 350);
    }
  }, [open ]);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open, leadMode]);

  const push = (m) => setMsgs((p) => [...p, m]);

  const send = (text) => {
    const clean = (text ?? val).trim();
    if (!clean) return;
    push({ from: "user", text: clean });
    setVal("");
    if (/\d{7,}/.test(clean) && !leadDone) {
      setLeadMode(true);
      push({ from: "zoey", text: "Thanks — I've noted that. Share your name and best number and a consultant will reach out." });
      return;
    }
    setTimeout(() => {
      const hit = brain(clean);
      push(hit
        ? { from: "zoey", text: hit.answer, link: hit.link, linkLabel: "Learn more →" }
        : { from: "zoey", text: ZOEY_FALLBACK, link: "/contact", linkLabel: "Book a free consultation →" });
    }, 550);
  };

  const saveLead = (e) => {
    e.preventDefault();
    if (!lead.name.trim() || !/^[+\d][\d\s-]{6,}$/.test(lead.phone.trim())) return;
    localStorage.setItem("cts_zoey_lead", JSON.stringify({ ...lead, at: Date.now() }));
    setLeadDone(true); setLeadMode(false);
    track(EVENTS.CHAT_LEAD);
    push({ from: "zoey", text: `Done, ${lead.name.trim().split(" ")[0]} — a consultant will reach out shortly. Prefer to book directly?`, link: "/contact", linkLabel: "Book a consultation →" });
  };

  return (
    <>
      <button
        className={`${styles.fab} ${styles.zoey}`} onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close CTS assistant" : "Open CTS assistant Zoey"} aria-expanded={open}
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
        {!open && <span className={styles.nudge}>How can I help?</span>}
      </button>
      <div className={`${styles.panel} ${open ? styles.show : ""}`} role="dialog" aria-label="Zoey, CTS assistant" aria-hidden={!open}>
        <div className={styles.pHead}>
          <span className={styles.avatar} aria-hidden="true">Z</span>
          <div><strong>Zoey</strong><small>CTS Assistant · replies instantly</small></div>
        </div>
        <div className={styles.pBody} ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`${styles.msg} ${m.from === "user" ? styles.user : styles.bot}`}>
              <p>{m.text}</p>
              {m.link && <Link to={m.link} onClick={() => setOpen(false)}>{m.linkLabel}<ArrowUpRight size={13} /></Link>}
            </div>
          ))}
          {leadMode && !leadDone && (
            <form className={styles.leadForm} onSubmit={saveLead}>
              <label>Your name<input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Full name" autoComplete="name" /></label>
              <label>Phone<input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="+91 …" inputMode="tel" autoComplete="tel" /></label>
              <button type="submit">Request a callback</button>
            </form>
          )}
        </div>
        <div className={styles.chips}>
          {["Zoho CRM", "Pricing", "Book a call"].map((c) => (
            <button key={c} onClick={() => send(c)}>{c}</button>
          ))}
        </div>
        <form className={styles.pInput} onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask about services…" aria-label="Ask Zoey" />
          <button type="submit" aria-label="Send message"><Send size={16} /></button>
        </form>
      </div>
    </>
  );
}

export default function Floaters() {
  return (
    <div className={styles.floaters}>
      <a
        className={`${styles.fab} ${styles.wa}`} href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi CTS — I'd like to discuss a project.")}`}
        target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp for faster responses"
        onClick={() => track(EVENTS.WHATSAPP_CLICK, { from: "float" })}
      >
        <MessageCircle size={20} />
      </a>
      <Zoey />
    </div>
  );
}
