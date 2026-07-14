/* ═══════════════════════════════════════════════════════════════
   plasma.js — hero background animation (engine: leave alone)
   Charged particles advected along a divergence-free swirl field.
   Dark theme: additive cyan/magenta/orange plasma glow.
   Light theme: fine engineering-blue streamlines.
   Pauses off-screen & in hidden tabs; static frame if the visitor
   prefers reduced motion.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var canvas = document.getElementById("plasma");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var THEMES = {
    dark: {
      bg: "#070b14",
      fade: "rgba(7, 11, 20, 0.07)",
      composite: "lighter",
      colors: ["79,216,235", "224,95,196", "240,163,94"],
      weights: [0.62, 0.28, 0.10],
      alpha: 0.5,
      lineWidth: 1.5,
    },
    light: {
      bg: "#f5f7fb",
      fade: "rgba(245, 247, 251, 0.09)",
      composite: "source-over",
      colors: ["21,95,173", "156,47,138", "180,86,15"],
      weights: [0.78, 0.14, 0.08],
      alpha: 0.20,
      lineWidth: 1,
    },
  };

  function theme() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? THEMES.light : THEMES.dark;
  }

  var W = 0, H = 0, particles = [], t = 0, rafId = null;
  var inView = true;

  /* Live stats for the hero telemetry readout (read by main.js). */
  var stats = { particles: 0, fps: 0, mode: reduced ? "STATIC" : "INIT" };
  var frameCount = 0, fpsStamp = performance.now();
  window.PLASMA_STATS = stats;

  /* Divergence-free velocity field from a streamfunction:
     psi = sum of drifting sin/cos waves → u = dψ/dy, v = -dψ/dx.
     A small +x drift gives the toroidal "flow around the machine" feel. */
  function velocity(x, y, time) {
    var sx = (x / W) * 6.28318, sy = (y / H) * 6.28318;
    var a = 1.7, b = 2.3, c = 1.1, d = 2.9;
    var u = -b * Math.sin(a * sx + time * 0.24) * Math.sin(b * sy - time * 0.17)
            - d * 0.6 * Math.sin(c * sx - time * 0.13) * Math.sin(d * sy + time * 0.21)
            + 0.55; /* toroidal drift */
    var v = -a * Math.cos(a * sx + time * 0.24) * Math.cos(b * sy - time * 0.17)
            - c * 0.6 * Math.cos(c * sx - time * 0.13) * Math.cos(d * sy + time * 0.21);
    return { u: u, v: v };
  }

  function pickColor(th) {
    var r = Math.random(), acc = 0;
    for (var i = 0; i < th.weights.length; i++) {
      acc += th.weights[i];
      if (r <= acc) return th.colors[i];
    }
    return th.colors[0];
  }

  function spawn(th) {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      color: pickColor(th),
      life: 80 + Math.random() * 160,
    };
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(rect.width, 1);
    H = Math.max(rect.height, 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = Math.max(140, Math.min(850, Math.round((W * H) / 2400)));
    var th = theme();
    particles = [];
    for (var i = 0; i < target; i++) particles.push(spawn(th));
    stats.particles = target;

    paintBase();
    if (reduced) drawStatic();
  }

  function paintBase() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = theme().bg;
    ctx.fillRect(0, 0, W, H);
  }

  function step() {
    var th = theme();
    var dt = 1.15;
    t += 0.016;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = th.fade;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = th.composite;
    ctx.lineWidth = th.lineWidth;
    ctx.lineCap = "round";

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var vel = velocity(p.x, p.y, t);
      var nx = p.x + vel.u * dt;
      var ny = p.y + vel.v * dt;

      ctx.strokeStyle = "rgba(" + p.color + "," + th.alpha + ")";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      p.x = nx; p.y = ny; p.life--;
      if (p.life <= 0 || nx < -20 || nx > W + 20 || ny < -20 || ny > H + 20) {
        particles[i] = spawn(th);
      }
    }

    stats.mode = "ACTIVE";
    frameCount++;
    var now = performance.now();
    if (now - fpsStamp >= 1000) {
      stats.fps = Math.round((frameCount * 1000) / (now - fpsStamp));
      frameCount = 0; fpsStamp = now;
    }
    rafId = requestAnimationFrame(step);
  }

  /* Reduced motion: one static frame of integrated streamlines. */
  function drawStatic() {
    var th = theme();
    paintBase();
    ctx.globalCompositeOperation = th.composite;
    ctx.lineWidth = th.lineWidth;
    var lines = 220;
    for (var i = 0; i < lines; i++) {
      var x = Math.random() * W, y = Math.random() * H;
      var color = pickColor(th);
      ctx.strokeStyle = "rgba(" + color + "," + th.alpha * 0.7 + ")";
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (var s = 0; s < 90; s++) {
        var vel = velocity(x, y, 1.0);
        x += vel.u * 1.2; y += vel.v * 1.2;
        if (x < 0 || x > W || y < 0 || y > H) break;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function start() {
    if (reduced || rafId !== null || document.hidden || !inView) return;
    fpsStamp = performance.now(); frameCount = 0;
    rafId = requestAnimationFrame(step);
  }
  function stop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    if (!reduced) { stats.mode = "PAUSED"; stats.fps = 0; frameCount = 0; }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) start(); else stop();
    }).observe(canvas);
  }

  /* Repaint when the theme toggle flips. */
  new MutationObserver(function () {
    var th = theme();
    for (var i = 0; i < particles.length; i++) particles[i].color = pickColor(th);
    paintBase();
    if (reduced) drawStatic();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
  start();
})();
