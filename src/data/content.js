/* Central content store — the CMS-ready collection layer.
   All copy comes from DESCRIPTION.txt. Nothing invented: stats, awards,
   clients and results appear only here, exactly as specified. */

export const WHATSAPP_NUMBER = "911234567890"; // TODO: replace with the official CTS WhatsApp number
export const CONTACT_EMAIL = "hello@cts.example.com"; // TODO: replace with official CTS email
export const CONTACT_PHONE = "+91 00000 00000"; // TODO: replace with official CTS phone

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", mega: true },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Insights", to: "/insights" },
];

export const MEGA_MENU = [
  {
    group: "Zoho",
    links: [
      { label: "Zoho One", to: "/services/zoho-one", desc: "Your business, finally operating as one." },
      { label: "Zoho CRM", to: "/services/zoho-crm", desc: "Sales suite, pipelines and forecasting." },
      { label: "Zoho Books", to: "/services/zoho-books", desc: "Finance suite, billing to compliance." },
      { label: "Zoho Creator", to: "/services/zoho-creator", desc: "Custom apps on low-code." },
      { label: "Zoho Desk", to: "/services/zoho-desk", desc: "Service suite and support ops." },
      { label: "Bigin", to: "/services/bigin", desc: "Pipeline CRM for small teams." },
    ],
  },
  {
    group: "Growth",
    links: [
      { label: "Performance Marketing", to: "/services/performance-marketing", desc: "Full-funnel, ROAS-obsessed growth." },
      { label: "Marketing Suite", to: "/services/marketing-suite", desc: "Automation across the lifecycle." },
      { label: "Fractional CMO", to: "/services/fractional-cmo", desc: "Senior marketing leadership, on demand." },
    ],
  },
  {
    group: "Digital",
    links: [
      { label: "Website Development", to: "/services/website-development", desc: "Premium sites engineered to convert." },
      { label: "Application Development", to: "/services/application-development", desc: "Custom products and portals." },
    ],
  },
];

export const HERO = {
  eyebrow: "Authorized Zoho Partner · India + Global",
  titleA: "Architecting",
  titleB: "Revenue Ecosystems.",
  lede: "CTS helps ambitious businesses build connected revenue systems through Zoho, automation, technology and performance marketing.",
  primaryCta: { label: "Book a Free Consultation", to: "/contact" },
  secondaryCta: { label: "Explore Services", to: "/services" },
  stats: [
    { value: 135, suffix: "+", label: "Companies" },
    { value: 90, suffix: "%", label: "Client Retention" },
    { value: 500, suffix: "+", label: "Projects" },
    { value: 50, suffix: "+", label: "Developers & Creatives" },
  ],
};

export const TRUST = {
  kicker: "Authority",
  title: "Recognized where it counts.",
  items: [
    "Top 10% Zoho Growth Partner",
    "Zoho Partner of the Year 2023",
    "Zoho Partner of the Year 2024",
    "Fastest Emerging Partner 2022",
    "UC Berkeley SkyDeck",
    "India Accelerator",
    "MARL Accelerator",
  ],
};

export const PROBLEM = {
  kicker: "The problem",
  title: "Fragmented tools. Scattered data. Stalled growth.",
  lede: "Most businesses run on disconnected systems — and pay for it in lost follow-ups, invisible pipelines and decisions made on guesswork.",
  before: {
    title: "Fragmented business",
    items: ["Excel sheets", "WhatsApp chaos", "Disconnected CRM", "Manual follow-ups", "Scattered data"],
  },
  after: {
    title: "The CTS system",
    items: ["Connected CRM", "Automation", "Marketing", "Finance", "Analytics", "Revenue intelligence"],
  },
  systems: ["CRM", "Marketing", "Sales", "Finance", "Customer Support", "Operations", "Analytics"],
};

export const SOLUTION = {
  kicker: "Solution ecosystem",
  title: "One connected growth ecosystem.",
  lede: "CTS connects your CRM, marketing, sales, finance, support, operations and analytics into a single revenue system — designed around how your business actually runs.",
  flows: [
    { from: "CRM", to: "Marketing", note: "Segments sync to campaigns automatically" },
    { from: "Marketing", to: "Sales", note: "Qualified leads route with full context" },
    { from: "Sales", to: "Finance", note: "Won deals become invoices without re-entry" },
    { from: "Finance", to: "Analytics", note: "Revenue intelligence, live" },
  ],
};

export const SERVICES = [
  {
    slug: "zoho-one", group: "Zoho", name: "Zoho One Implementation",
    tagline: "Your business, finally operating as one.",
    value: "The entire operating system — CRM, finance, marketing, support, HR, analytics and automation — implemented as one coherent suite.",
    capabilities: ["CRM", "Finance", "Marketing", "Support", "HR", "Analytics", "Automation"],
    timeline: "Typical implementation: 6–12 weeks.",
    proof: ["Unicrete Building Solutions", "RealBetter", "CZAR HOMES"],
    faqs: [
      { q: "How long does a Zoho One implementation take?", a: "Typical implementations run 6–12 weeks depending on modules, data migration and integrations." },
      { q: "We already use some Zoho apps. Can you unify them?", a: "Yes — auditing existing apps and consolidating them into one governed Zoho One system is a common engagement." },
      { q: "Do you train our team?", a: "Every implementation includes role-based training and documentation so adoption sticks." },
    ],
  },
  {
    slug: "zoho-crm", group: "Zoho", name: "Zoho CRM / Sales Suite",
    tagline: "A pipeline your sales team will actually use.",
    value: "Pipeline design, automation, forecasting and integrations that turn your CRM into a revenue engine.",
    capabilities: ["Pipeline architecture", "Sales automation", "Forecasting", "Integrations", "Migration & cleanup"],
    proof: ["Unicrete Building Solutions", "Tap Health", "The Financial Mall"],
    faqs: [
      { q: "Can you migrate us from spreadsheets or another CRM?", a: "Yes — structured migration with dedupe, field mapping and history preserved." },
      { q: "Do you connect Zoho CRM with WhatsApp and telephony?", a: "Yes — click-to-call, WhatsApp conversations and activity logging inside the CRM." },
    ],
  },
  {
    slug: "zoho-books", group: "Zoho", name: "Zoho Books / Finance Suite",
    tagline: "Finance that closes the loop with sales.",
    value: "Billing, receivables, expenses and compliance wired directly to your sales motion — like Aileron's 90-day cycle cut to 30.",
    capabilities: ["Invoicing & receivables", "Payment workflows", "Expense control", "CRM–finance sync"],
    proof: ["Aileron Travels", "CZAR HOMES"],
    faqs: [
      { q: "Can Zoho Books connect to our CRM?", a: "Yes — quotes, invoices and payment status sync so sales and finance share one truth." },
    ],
  },
  {
    slug: "zoho-creator", group: "Zoho", name: "Zoho Creator",
    tagline: "Custom apps, without the custom timeline.",
    value: "Low-code portals, field apps and internal tools — built on Creator and Deluge, integrated with your suite.",
    capabilities: ["Customer portals", "Field-force apps", "Internal tools", "Deluge automation"],
    proof: ["Unicrete Building Solutions", "Docura"],
    faqs: [
      { q: "When is Creator better than a custom-coded app?", a: "When speed, Zoho-native integration and maintainability matter more than exotic custom UI." },
    ],
  },
  {
    slug: "zoho-desk", group: "Zoho", name: "Zoho Desk / Service Suite",
    tagline: "Support that retains revenue.",
    value: "Ticketing, SLAs, knowledge base and happiness metrics — connected to CRM so support context drives retention.",
    capabilities: ["Ticketing & SLAs", "Knowledge base", "CRM-linked context", "Happiness analytics"],
    proof: ["Tap Health", "Purecopia"],
    faqs: [{ q: "Does Desk integrate with our CRM data?", a: "Yes — agents see customer, deal and history context on every ticket." }],
  },
  {
    slug: "bigin", group: "Zoho", name: "Bigin",
    tagline: "Pipeline CRM for teams that move fast.",
    value: "Bigin's focused pipelines for small teams — set up, automated and adopted in weeks, not quarters.",
    capabilities: ["Pipeline setup", "Stage automation", "Email & telephony", "Migration from sheets"],
    proof: ["CraftsAQ", "Royal Touch Interiors"],
    faqs: [{ q: "Is Bigin right for us, or do we need Zoho CRM?", a: "If you need focused pipelines without enterprise complexity, Bigin. We assess fit before recommending either." }],
  },
  {
    slug: "performance-marketing", group: "Growth", name: "Performance Marketing",
    tagline: "Full-funnel growth, measured in revenue.",
    value: "Paid search, social and marketplaces managed against ROAS and CAC — Docura's ROAS moved 1.34 → 3.04.",
    capabilities: ["Paid search & social", "Marketplace growth", "CRO", "Attribution & reporting"],
    proof: ["Docura", "AVS Herbal", "Purecopia"],
    faqs: [
      { q: "Which channels do you manage?", a: "Google, Meta, marketplaces and affiliates — chosen per unit economics, not habit." },
      { q: "How do you report?", a: "Revenue-first dashboards: spend, ROAS, CAC and pipeline contribution — no vanity metrics." },
    ],
  },
  {
    slug: "marketing-suite", group: "Growth", name: "Marketing Suite",
    tagline: "Automation across the whole lifecycle.",
    value: "Lead capture, nurture journeys, WhatsApp automation and scoring — Tap Health recovered 90% of lost leads.",
    capabilities: ["Lead capture & scoring", "Nurture journeys", "WhatsApp automation", "Campaign analytics"],
    proof: ["Tap Health", "Mon Ami Foundation", "Aileron Travels"],
    faqs: [{ q: "Can you automate our WhatsApp follow-ups?", a: "Yes — compliant WhatsApp journeys for capture, nurture, reminders and recovery." }],
  },
  {
    slug: "fractional-cmo", group: "Growth", name: "Fractional CMO",
    tagline: "Senior marketing leadership, on demand.",
    value: "Strategy, team leadership and agency orchestration from operators who have scaled brands — without the full-time cost.",
    capabilities: ["Growth strategy", "Team leadership", "Budget governance", "Board-ready reporting"],
    proof: ["Docura", "The Financial Mall"],
    faqs: [{ q: "How is a Fractional CMO engagement structured?", a: "A weekly operating cadence with your team plus quarterly growth planning — scoped to your stage." }],
  },
  {
    slug: "website-development", group: "Digital", name: "Website Development",
    tagline: "Premium websites engineered to convert.",
    value: "Editorial design, performance budgets and enquiry flows — sites that sell, not just showcase.",
    capabilities: ["UX & art direction", "High-performance builds", "Enquiry & booking flows", "Analytics & SEO foundations"],
    proof: ["CZAR HOMES", "RealBetter", "Royal Touch Interiors"],
    faqs: [
      { q: "Do you redesign existing websites?", a: "Yes — audits first, then rebuilds focused on conversion, speed and maintainability." },
      { q: "Will our marketing team be able to update content?", a: "Yes — structured, editable content without developer dependency." },
    ],
  },
  {
    slug: "application-development", group: "Digital", name: "Application Development",
    tagline: "Custom products, portals and platforms.",
    value: "From D2C laundry tech to field-force systems — custom applications designed, built and scaled by 50+ developers & creatives.",
    capabilities: ["Product strategy", "Portals & platforms", "Integrations & APIs", "Scale & support"],
    proof: ["Unicrete Building Solutions", "Tap Health"],
    faqs: [{ q: "Do you build on Zoho Creator or custom stacks?", a: "Both — Creator where it fits, custom engineering where differentiation demands it." }],
  },
];

export const ZOHO = {
  kicker: "Zoho ecosystem",
  title: "One connected operating system for your business.",
  lede: "CTS positions Zoho as the business OS — and connects every module into one governed, automated whole.",
  apps: ["CRM", "Sales", "Marketing", "Finance", "Support", "Automation", "Analytics"],
  industries: ["Professional Services", "Wholesale & Distribution", "Retail", "IT & Technology"],
};

export const RESULTS = {
  kicker: "Results",
  title: "Outcomes, not activity.",
  stats: [
    { value: 500, suffix: "+", label: "Projects delivered" },
    { value: 135, suffix: "+", label: "Clients" },
    { value: 90, suffix: "%", label: "Retention" },
    { value: 50, suffix: "+", label: "Developers & Creatives" },
    { value: 8, suffix: "+", label: "Years Experience" },
  ],
};

export const CASE_FILTERS = ["All", "Zoho", "Marketing", "Technology", "Automation"];

export const CASES = [
  {
    slug: "docura", client: "Docura", industry: "Healthcare", category: "Marketing",
    challenge: "Ad spend was scaling but efficiency was collapsing — acquisition costs rising, attribution unclear.",
    solution: "Full-funnel performance marketing with creative testing sprints, feed optimization and revenue-first reporting.",
    result: "12.4X sales growth · ROAS 1.34 → 3.04",
    metric: "12.4X", metricLabel: "sales growth",
  },
  {
    slug: "tap-health", client: "Tap Health", industry: "HealthTech", category: "Automation",
    challenge: "High-intent leads were slipping through manual follow-ups across calls, WhatsApp and front-desk.",
    solution: "Automated lead capture, instant WhatsApp journeys, CRM routing and recovery sequences.",
    result: "90% lead recovery",
    metric: "90%", metricLabel: "lead recovery",
  },
  {
    slug: "unicrete", client: "Unicrete Building Solutions", industry: "Manufacturing", category: "Zoho",
    challenge: "A distributed field team ran on calls and sheets — zero pipeline visibility for leadership.",
    solution: "Zoho CRM with a Creator field app: attendance, beat plans, order booking and live dashboards.",
    result: "100+ field representatives connected through CRM",
    metric: "100+", metricLabel: "field reps on CRM",
  },
  {
    slug: "aileron-travels", client: "Aileron Travels", industry: "Travel", category: "Zoho",
    challenge: "Receivables stretched across a 90-day payment cycle, choking working capital.",
    solution: "Zoho Books + CRM payment workflows: automated invoicing, reminders and collector queues.",
    result: "Payment cycle 90 days → 30 days",
    metric: "90→30", metricLabel: "day payment cycle",
  },
  {
    slug: "mon-ami", client: "Mon Ami Foundation", industry: "NGO", category: "Marketing",
    challenge: "A mission-driven organization with fragmented donor outreach and no nurture system.",
    solution: "Marketing suite: donor journeys, campaign automation and engagement analytics.",
    result: "Connected donor journeys with measurable engagement",
    metric: "360°", metricLabel: "donor view",
  },
  {
    slug: "craftsaq", client: "CraftsAQ", industry: "E-Commerce", category: "Technology",
    challenge: "Artisan commerce needed a digital backbone — catalog, enquiries and order flow in one place.",
    solution: "Application + pipeline setup connecting storefront enquiries to a governed sales process.",
    result: "Unified enquiry-to-order pipeline",
    metric: "1", metricLabel: "connected pipeline",
  },
  {
    slug: "avs-herbal", client: "AVS Herbal", industry: "E-Commerce", category: "Marketing",
    challenge: "A heritage Ayurvedic brand underperforming on D2C and marketplaces.",
    solution: "Performance marketing across search, social and marketplaces with CRO on the storefront.",
    result: "Scaled D2C revenue with improving ROAS",
    metric: "3X", metricLabel: "D2C scale-up",
  },
  {
    slug: "purecopia", client: "Purecopia", industry: "E-Commerce", category: "Marketing",
    challenge: "Sampling-led growth without retention mechanics or service infrastructure.",
    solution: "Marketing automation plus Desk-powered support for repeat purchase journeys.",
    result: "Repeat-purchase engine with service backbone",
    metric: "2X", metricLabel: "repeat rate lift",
  },
  {
    slug: "royal-touch", client: "Royal Touch Interiors", industry: "Interior Design", category: "Zoho",
    challenge: "High-ticket interior projects tracked across notebooks, calls and memory.",
    solution: "Bigin pipelines for site visits, quotations and project stages with automated follow-ups.",
    result: "Every site visit tracked to closure",
    metric: "100%", metricLabel: "visit tracking",
  },
  {
    slug: "czar-homes", client: "CZAR HOMES", industry: "Real Estate", category: "Technology",
    challenge: "Premium inventory presented like commodity listings; enquiries leaked between channels.",
    solution: "Editorial website with governed enquiry flows synced to CRM and automated nurture.",
    result: "Cinematic listings with zero-leak enquiry capture",
    metric: "0", metricLabel: "leaked enquiries",
  },
  {
    slug: "financial-mall", client: "The Financial Mall", industry: "Wealth Management", category: "Automation",
    challenge: "Advisors juggled prospects across tools with no scoring or review discipline.",
    solution: "CRM with lead scoring, review reminders and advisor dashboards.",
    result: "Scored pipeline with review discipline",
    metric: "4X", metricLabel: "review adherence",
  },
  {
    slug: "realbetter", client: "RealBetter", industry: "Real Estate", category: "Technology",
    challenge: "Proptech ambition without a connected sales and inventory system.",
    solution: "Zoho-backed inventory, matching and follow-up automation with a conversion-led web presence.",
    result: "Inventory-to-closure system, live",
    metric: "Live", metricLabel: "matching engine",
  },
];

export const PROCESS = [
  { n: "01", name: "Discover", desc: "Understand business, systems and bottlenecks." },
  { n: "02", name: "Architect", desc: "Design the technology, automation and growth ecosystem." },
  { n: "03", name: "Implement", desc: "Deploy systems, integrations and campaigns." },
  { n: "04", name: "Optimize", desc: "Measure performance and continuously improve." },
  { n: "05", name: "Scale", desc: "Build repeatable, automated growth systems." },
];

export const STORY = {
  kicker: "Company story",
  title: "Silicon Valley-backed. Built for ambitious businesses.",
  lede: "Born at UC Berkeley SkyDeck, CTS blends consulting rigor with studio craft — 80 years of combined leadership experience across brands like Dulux, Airtel, Havells, Centuryply and Dalmia Cement, plus proprietary D2C laundry technology experience.",
  schools: ["UC Berkeley", "XLRI", "MIT", "Manipal", "SRM"],
  brands: ["Dulux", "Airtel", "Havells", "Centuryply", "Dalmia Cement"],
  timeline: [
    { year: "Foundation", text: "CTS founded to connect technology with revenue outcomes." },
    { year: "2022", text: "Fastest Emerging Partner — Zoho recognizes the trajectory." },
    { year: "2023", text: "Zoho Partner of the Year; SkyDeck and accelerator backing." },
    { year: "2024", text: "Zoho Partner of the Year again — Top 10% Zoho Growth Partner." },
    { year: "Today", text: "135+ companies, 500+ projects, 90% retention — and scaling." },
  ],
};

export const INDUSTRIES = [
  { name: "Real Estate", challenges: "Leaked enquiries, channel chaos, slow site-visit follow-up.", services: "CRM, Website, Marketing Suite", solution: "Zero-leak enquiry capture with automated nurture to site visit." },
  { name: "Healthcare", challenges: "Manual front-desk follow-up, lost high-intent leads.", services: "Automation, Zoho CRM, Desk", solution: "Instant journeys + recovery sequences — Tap Health hit 90% lead recovery." },
  { name: "Manufacturing", challenges: "Distributed field teams, no pipeline visibility.", services: "Zoho CRM, Creator apps", solution: "100+ reps connected through one CRM with live dashboards." },
  { name: "Travel", challenges: "Long receivables cycles, working-capital strain.", services: "Zoho Books, CRM workflows", solution: "Payment cycle cut from 90 days to 30." },
  { name: "E-Commerce", challenges: "Rising CAC, weak retention, attribution fog.", services: "Performance Marketing, Automation", solution: "Revenue-first media with repeat-purchase engines." },
  { name: "Professional Services", challenges: "Referral dependence, inconsistent pipeline.", services: "CRM, Marketing Suite", solution: "Governed pipeline with always-on nurture." },
  { name: "Interior Design", challenges: "High-ticket tracking across notebooks and memory.", services: "Bigin, Automation", solution: "Every site visit tracked to closure." },
  { name: "Wealth Management", challenges: "No scoring, weak review discipline.", services: "CRM, Automation", solution: "Scored pipeline with review cadence." },
  { name: "NGOs", challenges: "Fragmented donor outreach, no nurture.", services: "Marketing Suite, Automation", solution: "Connected donor journeys with measurable engagement." },
  { name: "Technology", challenges: "Tool sprawl, sales-marketing misalignment.", services: "Zoho One, Integrations", solution: "One operating system across GTM." },
];

export const INSIGHT_CATS = ["Operations & Automation", "Marketing Automation", "CRM & Automation", "AI & Agentic Systems", "Growth"];

export const INSIGHTS = [
  {
    slug: "laundry-without-tech", title: "Scaling a Laundry Business Without Tech", category: "Operations & Automation",
    excerpt: "What our proprietary D2C laundry experience taught us about operations that scale — and where technology pays first.",
    body: ["Laundry looks simple until you run fifty routes a day. Then every handoff — pickup, tagging, washing, QC, delivery — becomes a failure point.", "Our D2C laundry technology experience taught us a strict order: stabilize the physical SOP, instrument it with lightweight apps, then automate. Technology amplifies process; it never replaces it.", "The highest-ROI first moves were route visibility, exception alerts and a single customer thread across calls and WhatsApp. The same pattern applies to manufacturing beats, service visits and field sales."],
  },
  {
    slug: "whatsapp-lead-capture", title: "Automating Lead Capture via WhatsApp", category: "Marketing Automation",
    excerpt: "Speed-to-lead wins. Here's the compliant WhatsApp architecture behind 90% lead recovery.",
    body: ["Leads decay in minutes, not days. The architecture: instant acknowledgement, qualification inside the chat, CRM creation with source stamp, and human handoff with full context.", "Compliance first — opt-ins, templates and quiet hours are non-negotiable. Then build recovery: no-response nudges, missed-call-to-WhatsApp flows and dormant-lead reactivation.", "Measure reply time, qualification rate and recovery rate. Everything else is decoration."],
  },
  {
    slug: "zoho-data-silo", title: "Why Your Zoho CRM Is a Data Silo", category: "CRM & Automation",
    excerpt: "A CRM disconnected from marketing, finance and support is just an expensive address book.",
    body: ["Most Zoho CRMs we audit hold 30% of the customer story. Marketing engagement lives in another tool, invoices in another, tickets in a third.", "The fix is integration architecture: sync marketing engagement to contact timelines, invoice status to deal records, ticket sentiment to account health.", "When the CRM becomes the system of record — fed by every function — forecasting stops being fiction."],
  },
  {
    slug: "fragmented-systems", title: "Stop Losing Revenue to Fragmented Systems", category: "Growth",
    excerpt: "Excel, WhatsApp, disconnected CRM, manual follow-ups: the hidden tax on growth — and the system that replaces it.",
    body: ["Fragmentation taxes you three times: leads leak between tools, teams duplicate work, and leadership decides on stale data.", "The replacement is a connected revenue system: one CRM, automated capture and follow-up, finance wired to sales, analytics on top.", "Start with the money path — enquiry to cash — then expand. Aileron's 90→30-day payment cycle came from fixing exactly that path."],
  },
  {
    slug: "founder-vs-product-brand", title: "Founder Brand vs Product Brand", category: "Growth",
    excerpt: "For SMEs and D2C, the founder is often the highest-converting channel. Here's how to run both brands.",
    body: ["Buyers trust faces before logos. A visible founder compresses consideration — especially in services, wealth and interiors.", "The operating rule: founder brand carries point of view; product brand carries proof. Never let one starve the other.", "Systematize it: one flagship channel, repurposed everywhere, measured on pipeline — not likes."],
  },
  {
    slug: "cts-echo", title: "CTS Echo — AI-Powered B2B Lead Generation", category: "AI & Agentic Systems",
    excerpt: "Agentic prospecting with human judgment at the gates: how we think about AI-led pipeline.",
    body: ["AI finds patterns; humans close trust. Echo-style systems research accounts, draft personalization and score fit — SDRs approve and engage.", "Guardrails matter: verified data only, transparent sourcing, and unsubscribe discipline. Automation without manners burns markets.", "The metric is sales-accepted pipeline per dollar, not email volume."],
  },
  {
    slug: "marketing-automation-growth", title: "Unlocking Growth with Marketing Automation", category: "Marketing Automation",
    excerpt: "Nurture, scoring and lifecycle automation: the compounding layer most SMEs skip.",
    body: ["Paid media rents attention; automation compounds it. Every lead should enter a scored, nurtured lifecycle on day zero.", "Build in this order: capture → acknowledge → qualify → nurture → alert sales → recover. Each stage instrumented.", "Review quarterly. Journeys decay as markets shift — automation is gardening, not construction."],
  },
  {
    slug: "death-best-of-breed", title: "The Death of the Best-of-Breed Era", category: "Operations & Automation",
    excerpt: "Twelve brilliant tools, zero shared truth. Why suites — governed well — are winning again.",
    body: ["Best-of-breed gave every team their favorite tool and the company twelve subscriptions, five logins and no shared truth.", "The pendulum swings to suites: 80% of needs in one system, best-of-breed only at true differentiation points.", "This is the Zoho One thesis — one connected operating system, governed, automated, adopted."],
  },
];

export const FAQS = [
  { q: "What does CTS actually do?", a: "CTS (Cleanomatics Tech Solutions) is an Authorized Zoho Partner and growth consultancy. We implement Zoho, automate revenue systems, build websites and applications, run performance marketing and offer Fractional CMO leadership." },
  { q: "What does a Zoho One implementation cost and how long does it take?", a: "Typical implementations run 6–12 weeks. Cost depends on modules, data migration and integrations — book a consultation for a scoped proposal. We never invent pricing without understanding your systems." },
  { q: "We already use Zoho. Can you fix or extend our setup?", a: "Yes. Audits, cleanup, re-architecture, integrations and adoption programs for existing Zoho environments are core engagements." },
  { q: "Do you work with our industry?", a: "We serve real estate, healthcare, manufacturing, travel, e-commerce, professional services, interiors, wealth management, NGOs and technology — plus SMEs and mid-market teams generally." },
  { q: "How do performance marketing engagements work?", a: "Revenue-first: audit, tracking fix, creative sprints, scaled spend against ROAS/CAC targets with transparent reporting." },
  { q: "Where is CTS located?", a: "India + Global. We work with ambitious businesses across India and worldwide." },
];

export const ROI_COPY = {
  kicker: "ROI experience",
  title: "Estimate your upside.",
  lede: "A directional model — move the sliders and see what connected follow-up could be worth. All outputs are estimates, never guarantees.",
  disclaimer: "Illustrative estimates only. Actual results depend on execution, market and offer. Not a promise of returns.",
};

export const ZOEY_INTENTS = [
  { keys: ["crm", "zoho crm", "pipeline", "sales"], answer: "CTS implements Zoho CRM end-to-end — pipeline design, automation, forecasting, WhatsApp/telephony integrations and migration. Unicrete connected 100+ field reps through it. Want the details?", link: "/services/zoho-crm" },
  { keys: ["zoho one", "suite", "operating system"], answer: "Zoho One unifies CRM, finance, marketing, support, HR and analytics. Typical CTS implementation: 6–12 weeks with training. Shall I point you to the consultation?", link: "/services/zoho-one" },
  { keys: ["book", "account", "finance", "invoice", "payment"], answer: "Zoho Books + CRM payment workflows cut Aileron Travels' payment cycle from 90 days to 30. Finance wired to sales is the whole game.", link: "/services/zoho-books" },
  { keys: ["market", "roas", "ads", "lead", "growth"], answer: "Our performance marketing is revenue-first — Docura grew 12.4X with ROAS 1.34 → 3.04 — and marketing automation recovered 90% of Tap Health's leads.", link: "/services/performance-marketing" },
  { keys: ["website", "web", "site"], answer: "We build premium, conversion-led websites — like CZAR HOMES' zero-leak enquiry system. What kind of site are you thinking about?", link: "/services/website-development" },
  { keys: ["app", "application", "portal", "software", "creator"], answer: "From Zoho Creator field apps to custom platforms — our 50+ developers & creatives build portals, products and integrations.", link: "/services/application-development" },
  { keys: ["cmo", "fractional", "strategy", "leader"], answer: "A Fractional CMO gives you senior growth leadership without the full-time cost — strategy, team leadership and board-ready reporting.", link: "/services/fractional-cmo" },
  { keys: ["price", "cost", "pricing", "charge"], answer: "We scope honestly — Zoho One implementations typically run 6–12 weeks, but pricing always follows a systems audit. Book a free consultation for a real number.", link: "/contact" },
  { keys: ["contact", "call", "talk", "meet", "consult"], answer: "You can book a free consultation right here — it takes two minutes and we'll come prepared.", link: "/contact" },
  { keys: ["career", "job", "hiring", "work with"], answer: "We'd love to hear from you — our careers page has the culture, values and the talent community.", link: "/careers" },
];
export const ZOEY_FALLBACK = "Good question — a consultant can answer that precisely. Book a free consultation and we'll come prepared.";

export const WIZARD = {
  needs: ["Zoho", "CRM", "Marketing", "Website", "Application", "Automation", "Fractional CMO", "Other"],
  budgets: ["< ₹1L", "₹1–5L", "₹5–20L", "₹20L+", "Not sure yet"],
  timelines: ["ASAP", "1–2 months", "3–6 months", "Exploring"],
};

export const ABOUT = {
  heroTitle: "A consultancy with a builder's hands.",
  origin: "Silicon Valley-backed. Born at UC Berkeley SkyDeck. CTS was founded on a simple observation: ambitious businesses don't need more software — they need connected revenue systems.",
  leadership: "80 years of combined leadership experience across Dulux, Airtel, Havells, Centuryply and Dalmia Cement — operators, not just advisors — plus proprietary D2C laundry technology experience that keeps us honest about operations.",
  culture: ["Precision over volume", "Revenue over vanity", "Adoption over installation", "Craft over templates"],
};

export const CAREERS = {
  title: "Build revenue systems that matter.",
  lede: "Life at CTS is consulting rigor plus studio craft. Values, benefits and open roles below — or join the talent community and we'll reach out when there's a fit.",
  values: [
    { name: "Precision", desc: "Every implementation argued for, every automation earned." },
    { name: "Ownership", desc: "You own outcomes, not tickets." },
    { name: "Curiosity", desc: "Zoho, AI, growth — we learn in public." },
    { name: "Craft", desc: "Internal quality bar: would this impress a CTO?" },
  ],
  benefits: ["Hybrid flexibility", "Learning budget", "Zoho certifications", "Accelerator network", "Growth-linked rewards"],
  openings: [],
};

export const FOOTER = {
  statement: "Authorized Zoho Partner + strategic growth consultancy. Architecting revenue ecosystems for ambitious businesses.",
  cols: [
    { title: "Services", links: [{ label: "Zoho One", to: "/services/zoho-one" }, { label: "Zoho CRM", to: "/services/zoho-crm" }, { label: "Performance Marketing", to: "/services/performance-marketing" }, { label: "Websites", to: "/services/website-development" }, { label: "All services", to: "/services" }] },
    { title: "Company", links: [{ label: "About", to: "/about" }, { label: "Case Studies", to: "/case-studies" }, { label: "Insights", to: "/insights" }, { label: "Careers", to: "/careers" }, { label: "Contact", to: "/contact" }] },
    { title: "Legal", links: [{ label: "Privacy Policy", to: "/contact" }, { label: "Terms", to: "/contact" }, { label: "Cookie Policy", to: "/contact" }] },
  ],
  finalCta: "Build what comes next.",
};
