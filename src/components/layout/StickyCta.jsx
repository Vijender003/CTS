import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { track, EVENTS } from "../../lib/analytics";
import styles from "./StickyCta.module.css";

/* Mobile-only sticky conversion bar. Appears after the hero, never on /contact. */
export default function StickyCta({ menuOpen }) {
  const [show, setShow] = useState(false);
  const loc = useLocation();
  const hidden = loc.pathname === "/contact" || menuOpen;

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className={`${styles.bar} ${show && !hidden ? styles.show : ""}`} aria-hidden={show && !hidden ? undefined : true}>
      <div className={styles.inner}>
        <p><strong>Free 30-min consultation</strong><small>Systems audit included</small></p>
        <Link
          to="/contact" className={styles.btn} tabIndex={show && !hidden ? 0 : -1}
          onClick={() => track(EVENTS.CONSULT_BOOK, { from: "sticky-mobile" })}
        >
          Book<ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
