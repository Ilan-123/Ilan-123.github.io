/* ═══════════════════════════════════════════════════════════════
   PROJECTS — EDIT ME
   This is THE content file. To add or flesh out a project: edit a
   block below, save, refresh the browser. Newest first.

   Field guide:
     id       unique, lowercase, no spaces (used internally)
     tab      which sub-tab it appears in — must match an id in
              config.js → projectTabs ("thermal", "em", "design", "code")
     featured (optional) true → full-width highlight row shown first
     title    card + detail heading
     date     free text, e.g. "2026" or "Spring 2026"
     summary  ONE line, shown on the card
     description  array of paragraphs for the detail view
     tags     short keywords, shown as chips
     images   photos in assets/images/ — first one is the card cover.
              Leave [] to get an automatic gradient cover.
     docs     files in assets/docs/ shown as download links (or [])
     links    external URLs, e.g. GitHub or a video (or [])
   ═══════════════════════════════════════════════════════════════ */
var PROJECTS = [

  {
    id: "aero-propulsion",
    tab: "thermal",
    featured: true,   // full-width row at the top of the grid
    title: "Duke AERO — Liquid Rocket Engine",
    date: "2025 — present",
    summary: "CAD and Ansys CFD for combustion and cooling of an experimental liquid engine.",
    description: [
      "DRAFTED FROM RESUME — expand me with specifics. As part of Duke AERO's liquid propulsion team, I develop CAD models and Ansys fluid simulations to optimize the experimental rocket engine's combustion and cooling efficiency, supporting the team's goal of reaching 50,000 feet.",
      "I also support cross-subteam operations — propulsion, avionics, and structures — coordinating collaborative testing and design compatibility across 9 engineering divisions.",
    ],
    tags: ["Ansys Fluent", "CFD", "Propulsion", "Cooling", "CAD"],
    images: [],
    docs: [],
    links: [],
  },

  {
    id: "rc-airplane",
    tab: "design",
    title: "RC Airplane",
    date: "EDIT ME",
    summary: "PLACEHOLDER — scratch-built radio-controlled airplane, details coming.",
    description: [
      "PLACEHOLDER — Ilan will fill this in: airframe design, materials, motor/prop sizing, control surfaces, flight results.",
    ],
    tags: ["Aerodynamics", "Design", "Build", "C++"],
    images: [],
    docs: [],
    links: [{ name: "Flight code on GitHub (C++)", url: "https://github.com/Ilan-123/Plane" }],
  },

  {
    id: "electrical-generator",
    tab: "em",
    title: "Electrical Generator",
    date: "EDIT ME",
    summary: "PLACEHOLDER — hand-built electrical generator, details coming.",
    description: [
      "PLACEHOLDER — Ilan will fill this in: generator topology, magnets/windings, output measurements, what drove the design.",
    ],
    tags: ["Electromagnetics", "Generator", "Build"],
    images: [],
    docs: [],
    links: [],
  },

  {
    id: "timpel-eit-simulator",
    tab: "code",
    featured: true,   // full-width row, cover on the right (alternates)
    title: "EIT Simulator — Timpel Medical",
    date: "2026 — present",
    summary: "Real-time Electrical Impedance Tomography simulator UI, built end-to-end in Python.",
    description: [
      "As Development Specialist I at Timpel Medical, I developed a full-featured Electrical Impedance Tomography (EIT) simulator UI — a high-fidelity tool for respiratory-function simulation used in clinical research, medical diagnostics, and academic teaching.",
      "I engineered the application and its architecture end-to-end in Python with PySide6 and PyQtGraph, applying advanced linear algebra to accurately model complex physiological data in real time.",
      "EDIT ME (optional) — add screenshots of the simulator to assets/images/ if you're allowed to share them, plus any details on the solver, rendering pipeline, or clinical use.",
    ],
    tags: ["Python", "PySide6", "PyQtGraph", "Linear Algebra", "Medical Imaging"],
    images: [],
    docs: [],
    links: [],
  },

  {
    id: "github-projects",
    tab: "code",
    title: "GitHub Projects",
    date: "EDIT ME",
    summary: "PLACEHOLDER — selected software projects, details coming.",
    description: [
      "PLACEHOLDER — Ilan will fill this in: pick the repos worth showing (e.g., CheckLLM work at TutorMundi, personal tools) and either expand this entry or split it into one project per repo.",
    ],
    tags: ["Python", "JavaScript", "Git"],
    images: [],
    docs: [],
    links: [{ name: "GitHub profile", url: "https://github.com/Ilan-123" }],
  },

];
