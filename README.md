# Ilan — Engineering ePortfolio

A fusion/energy-themed personal portfolio site. Pure HTML + CSS + JavaScript —
**no build step, no frameworks, no internet required**. Everything you need to edit
lives in three small files, and the layout is specified in [`PLAN.md`](PLAN.md).

Identity: **Mechanical Engineer · Physics student at Duke University · Energy & Fusion Systems**

---

## 1. View the site locally

**Option A — just open it.** Double-click `index.html` (or in WSL run
`explorer.exe index.html` from this folder). The site is built to work from a plain
`file://` URL.

**Option B — local server (recommended, behaves exactly like real hosting):**

```bash
cd ~/Projects/eportfolio
./serve.sh          # or: python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser. Stop the server with `Ctrl+C`.

---

## 2. What each file is for

| File | You edit it to… |
|---|---|
| `js/projects.js` | **Add / edit your projects** (the file you'll touch most) |
| `js/config.js` | Change your name, tagline, links, tabs & sub-tabs, skills, timeline, About text |
| `css/styles.css` | Change colors/fonts — only the marked token block at the top |
| `PLAN.md` | Describe layout changes for Claude to apply (the UI source of truth) |
| `assets/images/` | Drop project photos here (`.jpg`, `.png`, `.webp`, `.gif`) |
| `assets/docs/` | Drop PDFs, reports, datasheets, and your CV (`cv.pdf`) here |
| `index.html`, `js/main.js`, `js/plasma.js` | Layout & animation engine — normally leave alone |

---

## 3. Add a project (30 seconds)

1. Drop your photos into `assets/images/` and documents into `assets/docs/`.
2. Open `js/projects.js` and copy any existing project block. Edit it:

```js
{
  id: "coolant-loop",              // unique, lowercase, no spaces
  tab: "thermal",                  // which sub-tab: see config.js projectTabs
  title: "Cryogenic Coolant Loop",
  date: "2026",
  summary: "One-line teaser shown on the card.",
  description: [
    "First paragraph of the full write-up.",
    "Second paragraph. Add as many as you want.",
  ],
  tags: ["CFD", "Cryogenics", "ANSYS"],
  images: ["assets/images/loop-1.jpg", "assets/images/loop-2.jpg"],
  docs: [{ name: "Design Report (PDF)", file: "assets/docs/loop-report.pdf" }],
  links: [{ name: "GitHub repo", url: "https://github.com/..." }],
},
```

3. Save and refresh the browser. The card, sub-tab filtering, photo gallery,
   lightbox, and document list are generated automatically.

Projects with no `images` yet get an automatic plasma-gradient cover — nothing breaks.

## 4. Rename tabs / sub-tabs, links, skills, timeline

All in `js/config.js`, each section labeled with `EDIT ME` comments:

- `projectTabs` — the sub-tabs inside Projects (add/rename/remove freely; each
  project's `tab:` must match a sub-tab `id`).
- `focusAreas` — the tiles under the hero on Home.
- `skills`, `timeline`, `aboutParagraphs` — the About tab content.
- `email`, `linkedin`, `github`, `cv` — the Contact tab.

## 5. Change the look

Open `css/styles.css` — the top block (`/* ═══ DESIGN TOKENS — EDIT ME ═══ */`)
holds every color for **both themes** (dark plasma + light blueprint). Change a hex
value, refresh, done. The theme toggle is the ◐ button in the nav; the visitor's
choice is remembered.

## 6. Change the layout

Edit `PLAN.md` — it describes every tab, section order, and position with wireframes.
Change the spec (move a section, add a sub-tab, redesign the hero), then ask Claude:
*“Apply my edits in PLAN.md to the site.”*

## 7. Publish later (GitHub Pages)

```bash
cd ~/Projects/eportfolio
git init -b main && git add -A && git commit -m "Portfolio site"
gh repo create <your-username>.github.io --public --source=. --push
```

Then on GitHub: **Settings → Pages → Deploy from branch → main**. The site appears at
`https://<your-username>.github.io`. (Any static host — Netlify, Cloudflare Pages —
works the same: upload this folder.)

---

## ⚠ Reminders (content still needed from Ilan)

- [x] **LinkedIn URL** — wired into Contact (LinkedIn blocks automated reading, so bio
      is based on the resume; paste any LinkedIn-only info as text for Claude).
- [x] **Current resume** — used for About/timeline and saved as `assets/docs/cv.pdf`.
- [ ] Flesh out the placeholder projects in `js/projects.js`, one by one:
      RC airplane · electrical generator · Timpel project · GitHub projects.
- [x] Add your **GitHub URL** to `js/config.js` (`github:`).
- [ ] Portrait photo → `assets/images/portrait.jpg`.
- [ ] Review the Duke AERO project entry (drafted from the resume) and add photos.
