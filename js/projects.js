/* ═══════════════════════════════════════════════════════════════
   PROJECTS — EDIT ME
   This is THE content file. To add or flesh out a project: edit a
   block below, save, refresh the browser. Newest first.

   Field guide:
     id       unique, lowercase, no spaces (used internally)
     tab      which sub-tab it appears in — must match an id in
              config.js → projectTabs ("thermal", "em", "design", "code").
              An array shows the same entry under several sub-tabs,
              e.g. tab: ["em", "design"]
     featured (optional) true → full-width highlight row shown first
     wip      (optional) true → "Under Construction" hazard tape on the card.
              Delete the line once the entry is actually written.
     title    card + detail heading
     date     free text, e.g. "2026" or "Spring 2026"
     summary  ONE line, shown on the card
     description  array of paragraphs for the detail view
     tags     short keywords, shown as chips
     sections (optional) extra headed blocks after the description —
              [{ heading, body: [paragraphs], items: [bullets] }]
     cover    (optional) card-cover image path, when the first gallery
              photo isn't the best one to lead with (e.g. a featured row)
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
    wip: true,
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
    id: "egr101-paintbrush",
    tab: "design",
    title: "Automatic Paintbrush Cleaner",
    cover: "assets/images/egr101-paintbrush-cover.jpg",   // clean assembly photo, cropped to 16:9
    date: "Fall 2025",
    summary: "An 18-brush cleaner for a local oil painter: a motor-driven carrier, a soft silicone cleaning surface, and a removable solvent cup.",
    description: [
      "Local artist James Keul came to our EGR 101 team at Duke with a task that followed every painting session: cleaning oil paint out of his brushes, one at a time. His process involved soaking them in solvent, working the bristles against his hand, and washing them with soap and water. The brief was to automate the scrubbing, clean several brushes together, and reduce the artist's direct contact with solvent while preserving the bristles.",
      "I served as Chief Engineer on our five-person team, the Paint Killers. We took the project from client interviews and background research through concept selection, CAD, successive prototypes, and a functioning machine. I led CAD and circuit integration and carried out all of the project's physics-based analysis. My hands-on work also included testing the cleaning base and molding new brush holders as the assembly developed. The team and completed cleaner are shown at the final presentation in fig. 10.",
    ],
    sections: [
      {
        heading: "Choosing the mechanism",
        body: [
          "The original brief (fig. 1) called for at least five brushes, with ten as a goal; setup in under five minutes; and no visible bristle damage after fifteen uses, judged by the artist. It also constrained solvent volume and countertop space. The brush lineup beside a ruler (fig. 2) shows the variation in handle length, diameter, and bristle shape the design had to accommodate. Our research covered existing cleaners, cleaning methods, and brush care, so the mechanism and the liquid it worked in were considered together.",
          "We broke the problem into functions and components, generated about fifty idea cards, and used a morphological chart to combine them into concepts. Seven candidates went through Pugh screening, followed by a weighted comparison of four concept groups. Safety and bristle preservation carried the largest weights. We selected a circular carrier that moves the brushes over a textured base: it offered room for more brushes around the circumference and let the cleaning surface work along the bristles rather than pressing straight into their tips.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "In the final assembly (fig. 7), a rechargeable 12 V battery powers two motors that drive a large gear carrying the brushes. The motors periodically reverse direction, moving the bristles across a stationary silicone mat with a finger-like texture inside a clear acrylic cup. Flexible inserts grip the brush handles; the user adjusts each brush's height to reach the cleaning surface. Ball bearings above and below the carrier support its rotation inside the printed casing. The intermediate prototype's exposed drive is shown in video 1; video 2 shows the bristles flexing against the silicone fingers as the carrier moves.",
          "The interface has two buttons: one starts the solvent cycle, the other a shorter soap-and-water cycle. A screen identifies the active cycle, shown displaying “Water and Soap” in fig. 9. The detachable cup lets the user change the cleaning liquid, while the upper enclosure houses the drive and electronics. Fig. 8 shows the cleaner connected to its external battery on the bench.",
        ],
      },
      {
        heading: "What changed in prototyping",
        body: [
          "A cardboard-and-tape mockup (fig. 3) explored the circular layout and the position of a brush over the lower cleaning surface. The casing models were then prepared for 3D printing (fig. 4). The first printed structure was bulkier than it needed to be. As we gained confidence in the strength of the printed parts, we slimmed the enclosure down. We also replaced the brittle brush-holder material with a more flexible formulation to make brush insertion easier.",
          "Base development included a flexible liner fitted inside the acrylic cup (fig. 5) and cleaning-surface prototypes with different ridge and post patterns (fig. 6). Client feedback led to telescoping legs: raising the upper assembly gives the cup clearance to slide out for emptying and refilling.",
        ],
      },
      {
        heading: "Testing and results",
        body: [
          "The prototype's operating capacity grew beyond the original five-to-ten-brush brief. The results below combine the final poster's measurements with subsequent repeated cleaning tests and client feedback.",
        ],
        items: [
          "Setup and start: approximately 2 minutes 30 seconds after reading the instructions, against a target of under 5 minutes.",
          "Capacity: the machine ran with 18 brushes. The poster marks capacity as a pass; it does not give a cycle-by-cycle endurance record.",
          "Appearance: an average of 3.84 out of 5 across color, size, and shape, exceeding the target of 3.",
          "Cleaning effectiveness: the original target was 90% paint removal after one full cycle. In repeated testing, cleaned brushes showed no visible paint and left no visible paint residue when placed on a paper towel. The client accepted the result based on these checks.",
        ],
      },
      {
        heading: "What I would carry forward",
        body: [
          "Our retrospective exposed a scheduling problem that CAD alone could not solve: glue curing and access to shared 3D printers created periods when assembly could not move forward. Trello helped organize tasks, but we used it less effectively to schedule those dependencies, and too much finishing work accumulated before Thanksgiving. On another build I would assign responsibilities earlier and explicitly reserve time for printing, curing, assembly, and retesting. A next iteration would also document longer-term bristle wear across repeated cleaning cycles.",
        ],
      },
    ],
    tags: ["Onshape", "CAD", "Circuit Integration", "Physics Analysis", "3D Printing", "Mechanisms", "Silicone Molding", "Prototyping", "Design Testing", "Team Leadership"],
    images: [
      { src: "assets/images/egr101-paintbrush-design-criteria.jpg",
        caption: "Fig. 1 — Early design criteria: at least five brushes, a ten-brush goal, limited solvent use, low manual effort, and preservation of the bristles." },
      { src: "assets/images/egr101-paintbrush-brush-sizing.jpg",
        caption: "Fig. 2 — Brush sizing beside a ruler. The range of handle lengths, diameters, and bristle shapes had to fit the same carrier and cleaning surface." },
      { src: "assets/images/egr101-paintbrush-cardboard-mockup.jpg",
        caption: "Fig. 3 — Cardboard-and-tape mockup of the circular layout, with a brush positioned over the lower surface and pencils supporting the upper structure." },
      { src: "assets/images/egr101-paintbrush-casing-print-preparation.jpg",
        caption: "Fig. 4 — Casing models being prepared for 3D printing: ring-shaped housings with space for the drive and controls." },
      { src: "assets/images/egr101-paintbrush-cup-liner-prototype.jpg",
        caption: "Fig. 5 — A flexible cleaning liner inside the acrylic cup during base development." },
      { src: "assets/images/egr101-paintbrush-texture-prototypes.jpg",
        caption: "Fig. 6 — Cleaning-surface texture prototypes with different ridge and post patterns. A banana provides an informal size reference." },
      { src: "assets/images/egr101-paintbrush-final-assembly.jpg",
        caption: "Fig. 7 — Final assembled prototype: the printed enclosure and controls above the removable acrylic cup, with brushes held over the textured silicone base and telescoping legs on either side." },
      { src: "assets/images/egr101-paintbrush-battery-bench.jpg",
        caption: "Fig. 8 — Bench setup with the cleaner connected to its external battery and temporary bands around the casing." },
      { src: "assets/images/egr101-paintbrush-controls.jpg",
        caption: "Fig. 9 — The brush carrier, flexible handle inserts, two buttons, and illuminated display showing “Water and Soap” mode." },
      { src: "assets/images/egr101-paintbrush-team-presentation.jpg",
        caption: "Fig. 10 — The five-person Paint Killers team with the cleaner and project poster at the final presentation." },
    ],
    video: [
      { file: "assets/video/egr101-paintbrush-drive-test.mp4",
        poster: "assets/images/egr101-paintbrush-drive-test-poster.jpg",
        caption: "Video 1 — Bench test of an intermediate prototype: the exposed drive gear moves the circular brush carrier." },
      { file: "assets/video/egr101-paintbrush-bristle-contact.mp4",
        poster: "assets/images/egr101-paintbrush-bristle-contact-poster.jpg",
        caption: "Video 2 — Close-up of bristles flexing against the silicone fingers as the carrier moves. This mechanical test shows brush-to-mat contact." },
    ],
    docs: [
      { name: "Final design poster — prototype and test results (PDF)",
        file: "assets/docs/egr101-paintbrush-final-poster.pdf" },
      { name: "Client problem statement and design criteria — September 2025 (DOCX)",
        file: "assets/docs/egr101-paintbrush-problem-statement.docx" },
      { name: "Background research worksheet (DOCX)",
        file: "assets/docs/egr101-paintbrush-research.docx" },
      { name: "Concept selection technical memo — October 2025 (DOCX)",
        file: "assets/docs/egr101-paintbrush-concept-selection.docx" },
      { name: "Dimension planning worksheet (XLSX)",
        file: "assets/docs/egr101-paintbrush-dimensions.xlsx" },
      { name: "Testing plan — October 2025 (DOCX)",
        file: "assets/docs/egr101-paintbrush-testing-plan.docx" },
      { name: "Team post-mortem (DOCX)",
        file: "assets/docs/egr101-paintbrush-post-mortem.docx" },
    ],
    links: [
      { name: "Project CAD (Onshape)",
        url: "https://cad.onshape.com/documents/89c24ac43a8bbc9b105d65da/w/597d6d2f2a63498a01f5778e/e/c993307b61820c0900642f55" },
      { name: "Team project board (Trello)",
        url: "https://trello.com/b/Zv7lRMfc/egr101-paintbrush" },
    ],
  },

  {
    id: "rc-airplane",
    tab: "design",
    wip: true,
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
          "The simulator already existed as a legacy C++ tool: correct physics behind a wall of tabs and bare plots (figs. 2, 4). I kept the validated numerical core and replaced everything above it with a Python application that reads like the bedside monitors clinicians already use (figs. 3, 5) — live waveform scopes, a permanent panel of respiratory numbers, and seven views spanning ventilation, per-region behaviour (figs. 6, 7), clinical maneuvers (fig. 10) and hardware setup (fig. 8). Video 1 shows the app running on the bench, from live respiratory waveforms to interactive regional analysis.",
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
          "Four device connections run out of the application (fig. 8): three carry the simulated patient outward to EIT hardware, and the fourth runs inward — the one I like most. A real Hamilton C6 ICU ventilator, breathing into a mechanical test lung on the bench (video 3), streams live pressure and flow into the simulator and takes over from the software ventilator (fig. 9, video 4). The modelled lung then responds to a real machine, and the interface locks out its own controls to make the handover obvious.",
          "That meant implementing the ventilator’s serial protocol from its specification, and handling the ways real benches differ from ideal ones: wiring, unreliable adapters, a status flag that cannot be trusted. Link quality is watched continuously, and a run that drops too many packets is marked invalid rather than quietly believed.",
        ],
      },
      {
        heading: "Driving a real monitor",
        body: [
          "The headline capability. The simulator impersonates the acquisition hardware inside an EIT system, so a real, unmodified clinical monitor runs its own image reconstruction and displays live regional lung imagery generated entirely from simulated physics (fig. 1, video 2) — no patient, no physical phantom.",
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
      { file: "assets/video/eitsim-app-in-action.mp4",
        poster: "assets/images/eitsim-app-in-action-poster.jpg",
        caption: "Video 1 — EITSIM Studio in action: live volume, flow, and pressure waveforms, followed by interactive regional analysis. Excerpts from a bench session." },
      { file: "assets/video/eitsim-enlight-live.mp4",
        poster: "assets/images/eitsim-video-poster.jpg",
        caption: "Video 2 — Live EIT imagery on the clinical monitor, breathing in step with the simulated lung." },
      { file: "assets/video/eitsim-test-lung.mp4",
        poster: "assets/images/eitsim-test-lung-poster.jpg",
        caption: "Video 3 — The bench: a mechanical test lung on the Hamilton C6 circuit." },
      { file: "assets/video/eitsim-c6-bench.mp4",
        poster: "assets/images/eitsim-c6-bench-poster.jpg",
        caption: "Video 4 — Setting modes and pressures on the real ventilator; the simulated lung follows them live." },
    ],
    docs: [
      { name: "EITSIM Studio — Technical Overview (41 pp, abridged)",
        file: "assets/docs/eitsim-studio-technical-overview.pdf" },
    ],
    links: [],
  },

  {
    id: "electrical-generator",
    tab: ["em", "design"],
    featured: true,   // full-width row, cover on the left (alternates with EITSIM)
    cover: "assets/images/generator-full-assembly.jpg",   // the machine itself, not fig. 1's bench
    title: "Axial-Flux Flywheel Generator",
    date: "2021 — 2022",
    summary: "Built at fifteen, in lockdown: eight magnets a side, four hand-wound coils, and a gym plate for a flywheel. The first version tore itself apart.",
    description: [
      "In 2021 I was fifteen, locked down in São Paulo, and I watched a video about flywheel batteries — machines that store energy as spinning mass instead of chemistry. I set out to build one from what a middle schooler can reach: styrofoam, glue, and enamelled copper wire cut with a craft knife (fig. 1). It destroyed itself. The magnetic attraction between the two rotor disks pulled them into each other and the foam folded inward, without ever lighting a single LED (figs. 2, 3). Fifty-seven newtons of pull through a foam disk with eight holes cut in it — §9 of the PDF works out why, with the equation I did not have at the time.",
      "Six months later I came back to it knowing the material had to change. A friend's father taught engineering at a local university and offered to print the parts; he just asked me to send him the CAD file, in two days. I had to look up what a CAD file was. Two days of teaching myself Tinkercad on a laptop I had been using for Minecraft (all five models are linked below), a few rounds of parts in the post, and six weeks of assembly between school days — and it ran (figs. 4–6, video 1).",
      "Over the next three months I added the parts that made it measurable: a hand crank, a 4:1 planetary gearbox (fig. 7), and a spool that drops a known mass from a known height (video 4). It was my first large project and it still sits on a shelf in my room. The PDF below is the analysis I could not write at fifteen.",
    ],
    sections: [
      {
        heading: "How it works",
        body: [
          "A dual-rotor, coreless axial-flux permanent-magnet generator. Two printed disks each carry eight neodymium magnets in alternating polarity, spinning either side of four hand-wound coils in series — about 400 turns of AWG 32 apiece in a 5 × 6 mm window. Four pole pairs mean the coils see 20 Hz at only 300 rpm, and the AC output runs through a full-bridge rectifier on a breadboard before it reaches the LEDs; video 2 is a single coil being characterised against the spinning rotor. §1–§4 of the PDF derive the machine from Faraday's law: where the voltage comes from, why more turns stop helping, and the speed below which the LEDs simply cannot light.",
        ],
      },
      {
        heading: "Does it agree with theory?",
        body: [
          "A hand crank is not a measurement, so the last thing I built was a spool that drops 200 g through one metre — 1.96 J of input, repeatable every time. Reading the meter frame by frame through that drop (video 3) gives the only quantitative data the project ever produced, and §8 of the PDF turns it into the machine's voltage constant: 0.10 V·s/rad measured, against 0.11 predicted from the magnets and the winding geometry alone. Two independent routes to the same number — though §8 is also clear about how much that agreement is worth, since the fall speed is only good to ±30%.",
        ],
      },
    ],
    tags: ["Electromagnetics", "Faraday Induction", "Permanent Magnets", "3D Printing",
           "CAD", "Tinkercad", "Rectification", "Energy Storage", "Self-taught"],
    images: [
      { src: "assets/images/generator-tools.jpg",
        caption: "Fig. 1 — Everything the first version was made of: hand-wound coils, LEDs, a spool of magnet wire, a soldering iron, a glue gun and offcuts of styrofoam." },
      { src: "assets/images/generator-styrofoam-v1.jpg",
        caption: "Fig. 2 — Version one, cut from styrofoam by hand. It never lit an LED." },
      { src: "assets/images/generator-failure-vs-printed.jpg",
        caption: "Fig. 3 — Why the project stopped for six months. In my hand, the styrofoam rotor after the magnets pulled it into itself; on the table, its replacements — printed disks with eight closed pockets, the magnets that did the damage, a bearing, and the 2 kg gym plate that became the flywheel." },
      { src: "assets/images/generator-shaft.jpg",
        caption: "Fig. 4 — Fitting the weight plates to the copper-pipe shaft. Standard gym plates turned out to fit the printed hub adapter exactly, which is why the flywheel could be swapped between 2 kg and 5 kg." },
      { src: "assets/images/generator-half-assembled.jpg",
        caption: "Fig. 5 — Half assembled: shaft and flywheel running in the PVC frame, with the four coils and the breadboard still loose on the desk." },
      { src: "assets/images/generator-full-assembly.jpg",
        caption: "Fig. 6 — The machine complete, minus the flywheel: rotors, coil holder, bridge rectifier and a lit LED on the breadboard." },
      { src: "assets/images/generator-gearbox.jpg",
        caption: "Fig. 7 — The 4:1 planetary gearbox mounted on the frame, driving the shaft from the hand crank." },
    ],
    video: [
      { file: "assets/video/generator-first-success.mp4",
        poster: "assets/images/generator-first-success-poster.jpg",
        caption: "Video 1 — It works. Three blue LEDs on the breadboard, driven by hand through the rectifier." },
      { file: "assets/video/generator-coil-test.mp4",
        poster: "assets/images/generator-coil-test-poster.jpg",
        caption: "Video 2 — Characterising one coil at a time: a single coil held against the spinning rotor reads a few tenths of a volt on the meter." },
      { file: "assets/video/generator-gravity-drop.mp4",
        poster: "assets/images/generator-gravity-drop-poster.jpg",
        caption: "Video 3 — The measurement that mattered, slowed 2×: a 200 g mass falls, and the meter climbs to 4.6 V as the rotor accelerates. These are the twelve readings plotted in the PDF." },
      { file: "assets/video/generator-drop-leds.mp4",
        poster: "assets/images/generator-drop-leds-poster.jpg",
        caption: "Video 4 — The same drop, driving the LEDs: potential energy to kinetic energy to light, in one continuous shot." },
    ],
    docs: [
      { name: "Physics Teardown — Faraday induction, flywheel storage, and why the first prototype imploded (12 pp)",
        file: "assets/docs/generator-physics-teardown.pdf" },
    ],
    links: [
      { name: "CAD — magnet holder & coils (Tinkercad)", url: "https://www.tinkercad.com/things/2eQHYODI72g-magnet-holder-and-copper-wire-coils?sharecode=BSwrCkvyPxypFUSPQQhxcVgHgzoQOB-G5wf76oISZC4" },
      { name: "CAD — coil holder (Tinkercad)", url: "https://www.tinkercad.com/things/eS1fPkHjI8a-coils-holder?sharecode=cH58nPcXVRiTfp46UTC_zQzTLJh9ZYc8rFFcrhsKZpw" },
      { name: "CAD — 4:1 planetary gearbox (Tinkercad)", url: "https://www.tinkercad.com/things/bsliIvDM4vG-planetary-gearbox-41?sharecode=xUv1ApZ4Wu8NFFUVF2Wyzq9TivU9x_-I6v-Kpl8jgDc" },
      { name: "CAD — hand crank (Tinkercad)", url: "https://www.tinkercad.com/things/jjCg1GAWyCz-hand-crank?sharecode=73hgl6E4q2lhxeGdMMd95dIDnB5CsthITeNxCvqEY-E" },
      { name: "CAD — potential-energy spool (Tinkercad)", url: "https://www.tinkercad.com/things/13qAvB3pymn-potential-energy-roll?sharecode=K6cFiqOxdQNaWvpDE5JnQDvxRhPvPDIm7zYj_akAFIU" },
      { name: "The video that started it — flywheel battery", url: "https://youtu.be/yhu3s1ut3wM" },
    ],
  },

  {
    id: "github-projects",
    tab: "code",
    wip: true,
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
