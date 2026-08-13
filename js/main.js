/* ═══════════════════════════════════════════════════════════════
   main.js — app engine (routing, rendering, theme, lightbox)
   Content lives in config.js and projects.js — edit those instead.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── helpers ─────────────────────────────────── */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return '<ul class="tags">' + tags.map(function (t) {
      return "<li>" + esc(t) + "</li>";
    }).join("") + "</ul>";
  }

  /* ── theme ───────────────────────────────────── */
  var root = document.documentElement;
  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    try { localStorage.setItem("theme", mode); } catch (e) { /* private mode */ }
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    var mode = saved ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(mode);
  })();
  $("theme-toggle").addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });

  /* ── static text from config ─────────────────── */
  document.title = SITE.name + " — Energy & Fusion Engineering";
  $("brand-name").textContent = SITE.shortName;
  $("hero-eyebrow").textContent = SITE.role;
  $("hero-tagline").textContent = SITE.tagline;

  /* hero name: first name solid, rest hollow-stroked so the field shows through */
  (function renderHeroTitle() {
    var words = SITE.name.trim().split(/\s+/);
    var first = words.shift() || "";
    $("hero-title").innerHTML =
      '<span class="t-line">' + esc(first) + "</span>" +
      (words.length
        ? '<span class="t-line t-outline">' + esc(words.join(" ")) + "</span>"
        : "");
  })();

  /* contact heading: one configured word rendered as an accent outline */
  (function renderContactHeading() {
    var h = esc(SITE.contactHeading);
    var hot = SITE.contactHeadingAccent;
    if (hot && SITE.contactHeading.indexOf(hot) !== -1) {
      h = h.replace(esc(hot), "<em>" + esc(hot) + "</em>");
    }
    $("contact-heading").innerHTML = h;
  })();
  $("contact-sub").textContent = SITE.contactSub;
  $("cv-btn").setAttribute("href", SITE.cv);
  $("footer-id").textContent = "© " + new Date().getFullYear() + " " + SITE.name + " — " + SITE.role;

  /* ── hero spec strip ─────────────────────────── */
  if (SITE.heroSpecs && SITE.heroSpecs.length) {
    $("hero-specs").innerHTML = SITE.heroSpecs.map(esc).join(' <span class="sep">//</span> ');
  }

  /* ── hero telemetry — live readout from the particle field ── */
  (function telemetry() {
    var el = $("hero-telemetry");
    if (!el) return;
    var t0 = Date.now();
    var compact = window.matchMedia("(max-width: 600px)");
    function pad(n) { return String(n).padStart(2, "0"); }
    function tick() {
      var s = window.PLASMA_STATS;
      if (!s) { el.textContent = "FIELD · OFFLINE"; return; }
      if (s.mode === "STATIC") { el.textContent = "FIELD · STATIC FRAME"; return; }
      var up = Math.floor((Date.now() - t0) / 1000);
      var fps = s.fps > 0 ? s.fps : "--";
      var time = "T+" + pad(Math.floor(up / 60)) + ":" + pad(up % 60);
      el.textContent = compact.matches
        ? "N·" + s.particles + " // " + time
        : "FIELD · " + s.mode +
          "  //  N · " + s.particles +
          "  //  " + fps + " FPS" +
          "  //  " + time;
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ── home: focus tiles ───────────────────────── */
  var TILE_ICONS = {
    heat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4c-1.6 2 1.6 4 0 6s1.6 4 0 6M13 4c-1.6 2 1.6 4 0 6s1.6 4 0 6M18 4c-1.6 2 1.6 4 0 6s1.6 4 0 6"/></svg>',
    coil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12h2"/><path d="M4 12a3 3 0 1 1 5.3 1.9A3 3 0 1 1 14.6 14 3 3 0 1 1 20 12"/><path d="M20 12h2"/></svg>',
    flow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11M3 12h15M3 17h11"/><path d="M18 12l-3-3M18 12l-3 3"/></svg>',
    cube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 4v10l-7 4-7-4V7z"/><path d="M5 7l7 4 7-4M12 11v10"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/><path d="M13 4l-2 16"/></svg>',
  };
  $("focus-grid").innerHTML = SITE.focusAreas.map(function (f, i) {
    return '<a class="focus-tile" href="#projects/' + esc(f.tab) + '">' +
      '<div class="tile-head">' + (TILE_ICONS[f.icon] || "") +
      '<span class="tile-index">' + String(i + 1).padStart(2, "0") + "</span></div>" +
      "<h3>" + esc(f.title) + "</h3><p>" + esc(f.blurb) + "</p>" +
      '<span class="tile-arrow">EXPLORE →</span></a>';
  }).join("");

  /* ── projects: sub-tabs + cards ──────────────── */
  var currentTab = "all";
  var subtabDefs = [{ id: "all", label: "All" }].concat(SITE.projectTabs);

  function tabLabel(id) {
    for (var i = 0; i < subtabDefs.length; i++) {
      if (subtabDefs[i].id === id) return subtabDefs[i].label;
    }
    return id;
  }

  /* a project's `tab` is one id or an array of them */
  function tabsOf(p) { return [].concat(p.tab); }
  function tabLabels(p) { return tabsOf(p).map(tabLabel).join(" · "); }

  function renderSubtabs() {
    $("subtabs").innerHTML = subtabDefs.map(function (tdef) {
      return '<button class="subtab' + (tdef.id === currentTab ? " active" : "") +
        '" role="tab" aria-selected="' + (tdef.id === currentTab) +
        '" data-tab="' + esc(tdef.id) + '">' + esc(tdef.label) + "</button>";
    }).join("");
  }
  $("subtabs").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-tab]");
    if (!btn) return;
    var id = btn.getAttribute("data-tab");
    location.hash = id === "all" ? "#projects" : "#projects/" + id;
  });

  var COVER_CLASSES = ["cover-a", "cover-b", "cover-c"];
  function coverClass(id) {
    var h = 0;
    for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    return COVER_CLASSES[h % COVER_CLASSES.length];
  }
  function initials(title) {
    return title.split(/\s+/).slice(0, 2).map(function (w) {
      return (w[0] || "").toUpperCase();
    }).join("");
  }

  /* images entries are either "path.jpg" or { src, caption } */
  function imgSrc(x) { return x.src || x; }

  /* the tape lives INSIDE the cover, so a long title or an extra row of tags
     can't push it down onto the text */
  function coverHtml(p) {
    var tape = p.wip ?
      '<span class="card-tape" aria-hidden="true">Under Construction</span>' : "";
    if (p.cover || (p.images && p.images.length)) {
      return '<div class="card-cover"><img src="' + esc(p.cover || imgSrc(p.images[0])) +
        '" alt="" loading="lazy">' + tape + "</div>";
    }
    return '<div class="card-cover placeholder ' + coverClass(p.id) +
      '"><span>' + esc(initials(p.title)) + "</span>" + tape + "</div>";
  }

  function renderProjects() {
    var list = PROJECTS.filter(function (p) {
      return currentTab === "all" || tabsOf(p).indexOf(currentTab) !== -1;
    });
    /* featured work reads first, before the grid */
    list = list.filter(function (p) { return p.featured; })
      .concat(list.filter(function (p) { return !p.featured; }));
    $("projects-empty").hidden = list.length > 0;
    var featIdx = 0;
    $("project-grid").innerHTML = list.map(function (p) {
      var cls = "project-card";
      if (p.featured) {
        cls += " featured" + (featIdx % 2 ? " alt" : "");
        featIdx++;
      }
      return '<button class="' + cls + '" data-project="' + esc(p.id) + '">' +
        coverHtml(p) +
        '<div class="card-body">' +
        '<p class="card-meta">' + esc(p.date) + " · " + esc(tabLabels(p)) + "</p>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.summary) + "</p>" +
        tagsHtml(p.tags) +
        "</div></button>";
    }).join("");
  }
  $("project-grid").addEventListener("click", function (e) {
    var card = e.target.closest("[data-project]");
    if (card) openDetail(card.getAttribute("data-project"));
  });

  /* ── project detail overlay ──────────────────── */
  var detail = $("detail");
  var galleryImages = [];

  var DOC_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z"/><path d="M13 3v5h5"/></svg>';
  var LINK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 18.5"/></svg>';

  function openDetail(id) {
    var p = null;
    for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].id === id) p = PROJECTS[i];
    if (!p) return;

    var images = p.images || [];
    galleryImages = images.map(imgSrc);
    var html =
      '<p class="detail-meta">' + esc(p.date) + " · " + esc(tabLabels(p)) + "</p>" +
      '<h2 id="detail-title">' + esc(p.title) + "</h2>" +
      tagsHtml(p.tags) +
      '<div class="detail-desc">' + (p.description || []).map(function (para) {
        return "<p>" + esc(para) + "</p>";
      }).join("") + "</div>";

    (p.sections || []).forEach(function (s) {
      html += '<p class="detail-h">' + esc(s.heading) + "</p>" +
        '<div class="detail-desc">' + (s.body || []).map(function (para) {
          return "<p>" + esc(para) + "</p>";
        }).join("") + "</div>";
      if (s.items && s.items.length) {
        html += '<ul class="detail-list">' + s.items.map(function (it) {
          return "<li>" + esc(it) + "</li>";
        }).join("") + "</ul>";
      }
    });

    if (images.length) {
      html += '<p class="detail-h">Gallery</p><div class="gallery">' +
        images.map(function (im, idx) {
          return '<figure><button data-lightbox="' + idx + '" aria-label="Enlarge image ' +
            (idx + 1) + '"><img src="' + esc(imgSrc(im)) + '" alt="' + esc(im.caption || "") +
            '" loading="lazy"></button>' +
            (im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "") +
            "</figure>";
        }).join("") + "</div>";
    }
    if (p.video && p.video.length) {
      html += '<p class="detail-h">Video</p>' +
        p.video.map(function (v) {
          return '<figure class="detail-video"><video controls muted playsinline ' +
            'preload="metadata"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : "") +
            '><source src="' + esc(v.file) + '" type="video/mp4"></video>' +
            (v.caption ? "<figcaption>" + esc(v.caption) + "</figcaption>" : "") +
            "</figure>";
        }).join("");
    }
    if (p.docs && p.docs.length) {
      html += '<p class="detail-h">Documentation</p><ul class="doc-list">' +
        p.docs.map(function (d) {
          return '<li><a href="' + esc(d.file) + '" target="_blank" rel="noopener">' +
            DOC_ICON + esc(d.name) + "</a></li>";
        }).join("") + "</ul>";
    }
    if (p.links && p.links.length) {
      html += '<p class="detail-h">Links</p><ul class="doc-list">' +
        p.links.map(function (l) {
          return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
            LINK_ICON + esc(l.name) + "</a></li>";
        }).join("") + "</ul>";
    }

    $("detail-body").innerHTML = html;
    detail.hidden = false;
    document.body.style.overflow = "hidden";
    $("detail-close").focus();
  }
  function closeDetail() {
    $("detail-body").innerHTML = "";   /* stops any playing video */
    detail.hidden = true;
    document.body.style.overflow = "";
  }
  $("detail-close").addEventListener("click", closeDetail);
  detail.addEventListener("click", function (e) { if (e.target === detail) closeDetail(); });
  $("detail-body").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lightbox]");
    if (btn) openLightbox(parseInt(btn.getAttribute("data-lightbox"), 10));
  });

  /* ── lightbox ────────────────────────────────── */
  var lightbox = $("lightbox");
  var lbIndex = 0;
  function openLightbox(idx) {
    lbIndex = idx;
    updateLightbox();
    lightbox.hidden = false;
  }
  function updateLightbox() {
    $("lb-img").src = galleryImages[lbIndex];
    $("lb-count").textContent = (lbIndex + 1) + " / " + galleryImages.length;
    $("lb-prev").hidden = $("lb-next").hidden = galleryImages.length < 2;
  }
  function closeLightbox() { lightbox.hidden = true; }
  function lbStep(dir) {
    lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }
  $("lb-close").addEventListener("click", closeLightbox);
  $("lb-prev").addEventListener("click", function () { lbStep(-1); });
  $("lb-next").addEventListener("click", function () { lbStep(1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.hidden) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbStep(-1);
      if (e.key === "ArrowRight") lbStep(1);
    } else if (!detail.hidden && e.key === "Escape") {
      closeDetail();
    }
  });

  /* ── about ───────────────────────────────────── */
  (function renderAbout() {
    var img = new Image();
    img.src = "assets/images/portrait.jpg";
    img.alt = "Portrait of " + SITE.name;
    img.onerror = function () {
      $("portrait").innerHTML = '<p class="ph-note">Drop your photo at<br>assets/images/portrait.jpg</p>';
    };
    img.onload = function () { $("portrait").innerHTML = ""; $("portrait").appendChild(img); };

    $("bio").innerHTML = SITE.aboutParagraphs.map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");

    $("skills").innerHTML = SITE.skills.map(function (g) {
      return '<div class="skill-group"><span class="sg-name">' + esc(g.group) +
        "</span>" + tagsHtml(g.items) + "</div>";
    }).join("");

    $("timeline").innerHTML = SITE.timeline.map(function (t) {
      return '<li><span class="tl-period">' + esc(t.period) + "</span>" +
        "<h3>" + esc(t.title) + "</h3>" +
        '<span class="tl-org">' + esc(t.org) + "</span>" +
        (t.blurb ? "<p>" + esc(t.blurb) + "</p>" : "") + "</li>";
    }).join("");
  })();

  /* ── contact ─────────────────────────────────── */
  (function renderContact() {
    var MAIL_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
    var IN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/></svg>';
    var GH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.7 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>';

    /* show URLs without the https://www. noise */
    function pretty(url) {
      return String(url).replace(/^https?:\/\/(www\.)?/, "");
    }
    var cards = [
      { icon: MAIL_ICON, label: "Email", value: SITE.email, href: "mailto:" + SITE.email },
      { icon: IN_ICON, label: "LinkedIn",
        value: SITE.linkedin ? pretty(SITE.linkedin) : "EDIT ME — js/config.js",
        href: SITE.linkedin || "#contact" },
      { icon: GH_ICON, label: "GitHub",
        value: SITE.github ? pretty(SITE.github) : "EDIT ME — js/config.js",
        href: SITE.github || "#contact" },
    ];
    $("contact-grid").innerHTML = cards.map(function (c) {
      var external = c.href.indexOf("http") === 0;
      return '<a class="contact-card" href="' + esc(c.href) + '"' +
        (external ? ' target="_blank" rel="noopener"' : "") + ">" +
        c.icon + '<span class="cc-label">' + esc(c.label) + "</span>" +
        '<span class="cc-value">' + esc(c.value) + "</span></a>";
    }).join("");
  })();

  /* ── scroll reveals + nav elevation ──────────── */
  var revealIO = null;
  if ("IntersectionObserver" in window) {
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
  }
  function markReveals(root) {
    if (!revealIO) return;
    (root || document).querySelectorAll(
      ".focus-tile, .project-card, .timeline li, .skill-group, .contact-card"
    ).forEach(function (el) {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      revealIO.observe(el);
    });
  }
  markReveals(document);

  window.addEventListener("scroll", function () {
    $("nav").classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  /* ── mobile menu ─────────────────────────────── */
  var menuBtn = $("menu-toggle"), navTabs = $("nav-tabs");
  menuBtn.addEventListener("click", function () {
    var open = navTabs.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  /* ── router ──────────────────────────────────── */
  var VIEWS = ["home", "projects", "about", "contact"];

  function route() {
    var hash = location.hash.replace(/^#/, "");
    var parts = hash.split("/");
    var view = parts[0] || "home";
    var scrollTarget = null;

    if (view === "focus") { view = "home"; scrollTarget = "focus"; }
    if (VIEWS.indexOf(view) === -1) view = "home";

    if (view === "projects") {
      var sub = parts[1] || "all";
      var known = subtabDefs.some(function (tdef) { return tdef.id === sub; });
      currentTab = known ? sub : "all";
      renderSubtabs();
      renderProjects();
      markReveals($("project-grid"));
    }

    VIEWS.forEach(function (v) {
      var el = document.querySelector('[data-view="' + v + '"]');
      if (el) el.hidden = v !== view;
    });

    document.querySelectorAll("#nav-tabs a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === view);
    });

    navTabs.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    closeDetail();
    closeLightbox();

    if (scrollTarget) {
      var target = $(scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
