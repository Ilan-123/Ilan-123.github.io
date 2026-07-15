# PLAN.md — UI Specification (source of truth)

**How to use this file:** this spec defines the site's layout, tabs, positions, and
behavior. Edit anything here (move sections, rename tabs, change colors or animation),
then tell Claude: *"Apply my edits in PLAN.md."* The code will be updated to match.

---

## 1. Global layout

```
┌────────────────────────────────────────────────────────────────┐
│ NAV (fixed, full-width, stays visible when scrolling)          │
│ ⚛ Ilan [name]      Home  Projects  About  Contact      ◐ ☰    │
│  └ logo, left       └ tabs, right of center     toggle ┘  └ mobile menu
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ACTIVE TAB CONTENT (one tab visible at a time, fades in)       │
│ max content width: 1120px, centered, 24px side padding         │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│ FOOTER: name · role · quick links · "built with" note          │
└────────────────────────────────────────────────────────────────┘
```

- **Routing:** URL hash — `#home` `#projects` `#projects/<subtab>` `#about` `#contact`.
  Back/forward buttons and bookmarks work.
- **Mobile (< 760px):** tabs collapse into the ☰ menu; all multi-column layouts stack.
- **Reduced motion:** all animations replaced by static equivalents automatically.

## 2. Tabs — order and content

### Tab 1 · HOME  (`#home`)

```
┌────────────────────────────────────────────────────────┐
│ ⌐ FIG. 01 — CONFINEMENT FIELD…    ← instrument frame:  │
│ │ HERO — full viewport height       hairline border,   │
│ │ background: <plasma canvas animation, see §5>        │
│ │   corner brackets in accent, mono labels             │
│ │   MECHE & MATSCI · PHYSICS · DUKE  ← eyebrow         │
│ │   ILAN                             ← display, solid  │
│ │   JORDAN                           ← hollow cyan     │
│ │                                       outline stroke │
│ │   Designing thermal & electromagnetic                │
│ │   systems for the energy of the future. ← tagline    │
│ │                                                      │
│ │   [ VIEW PROJECTS ] [ GET IN TOUCH ]  ← mono CTAs    │
│ │   BASED·DURHAM // FOCUS·FUSION // STATUS·OPEN        │
│ │                ↑ mono telemetry spec strip           │
│ │  FIELD·ACTIVE // N·720 // 60 FPS // T+02:41  ⌐       │
│ │       ↑ LIVE telemetry read from the particle field  │
│ └──────────────────────────▾ scroll hint ──────────────│
├────────────────────────────────────────────────────────┤
│  SCROLL STORY — 4 pinned scenes, one per competence.   │
│  Each scene sticks to the viewport for ~3 screen-      │
│  heights while its hand-drawn schematic scrubs with    │
│  the scroll (Apple product-page style). Left column:   │
│  red circled number + handwritten title + one button   │
│  into the matching Projects sub-tab. The governing     │
│  equations live INSIDE the figure as small margin      │
│  notes (accent color), never overlapping the drawing.  │
│                                                        │
│  ① thermal systems.  → #projects/thermal               │
│     fig. 2 four-stroke engine: scroll turns the crank; │
│     valves, charge tint, spark flash, phase list       │
│  ② electromagnetism. → #projects/em                    │
│     fig. 3 linear accelerator: particle speeds up,     │
│     crossed rf gap lights red, v→c readout             │
│  ③ fluid dynamics.   → #projects/thermal               │
│     fig. 4 airfoil: streamlines draw in, wake vortex,  │
│     Re readout                                         │
│  ④ design & FEA.     → #projects/design                │
│     fig. 5 cantilever: load grows, beam bends, mesh    │
│     follows, root-stress tint, F/δ readout             │
│                                                        │
│  Each figure sits in a wonky hand-ruled frame with a   │
│  handwritten fig-caption (top-left) and a live HUD     │
│  readout (bottom-right). Engine: js/scenes.js.         │
├────────────────────────────────────────────────────────┤
│  FOCUS AREAS — 4 tiles in a row (2×2 on tablet, 1-col  │
│  on phone). Each tile links to a Projects sub-tab.     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Thermal  │ │ Electro- │ │  Fluid   │ │ CAD/FEA  │   │
│  │ Systems  │ │ magnetics│ │ Dynamics │ │  Design  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└────────────────────────────────────────────────────────┘
```

### Tab 2 · PROJECTS  (`#projects`)

```
┌────────────────────────────────────────────────────────┐
│  PROJECTS                          ← page title        │
│  [ All ] [ Thermal & Fluids ] [ Electromagnetics ]     │
│  [ Design & CAD ]                  ← sub-tab pills     │
│                                                        │
│  ┌───────────────────┬───────────────────────────┐     │
│  │ cover             │ FEATURED // date · tab    │     │
│  │ (fills height)    │ BIG TITLE  summary  #tags │     │
│  └───────────────────┴───────────────────────────┘     │
│    ↑ projects marked `featured: true` render as        │
│      full-width rows first, cover side alternating     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                 │
│  │ cover   │  │ cover   │  │ cover   │  ← 3-col grid   │
│  │ title   │  │ title   │  │ title   │    (2-col tablet│
│  │ summary │  │ summary │  │ summary │     1-col phone)│
│  │ #tags   │  │ #tags   │  │ #tags   │                 │
│  └─────────┘  └─────────┘  └─────────┘                 │
└────────────────────────────────────────────────────────┘

Card click → DETAIL OVERLAY (slides over the page):
┌────────────────────────────────────────────┐
│ ✕ close                                    │
│ TITLE                    date · sub-tab    │
│ #tag #tag #tag                             │
│ description paragraphs…                    │
│ ── Gallery ──  [img][img][img] → lightbox  │
│ ── Documentation ──  ▸ Report.pdf ▸ …      │
│ ── Links ──  ▸ GitHub ▸ …                  │
└────────────────────────────────────────────┘
Lightbox: click image → fullscreen, ←/→ arrows navigate, Esc closes.
```

Sub-tabs (edit in `js/config.js → projectTabs`):

| id | Label | Intended content |
|---|---|---|
| `all` | All | every project (built-in) |
| `thermal` | Thermal & Fluids | heat transfer, CFD, cooling loops |
| `em` | Electromagnetics | coils, magnets, confinement, motors |
| `design` | Design & CAD | CAD, FEA, mechanisms, manufacturing |
| `code` | Software | programming projects, GitHub repos |

### Tab 3 · ABOUT  (`#about`)

```
┌───────────────────────────┬────────────────────────────┐
│ LEFT (40%)                │ RIGHT (60%)                │
│ ┌───────────┐             │ SKILLS — grouped chips     │
│ │ portrait  │             │  Simulation: ANSYS · CFD…  │
│ │ (photo)   │             │  CAD: SolidWorks · …       │
│ └───────────┘             │  Physics: E&M · Plasma…    │
│ Bio paragraphs            │                            │
│ (from config.js)          │ TIMELINE — vertical line   │
│                           │  with thermal-gradient     │
│                           │  ● 2024– Duke · Physics    │
│                           │  ● EDIT ME entries…        │
└───────────────────────────┴────────────────────────────┘
(stacks to one column on mobile, portrait first)
```

### Tab 4 · CONTACT  (`#contact`)

```
┌────────────────────────────────────────────┐
│  LET'S BUILD THE FUTURE OF ENERGY          │
│  short invitation line                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ ✉ Email │ │ in Link │ │ ⌥ GitHub│       │
│  └─────────┘ └─────────┘ └─────────┘       │
│  [ ⬇ Download CV ]  → assets/docs/cv.pdf   │
└────────────────────────────────────────────┘
```

## 3. Themes & colors

Toggle: ◐ button in nav. Default follows the visitor's OS; choice saved in the browser.
All values live in the token block at the top of `css/styles.css`.

The whole site is drawn in a **hand-sketched engineering-notebook style**: graph-paper
background, wobbly hand-ruled borders (`--wonky` radius), wavy underlines on titles,
handwritten labels. The four scroll-story schematics get a pencil-wobble SVG filter
(`#rough`, turbulence + displacement).

| Token | Dark — "Sketchbook" (default) | Light — "Paper" |
|---|---|---|
| background | `#0c1626` navy graph paper | `#f6f2e8` warm paper + graphite grid |
| surface / cards | `#121d33` | `#fffdf7` |
| text | `#f2ead8` / secondary `#b0a68c` | `#3a3630` graphite / `#7a7264` |
| primary accent | `#f7d354` yellow pencil | `#155fad` engineering-blue pencil |
| secondary accent | `#e2604c` red pen | `#c0392b` red pen |
| thermal accent | `#f0a35e` orange | `#b4560f` burnt orange |

**Hero exception:** the hero keeps its original Plasma palette (cyan `#4fd8eb` /
magenta outline, dark `#070b14` field) in dark mode and the original Blueprint values
in light mode — scoped inside `.hero` in `css/styles.css`. Only its typeface changed.

Type (Google Fonts): **Architects Daughter** everywhere — a hand-lettered face drawn
from an architect's handwriting; it replaces both Archivo and IBM Plex Mono (the
`--font-body` / `--font-mono` tokens both point to it). Hero last name + one
contact-heading word (config: `contactHeadingAccent`) still render as **hollow
accent-colored outline strokes**.

## 4. Relative positions summary (quick edit list)

1. Nav: logo **left** · tabs **right** · theme toggle **far right**
2. Home: hero (full screen) → 4 pinned scroll-story scenes → focus tiles
3. Projects: title → sub-tab pills → card grid (newest first)
4. About: portrait+bio **left**, skills+timeline **right**
5. Contact: heading → 3 link cards → CV button
6. Footer: every tab, bottom

*(To reorder/move anything: edit this list and the wireframes, then ask Claude.)*

## 5. Plasma animation spec (hero background)

- Canvas, full hero, behind the text.
- **Dark mode:** ~700 charged particles advected along a divergence-free swirl field
  (feels like plasma flow in a magnetic field); additive cyan/magenta/orange glow
  trails; slow drift of the field over time; faint toroidal field-line arcs.
- **Light mode:** same particles rendered as fine engineering-blue streamlines at low
  opacity over the blueprint grid — subtle, print-like.
- Performance: pauses when the hero is off-screen or the browser tab is hidden;
  particle count scales with screen size; `prefers-reduced-motion` → single static
  streamline frame.

## 6. Behaviors checklist

- [x] Hash routing with back-button support
- [x] Theme toggle persisted (localStorage) + OS default
- [x] Project detail overlay (Esc / ✕ / click-outside closes)
- [x] Image lightbox with keyboard arrows
- [x] Gradient placeholder covers for projects without photos
- [x] Mobile hamburger nav
- [x] Reduced-motion fallbacks
- [x] Staggered hero entrance animation
- [x] Instrument-viewport hero frame: corner brackets, FIG. plate, **live telemetry**
      (real particle count / FPS / uptime from plasma.js; "STATIC FRAME" under
      reduced motion, "PAUSED" when off-screen)
- [x] Featured projects (`featured: true` in projects.js) as full-width alternating rows
- [x] Display typography: Archivo wide caps + hollow outline name; IBM Plex Mono UI voice
- [x] Ambient nebula glows behind all tabs (theme-aware)
- [x] Scroll-reveal animations on tiles, cards, timeline, contact cards
- [x] Focus tiles: engineering icons, hover accent sweep, EXPLORE → arrow
- [x] Nav elevates with shadow on scroll; placeholder covers get grid texture
- [x] Home scroll story: 4 pinned scenes scrubbed by scroll (js/scenes.js), equations
      as in-figure margin notes, per-scene HUD readouts, reduced-motion static frames,
      single-column stack on mobile
- [x] Hand-drawn sketch language site-wide: Architects Daughter type, wonky borders,
      wavy title underlines, pencil-wobble filter on story schematics

## 7. Open items

- [x] LinkedIn URL + resume received → About/Contact filled from resume (2026-07-07)
- [x] Timpel → real EIT Simulator project card + timeline entry (from LinkedIn, 2026-07-08)
- [ ] Flesh out placeholder projects: RC airplane · electrical generator · GitHub
- [x] GitHub profile URL → `js/config.js` (github.com/Ilan-123)
- [x] Portrait photo → `assets/images/portrait.jpg`
- [x] CV → `assets/docs/cv.pdf`
