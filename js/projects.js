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
     sections (optional) extra headed blocks after the description —
              [{ heading, body: [paragraphs], items: [bullets] }]
     images   photos in assets/images/ — first one is the card cover.
              Each entry is either "assets/images/x.jpg" or
              { src: "...", caption: "..."}. Leave [] for a gradient cover.
     video    (optional) [{ file, poster, caption }] — mp4 in assets/video/
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
    title: "EITSIM Studio — Real-Time EIT Patient Simulator",
    date: "May 2026 — August 2026",
    summary: "A desktop simulator that reproduces a ventilated ICU patient in real time, so EIT monitors can be tested without a patient.",
    description: [
      "Electrical Impedance Tomography images the lungs at the bedside without radiation. A belt of electrodes around the chest injects tiny, harmless currents and measures the voltages that return; because air and tissue conduct differently, those voltages become a live picture of air moving through each region of the lungs.",
      "Timpel Medical builds the ICU monitors that do this — they show a clinician which parts of a lung are actually inflating, breath by breath, so the ventilator can be set not to injure the parts that are not.",
      "Testing those monitors needs a patient whose lungs behave in a known, repeatable way. EITSIM Studio is that patient, in software: it models the breathing mechanics and blood flow of a ventilated ICU patient in real time and feeds the result straight into the monitor, so a device can be exercised against known ground truth.",
      "I led development end-to-end at Timpel, building essentially the whole current application on top of an initial C++ physics engine. Because it reproduces ICU lung conditions in software, it takes live-animal (porcine) studies out of the device-verification loop, along with their ethical cost.",
    ],
    sections: [
      {
        heading: "Rebuilding the tool",
        body: [
          "The simulator already existed as a legacy C++ tool: correct physics behind a wall of tabs and bare plots (figs. 2, 4). I kept the validated numerical core and replaced everything above it with a Python application that reads like the bedside monitors clinicians already use (figs. 3, 5) — live waveform scopes, a permanent panel of respiratory numbers, and seven views spanning ventilation, per-region behaviour (figs. 6, 7), clinical maneuvers (fig. 10) and hardware setup (fig. 8).",
          "It also gained what the legacy tool had no path to: every hardware link that follows, and the instrumentation a bench session runs on — freeze-and-crosshair cursors that snap to the nearest stored sample across all eight scopes at once, a severity-tagged event log fed by edge-detected state changes, a 50 Hz CSV recorder keyed to C6 breath numbers for cross-device alignment, and an app-wide manual mode that swaps Qt’s tooltips for a hover overlay covering every control.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "A C++ engine solves the lung and circulation equations a hundred times a second; a Python interface built with Qt draws the result. The engineering is in the seam — the physics runs on its own thread and must never be blocked by the screen, while the screen must never show a torn or stuttering trace.",
        ],
        items: [
          "The engine hands over samples in small batches and returns immediately to solving; nothing in the drawing path can stall it.",
          "Samples are buffered at full rate but redrawn far less often — smooth display, no discarded data.",
          "State crossing threads is published as an immutable snapshot rather than shared and mutable, the cheapest way to keep a real-time system honest.",
        ],
      },
      {
        heading: "Talking to real hardware",
        body: [
          "Four device connections run out of the application (fig. 8): three carry the simulated patient outward to EIT hardware, and the fourth runs inward — the one I like most. A real Hamilton C6 ICU ventilator, breathing into a mechanical test lung on the bench (video 2), streams live pressure and flow into the simulator and takes over from the software ventilator (fig. 9, video 3). The modelled lung then responds to a real machine, and the interface locks out its own controls to make the handover obvious.",
          "That meant implementing the ventilator’s serial protocol from its specification, and handling the ways real benches differ from ideal ones: wiring, unreliable adapters, a status flag that cannot be trusted. Link quality is watched continuously, and a run that drops too many packets is marked invalid rather than quietly believed.",
        ],
      },
      {
        heading: "Driving a real monitor",
        body: [
          "The headline capability. The simulator impersonates the acquisition hardware inside an EIT system, so a real, unmodified clinical monitor runs its own image reconstruction and displays live regional lung imagery generated entirely from simulated physics (fig. 1, video 1) — no patient, no physical phantom.",
          "This rests on applied linear algebra: a sensitivity matrix relates changes in lung conductivity to the voltages the monitor expects. I reduced it from the many thousands of elements of a finite-element model to four anatomical lung regions — small enough to evaluate every frame, detailed enough that the monitor still draws a genuinely regional image rather than a uniform pulse. On the bench, a real monitor passed its full start-up sequence and imaged the simulated lung.",
        ],
      },
    ],
    tags: ["Python", "PySide6 / Qt6", "PyQtGraph", "C++", "pybind11", "Real-Time Systems",
           "Multithreading", "Applied Linear Algebra", "Serial & TCP/IP", "Integrated Systems"],
    images: [
      { src: "assets/images/eitsim-enlight-pim.jpg",
        caption: "Fig. 1 — A real, unmodified Enlight 2100 EIT monitor rendering a live regional ventilation map. The “patient” is the simulator." },
      { src: "assets/images/eitsim-legacy-waveforms.png",
        caption: "Fig. 2 — Before: the legacy C++ tool. Correct physics behind a strip of tabs." },
      { src: "assets/images/eitsim-operation.png",
        caption: "Fig. 3 — After: the Operation view, laid out like a bedside monitor." },
      { src: "assets/images/eitsim-legacy-analysis.png",
        caption: "Fig. 4 — Before: PEEP titration in the legacy tool." },
      { src: "assets/images/eitsim-analysis.png",
        caption: "Fig. 5 — After: the analysis suite — pressure–volume, regional compliance, and lung collapse against overdistension." },
      { src: "assets/images/eitsim-regional.png",
        caption: "Fig. 6 — Every channel also resolved per lung region: anterior, posterior, right, left." },
      { src: "assets/images/eitsim-hemodynamics.png",
        caption: "Fig. 7 — The cardiac side: ECG and regional blood flow, which an EIT device must tell apart from breathing." },
      { src: "assets/images/eitsim-hardware.png",
        caption: "Fig. 8 — Hardware view: the four device connections, link statistics, and a console for bring-up." },
      { src: "assets/images/eitsim-c6-control.png",
        caption: "Fig. 9 — A real ventilator in control of the simulated lung; the app’s own controls grey out." },
      { src: "assets/images/eitsim-maneuvers.png",
        caption: "Fig. 10 — Clinical maneuvers: pressure ramps and a simulated saline bolus." },
    ],
    video: [
      { file: "assets/video/eitsim-enlight-live.mp4",
        poster: "assets/images/eitsim-video-poster.jpg",
        caption: "Video 1 — Live EIT imagery on the clinical monitor, breathing in step with the simulated lung." },
      { file: "assets/video/eitsim-test-lung.mp4",
        poster: "assets/images/eitsim-test-lung-poster.jpg",
        caption: "Video 2 — The bench: a mechanical test lung on the Hamilton C6 circuit." },
      { file: "assets/video/eitsim-c6-bench.mp4",
        poster: "assets/images/eitsim-c6-bench-poster.jpg",
        caption: "Video 3 — Setting modes and pressures on the real ventilator; the simulated lung follows them live." },
    ],
    docs: [
      { name: "EITSIM Studio — Technical Overview (41 pp, abridged)",
        file: "assets/docs/eitsim-studio-technical-overview.pdf" },
    ],
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
