/* ═══════════════════════════════════════════════════════════════
   scenes.js — Home scroll story (engine: leave alone)
   Five pinned scenes scrubbed by scroll: engine, linac, airfoil,
   cantilever, real-time scope. Geometry lives here; every color comes from CSS
   classes so both themes work. Markup is in index.html (#t-*).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var home = document.getElementById("view-home");
  if (!home || !document.getElementById("t-thermal")) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function $(id) { return document.getElementById(id); }

  /* ── 1 · four-stroke engine ────────────────────
     Crank angle θ = scroll · 4π (two revolutions = one full cycle).
     Piston pin: y = crankY − (R·cosθ + √(L² − R²sin²θ)). */
  var R = 58, L = 170, CY = 420, PX = 210;
  var PHASES = ["intake", "compression", "power", "exhaust"];
  function drawThermal(p) {
    var th = p * 4 * Math.PI;
    var s = Math.sin(th), c = Math.cos(th);
    var pinY = CY - (R * c + Math.sqrt(L * L - R * R * s * s));
    var crankX = PX + R * s, crankY = CY - R * c;
    var top = pinY - 40;
    $("e-piston").setAttribute("transform", "translate(0," + top + ")");
    var rod = $("e-rod");
    rod.setAttribute("x1", PX); rod.setAttribute("y1", pinY + 22);
    rod.setAttribute("x2", crankX); rod.setAttribute("y2", crankY);
    var throwEl = $("e-throw");
    throwEl.setAttribute("x2", crankX); throwEl.setAttribute("y2", crankY);
    $("e-pin").setAttribute("cx", crankX); $("e-pin").setAttribute("cy", crankY);

    var phase = Math.min(3, Math.floor(th / Math.PI));
    var ft = (th % Math.PI) / Math.PI;              /* 0→1 within stroke */
    var lift = Math.sin(ft * Math.PI) * 15;
    $("e-valve-in").setAttribute("transform", "translate(0," + (phase === 0 ? lift : 0) + ")");
    $("e-valve-ex").setAttribute("transform", "translate(0," + (phase === 3 ? lift : 0) + ")");

    var charge = $("e-charge");
    charge.setAttribute("height", Math.max(4, top - 103));
    charge.setAttribute("class", "ph" + phase);
    var op = [0.07 + 0.06 * ft, 0.13 + 0.18 * ft, 0.5 * (1 - ft) + 0.08, 0.15 * (1 - ft) + 0.03][phase];
    charge.setAttribute("opacity", op.toFixed(3));
    $("e-flash").setAttribute("opacity", phase === 2 && ft < 0.18 ? ((1 - ft / 0.18) * 0.85).toFixed(3) : 0);

    var lines = $("e-phases").children;
    for (var i = 0; i < 4; i++) {
      lines[i].setAttribute("class", i === phase ? "on" : "");
    }
    $("hud-thermal").textContent = "θ " +
      String(Math.round(th * 180 / Math.PI) % 720).padStart(3, "0") + "° · " + PHASES[phase];
  }

  /* ── 2 · linear accelerator ────────────────────
     x ∝ p^1.7 (accelerating); the gap being crossed lights up. */
  var GAPS = [[68, 86], [126, 144], [194, 212], [270, 288]];  /* match tube rects */
  var gapEls = [];
  (function buildGaps() {
    var g = $("a-gaps"), html = "";
    GAPS.forEach(function (gp) {
      var m = (gp[0] + gp[1]) / 2;
      html += '<g class="sk-gap"><line x1="' + (m - 6) + '" y1="150" x2="' + (m + 5) + '" y2="150"/>' +
        '<path d="M ' + (m + 1) + ' 145 L ' + (m + 7) + ' 150 L ' + (m + 1) + ' 155"/></g>';
    });
    g.innerHTML = html;
    gapEls = Array.prototype.slice.call(g.children);
  })();
  function drawEm(p) {
    var x = 30 + 340 * Math.pow(p, 1.7);
    $("a-particle").setAttribute("cx", x);
    var tr = $("a-trail");
    tr.setAttribute("x1", Math.max(30, x - 20 - 60 * p)); tr.setAttribute("x2", x);
    var inGap = -1;
    GAPS.forEach(function (gp, i) {
      var on = x >= gp[0] - 3 && x <= gp[1] + 3;
      if (on) inGap = i;
      gapEls[i].setAttribute("class", "sk-gap" + (on ? " on" : ""));
    });
    var v = 0.10 + 0.85 * Math.sqrt(p);
    $("hud-em").textContent = "v " + v.toFixed(2) + "c · " +
      (inGap >= 0 ? "kick! gap " + (inGap + 1) : (p > 0.97 ? "beam out" : "drift"));
  }

  /* ── 3 · flow over an airfoil ──────────────────
     Streamlines draw in via stroke-dash; wake vortex fades in late. */
  var flows = Array.prototype.slice.call(document.querySelectorAll(".flowline"));
  flows.forEach(function (f) {
    var len = f.getTotalLength();
    f.dataset.len = len;
    f.style.strokeDasharray = len + " " + len;
    f.style.strokeDashoffset = len;
  });
  function drawFluid(p) {
    flows.forEach(function (f, i) {
      var pi = clamp(p * 1.45 - i * 0.07);
      f.style.strokeDashoffset = f.dataset.len * (1 - pi);
    });
    $("f-vortex").setAttribute("opacity", (clamp((p - 0.75) * 4) * 0.9).toFixed(3));
    $("hud-fluid").textContent = "Re " + (0.1 + 2.9 * p).toFixed(1) + "e5";
  }

  /* ── 4 · cantilever under load ─────────────────
     Deflection curve w(ξ) = δ(3ξ² − ξ³)/2; mesh + load follow the tip. */
  function drawFea(p) {
    var D = 64 * p, N = 24;
    var topPts = [], botPts = [], mesh = "";
    for (var i = 0; i <= N; i++) {
      var xi = i / N, x = 60 + 300 * xi;
      var w = D * (3 * xi * xi - xi * xi * xi) / 2;
      topPts.push(x + "," + (137 + w));
      botPts.push(x + "," + (163 + w));
      if (i % 3 === 0 && i > 0) mesh += "M" + x + " " + (137 + w) + " L" + x + " " + (163 + w) + " ";
    }
    $("s-beam").setAttribute("points", topPts.join(" ") + " " + botPts.reverse().join(" "));
    $("s-mesh").setAttribute("d", mesh);
    $("s-stress").setAttribute("opacity", (p * 0.30).toFixed(3));
    $("s-load").setAttribute("y1", 137 + D - 46);
    $("s-load").setAttribute("y2", 131 + D);
    $("s-loadhead").setAttribute("transform", "translate(0," + D + ")");
    $("s-loadlbl").setAttribute("y", 104 + D);
    $("hud-fea").textContent = "F " + (5 * p).toFixed(1) + " kN · δ " + (18 * p).toFixed(1) + " mm";
  }

  /* ── 5 · real-time scope ───────────────────────
     A 100 Hz engine feeds a live trace; the sweep cursor and the
     waveform draw in left→right as the track scrolls. */
  function drawCode(p) {
    var SX0 = 162, SX1 = 392, SYM = 152, A = 44, A2 = 15, W = SX1 - SX0, K = 2.4 * 2 * Math.PI;
    function yAt(x) { var ph = (x - SX0) / W * K; return SYM - A * Math.sin(ph) - A2 * Math.sin(2.7 * ph + 0.6); }
    var xEnd = SX0 + W * p;
    var n = Math.max(1, Math.round((xEnd - SX0) / 4)), d = "";
    for (var i = 0; i <= n; i++) {
      var x = SX0 + (xEnd - SX0) * (i / n);
      d += (i ? " L" : "M") + x.toFixed(1) + " " + yAt(x).toFixed(1);
    }
    $("c-trace").setAttribute("d", d);
    $("c-dot").setAttribute("cx", xEnd.toFixed(1));
    $("c-dot").setAttribute("cy", yAt(xEnd).toFixed(1));
    $("c-sweep").setAttribute("x1", xEnd.toFixed(1));
    $("c-sweep").setAttribute("x2", xEnd.toFixed(1));
    $("hud-code").textContent = "n " + Math.round(p * 200) + " · 100 Hz";
  }

  /* ── scroll driver ─────────────────────────────
     progress = how far the pinned track has been scrolled through. */
  var scenes = [
    { track: $("t-thermal"), copy: $("copy-thermal"), draw: drawThermal },
    { track: $("t-em"),      copy: $("copy-em"),      draw: drawEm      },
    { track: $("t-fluid"),   copy: $("copy-fluid"),   draw: drawFluid   },
    { track: $("t-fea"),     copy: $("copy-fea"),     draw: drawFea     },
    { track: $("t-code"),    copy: $("copy-code"),    draw: drawCode    }
  ];
  scenes.forEach(function (s) {
    s.stage = s.track.querySelector(".stage");
  });
  function frame() {
    if (home.hidden) return;                 /* another tab is active */
    scenes.forEach(function (s) {
      /* card pins while the track scrolls past: progress 0→1 over
         (track height − card height) ≈ 300vh of scroll */
      var rect = s.track.getBoundingClientRect();
      var stickyTop = parseFloat(getComputedStyle(s.stage).top) || 0;
      var span = rect.height - s.stage.offsetHeight || 1;
      var p = reduced ? 0.62 : clamp((stickyTop - rect.top) / span);
      s.draw(p);
      var o = clamp(p * 5);
      s.copy.style.opacity = 0.15 + 0.85 * o;
      s.copy.style.transform = "translateY(" + (1 - o) * 22 + "px)";
    });
  }
  window.__scenesFrame = frame;              /* test hook (see _probe.html) */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () { frame(); ticking = false; });
    }
  }, { passive: true });
  window.addEventListener("resize", frame);
  window.addEventListener("hashchange", function () {
    requestAnimationFrame(frame);            /* redraw when Home becomes visible */
  });
  frame();
})();
