# IrisLabs — Design System PRD

**Scope:** Visual identity + website design template, Phase 1
**Owner:** Sharva
**Date:** 26 Aug 2026
**Companion doc:** `PRD-Phase1.md`

---

## 1. Design intent

Elegant, professional, cyberpunk. Three constraints held simultaneously — no one of them may win.

| Trait | Expressed through | Not expressed through |
|---|---|---|
| Elegant | Space, restraint, type hierarchy, slow easing | Ornament, gradients on everything |
| Professional | Grid discipline, contrast, legibility, clear CTAs | Corporate blue, stock photography |
| Cyberpunk | Obsidian ground, gold signal, glitch/scanline detail, terminal motifs, WebGL hero | Neon soup, Blade Runner cliché, chrome bevels |

**Test:** if a section reads as a template with a dark theme applied, it fails. If it reads as spectacle with no message, it also fails.

---

## 2. Logo — Eye of Horus

**Concept:** Eye of Horus reconstructed as a technical artefact — circuit trace, wireframe, or scanline construction. Ancient symbol drawn with modern engineering language.

**Requirements**

| Item | Spec |
|---|---|
| Construction | Geometric, drawn on a visible grid. Vector-native, no raster effects |
| Marks | Full lockup (mark + wordmark), mark alone (favicon/avatar), horizontal lockup |
| Motion state | The mark animates on load — trace-in of the linework, then a single pupil/iris pulse |
| Minimum size | Legible and unambiguous at 24×24px |
| Colour | Single-weight gold on obsidian; must survive 1-colour, inverted, and pure-black-on-white |
| Format | SVG master, optimised paths, no embedded raster |

**Direction candidates** — 3 to be presented, 1 selected:
1. **Circuit** — the Horus brow and teardrop rendered as PCB traces terminating in pads.
2. **Wireframe** — low-poly / topographic contour construction of the eye.
3. **Scanline** — the eye formed only by horizontal raster lines, denser toward the pupil.

**Wordmark:** IRISLABS, uppercase, wide tracking, mono or geometric sans. "IRIS" and "LABS" differentiated by weight, not colour.

---

## 3. Colour

Base: **Obsidian + Horus gold**, with a cyan signal accent used sparingly.

| Token | Value | Use |
|---|---|---|
| `--bg-void` | `#050506` | Page ground |
| `--bg-raise` | `#0C0C0F` | Cards, raised surfaces |
| `--bg-inset` | `#131317` | Inputs, code blocks, insets |
| `--line` | `#22222A` | Hairlines, borders, grid |
| `--text-hi` | `#F2F0EA` | Headings, primary text |
| `--text-mid` | `#A5A29B` | Body |
| `--text-low` | `#6B6862` | Captions, meta |
| `--gold` | `#E8B437` | Primary accent, CTAs, logo |
| `--gold-dim` | `#8A6A1F` | Gold borders, hover grounds |
| `--gold-glow` | `rgba(232,180,55,0.18)` | Bloom, focus rings |
| `--signal` | `#38E1D4` | Live/active states, terminal output, data viz only |
| `--alert` | `#FF4D4D` | Errors only |

**Rules**

- Gold is a signal, not a surface. Maximum one gold element competing for attention per viewport.
- Cyan appears at most 3 times on the page. It marks "live" — nothing else.
- All text/background pairs meet WCAG AA. Gold on obsidian passes at ≥ 16px; below that use `--text-hi`.
- No gradient may exceed 12% luminance travel except inside the WebGL hero.

---

## 4. Typography

| Role | Family | Spec |
|---|---|---|
| Display | Geometric or neo-grotesque sans — candidates: Space Grotesk, Chillax, PP Neue Montreal | 48–120px, tight tracking (−2%), weight 500–700 |
| Body | Same family, or Inter | 16–19px, 1.65 line-height, `--text-mid` |
| Mono | JetBrains Mono / Berkeley Mono | Labels, metadata, pricing, terminal blocks, section numbering |

**Rules**

- Maximum 2 families. Mono is the third only if it earns its weight.
- Every section carries a mono eyebrow label: `01 / CAPABILITIES`.
- Body copy max width 68ch.
- No italics. No letter-spaced body text.

---

## 5. Layout

| Item | Spec |
|---|---|
| Grid | 12 column, 1440px max, 24px gutter. Content max 1200px |
| Spacing scale | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 |
| Section rhythm | 128px desktop, 72px mobile |
| Breakpoints | 375 / 768 / 1024 / 1440 |
| Structural motif | A faint 1px grid overlay (`--line` at 30%) visible at section transitions — the page reads as an engineering drawing |
| Corners | 2px radius maximum. Sharp is the default |
| Borders | 1px hairline, never shadowed. Depth comes from value, not blur |

---

## 6. Motion

**Budget: WebGL hero + restrained precision motion everywhere else.** Lighthouse ≥ 95 is non-negotiable and constrains this section.

### 6.1 Hero — the one spectacle

- Shader-driven Eye of Horus. Volumetric linework, subtle parallax on pointer, slow ambient drift.
- Reacts to cursor proximity — the iris tracks, the surrounding field distorts.
- **Budget:** ≤ 180KB gzipped for the renderer, ≤ 16ms frame at 1080p on integrated graphics.
- **Fallback:** static SVG + CSS parallax when WebGL is unavailable, on `prefers-reduced-motion`, or on devices under a hardware threshold. The fallback must look intentional, not broken.

### 6.2 Everywhere else

| Interaction | Behaviour |
|---|---|
| Section entry | Content rises 12px + fades, staggered 40ms per child. Once only, never on re-scroll |
| Hover — cards | Border shifts to `--gold-dim`, 1px lift, 160ms |
| Hover — CTAs | Gold fill wipes left-to-right, label inverts to obsidian |
| Cursor | Custom reticle — crosshair that snaps and scales over interactive elements. Desktop only |
| Text reveal | Headline characters decode from scrambled glyphs to final text, 600ms. Hero and section headings only — nowhere else |
| Pricing | Numbers count up on entry, mono, 400ms |
| Process steps | Connecting line draws between steps as they scroll into view |
| Terminal block | "How we work" renders as a typing terminal, monospace, blinking block cursor |
| Scroll indicator | Thin gold progress rail, left edge, full page height |
| Form focus | Field border animates to gold, mono label lifts, faint scanline sweep |
| Page transition | 200ms scanline wipe |

### 6.3 Motion rules

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for state changes.
- Duration: 120–240ms for state, 400–800ms for entrance. Nothing exceeds 800ms.
- Never animate more than 2 properties per element.
- `prefers-reduced-motion` disables decode, count-up, terminal typing and WebGL. Opacity fades remain.
- No parallax on mobile. No scroll-jacking anywhere.
- Glitch effects are punctuation — maximum 2 per page, triggered by interaction, never looping.

---

## 7. Component specification

| Component | Notes |
|---|---|
| Button — primary | Gold, obsidian label, sharp corners, wipe-fill hover |
| Button — ghost | Hairline border, gold on hover |
| Pillar card | Hairline border, mono index, gold rule on hover, icon in gold linework |
| Pricing row | Mono figures, USD/INR toggle, hairline dividers, "from" in `--text-low` |
| Process step | Numbered mono, connecting draw-line, terminal-styled deliverable list |
| FAQ | Accordion, hairline separators, gold `+` rotating to `×` |
| Form | Inset ground, mono labels, gold focus, inline validation |
| Footer | Grid overlay at full opacity, mark, Mumbai base, mono contact |
| Portfolio tile | Full-bleed image, obsidian overlay lifting on hover, gold mono caption |

---

## 8. Technical implementation

| Item | Decision |
|---|---|
| Animation library | Framer Motion (React-native to Next.js) + GSAP ScrollTrigger where sequencing demands it |
| WebGL | Three.js + custom GLSL, `react-three-fiber`. Hero only. Dynamically imported, never in the initial bundle |
| Icons | Custom SVG linework. No icon library |
| Images | next/image, AVIF, blur placeholder |
| Fonts | Self-hosted, `font-display: swap`, subset to Latin |
| Dark mode | The site is dark. No light theme in Phase 1 |
| Bundle ceiling | ≤ 180KB JS on first load, hero renderer excluded and lazy-loaded |

---

## 9. Definition of done

- Logo delivered in all three lockups, SVG, legible at 24px, with load animation
- Full token set implemented as CSS custom properties
- Every component specified in §7 built and responsive at all four breakpoints
- WebGL hero shipping with a fallback that looks deliberate
- `prefers-reduced-motion` path verified
- Lighthouse ≥ 95 performance, ≥ 95 accessibility, with hero active
- Zero layout shift on load (CLS < 0.05)
- Verified on Safari, Chrome, Firefox, iOS Safari

---

## 10. Open decisions

| # | Item | Needed by |
|---|---|---|
| 1 | Logo direction — circuit / wireframe / scanline | Before identity work begins |
| 2 | Display typeface — licence check on Chillax and PP Neue Montreal | Before build |
| 3 | Whether the cursor reticle survives usability review | Post-first-build |

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| Cyberpunk styling reads as juvenile, undercutting $2,500+ pricing | Restraint rules in §3 and §6.3. Elegance is the constraint, spectacle is the accent |
| WebGL hero breaks the Lighthouse target | Hard budget in §6.1, lazy import, hardware-gated fallback |
| Motion volume delays the 2 Sep launch | Hero + §6.2 tiers 1–4 are launch-blocking; the rest ships incrementally after |
| Effects obscure the message | Copy is approved before design begins. No effect may reduce text contrast |
