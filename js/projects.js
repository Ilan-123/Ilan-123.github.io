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
              { src: "...", caption: "..." }. Leave [] for a gradient cover.
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
    date: "2026 — present",
    summary: "A desktop simulator that reproduces a ventilated ICU patient in real time to drive and verify EIT medical devices — no patient, no physical phantom.",
    description: [
      "EITSIM Studio reproduces the respiratory mechanics and hemodynamics of a mechanically-ventilated ICU patient in real time, so EIT hardware can be driven and verified without a patient and without a physical phantom. The physiology comes from a deterministic model, not a recording: every test is repeatable, every parameter controllable, and the device under test can be compared against known ground truth. It is also used for clinical research and teaching.",
      "At Timpel Medical I led its development end-to-end, building out essentially the whole current application on top of an initial Python scaffold started by an earlier colleague. It is written in Python (PySide6 / Qt6, PyQtGraph) over a validated C++ physics engine exposed through pybind11 — a rebuild of a legacy C++/FLTK/MathGL tool that kept the numerical core and replaced everything above it.",
      "Reproducing ICU lung conditions in software removes live-animal (porcine) studies from the device-verification loop, along with their ethical cost.",
    ],
    sections: [
      {
        heading: "What I built",
        body: [
          "An ICU-monitor-style application — frameless, full-screen, seven views (figs. 2–8).",
        ],
        items: [
          "Real-time interface: 100 Hz sweeping scopes for volume, flow and airway pressure beside a nine-tile numeric dashboard (fig. 2), with every channel also resolved per lung compartment (fig. 6).",
          "Clinical analysis: PEEP titration, pressure–volume curves and Costa recruitment curves reporting collapse, overdistension and compliance (fig. 3), plus parameterised pressure ramps and saline-bolus injection (fig. 8).",
          "Patient model: a four-compartment non-linear lung with Rohrer resistance and Venegas sigmoidal compliance, integrated by an adaptive Dormand–Prince solver and tuned against real anonymised titration data. A cardiac channel adds ECG and regional perfusion (fig. 7) — the signal an EIT device has to separate from ventilation.",
          "Authored the system's technical documentation — architecture, interfaces and validation evidence. An abridged public version is below.",
        ],
      },
      {
        heading: "Real-time architecture",
        body: [
          "The hard part is not the physics — it is keeping a 100 Hz physics thread, a Qt event loop and several device sockets coexisting without tearing, stalling or dropping samples.",
        ],
        items: [
          "The C++ engine integrates at a fixed 100 Hz with the GIL released, re-acquiring it briefly to hand the UI a chunk of samples every 50 ms.",
          "That callback gets a C++ buffer that is reused the instant it returns, so it copies out to plain Python, touches no widget, and crosses to the GUI thread only over queued connections.",
          "A 10 ms precise timer drains a sample FIFO so the scopes advance at true engine cadence, re-anchoring to wall-clock when the queue runs dry.",
          "Samples land in a NumPy ring buffer at full rate while redraw is throttled to ~20 FPS, so no sample is lost regardless of paint rate. Cross-thread state is published by lock-free single-writer rebinding, never shared mutable objects.",
        ],
      },
      {
        heading: "Hardware connectivity",
        body: [
          "Four device links run out of the application — three outbound over serial, one over the network — each with its own connection state, health reporting and teardown. One hardware view (fig. 4) covers port discovery, sampling-rate and signal-range configuration, live link statistics, a low-level serial console for bring-up, and a single button that disconnects everything safely.",
          "Three links carry the simulated patient outward: to the EIT simulator board, which also supplies the precise 100 Hz clock acquisition is paced against; to a companion EIT device; and over the network to a clinical monitor. The fourth runs inward, and is the interesting one.",
        ],
        items: [
          "Hardware-in-the-loop: a real Hamilton C6 ICU ventilator on a mechanical test lung (video 2) streams airway pressure and flow over RS-232 and replaces the internal ventilator as the thing driving the simulated lung (fig. 5, video 3) — a digital twin under real-hardware control.",
          "Implemented the vendor's serial block protocol from its specification: CRC-validated framed packets, bit-packed samples unpacked and offset-corrected, a resolution multiplier applied from the status byte, then upsampled to 100 Hz by zero-order hold. Drive is mode-aware — volume-targeted modes drive by inspiratory flow, pressure-targeted by airway pressure.",
          "The UI reflects the handover: software modes grey out behind a “Hamilton C6 in control” overlay, measured PEEP comes from the ventilator rather than the configured value, and breath detection switches to a volume-hysteresis detector because the ventilator's own phase flag flickers on real hardware.",
          "Link quality is polled continuously into a colour-coded health badge, with a drop-rate threshold above which a run is marked invalid rather than silently trusted — the difference between a test result and a guess.",
          "Real benches are not ideal ones. This also meant null-modem pinouts, USB-serial adapters that could not hold a line, and a status bit that lies; the diagnostic surfaces exist because of it.",
        ],
      },
      {
        heading: "Emulating the EIT acquisition module",
        body: [
          "The headline capability: the simulator emulates the EIT acquisition front-end, so a real, unmodified clinical monitor runs its own reconstruction and renders live regional lung imagery driven entirely by simulated physics (fig. 1, video 1) — no patient, no phantom.",
          "The forward model is a first-order linearisation about a baseline, V = V₀ + J·Δρ, mapping regional resistivity change to the boundary voltages the monitor expects. The Jacobian is reduced from the thousands of pixels of a finite-element model to four anatomical zones, and compartment volumes map to resistivity from each zone's own end-expiratory baseline under one shared gain — deliberately not normalised per zone, which would flatten inter-zone contrast into a uniform pulse and destroy the regional image.",
          "On the bench a real monitor cleared every start-up gate — secure handshake, belt calibration, 32-electrode contact and signal quality — reached launch, and rendered live EIT. A hardware-free self-test reproduces the whole session so the emulator can be verified with no device on the desk.",
        ],
      },
    ],
    tags: ["Python", "PySide6 / Qt6", "PyQtGraph", "C++", "pybind11", "Real-Time Systems",
           "Multithreading", "EIT Reconstruction", "Numerical Methods", "Medical Devices",
           "Serial & TCP/IP"],
    images: [
      { src: "assets/images/eitsim-enlight-pim.jpg",
        caption: "Fig. 1 — A real, unmodified Enlight 2100 EIT monitor rendering a live regional ventilation map. The “patient” is the simulator." },
      { src: "assets/images/eitsim-operation.png",
        caption: "Fig. 2 — Operation view: numeric dashboard beside sweeping volume, flow and airway-pressure scopes." },
      { src: "assets/images/eitsim-analysis.png",
        caption: "Fig. 3 — Analysis view: pressure–volume curve, regional compliance and distribution, and the Costa collapse/overdistension curves." },
      { src: "assets/images/eitsim-hardware.png",
        caption: "Fig. 4 — Hardware view: ports for all four device links, live link statistics, and a serial console for bring-up." },
      { src: "assets/images/eitsim-c6-control.png",
        caption: "Fig. 5 — Hardware-in-the-loop: the Hamilton C6 drives the simulated lung and the app locks out its own ventilation modes." },
      { src: "assets/images/eitsim-regional.png",
        caption: "Fig. 6 — Volume, flow and alveolar pressure resolved per lung compartment: anterior, posterior, right, left." },
      { src: "assets/images/eitsim-hemodynamics.png",
        caption: "Fig. 7 — Cardiac channel: synthesised ECG and regional perfusion, the signal EIT must separate from ventilation." },
      { src: "assets/images/eitsim-maneuvers.png",
        caption: "Fig. 8 — Clinical maneuvers: parameterised pressure ramps and saline-bolus injection." },
    ],
    video: [
      { file: "assets/video/eitsim-enlight-live.mp4",
        poster: "assets/images/eitsim-video-poster.jpg",
        caption: "Video 1 — Live EIT imagery on the clinical monitor, breathing in step with the simulated lung." },
      { file: "assets/video/eitsim-test-lung.mp4",
        poster: "assets/images/eitsim-test-lung-poster.jpg",
        caption: "Video 2 — The bench: a mechanical test lung on the Hamilton C6 circuit, the physical half of the hardware-in-the-loop rig." },
      { file: "assets/video/eitsim-c6-bench.mp4",
        poster: "assets/images/eitsim-c6-bench-poster.jpg",
        caption: "Video 3 — Setting modes and pressures on the real ventilator; the simulated lung follows them live." },
    ],
    docs: [
      { name: "EITSIM Studio — Technical Overview (43 pp, abridged)",
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
