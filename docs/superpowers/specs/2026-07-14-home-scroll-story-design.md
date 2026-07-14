# Home Scroll Story + Hand-Drawn Restyle — Design Spec

Approved 2026-07-14 after five preview iterations (visual spec artifact:
https://claude.ai/code/artifact/b2223a65-18cb-4e18-b15f-1ae853ea3270).

## What

1. **Home tab** becomes an Apple-style scroll experience: hero (unchanged) → four
   pinned scenes, one per competence, each scrubbed by scroll → focus tiles → footer.
   Scenes: thermal systems (four-stroke engine), electromagnetism (linear
   accelerator — cyclotron rejected), fluid dynamics (airfoil streamlines),
   design & FEA (loaded cantilever with mesh).
2. **Copy per scene**: red circled number + handwritten title + one chip into the
   matching Projects sub-tab. No paragraphs. Governing equations appear *inside*
   each figure as small accent-colored margin notes, placed clear of the drawing
   (pencil-wobble filter displaces strokes ±4px — keep ≥10px clearance).
3. **Site-wide style**: hand-drawn engineering notebook. Dark = navy graph paper +
   yellow pencil + red pen; light = warm paper + graphite + engineering blue + red
   pen. Architects Daughter for all type. Wonky borders, wavy title underlines.
4. **Hero exception**: identical to before — live plasma.js animation and original
   palette (scoped tokens in `.hero`) — only the typeface changes.

## Where

- `css/styles.css` — tokens, hero scoping, scene styles (all colors via tokens).
- `index.html` — scene markup + `#rough` SVG filter + Architects Daughter font link.
- `js/scenes.js` — scroll driver + four draw functions. `js/plasma.js` untouched.
- `PLAN.md` — updated wireframes/checklist (UI source of truth).

## Constraints held

No frameworks/build step; native scroll only (no hijack); both themes; reduced-motion
static frames; mobile single-column; no SVG label clipping (labels inside viewBox,
figcaption/HUD ellipsize); no "Duke AERO" mention inside figures.
