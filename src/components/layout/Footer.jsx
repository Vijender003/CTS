import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Linkedin, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { FOOTER, CONTACT_EMAIL, CONTACT_PHONE } from "../../data/content";
import { track, EVENTS } from "../../lib/analytics";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import Sticker from "../ui/Sticker";
import styles from "./Footer.module.css";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" }, { icon: Twitter, label: "X (Twitter)" },
  { icon: Instagram, label: "Instagram" }, { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Reveal className={styles.ctaRow}>
          <h2 className="display">{FOOTER.finalCta}</h2>
          <div className={styles.ctaSide}>
            <Button to="/contact" variant="solid" magnetic>Book a Consultation</Button>
            <Sticker text="LET'S BUILD • CTS • LET'S BUILD • CTS • " label="Start a project with CTS" />
          </div>
        </Reveal>

        <div className={styles.grid}>
          <div>
            <p className={styles.brand}><span aria-hidden="true" />CTS</p>
            <p className={styles.statement}>{FOOTER.statement}</p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a key={s.label} href="/contact" aria-label={s.label} className={styles.soc}>
                  <s.icon size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {FOOTER.cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className={styles.colT}>{c.title}</p>
              {c.links.map((l) => <Link key={l.label} to={l.to} className={styles.flink}>{l.label}</Link>)}
            </nav>
          ))}
          <div>
            <p className={styles.colT}>Contact</p>
            <a className={styles.flink} href={`mailto:${CONTACT_EMAIL}`} onClick={() => track(EVENTS.CTA_CLICK, { label: "footer-email" })}>
              <Mail size={14} aria-hidden="true" />{CONTACT_EMAIL}
            </a>
            <a className={styles.flink} href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} onClick={() => track(EVENTS.PHONE_CLICK, { from: "footer" })}>
              <Phone size={14} aria-hidden="true" />{CONTACT_PHONE}
            </a>
            <p className={styles.flink} style={{ cursor: "default" }}><MapPin size={14} aria-hidden="true" />India + Global</p>
          </div>
        </div>

        <p className={styles.mark} aria-hidden="true">CTS®</p>

        <div className={styles.base}>
          <span>© 2026 Cleanomatics Tech Solutions. All rights reserved.</span>
          <span className={styles.sys} aria-hidden="true">SYS / CTS® — V2.0 · IND → GLOBAL</span>
          <button className={styles.top} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top<ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
