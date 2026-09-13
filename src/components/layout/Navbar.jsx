import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { NAV, MEGA_MENU } from "../../data/content";
import { track, EVENTS } from "../../lib/analytics";
import Magnetic from "../ui/Magnetic";
import styles from "./Navbar.module.css";

export default function Navbar({ onMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setMega(false), [loc.pathname]);
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setMega(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/" className={styles.brand} aria-label="CTS home">
        <span className={styles.dot} aria-hidden="true" />CTS
      </Link>

      <nav className={styles.links} aria-label="Primary">
        {NAV.map((n) => n.mega ? (
          <div
            key={n.label} className={styles.megaWrap}
            onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}
          >
            <NavLink
              to={n.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
              aria-expanded={mega} aria-haspopup="true" onClick={() => setMega(false)}
            >
              {n.label}<ChevronDown size={13} aria-hidden="true" />
            </NavLink>
            <div className={`${styles.mega} ${mega ? styles.show : ""}`} role="menu" aria-label="Services menu">
              {MEGA_MENU.map((g) => (
                <div key={g.group} className={styles.megaCol}>
                  <p className={styles.megaGroup}>{g.group}</p>
                  {g.links.map((l) => (
                    <Link key={l.to} to={l.to} className={styles.megaLink} role="menuitem">
                      <span>{l.label}</span><small>{l.desc}</small>
                    </Link>
                  ))}
                </div>
              ))}
              <Link to="/contact" className={styles.megaCta} onClick={() => track(EVENTS.CTA_CLICK, { label: "mega-consult" })}>
                Not sure what you need?<strong>Talk to a consultant →</strong>
              </Link>
            </div>
          </div>
        ) : (
          <NavLink key={n.label} to={n.to} end={n.to === "/"}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.right}>
        <NavLink to="/contact" className={({ isActive }) => `${styles.link} ${styles.contactLink} ${isActive ? styles.active : ""}`}>
          Contact
        </NavLink>
        <Magnetic>
          <Link to="/contact" className={styles.cta} onClick={() => track(EVENTS.CONSULT_BOOK, { from: "nav" })}>
            Book Consultation<ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </Magnetic>
        <button className={styles.burger} onClick={onMenu} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
