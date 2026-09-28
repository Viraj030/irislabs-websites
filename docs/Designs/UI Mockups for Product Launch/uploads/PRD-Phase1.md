# IrisLabs — Phase 1 PRD

**Product:** IrisLabs marketing site, v1
**Owner:** Sharva
**Date:** 26 Aug 2026
**Status:** Approved for build, 3 items pending input
**Phase:** 1 of 3 (Phase 2 — pillar pages + case studies. Phase 3 — SAAS R&D property.)

---

## 1. Objective

Ship a single landing page that converts US buyers at $2,500+ and Indian buyers at ₹1,50,000+ into booked discovery calls, positioned as an AI build studio rather than a generalist agency.

**Business goal it serves:** close high-ticket projects before end of quarter; reduce inbound for sub-$500 work.

---

## 2. Success metrics

| Metric | Target | Window |
|---|---|---|
| Page live | Yes | 2 Sep 2026 |
| Discovery calls booked | 8 | First 30 days |
| Qualified calls (budget ≥ $2,500 / ₹1,50,000) | ≥ 50% of booked | First 30 days |
| Closed project ≥ $2,500 | 1 | By 30 Sep 2026 |
| Lighthouse performance | ≥ 95 | At launch |
| Time to interactive | < 2.0s on 4G | At launch |

Instrumentation: Vercel Analytics + one conversion event on booking submit. No third-party trackers in v1.

---

## 3. Positioning

**One-line:** IrisLabs builds AI automation, RAG systems and agents for businesses — and designs and ships the product around them.

**Lead offer:** AI automations, RAG systems, AI agent setups.
**Rationale:** least price-anchored category, US budget availability, fewest credible competitors in this bracket, direct bridge to the 2026 SAAS R&D goal.

All ten services remain listed. Only the hero narrative and outbound lead with AI.

**Target buyer:** small-to-large business owners. US primary, India secondary.

---

## 4. Services & pillar structure

Three pillars, not a flat list of ten.

| Pillar | Services |
|---|---|
| **AI & Software** *(lead)* | AI automations · RAG systems · AI agent setups · SAAS development |
| **Ecommerce** | Ecommerce development · Shopify store development · WordPress site development · Ecommerce CRO |
| **Design & Web** | UI/UX design and development · Web development |

Service names are canonical. Do not rename or add without approval.

---

## 5. Page structure

Single scroll. Sections in order:

| # | Section | Purpose | Notes |
|---|---|---|---|
| 1 | Hero | AI-led positioning + primary CTA | Headline, subline, one CTA. No carousel. |
| 2 | Problem framing | Qualify the buyer | 3 lines max — the cost of not automating |
| 3 | Pillars | Show range without diluting | 3 cards, AI first and visually dominant |
| 4 | How we work | Substitute for missing case studies | 4-step process, named deliverables per step |
| 5 | Proof | Credibility | **Blocked — see §8.** Portfolio grid if assets arrive; otherwise capability statements + stack logos |
| 6 | Pricing | Filter and anchor | "Starting from", USD/INR toggle by geo |
| 7 | Risk reversal | Lower call friction | Fixed-scope first engagement, defined deliverable |
| 8 | FAQ | Handle objections pre-call | 5 questions: timeline, process, pricing model, offshore concern, IP ownership |
| 9 | Booking CTA | Convert | Calendar embed or form → email |
| 10 | Footer | Trust | Entity name, Mumbai base, contact |

Mobile-first. Every section legible at 375px.

---

## 6. Pricing display

Anchors only — no full package tiers, no call-only gate.

| Service | From (USD) | From (INR) |
|---|---|---|
| AI automation build | $2,500 | ₹1,50,000 |
| RAG system | $4,000 | ₹2,50,000 |
| AI agent setup | $3,000 | ₹1,80,000 |
| SAAS development | $8,000 | ₹5,00,000 |
| Ecommerce / Shopify build | $1,500 | ₹90,000 |
| CRO retainer | $1,200/mo | ₹75,000/mo |
| UI/UX + web | $1,200 | ₹75,000 |

**Proposed, pending Sharva's approval.** These sit deliberately above the brief's $500 / ₹30,000 floors — advertising the floor attracts the projects Phase 1 is designed to filter out.

---

## 7. Technical specification

| Item | Decision |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Backend | Supabase — only if lead capture stores submissions; otherwise none in v1 |
| Repo | `C:\Users\sharv\Desktop\IrisLabs_Website` (currently empty) |
| Fonts | Self-hosted or Google Fonts, max 2 families |
| Images | next/image, AVIF/WebP, all assets local |
| SEO | Per-section semantic HTML, OG tags, sitemap, robots.txt, JSON-LD Organization + Service |
| Forms | Server action → email; anti-spam via honeypot + rate limit |
| Analytics | Vercel Analytics |
| Accessibility | WCAG 2.1 AA — contrast, focus states, keyboard nav |

**Out of scope for Phase 1:** blog, CMS, client portal, individual pillar pages, multi-language, live chat.

---

## 8. Blockers — input required

| # | Item | Owner | Impact if unresolved |
|---|---|---|---|
| 1 | **Name + domain.** No domain registered. `irislabs.com` and near variants likely taken. | Claude to research, Sharva to approve | Cannot deploy to a real address |
| 2 | **Portfolio assets.** No screenshots, mockups or live URLs collected. | Sharva | §5 Proof ships without a portfolio grid — measurably worse conversion |
| 3 | **Pricing approval.** §6 numbers are proposed. | Sharva | Page cannot ship with placeholder pricing |

Secondary: no logo or brand identity exists. v1 ships with a typographic wordmark; full identity is Phase 2.

**Constraint:** no case studies with metrics exist. Nothing on the page will claim a result that did not happen. Metrics capture begins on the next client project so Phase 2 has real case studies.

---

## 9. Milestones

| Date | Deliverable |
|---|---|
| 26 Aug | PRD approved |
| 27 Aug | Domain shortlist + availability/pricing; positioning and hero copy draft |
| 28 Aug | Full page copy approved; Next.js scaffold pushed |
| 30 Aug | Design and build complete on staging |
| 1 Sep | Content, assets, QA, Lighthouse pass |
| 2 Sep | Live on production domain |
| 3 Sep | Outbound begins pointing at the page |

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| No portfolio → low trust at high price | Process transparency, fixed-scope first engagement, risk reversal in §7 |
| AI-led positioning narrows inbound | Other seven services still listed and indexed |
| Pricing anchors deter early leads | Intended. Review after 30 days against qualified-call rate |
| Site ships, outbound doesn't follow | Phase 1 is not complete until outbound is pointed at it — 3 Sep milestone |
| Domain unavailable at acceptable price | Shortlist of 5+ alternatives before committing to a name |

---

## 11. Definition of done

- Live on production domain, HTTPS, Lighthouse ≥ 95
- All ten services present, three pillars, AI leading
- Pricing anchors visible in USD and INR
- Booking flow tested end-to-end from mobile and desktop
- Analytics recording the conversion event
- No unverified claims anywhere on the page
