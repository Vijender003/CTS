/* CTS® — unified motion + interaction layer. Performance-first, reduced-motion aware. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- preloader ---------- */
  var loader = $("#loader"), count = $("#loadCount"), n = 0;
  function finishLoad() {
    document.body.classList.add("loaded");
    if (loader) loader.classList.add("done");
  }
  if (reduced) { if (count) count.textContent = "100"; finishLoad(); }
  else {
    var t = setInterval(function () {
      n += Math.floor(Math.random() * 14) + 5;
      if (n >= 100) { n = 100; clearInterval(t); setTimeout(finishLoad, 250); }
      if (count) count.textContent = (n < 10 ? "0" : "") + n;
    }, 90);
    setTimeout(function () { clearInterval(t); if (count) count.textContent = "100"; finishLoad(); }, 2500);
  }

  /* ---------- clocks ---------- */
  function tickClock() {
    try {
      var d = new Date();
      var p = function (x) { return (x < 10 ? "0" : "") + x; };
      var s = p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
      var c1 = $("#clock"); if (c1) c1.textContent = s;
      var c2 = $("#clock2"); if (c2) c2.textContent = p(d.getHours()) + ":" + p(d.getMinutes()) + " — LOCAL";
      var c3 = $("#clockM"); if (c3) c3.textContent = p(d.getHours()) + ":" + p(d.getMinutes());
    } catch (e) {}
  }
  tickClock(); setInterval(tickClock, 1000);

  /* ---------- nav scroll state ---------- */
  var nav = $("#nav");
  function onScrollNav() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScrollNav, { passive: true }); onScrollNav();

  /* ---------- mobile menu ---------- */
  var burger = $("#burger");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (burger) { burger.setAttribute("aria-expanded", open ? "true" : "false"); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
  $$(".mobile-menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- custom cursor + magnetic ---------- */
  if (finePointer && !reduced) {
    var dot = $(".cursor-dot"), ring = $(".cursor-ring"), label = $(".c-label");
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (dot) dot.style.transform = "translate(" + (mx - 3) + "px," + (my - 3) + "px)";
      if (ring) ring.style.transform = "translate(" + (rx - ring.offsetWidth / 2) + "px," + (ry - ring.offsetHeight / 2) + "px)";
      requestAnimationFrame(loop);
    })();
    $$("[data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { if (ring) ring.classList.add("is-hover"); if (label) label.textContent = el.getAttribute("data-cursor") || "VIEW"; });
      el.addEventListener("mouseleave", function () { if (ring) ring.classList.remove("is-hover"); });
    });
    /* magnetic */
    $$(".mag").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * 0.18 + "px," + y * 0.18 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
    /* hero fragments parallax */
    var frags = $$(".hero-frag");
    if (frags.length) {
      document.querySelector(".hero").addEventListener("mousemove", function (e) {
        var cx = (e.clientX / window.innerWidth - 0.5), cy = (e.clientY / window.innerHeight - 0.5);
        frags.forEach(function (f) {
          var d = parseFloat(f.getAttribute("data-depth") || "40");
          f.style.transform = "translate(" + (-cx * d) + "px," + (-cy * d) + "px)";
        });
      }, { passive: true });
    }
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".rv, .mask, .ml").forEach(function (el) { io.observe(el); });

  /* process bars animate via .step.in */
  var io2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io2.unobserve(en.target); } });
  }, { threshold: 0.35 });
  $$(".step").forEach(function (el) { io2.observe(el); });

  /* scroll-linked hero title drift */
  var heroTitle = $(".hero-title");
  if (heroTitle && !reduced) {
    window.addEventListener("scroll", function () {
      var y = Math.min(window.scrollY, window.innerHeight);
      heroTitle.style.transform = "translateY(" + y * 0.12 + "px)";
      heroTitle.style.opacity = String(1 - (y / window.innerHeight) * 0.55);
    }, { passive: true });
  }

  /* ---------- work filters ---------- */
  var primary = "all", domain = "all";
  var projects = $$(".proj");
  var workCount = $("#workCount"), workEmpty = $("#workEmpty");
  function applyFilters() {
    var shown = 0;
    projects.forEach(function (p) {
      var pp = (p.getAttribute("data-primary") || "").split(" ");
      var dd = (p.getAttribute("data-domain") || "").split(" ");
      var okP = primary === "all" || pp.indexOf(primary) !== -1;
      var okD = domain === "all" || dd.indexOf(domain) !== -1;
      var show = okP && okD;
      p.classList.remove("hide");
      if (show) {
        shown++;
        p.classList.remove("filtering-out");
        p.classList.add("in");
      } else {
        p.classList.add("filtering-out");
        (function (el) { setTimeout(function () { if (el.classList.contains("filtering-out")) el.classList.add("hide"); }, 320); })(p);
      }
    });
    setTimeout(function () {
      if (workEmpty) workEmpty.classList.toggle("show", shown === 0);
      if (workCount) workCount.textContent = "SHOWING 0" + shown + " / 04 PROJECTS";
    }, 340);
  }
  $$("#primaryFilters .chip").forEach(function (b) {
    b.addEventListener("click", function () {
      primary = b.getAttribute("data-filter");
      $$("#primaryFilters .chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      applyFilters();
    });
  });
  $$("#domainFilters .chip").forEach(function (b) {
    b.addEventListener("click", function () {
      domain = b.getAttribute("data-domain");
      $$("#domainFilters .chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      applyFilters();
    });
  });
  var reset = $("#resetFilters");
  if (reset) reset.addEventListener("click", function () {
    primary = "all"; domain = "all";
    $$("#primaryFilters .chip").forEach(function (x, i) { x.setAttribute("aria-pressed", i === 0 ? "true" : "false"); });
    $$("#domainFilters .chip").forEach(function (x, i) { x.setAttribute("aria-pressed", i === 0 ? "true" : "false"); });
    applyFilters();
  });

  /* ---------- services → proof ---------- */
  var PROOF = {
    strategy: { k: "CAPABILITY /01 — DIGITAL STRATEGY", t: "Position before pixels.", b: "Every build starts with a sharp thesis: who it's for, why it wins, what it refuses to be. Strategy set the night-graph for VYBE, the command-model for Toolverse, the calm-AI stance for Nexora and the editorial thesis for Highrises.", p: [["01 — VYBE", "NIGHT-GRAPH THESIS →"], ["03 — NEXORA", "CALM-AI STANCE →"], ["04 — HIGHRISES", "EDITORIAL THESIS →"]] },
    uxui: { k: "CAPABILITY /02 — UX / UI", t: "Architecture you can feel.", b: "Flows, hierarchies and interface systems tested against real intent. VYBE's two-tap RSVP, Toolverse's command palette, Nexora's inspectable workspace, Highrises' sticky enquiry — each flow earns its brevity.", p: [["01 — VYBE", "TWO-TAP RSVP →"], ["02 — TOOLVERSE", "COMMAND MODEL →"], ["04 — HIGHRISES", "ENQUIRY FLOW →"]] },
    web: { k: "CAPABILITY /03 — WEB DESIGN", t: "Editorial, responsive, alive.", b: "Websites composed like spreads, engineered like systems — fluid from 320 to 1920. Highrises' tower stories and Toolverse's dense surfaces show both ends of the range.", p: [["04 — HIGHRISES", "TOWER STORIES →"], ["02 — TOOLVERSE", "DENSE SURFACES →"]] },
    products: { k: "CAPABILITY /04 — DIGITAL PRODUCTS", t: "From idea to digital product.", b: "Our signature motion: 0 → 1 definition, MVP with taste, then scale. VYBE, Toolverse and Nexora each shipped as coherent products — not pages with features attached.", p: [["01 — VYBE", "0 → 1 BUILD →"], ["02 — TOOLVERSE", "MVP → SCALE →"], ["03 — NEXORA", "0 → 1 BUILD →"]] },
    interaction: { k: "CAPABILITY /05 — INTERACTION", t: "Motion as meaning.", b: "Velocity-aware cards in VYBE, interruptible streams in Nexora, scroll-driven towers in Highrises — interaction signals state, heat and hierarchy instead of decorating.", p: [["01 — VYBE", "VELOCITY CARDS →"], ["03 — NEXORA", "STREAM STATES →"], ["04 — HIGHRISES", "SCROLL TOWERS →"]] },
    creative: { k: "CAPABILITY /06 — CREATIVE DEVELOPMENT", t: "Engineering with taste.", b: "Performant front-ends, canvas and WebGL where earned, budgets respected. Toolverse's zero-load previews and Nexora's streaming choreography are engineering as art direction.", p: [["02 — TOOLVERSE", "ZERO-LOAD PREVIEWS →"], ["03 — NEXORA", "STREAMING CORE →"]] },
    motion: { k: "CAPABILITY /07 — MOTION", t: "Choreography, not animation.", b: "One motion language — fast, controlled, expensive. Page-load sequences, mask reveals, scroll-linked type: the same easing curve from hero to footer.", p: [["01 — VYBE", "HEAT CHOREOGRAPHY →"], ["03 — NEXORA", "TOKEN STREAMS →"], ["04 — HIGHRISES", "TOWER REVEALS →"]] },
    systems: { k: "CAPABILITY /08 — DESIGN SYSTEMS", t: "Tokens over one-offs.", b: "Color, type, spacing and motion tokens that let products grow without drifting. Toolverse's utility grid and Highrises' residence templates run on shared systemic logic.", p: [["02 — TOOLVERSE", "UTILITY GRID →"], ["04 — HIGHRISES", "RESIDENCE TEMPLATES →"]] }
  };
  var svcBtns = $$("#svcList .svc");
  var spK = $("#spK"), spT = $("#spTitle"), spB = $("#spBody"), spP = $("#spProjs");
  function selectSvc(key, btn) {
    var d = PROOF[key]; if (!d) return;
    svcBtns.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-expanded", "false"); });
    if (btn) { btn.classList.add("active"); btn.setAttribute("aria-expanded", "true"); }
    if (spK) spK.textContent = d.k;
    if (spT) spT.textContent = d.t;
    if (spB) spB.textContent = d.b;
    if (spP) {
      spP.innerHTML = "";
      d.p.forEach(function (row) {
        var a = document.createElement("a");
        a.href = "#work"; a.setAttribute("data-cursor", row[0].slice(0, 2));
        var s1 = document.createElement("span"); s1.textContent = row[0];
        var s2 = document.createElement("span"); s2.textContent = row[1];
        a.appendChild(s1); a.appendChild(s2); spP.appendChild(a);
      });
    }
  }
  svcBtns.forEach(function (b) {
    var key = b.getAttribute("data-svc");
    b.addEventListener("mouseenter", function () { if (window.innerWidth > 1100) selectSvc(key, b); });
    b.addEventListener("focus", function () { selectSvc(key, b); });
    b.addEventListener("click", function () { selectSvc(key, b); });
  });

  /* ---------- VANTA FIELD ---------- */
  (function field() {
    var stage = $("#fieldStage"), cv = $("#fieldCanvas");
    if (!stage || !cv) return;
    var ctx = cv.getContext("2d");
    var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = $$(".field-node", stage);
    var pts = [], mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: 0, py: 0 };
    var vel = 0, running = true;

    function size() {
      var r = stage.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      layoutNodes();
    }
    function seed() {
      pts = [];
      var count = reduced ? 0 : Math.min(90, Math.floor(W * H / 16000));
      for (var i = 0; i < count; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, ox: 0, oy: 0, s: Math.random() * 1.6 + 0.4 });
    }
    function layoutNodes() {
      nodes.forEach(function (nd) {
        var x = parseFloat(nd.getAttribute("data-x")) / 100 * W;
        var y = parseFloat(nd.getAttribute("data-y")) / 100 * H;
        nd._bx = x; nd._by = y; nd._x = x; nd._y = y;
        nd.style.left = "0"; nd.style.top = "0";
        nd.style.transform = "translate(" + x + "px," + y + "px) translate(-50%,-50%)";
      });
    }
    stage.addEventListener("mousemove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      mouse.vx = x - mouse.px; mouse.vy = y - mouse.py;
      mouse.px = x; mouse.py = y; mouse.x = x; mouse.y = y;
      vel = Math.min(1, Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) / 40);
      var xy = $("#fieldXY"); if (xy) xy.textContent = Math.round(x) + " · " + Math.round(y);
      var vv = $("#fieldVel"); if (vv) vv.textContent = "VEL " + vel.toFixed(2);
    }, { passive: true });
    stage.addEventListener("mouseleave", function () { mouse.x = -9999; mouse.y = -9999; vel *= 0.5; });

    /* scroll-linked energy */
    var lastY = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      vel = Math.min(1, vel + Math.abs(y - lastY) / 600);
      lastY = y;
    }, { passive: true });

    new IntersectionObserver(function (en) { running = en[0].isIntersecting; if (running) requestAnimationFrame(draw); }).observe(stage);

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      vel *= 0.94;
      /* links */
      ctx.lineWidth = 1;
      var i, j, p, q, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        dx = mouse.x - p.x; dy = mouse.y - p.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
        var f = Math.max(0, 1 - d / 220) * (14 + vel * 30);
        p.x += (dx / d) * f * 0.12 + Math.sin(Date.now() / 1600 + i) * 0.18;
        p.y += (dy / d) * f * 0.12 + Math.cos(Date.now() / 1900 + i * 1.7) * 0.18;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        ctx.fillStyle = "rgba(199,202,209,.5)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
      }
      ctx.strokeStyle = "rgba(199,202,209,.10)";
      for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) {
        p = pts[i]; q = pts[j];
        dx = p.x - q.x; dy = p.y - q.y;
        if (dx * dx + dy * dy < 110 * 110) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      /* nodes repel + skew by velocity */
      nodes.forEach(function (nd, k) {
        dx = nd._x - mouse.x; dy = nd._y - mouse.y; d = Math.sqrt(dx * dx + dy * dy) || 1;
        var push = Math.max(0, 1 - d / 260) * (26 + vel * 60);
        var tx = nd._bx + (dx / d) * push + Math.sin(Date.now() / 2200 + k * 2) * (4 + vel * 14);
        var ty = nd._by + (dy / d) * push + Math.cos(Date.now() / 2600 + k * 1.4) * (4 + vel * 10);
        nd._x += (tx - nd._x) * 0.08; nd._y += (ty - nd._y) * 0.08;
        nd.style.transform = "translate(" + nd._x + "px," + nd._y + "px) translate(-50%,-50%) skewX(" + (mouse.vx * -0.15) + "deg)";
        /* proximity ring */
        var near = d < 200;
        nd.classList.toggle("active", near);
      });
      /* node links */
      ctx.strokeStyle = "rgba(199,202,209," + (0.14 + vel * 0.25) + ")";
      for (i = 0; i < nodes.length; i++) for (j = i + 1; j < nodes.length; j++) {
        ctx.beginPath(); ctx.moveTo(nodes[i]._x, nodes[i]._y); ctx.lineTo(nodes[j]._x, nodes[j]._y); ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener("resize", size);
    size();
    if (!reduced) requestAnimationFrame(draw);
    else { /* static: draw once */
      ctx.fillStyle = "rgba(199,202,209,.4)";
      pts.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill(); });
    }
  })();

  /* ---------- scramble micro-interaction ---------- */
  var glyphs = "▓▒░<>/\\|01";
  $$("[data-scramble]").forEach(function (el) {
    var original = el.getAttribute("data-scramble");
    el.closest(".exp").addEventListener("mouseenter", function () {
      if (reduced) return;
      var i = 0;
      var iv = setInterval(function () {
        el.textContent = original.split("").map(function (c, k) {
          return k < i || c === " " ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        if (++i > original.length) clearInterval(iv);
      }, 28);
    });
  });

  /* ---------- contact form: full state machine ---------- */
  var form = $("#contactForm");
  if (form) {
    var btn = $("#submitBtn"), label = $("#submitLabel"), status = $("#formStatus");
    function setErr(input, errEl, bad) {
      if (input) input.setAttribute("aria-invalid", bad ? "true" : "false");
      if (errEl) errEl.classList.toggle("show", !!bad);
      return !bad;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#fName"), email = $("#fEmail"), desc = $("#fDesc");
      var ok = true;
      ok = setErr(name, $("#eName"), !name.value.trim()) && ok;
      ok = setErr(email, $("#eEmail"), !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) && ok;
      ok = setErr(desc, $("#eDesc"), desc.value.trim().length < 20) && ok;
      var typeOk = !!form.querySelector('input[name="ptype"]:checked');
      $("#eType").classList.toggle("show", !typeOk);
      ok = ok && typeOk;
      if (!ok) {
        status.textContent = "PLEASE COMPLETE THE HIGHLIGHTED FIELDS";
        status.className = "form-status err";
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }
      /* loading → success */
      btn.disabled = true; btn.classList.add("loading");
      label.textContent = "TRANSMITTING";
      status.textContent = "SENDING — HOLD THE LINE";
      status.className = "form-status";
      setTimeout(function () {
        btn.classList.remove("loading");
        label.textContent = "ENQUIRY RECEIVED ✓";
        status.textContent = "RECEIVED — WE REPLY WITHIN 2 WORKING DAYS";
        status.className = "form-status ok";
        form.querySelectorAll("input,textarea,select").forEach(function (f) { f.disabled = true; });
      }, 1400);
    });
    /* live-clear errors */
    ["fName", "fEmail", "fDesc"].forEach(function (id) {
      var f = document.getElementById(id);
      if (f) f.addEventListener("input", function () { f.setAttribute("aria-invalid", "false"); });
    });
  }

  /* ---------- misc ---------- */
  var toTop = $("#toTop");
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });
})();
