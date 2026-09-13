import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ensureGsap } from "./animations/motion";
import { useReducedMotion } from "./hooks/useReveal";
import { track, EVENTS } from "./lib/analytics";
import Navbar from "./components/layout/Navbar";
import MobileMenu from "./components/layout/MobileMenu";
import Footer from "./components/layout/Footer";
import Floaters from "./components/layout/Floaters";
import StickyCta from "./components/layout/StickyCta";
import ScrollProgress from "./components/layout/ScrollProgress";
import Cursor from "./components/ui/Cursor";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Insights = lazy(() => import("./pages/Insights"));
const Article = lazy(() => import("./pages/Article"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteEffects() {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    track(EVENTS.PAGE_VIEW, { path: loc.pathname });
  }, [loc.pathname]);
  return null;
}

function PageWipe() {
  const loc = useLocation();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelectorAll("i"),
        { scaleY: 1 },
        { scaleY: 0, duration: 0.5, ease: "expo.inOut", stagger: 0.06, transformOrigin: "top" });
    });
    return () => ctx.revert();
  }, [loc.pathname, reduced]);
  if (reduced) return null;
  return <div ref={ref} className="page-wipe" aria-hidden="true"><i /><i /><i /></div>;
}

function Shell() {
  const [menu, setMenu] = useState(false);
  const reduced = useReducedMotion();
  const loc = useLocation();
  const mainRef = useRef(null);

  /* Route page transition — fast fade/rise, cleaned up on every navigation. */
  useEffect(() => {
    if (reduced || !mainRef.current) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "expo.out", overwrite: "auto", clearProps: "opacity,transform" }
      );
    });
    return () => ctx.revert();
  }, [loc.pathname, reduced]);

  useEffect(() => { ensureGsap(); }, []);

  /* Lenis smooth scroll — off on reduced motion; synced to ScrollTrigger. */
  useEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return (
    <>
      {/* Skip link uses scrollIntoView — a plain #hash would collide with HashRouter. */}
      <a
        className="skip-link" href="#main"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("main");
          if (el) { el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true }); el.scrollIntoView(); }
        }}
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <Navbar onMenu={() => setMenu(true)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
      <PageWipe />
      <div id="main" ref={mainRef}>
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center bg-deepbg text-primary-ondark font-display text-3xl">CTS…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/case-studies" element={<Cases />} />
            <Route path="/case-studies/:slug" element={<CaseDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<Article />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Floaters />
      <StickyCta menuOpen={menu} />
      <RouteEffects />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
