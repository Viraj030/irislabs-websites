export type Currency = "USD" | "INR";

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export const ABOUT = {
  headline:
    "We build the site, the systems behind it, and the reporting that tells you it's working.",
  subhead:
    "IrisLabs is a Mumbai-based product studio. We design, build and automate the systems a business runs on — storefronts, web platforms, internal tooling and AI agents.",
  body: [
    "Growth usually stalls in one of three places. Traffic arrives and the site doesn't convert it. Orders come in and everything behind them is still done by hand. The data exists and nobody can point to the decision it should drive.",
    "They look like three problems. They're one problem: the layers of the business were built at different times, by different people, and never wired to each other.",
  ],
  stats: [
    { figure: "~7 yrs", label: "Combined production experience" },
    { figure: "10", label: "Services across three pillars" },
    { figure: "Mumbai", label: "Clients across the US and India" },
  ],
} as const;

export const LAYERS = [
  {
    n: "01",
    name: "Surface",
    lede: "What your customer meets.",
    body: "Interface, storefront, page speed, the path to checkout or enquiry. Designed to convert and instrumented from the first day it's live.",
  },
  {
    n: "02",
    name: "Machine",
    lede: "What happens after the click.",
    body: "Backend, integrations, cloud infrastructure, and the automations and AI agents that take over the recurring work your team is doing manually today.",
  },
  {
    n: "03",
    name: "Signal",
    lede: "What tells you it's working.",
    body: "Analytics, attribution, dashboards and models, so the next round of spend is decided by evidence.",
  },
] as const;

export const APPROACH = [
  {
    title: "Start at the number.",
    body: "Every engagement opens by naming the metric the project exists to move. Scope follows from that, not from a feature list.",
  },
  {
    title: "Instrument before optimising.",
    body: "Nothing gets tuned until it can be measured. Guesswork is the most expensive line item in a project.",
  },
  {
    title: "Ship in layers, not in one launch.",
    body: "Surface goes live and starts earning while the machine behind it is built out.",
  },
  {
    title: "Automate what repeats.",
    body: "If your team does it weekly, it's a candidate for an agent or a workflow — that's where the compounding returns are.",
  },
  {
    title: "Hand over full ownership.",
    body: "Documented, deployable, in your accounts. The system runs whether or not we're still on it.",
  },
] as const;

const GOLD = "var(--color-gold)";
const HI = "var(--color-hi)";
const MID = "var(--color-mid)";

export const FOUNDERS = [
  {
    name: "Sharva Patil",
    role: "Founder — Product & AI Engineering",
    photo: "/team/sharva-patil-v2.jpg" as string | null,
    bio: "Full-stack developer turned data analyst turned AI engineer. Owns product strategy, technical architecture and the studio's AI practice — agent harnesses, RAG pipelines and automation workflows.",
    linkedin: "https://www.linkedin.com/in/sharva-patil-579b11231/",
    github: "https://github.com/Sharva2003",
    experience: [
      { period: "Aug 2026 —", role: "Founder", org: "IrisLabs" },
      { period: "Jan 2025 —", role: "Founder", org: "Crux Entertainment" },
      { period: "2024 — 2025", role: "Data Analyst", org: "Matter-Matrix Makers" },
      { period: "2022 — 2024", role: "Web Developer", org: "Independent / freelance" },
    ],
    terminal: [
      { t: "$ cat sharva.profile", c: GOLD, d: 22 },
      { t: "", c: MID, d: 0 },
      { t: "ROLE   Founder · Product & AI", c: HI, d: 9 },
      { t: "FOCUS  agents · RAG · automation", c: HI, d: 9 },
      { t: "STACK  Python · SQL · Next.js", c: HI, d: 9 },
      { t: "", c: MID, d: 0 },
      { t: "TRACK  5M+ records modelled", c: MID, d: 8 },
      { t: "       >90% forecast accuracy", c: MID, d: 8 },
      { t: "       −30% reporting turnaround", c: MID, d: 8 },
    ],
    projects: [
      {
        label: "BreastCancerDetection — Flask + Random Forest, 97.4% accuracy",
        url: "https://github.com/Sharva2003/BreastCancerDetection",
      },
      {
        label: "Sharva2003.github.io — personal site",
        url: "https://github.com/Sharva2003/Sharva2003.github.io",
      },
    ],
  },
  {
    name: "Viraj Asolkar",
    role: "Co-founder — Engineering Lead",
    photo: null as string | null,
    bio: "E-commerce and web engineer. Owns storefront architecture, front-of-site engineering and performance — headless builds, Shopify, React and Next.js.",
    linkedin: "https://www.linkedin.com/in/virajasolkar/",
    github: "https://github.com/Viraj030",
    experience: [
      { period: "Jun 2026 —", role: "Developer", org: "Bombay Blokes Digital Solutions" },
      { period: "2025 — 2026", role: "Web Developer Executive", org: "DigiMag" },
      { period: "2024 — 2025", role: "Frontend Developer, intern", org: "DigiMag" },
      { period: "2023", role: "Frontend Developer, intern", org: "Goldberries Technologies" },
    ],
    terminal: [
      { t: "$ cat viraj.profile", c: GOLD, d: 22 },
      { t: "", c: MID, d: 0 },
      { t: "ROLE   Co-founder · Engineering", c: HI, d: 9 },
      { t: "FOCUS  storefronts · performance", c: HI, d: 9 },
      { t: "STACK  React · Next.js · Shopify", c: HI, d: 9 },
      { t: "", c: MID, d: 0 },
      { t: "TRACK  Shopify · Liquid · APIs", c: MID, d: 8 },
      { t: "       headless + custom builds", c: MID, d: 8 },
      { t: "       Core Web Vitals · tech SEO", c: MID, d: 8 },
    ],
    projects: [
      {
        label: "SaySpeech — interactive speech therapy games (Next.js)",
        url: "https://github.com/Viraj030/SaySpeech-Articulation",
      },
      {
        label: "Chatterbox Weddings — bespoke wedding stationery site",
        url: "https://github.com/Viraj030/cblabel-weading",
      },
      {
        label: "Sip & Share — recipe search + social sharing (React + Firebase)",
        url: "https://github.com/Viraj030/Sip-Share",
      },
      {
        label: "Health Assistant — health monitoring with data analysis + ML",
        url: "https://github.com/Viraj030/Health-Assistant",
      },
    ],
  },
] as const;

export const PILLARS = [
  {
    index: "01",
    tag: "LEAD OFFER",
    name: "AI & Software",
    services: [
      "AI automations",
      "RAG systems",
      "AI agent setups",
      "SAAS development",
    ],
    lead: true,
    scope: [
      { t: "$ irislabs scope --ai", c: GOLD, d: 20 },
      { t: "", c: MID, d: 0 },
      { t: "SERVICES   automations · RAG", c: HI, d: 9 },
      { t: "           agents · SAAS", c: HI, d: 9 },
      { t: "", c: MID, d: 0 },
      { t: "IN SCOPE   process mapping", c: MID, d: 8 },
      { t: "           pipeline + model choice", c: MID, d: 8 },
      { t: "           integration with your stack", c: MID, d: 8 },
      { t: "           eval harness + guardrails", c: MID, d: 8 },
      { t: "", c: MID, d: 0 },
      { t: "DELIVERED  staging URL + repo", c: HI, d: 8 },
      { t: "           runbook.md", c: HI, d: 8 },
      { t: "           30-day support window", c: HI, d: 8 },
    ],
  },
  {
    index: "02",
    tag: "02",
    name: "Ecommerce",
    services: [
      "Ecommerce development",
      "Shopify store development",
      "WordPress site development",
      "Ecommerce CRO",
    ],
    lead: false,
    scope: [
      { t: "$ irislabs scope --ecommerce", c: GOLD, d: 20 },
      { t: "", c: MID, d: 0 },
      { t: "SERVICES   Shopify · WordPress", c: HI, d: 9 },
      { t: "           storefronts · CRO", c: HI, d: 9 },
      { t: "", c: MID, d: 0 },
      { t: "IN SCOPE   storefront architecture", c: MID, d: 8 },
      { t: "           theme or headless build", c: MID, d: 8 },
      { t: "           payment · shipping · CRM", c: MID, d: 8 },
      { t: "           Core Web Vitals pass", c: MID, d: 8 },
      { t: "", c: MID, d: 0 },
      { t: "DELIVERED  staging URL + repo", c: HI, d: 8 },
      { t: "           runbook.md", c: HI, d: 8 },
      { t: "           30-day support window", c: HI, d: 8 },
    ],
  },
  {
    index: "03",
    tag: "03",
    name: "Design & Web",
    services: ["UI/UX design and development", "Web development"],
    lead: false,
    scope: [
      { t: "$ irislabs scope --design", c: GOLD, d: 20 },
      { t: "", c: MID, d: 0 },
      { t: "SERVICES   UI/UX design + build", c: HI, d: 9 },
      { t: "           web development", c: HI, d: 9 },
      { t: "", c: MID, d: 0 },
      { t: "IN SCOPE   design system + components", c: MID, d: 8 },
      { t: "           responsive build", c: MID, d: 8 },
      { t: "           WCAG 2.1 AA pass", c: MID, d: 8 },
      { t: "           analytics instrumented", c: MID, d: 8 },
      { t: "", c: MID, d: 0 },
      { t: "DELIVERED  staging URL + repo", c: HI, d: 8 },
      { t: "           runbook.md", c: HI, d: 8 },
      { t: "           30-day support window", c: HI, d: 8 },
    ],
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Scope call",
    body: "Ninety minutes on your actual process. We map what is manual, what it costs, and what is worth automating first.",
    deliverable: "scope-note.pdf",
  },
  {
    n: "02",
    title: "Fixed-scope build",
    body: "One deliverable, agreed price, agreed date. You see working software in week one, not a status update.",
    deliverable: "staging URL + repo access",
  },
  {
    n: "03",
    title: "Wire it in",
    body: "Connected to the systems you already run. Credentials yours, data yours, nothing hostage.",
    deliverable: "runbook.md",
  },
  {
    n: "04",
    title: "Hand over",
    body: "Your team drives it. We stay reachable for a fixed window, then you either extend or you do not.",
    deliverable: "30-day support window",
  },
] as const;

export const TERMINAL_LINES = [
  { t: "$ irislabs engage --scope=ai-automation", c: "var(--color-gold)", d: 26 },
  { t: "", c: "var(--color-mid)", d: 0 },
  { t: "→ mapping current process ......... 14 manual steps", c: "var(--color-mid)", d: 11 },
  { t: "→ identifying candidates .......... 6 automatable", c: "var(--color-mid)", d: 11 },
  { t: "→ estimating recovered hours ...... 22 hrs / week", c: "var(--color-signal)", d: 11 },
  { t: "", c: "var(--color-mid)", d: 0 },
  { t: "DELIVERABLE  scope-note.pdf", c: "var(--color-hi)", d: 14 },
  { t: "PRICE        fixed, agreed pre-build", c: "var(--color-hi)", d: 14 },
  { t: "TIMELINE     2-4 weeks", c: "var(--color-hi)", d: 14 },
  { t: "OWNERSHIP    yours on delivery", c: "var(--color-hi)", d: 14 },
  { t: "", c: "var(--color-mid)", d: 0 },
] as const;

export const PROOF = [
  {
    tag: "ECOMMERCE",
    projects: [
      { url: "https://foodearth.com/en-in", domain: "foodearth.com", image: "/previews/foodearth.com.jpg" },
      { url: "https://shop.kemeiprofessionals.com/", domain: "shop.kemeiprofessionals.com", image: "/previews/shop.kemeiprofessionals.com.jpg" },
      { url: "https://derivecurates.com/", domain: "derivecurates.com", image: "/previews/derivecurates.com.jpg" },
      { url: "https://shahiriwayat.com/", domain: "shahiriwayat.com", image: "/previews/shahiriwayat.com.jpg" },
      { url: "https://indianchaska.in/", domain: "indianchaska.in", image: "/previews/indianchaska.in.jpg" },
    ],
  },
  {
    tag: "REACT / NEXT.JS",
    projects: [
      { url: "https://aromascafeandlounge.com/", domain: "aromascafeandlounge.com", image: "/previews/aromascafeandlounge.com.jpg" },
      { url: "https://www.kemeiprofessionals.com/", domain: "kemeiprofessionals.com", image: "/previews/kemeiprofessionals.com.jpg" },
    ],
  },
  {
    tag: "PHP",
    projects: [
      { url: "https://mmcgym.in/", domain: "mmcgym.in", image: "/previews/mmcgym.in.jpg" },
      { url: "https://www.finlitinstitute.com/", domain: "finlitinstitute.com", image: "/previews/finlitinstitute.com.jpg" },
      { url: "https://alkumfoundation.com/", domain: "alkumfoundation.com", image: "/previews/alkumfoundation.com.jpg" },
    ],
  },
  {
    tag: "PHP + BACKEND",
    projects: [
      { url: "https://spectron.in/", domain: "spectron.in", image: "/previews/spectron.in.jpg" },
      { url: "https://anchorvishal.com/", domain: "anchorvishal.com", image: "/previews/anchorvishal.com.jpg" },
    ],
  },
] as const;

export const PRICING = [
  {
    tag: "01",
    name: "AI & Software",
    rows: [
      { name: "AI automation build", usd: "$2,500", inr: "₹1,50,000" },
      { name: "RAG system", usd: "$4,000", inr: "₹2,50,000" },
      { name: "AI agent setup", usd: "$3,000", inr: "₹1,80,000" },
      { name: "SAAS development", usd: "$8,000", inr: "₹5,00,000" },
    ],
  },
  {
    tag: "02",
    name: "Ecommerce",
    rows: [
      { name: "Ecommerce / Shopify build", usd: "$1,500", inr: "₹90,000" },
      { name: "CRO retainer", usd: "$1,200/mo", inr: "₹75,000/mo" },
    ],
  },
  {
    tag: "03",
    name: "Design & Web",
    rows: [{ name: "UI/UX + web", usd: "$1,200", inr: "₹75,000" }],
  },
] as const;

export const FAQ_GROUPS = [
  {
    tag: "TIMELINE & PROCESS",
    items: [
      {
        q: "How long does a first build take?",
        a: "Two to four weeks for an automation or agent setup. RAG systems run four to six depending on how clean your source documents are. Dates are agreed before invoice, not after.",
      },
      {
        q: "What does the engagement look like week to week?",
        a: "A short async update every Friday and a standing call in your morning. You see the build running in week one, not a status deck.",
      },
    ],
  },
  {
    tag: "PRICING",
    items: [
      {
        q: "Why start at $2,500?",
        a: "Below that the discovery work costs more than the build earns, and the result is a prototype nobody adopts. The floor filters for projects that survive contact with a real team.",
      },
    ],
  },
  {
    tag: "TRUST & IP",
    items: [
      {
        q: "Who owns the code?",
        a: "You do, on delivery. Repo, credentials, infrastructure — transferred to your accounts. No licensing arrangement, no dependency on us to keep it running.",
      },
      {
        q: "You're offshore. What about timezone overlap?",
        a: "Four hours of overlap with US Eastern, committed in writing. Asynchronous by default, with a standing weekly call in your morning.",
      },
    ],
  },
] as const;
