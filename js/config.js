/* ═══════════════════════════════════════════════════════════════
   SITE CONFIG — EDIT ME
   Everything about YOU lives in this file: name, tagline, links,
   tabs, skills, timeline, about text. Plain text — edit freely.
   ═══════════════════════════════════════════════════════════════ */
var SITE = {
  // ── Identity ────────────────────────────────────────────────
  name: "Ilan Jordan",
  shortName: "Ilan Jordan",              // shown next to the logo
  role: "Mechanical Engineering & Materials Science · Physics · Duke ’29",
  tagline: "Designing thermal & electromagnetic systems for the energy of the future.",

  // ── Hero: telemetry spec strip (mono readout under the buttons) ─
  heroSpecs: [
    "STATUS · OPEN TO OPPORTUNITIES",
  ],

  // ── Links (Contact tab + footer) ───────────────────────────
  email: "ilanjd2006@gmail.com",
  linkedin: "https://www.linkedin.com/in/ilan-jordan-535a04317",
  github: "https://github.com/Ilan-123",
  cv: "assets/docs/cv.pdf",

  // ── Projects sub-tabs ───────────────────────────────────────
  // Every project in projects.js has a `tab:` that must match an id here.
  // Add/rename/remove freely; "all" is built in and always shown first.
  projectTabs: [
    { id: "thermal", label: "Thermal & Fluids" },
    { id: "em",      label: "Electromagnetics" },
    { id: "design",  label: "Design & CAD" },
    { id: "code",    label: "Software" },
  ],

  // ── Home: focus-area tiles (each links to a Projects sub-tab) ─
  focusAreas: [
    { title: "Thermal Systems",  blurb: "Combustion, cooling, and energy conversion.",            tab: "thermal", icon: "heat" },
    { title: "Electromagnetics", blurb: "Generators, coils, and confinement-field design.",       tab: "em",      icon: "coil" },
    { title: "Fluid Dynamics",   blurb: "Ansys CFD, propulsion flows, and aerodynamics.",         tab: "thermal", icon: "flow" },
    { title: "Design & FEA",     blurb: "Onshape/NX CAD, prototyping, manufacturable parts.",     tab: "design",  icon: "cube" },
    { title: "Integrated Systems", blurb: "Real-time software, controls, and hardware-in-the-loop.", tab: "code",  icon: "code" },
  ],

  // ── About: bio paragraphs ───────────────────────────────────
  aboutParagraphs: [
    "I'm drawn to physics for what it makes possible. The distance between a principle understood in a lab and a technology that changes how people live is where the interesting engineering happens, and it's where I want to spend my career.",
    "I'm a sophomore at Duke studying Mechanical Engineering & Materials Science alongside Physics — a combination I chose because the problems I care about don't respect the boundary between them. Understanding why a system behaves the way it does and building something that survives contact with the real world are the same task approached from two directions.",
    "Energy is what pulls at me most. I grew up in Brazil, where blackouts are ordinary enough that you plan around them, so reliable power has never been an abstraction to me. Fusion is the version of that problem I find hardest to look away from — plasma physics, materials under conditions nothing was designed for, control problems that are still open. I'm also interested in machine learning applied to physical systems, for control and prediction in regimes where first-principles simulation is too slow or too incomplete on its own.",
    "I'm looking for research and internship work on problems that matter beyond the lab, alongside people further along than I am.",
  ],



  // ── About: skills, grouped ──────────────────────────────────
  skills: [
    { group: "CAD",        items: ["SolidWorks", "Onshape", "NX"] },
    { group: "Simulation", items: ["Ansys Fluent", "CFD"] },
    { group: "Programming",items: ["Python", "PySide6 / Qt6", "PyQtGraph", "C++", "pybind11", "JavaScript", "Java", "HTML/CSS", "Git"] },
    { group: "AI Tools",   items: ["Claude Code", "Google Gemini"] },
    { group: "Languages",  items: ["Portuguese", "English", "Spanish", "German (basic)"] },
  ],

  // ── About: timeline (newest first) ──────────────────────────
  timeline: [
    { period: "May — Aug 2026", title: "Development Specialist I (Internship)", org: "Timpel Medical",
      blurb: "Led development of EITSIM Studio, a real-time Electrical Impedance Tomography simulator that reproduces a ventilated ICU patient in software — Python (PySide6, PyQtGraph) over a C++ physics engine, with hardware-in-the-loop control from a real ICU ventilator and an emulated acquisition module that drives a live clinical monitor without a physical phantom." },
    { period: "Mar 2026 — present", title: "Research Assistant, Neutrino Lab", org: "Duke Physics",
      blurb: "Working with field specialists on photosensitive-detector data for cosmic particles." },
    { period: "Jan 2026 — present", title: "Calculus 2 Teaching Assistant", org: "Duke University",
      blurb: "Supporting a class of 300+ students." },
    { period: "2025 — present", title: "Liquid Propulsion Team", org: "Duke AERO",
      blurb: "CAD models and Ansys fluid simulations optimizing an experimental rocket engine's combustion and cooling; coordinating testing across 9 engineering subteams." },
    { period: "2025", title: "Chief Engineer, EGR101", org: "Duke Pratt School of Engineering",
      blurb: "Led a first-year design team from research to a functioning prototype of an automatic paintbrush cleaner." },
    { period: "2025 — 2029", title: "B.S.E. MechE & Materials Science · Physics", org: "Duke University",
      blurb: "GPA 3.85. Started in Mechanical Engineering at the Universidade de São Paulo (2025) before transferring to Duke." },
    { period: "Summer 2024", title: "Web Developer & AI Optimization Intern", org: "TutorMundi",
      blurb: "Built and quality-tested CheckLLM, an LLM answer-checking tool for an education app used by 50 schools (JavaScript, Meteor)." },
  ],

  // ── Contact tab text ────────────────────────────────────────
  contactHeading: "Let’s build the future of energy.",
  contactHeadingAccent: "energy",   // this word is drawn as a hollow accent outline
  contactSub: "Open to opportunities in fusion, energy systems, propulsion, and hard engineering problems. The fastest way to reach me is email.",
};
