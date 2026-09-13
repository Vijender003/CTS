import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { track, EVENTS } from "../../lib/analytics";
import styles from "./Button.module.css";

export default function Button({
  to, href, children, variant = "solid", arrow = true, onClick, type, disabled, className = "", magnetic = false,
}) {
  const cls = `${styles.btn} ${styles[variant] || ""} ${className}`.trim();
  const inner = (<>{children}{arrow && <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />}</>);
  const handle = (e) => {
    track(EVENTS.CTA_CLICK, { label: typeof children === "string" ? children : "cta" });
    if (onClick) onClick(e);
  };
  if (to) return <Link to={to} className={cls} onClick={handle} data-magnetic={magnetic || undefined}>{inner}</Link>;
  if (href) return <a href={href} className={cls} onClick={handle} data-magnetic={magnetic || undefined}>{inner}</a>;
  return <button type={type || "button"} className={cls} onClick={handle} disabled={disabled}>{inner}</button>;
}
