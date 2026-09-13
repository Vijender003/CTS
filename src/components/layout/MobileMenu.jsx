import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { NAV } from "../../data/content";
import styles from "./MobileMenu.module.css";

export default function MobileMenu({ open, onClose }) {
  const items = [...NAV, { label: "Contact", to: "/contact" }];
  return (
    <div className={`${styles.menu} ${open ? styles.open : ""}`} aria-hidden={!open}>
      <div className={styles.top}>
        <span>CTS / MENU</span>
        <button className={styles.close} onClick={onClose} aria-label="Close menu" tabIndex={open ? 0 : -1}>
          <X size={26} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Mobile">
        {items.map((n, i) => (
          <Link
            key={n.label} to={n.to} tabIndex={open ? 0 : -1} onClick={onClose}
            className={styles.link} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
          >
            <span><small aria-hidden="true">0{i + 1}</small>&nbsp;&nbsp;{n.label}</span><ArrowUpRight size={30} aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <div className={styles.foot}>
        <span>Authorized Zoho Partner</span><span>India + Global</span>
      </div>
    </div>
  );
}
