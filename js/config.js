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
    "I'm Ilan Jordan — a Mechanical Engineering & Materials Science and Physics student at Duke University (Class of 2029), originally from São Paulo, Brazil. I want to build the machines that make clean energy abundant, and fusion is the problem I keep coming back to: it sits exactly where my interests meet — thermal systems, electromagnetics, and the fluid dynamics that tie them together.",
    "At Duke, I'm on the liquid propulsion team of Duke AERO, developing CAD models and Ansys fluid simulations to optimize an experimental rocket engine's combustion and cooling as the team pushes toward 50,000 feet, and I work on photosensitive-detector data in the Duke Physics Neutrino Lab. Off campus, I'm a Development Specialist at Timpel Medical, where I led development of EITSIM Studio — a real-time simulator that reproduces a ventilated ICU patient in software to drive and verify Electrical Impedance Tomography devices, replacing live-animal testing in the verification loop.",
    "Outside of class, I build things for the joy of it — an RC airplane, an electrical generator, and whatever comes next — and I teach: I've taught Python to students in Paraisópolis and led review sessions for hundreds of physics and calculus students.",
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
    { period: "May 2026 — present", title: "Development Specialist I", org: "Timpel Medical",
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
