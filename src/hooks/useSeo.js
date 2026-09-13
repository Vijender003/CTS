import { useEffect } from "react";

/* Per-route SEO: title + description + canonical. Static OG/JSON-LD ships in index.html. */
export function useSeo({ title, description, path }) {
  useEffect(() => {
    const site = "CTS — Cleanomatics Tech Solutions";
    const full = title ? `${title} | ${site}` : `${site} | Architecting Revenue Ecosystems`;
    document.title = full;
    const set = (sel, attr, val) => {
      const el = document.head.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    if (description) {
      set('meta[name="description"]', "content", description);
      set('meta[property="og:description"]', "content", description);
      set('meta[name="twitter:description"]', "content", description);
    }
    set('meta[property="og:title"]', "content", full);
    set('meta[name="twitter:title"]', "content", full);
    if (path) {
      const url = `https://cts.example.com${path}`;
      set('meta[property="og:url"]', "content", url);
      let canon = document.head.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute("href", url);
    }
  }, [title, description, path]);
}
