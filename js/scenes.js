/* ═══════════════════════════════════════════════════════════════
   scenes.js — Home scroll story (engine: leave alone)
   Four pinned scenes scrubbed by scroll: engine, linac, airfoil,
   cantilever. Geometry lives here; every color comes from CSS
   classes so both themes work. Markup is in index.html (#t-*).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var home = document.getElementById("view-home");
  if (!home || !document.getElementById("story")) return;

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

  /* ── scroll driver ─────────────────────────────
     One pinned stage; global progress P over the whole story maps to a
     local 0→1 per scene. Scenes crossfade in place — no travel between. */
  var story = $("story");
  var scenes = [
    { el: $("sc-thermal"), draw: drawThermal },
    { el: $("sc-em"),      draw: drawEm      },
    { el: $("sc-fluid"),   draw: drawFluid   },
    { el: $("sc-fea"),     draw: drawFea     }
  ];
  function frame() {
    if (home.hidden) return;                 /* another tab is active */
    if (reduced) {                           /* static mid-scene frames */
      scenes.forEach(function (s) {
        s.draw(0.62);
        s.el.style.opacity = 1;
        s.el.style.visibility = "visible";
      });
      return;
    }
    var vh = window.innerHeight;
    var rect = story.getBoundingClientRect();
    var P = clamp(-rect.top / (rect.height - vh || 1));
    var n = scenes.length;
    scenes.forEach(function (s, i) {
      var t = P * n - i;                     /* <0 upcoming · 0..1 active · >1 done */
      /* fade in just before its turn; instantly covered by the next one after */
      var op = clamp(1 + Math.min(t, 0) * 14) * clamp(1 - Math.max(t - 1, 0) * 14);
      s.el.style.opacity = op;
      s.el.style.visibility = op <= 0 ? "hidden" : "visible";
      if (op > 0) s.draw(clamp(t));
    });
  }
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
