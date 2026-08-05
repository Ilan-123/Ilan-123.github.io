# Ilan — Engineering ePortfolio

A fusion/energy-themed personal portfolio site. Pure HTML + CSS + JavaScript —
**no build step, no frameworks, no internet required**. Everything you need to edit
lives in three small files, and the layout is specified in [`PLAN.md`](PLAN.md).

Identity: **Mechanical Engineer · Physics student at Duke University · Energy & Fusion Systems**

🌐 **Live site:** <https://ilan-123.github.io> · Repo: <https://github.com/Ilan-123/Ilan-123.github.io>

---

## 1. View the site locally

**Option A — just open it.** Double-click `index.html` (or in WSL run
`explorer.exe index.html` from this folder). The site is built to work from a plain
`file://` URL.

**Option B — local server (recommended, behaves exactly like real hosting):**

```bash
cd ~/work/Ilan-123.github.io
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
| `assets/video/` | Drop project clips here (`.mp4`, H.264 — see §3.3) |
| `assets/docs/` | Drop PDFs, reports, datasheets, and your CV (`cv.pdf`) here |
| `index.html`, `js/main.js`, `js/plasma.js` | Layout & animation engine — normally leave alone |
| `.gitattributes` | Marks binaries so git doesn't mangle them — leave alone |

---

## 3. Add a project (30 seconds)

1. Drop your photos into `assets/images/`, clips into `assets/video/` (encoded — §3.3)
   and documents into `assets/docs/`.
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

Sections render in a fixed order, whatever order you write the fields in:
**description → sections → Gallery → Video → Documentation → Links.**

All text is escaped before it hits the page, so **HTML tags in these strings won't
work** — `<b>bold</b>` shows up as literal angle brackets. Accented characters, `—`,
`→`, `Δ`, `ρ` and other Unicode are all fine. For structure, use `sections` (§3.1)
rather than markup.

### 3.1 Longer write-ups: `sections`

`description` is a flat list of paragraphs. For a bigger project, add `sections` —
each one gets a rule-line heading matching the Gallery/Documentation headings:

```js
  sections: [
    {
      heading: "What I built",
      body: ["An opening paragraph.", "Another one, optional."],
      items: ["A bullet.", "Another bullet."],    // optional
    },
    { heading: "Results", body: ["…"] },
  ],
```

`body` and `items` are both optional — use either, or both.

### 3.2 Image captions

An `images` entry can be a plain string (as above) **or** an object with a caption:

```js
  images: [
    "assets/images/loop-1.jpg",                                  // no caption
    { src: "assets/images/loop-2.jpg", caption: "Fig. 2 — …" },  // captioned
  ],
```

The first entry is still the card cover either way. If you number captions
(`Fig. 1 — …`), you can point at them from the prose — *"the manifold (fig. 2)"* —
which reads much better than "see the gallery below".

### 3.3 Videos

```js
  video: [
    { file: "assets/video/loop-run.mp4",
      poster: "assets/images/loop-run-poster.jpg",   // optional but recommended
      caption: "Video 1 — Coolant loop under load." },
  ],
```

Players are `preload="metadata"`, so the page stays light until someone hits play.
Portrait clips are height-capped and centred, so a phone video won't swallow the panel.

**Encode before committing.** Phone video is huge (~7 Mbps) and often HEVC, which
Safari plays and other browsers don't. Convert to H.264 and strip the audio:

```bash
ffmpeg -i INPUT.mp4 -vf "scale=-2:720" -c:v libx264 -crf 31 -preset slow \
       -profile:v high -pix_fmt yuv420p -movflags +faststart -an \
       assets/video/NAME.mp4

# poster frame, taken 1 s in
ffmpeg -ss 1 -i assets/video/NAME.mp4 -frames:v 1 -q:v 5 assets/images/NAME-poster.jpg
```

`scale=-2:720` fixes the *height*, so portrait and landscape clips both come out
sane — don't fix the width, or portrait footage gets upscaled to something enormous.
Trim with `-ss START -t SECONDS` **before** `-i`. Aim for **under ~2 MB per clip**;
GitHub Pages has no CDN behind it and the whole repo is cloned on every deploy.

**Watch the frames, not just the thumbnail.** Bench footage tends to pan across
faces, whiteboards, asset tags and screens. Quickest check:

```bash
ffmpeg -i INPUT.mp4 -vf "fps=1,scale=300:-2,tile=8x4" -frames:v 1 /tmp/check.jpg
```

That's one frame per second in a single contact sheet.

## 4. Rename tabs / sub-tabs, links, skills, timeline

All in `js/config.js`, each section labeled with `EDIT ME` comments:

- `projectTabs` — the sub-tabs inside Projects (add/rename/remove freely; each
  project's `tab:` must match a sub-tab `id`).
- `focusAreas` — the tiles under the hero on Home.
- `skills`, `timeline`, `aboutParagraphs` — the About tab content.
- `email`, `linkedin`, `github`, `cv` — the Contact tab.

## 5. Change the look

Open `css/styles.css` — the top block (`/* ═══ DESIGN TOKENS — EDIT ME ═══ */`)
holds every color for **both themes** (dark navy sketchbook + light paper). The whole
site uses a hand-drawn engineering-notebook style: Architects Daughter handwriting
font, wonky borders, graph-paper background. Change a hex value, refresh, done. The
theme toggle is the ◐ button in the nav; the visitor's choice is remembered. (The
hero keeps its own plasma palette — scoped inside `.hero` in the CSS.)

## 6. Change the layout

Edit `PLAN.md` — it describes every tab, section order, and position with wireframes.
Change the spec (move a section, add a sub-tab, redesign the hero), then ask Claude:
*“Apply my edits in PLAN.md to the site.”*

## 7. Publish changes (GitHub Pages)

> **The repo is currently PRIVATE, so the live site is down.** A `<user>.github.io`
> repo must be **public** for Pages to serve on the free plan. To bring it back:
> Settings → General → Change visibility → public, then Settings → Pages and
> re-select the source (`main` / root) — it doesn't always re-arm itself. The URL
> stays the same. Toggling visibility is non-destructive: commits, history and
> stars all survive.

The site deploys from the `main` branch of
[`Ilan-123/Ilan-123.github.io`](https://github.com/Ilan-123/Ilan-123.github.io).
Publishing an update is just a push:

```bash
cd ~/work/Ilan-123.github.io
git add -A
git commit -m "Add coolant loop project"
git push
```

The site redeploys automatically **1–2 minutes** after each push — refresh the live
URL to see it. Notes:

- Full workflow for a new project: photos → `assets/images/`, video → `assets/video/`
  (encoded, §3.3), PDFs → `assets/docs/`, entry in `js/projects.js` (§3), check
  locally with `./serve.sh`, then push.
- Authentication is **SSH** (`git@github.com:Ilan-123/…`), using `~/.ssh/id_ed25519`,
  which is registered on the GitHub account. Pushes need no login. If you ever see
  `could not read Username for 'https://github.com'`, the remote got switched back to
  HTTPS — fix with
  `git remote set-url origin git@github.com:Ilan-123/Ilan-123.github.io.git`.
- Commits must use `Ilan-123@users.noreply.github.com`, set **repo-locally** because
  the global git identity on this machine is the work address:
  `git config user.email "Ilan-123@users.noreply.github.com"`. Check with
  `git log -1 --format=%ae` before pushing — a fresh clone won't inherit the local
  setting, and the work email would otherwise end up in public history.
- `.gitattributes` marks PDFs, images and video as binary. This machine has
  `core.autocrlf=true`, which without it rewrites line endings *inside* binaries and
  corrupts them. Don't delete it, and add any new binary extension you start using.
- **Don't rename the repo** — the exact name `Ilan-123.github.io` is what serves the
  site at the root URL.

### Publishing work-related material

Anything pushed while the repo is public is effectively permanent — making it private
afterwards doesn't retract what was already served, cloned or crawled, and the file
stays in git history regardless. Flip to private *before* pushing if you want a review
window.

For Timpel material specifically, keep out of anything committed: internal document
codes, device wire protocols (opcodes, frame layouts, port schemes), transport
credentials or key identities, lab IP addresses, patient-derived scenario data, device
serial numbers, and internal verification findings. The Technical Overview PDF in
`assets/docs/` is an abridged build with all of that already removed. Photos and video
need a human eye — text scanning can't see a face in a screen reflection or a serial
number on an asset tag.

#### How the abridged PDF was produced

The Technical Overview shipped here was built by a script that read the original
internal document and emitted a redacted copy. That script and its source document
stayed behind on the employer's systems and are deliberately not in this repo — a
redaction ruleset names the exact values it strips, so publishing it would undo the
redaction. What follows is the method, so the same thing can be rebuilt from scratch
against a different source if this ever needs redoing.

**Generate, never hand-edit.** Hand-deleting from a PDF leaves the text in the file's
object streams. Parse the source document and emit a new PDF containing only what
survived, so the redaction is repeatable, reviewable as a diff, and can't leave
remnants.

**Cut whole sections, not sentences.** Removal is keyed on headings, taking everything
down to the next heading of the same or higher level, figures included. Half-redacted
prose leaks by implication — a sentence explaining why a value matters tells you most
of what the value was.

**Then scrub what survives, by pattern.** Whole-section cuts miss passing mentions, so
every surviving paragraph and table cell is run through a pattern list: document codes,
credential and key identities, addresses, magic constants, vendor references.

**Rewrite rather than blank.** Where a withheld term sits inside a sentence that still
has to read, the sentence is rewritten to a broader, publishable claim instead of being
gapped or deleted. Blanks advertise their own contents.

**Match figures by caption text, not number.** Numbers shift the moment anything is
dropped, and stale numbers silently target the wrong image. Text matching survives
edits to the source.

**Renumber captions after cutting.** Dropping content leaves gaps in the source
numbering, so figures and tables are renumbered 1..N in emission order. Only safe while
the document carries no in-text "see Figure N" cross-references — verify before relying
on it: `pdftotext out.pdf - | grep -nE '(see|in) (Figure|Table) [0-9]+'`.

**Don't reproduce third-party figures.** A citation credits an author; it does not
license a reproduction. Where a published figure would have illustrated the point, an
original schematic is drawn instead and the paper cited as the source of the approach.
Photographs of real facilities get the same treatment — a drawing shows the setup
without the room, the whiteboards, or the asset tags.

**Verify the output, not the input, and fail closed.** The finished PDF is reopened and
its rendered text re-scanned for every forbidden pattern. A hit aborts the build rather
than writing the file. Checking the input only proves what you intended to remove;
checking the output proves what actually shipped.

**Text scanning cannot clear images.** Every screenshot and photograph still needs a
human eye. No pattern list sees a face reflected in a monitor, a serial number on an
asset tag, or a patient identifier inside a screenshot.

---

## ⚠ Reminders (content still needed from Ilan)

- [x] **LinkedIn URL** — wired into Contact (LinkedIn blocks automated reading, so bio
      is based on the resume; paste any LinkedIn-only info as text for Claude).
- [x] **Current resume** — used for About/timeline and saved as `assets/docs/cv.pdf`.
- [ ] Flesh out the remaining placeholder projects in `js/projects.js`:
      RC airplane · electrical generator · GitHub projects.
- [x] **Timpel / EITSIM Studio** — full entry with 8 figures, 3 videos and the
      Technical Overview PDF.
- [x] Add your **GitHub URL** to `js/config.js` (`github:`).
- [x] Portrait photo → `assets/images/portrait.jpg`.
- [ ] Resize `assets/images/portrait.jpg` — it's **6.8 MB**, several times the weight
      of everything else on the site combined. ~1200 px wide at JPEG q82 would be
      well under 300 KB.
- [ ] Review the Duke AERO project entry (drafted from the resume) and add photos.
- [ ] Decide whether the repo goes back to public (see §7).
