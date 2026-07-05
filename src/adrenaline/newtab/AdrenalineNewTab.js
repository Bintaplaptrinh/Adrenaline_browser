/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Adrenaline New Tab
 *  - centered pill search that uses the browser's DEFAULT search engine
 *  - live suggestion dropdown (blurred) from Google Suggest
 *  - animated "typewriter" welcome heading
 *  - blurred quick-suggestion row
 *  - a self-contained particle system (constellation + wave) on a canvas
 * No third-party APIs. No Gemini. No Google API.
 */

"use strict";

const $ = id => document.getElementById(id);
const SVG_NS = "http://www.w3.org/2000/svg";

/* ------------------------------------------------------------------ *
 * Navigation + search (default search engine only)
 * ------------------------------------------------------------------ */

function openURL(url) {
  try {
    const win = window.browsingContext.topChromeWindow;
    // If this page is the workspace "empty tab" placeholder, that tab must be
    // preserved, so open results in a new tab (matching the address bar's own
    // behavior). On a normal new tab, replace it in place.
    const tab = win.gBrowser && win.gBrowser.selectedTab;
    const where =
      tab && tab.hasAttribute("adrenaline-empty-tab") ? "tab" : "current";
    win.openTrustedLinkIn(url, where);
    return;
  } catch (e) {}
  window.location.href = url;
}

// Looks like a URL / hostname rather than a search query.
function looksLikeURL(text) {
  if (/^(https?|about|chrome|file|data|moz-extension):/i.test(text)) {
    return true;
  }
  if (/\s/.test(text)) {
    return false;
  }
  return /^[^\s.]+(\.[^\s.]+)+([/:?#].*)?$/.test(text) || text === "localhost";
}

async function getDefaultEngine() {
  try {
    // eslint-disable-next-line no-undef
    return await Services.search.getDefault();
  } catch (e) {
    return null;
  }
}

async function submitSearch(rawQuery) {
  const query = rawQuery.trim();
  if (!query) {
    return;
  }
  closeSuggest();

  if (looksLikeURL(query)) {
    const url = /^[a-z]+:/i.test(query) ? query : "https://" + query;
    openURL(url);
    return;
  }

  const engine = await getDefaultEngine();
  if (engine) {
    const submission = engine.getSubmission(query);
    if (submission && submission.uri) {
      openURL(submission.uri.spec);
      return;
    }
  }

  // Last resort: hand the query to the address bar so the user's own
  // settings decide what happens (still no hard-coded engine here).
  try {
    const win = window.browsingContext.topChromeWindow;
    win.gURLBar.focus();
    win.gURLBar.value = query;
    win.gURLBar.handleCommand();
  } catch (e) {}
}

/* ------------------------------------------------------------------ *
 * Live suggestions dropdown (default engine suggestion service)
 * ------------------------------------------------------------------ */

// Always use Google's public suggestion service. With client=firefox it
// returns a simple JSON array: ["query", ["suggestion 1", "suggestion 2", ...]].
// This is the same endpoint Firefox itself uses and works regardless of the
// default engine or the browser.search.suggest.enabled pref.
const GOOGLE_SUGGEST =
  "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=";

async function fetchSuggestions(query) {
  let data;
  try {
    const res = await fetch(GOOGLE_SUGGEST + encodeURIComponent(query), {
      credentials: "omit",
    });
    if (!res.ok) {
      return [];
    }
    data = JSON.parse(await res.text());
  } catch (e) {
    return [];
  }
  const list = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  const seen = new Set();
  const out = [];
  for (const v of list) {
    if (typeof v !== "string") {
      continue;
    }
    const key = v.toLowerCase();
    if (v && key !== query.toLowerCase() && !seen.has(key)) {
      seen.add(key);
      out.push(v);
    }
  }
  return out.slice(0, 8);
}

const suggestBox = () => $("suggest");
let sugItems = [];
let sugIndex = -1;
let sugSeq = 0;
let sugTimer = 0;

function makeSearchGlyph() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("d", "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4");
  svg.appendChild(path);
  return svg;
}

function setActive(i) {
  const box = suggestBox();
  const items = box.children;
  for (let k = 0; k < items.length; k++) {
    items[k].classList.toggle("active", k === i);
  }
  sugIndex = i;
}

function closeSuggest() {
  const box = suggestBox();
  box.hidden = true;
  box.textContent = "";
  sugItems = [];
  sugIndex = -1;
  $("search-input").setAttribute("aria-expanded", "false");
  $("suggestions").classList.remove("dimmed");
}

function renderSuggest(list) {
  const box = suggestBox();
  box.textContent = "";
  sugItems = list;
  sugIndex = -1;
  if (!list.length) {
    closeSuggest();
    return;
  }
  list.forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "suggest-item";
    li.setAttribute("role", "option");
    li.appendChild(makeSearchGlyph());
    const span = document.createElement("span");
    span.className = "sug-text";
    span.textContent = s;
    li.appendChild(span);
    // mousedown (not click) so it fires before the input blurs
    li.addEventListener("mousedown", ev => {
      ev.preventDefault();
      chooseSuggest(i);
    });
    li.addEventListener("mouseenter", () => setActive(i));
    box.appendChild(li);
  });
  box.hidden = false;
  $("search-input").setAttribute("aria-expanded", "true");
  $("suggestions").classList.add("dimmed");
}

function chooseSuggest(i) {
  const value = sugItems[i];
  if (value === undefined) {
    return;
  }
  $("search-input").value = value;
  submitSearch(value);
}

function onSearchInput() {
  const query = $("search-input").value.trim();
  clearTimeout(sugTimer);
  if (!query || looksLikeURL(query)) {
    closeSuggest();
    return;
  }
  sugTimer = setTimeout(() => {
    const seq = ++sugSeq;
    fetchSuggestions(query).then(list => {
      if (seq === sugSeq && $("search-input").value.trim() === query) {
        renderSuggest(list);
      }
    });
  }, 110);
}

function onSearchKeydown(ev) {
  if (suggestBox().hidden || !sugItems.length) {
    return;
  }
  if (ev.key === "ArrowDown") {
    ev.preventDefault();
    setActive((sugIndex + 1) % sugItems.length);
  } else if (ev.key === "ArrowUp") {
    ev.preventDefault();
    setActive((sugIndex - 1 + sugItems.length) % sugItems.length);
  } else if (ev.key === "Enter") {
    if (sugIndex >= 0) {
      ev.preventDefault();
      chooseSuggest(sugIndex);
    }
  } else if (ev.key === "Escape") {
    closeSuggest();
  }
}

/* ------------------------------------------------------------------ *
 * Quick suggestion chips
 * ------------------------------------------------------------------ */

const SUGGESTIONS = [
  { label: "Weather today", query: "weather today" },
  { label: "Latest news", query: "latest news" },
  { label: "Translate", query: "translate" },
  { label: "Define a word", query: "define" },
  { label: "Convert units", query: "unit converter" },
  { label: "Wikipedia", query: "wikipedia" },
];

function buildSuggestions() {
  const box = $("suggestions");
  box.textContent = "";
  for (const s of SUGGESTIONS) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = s.label;
    chip.addEventListener("click", () => {
      const input = $("search-input");
      input.value = s.query;
      input.focus();
      onSearchInput();
    });
    box.appendChild(chip);
  }
}

$("search-form").addEventListener("submit", ev => {
  ev.preventDefault();
  submitSearch($("search-input").value);
});
$("search-input").addEventListener("input", onSearchInput);
$("search-input").addEventListener("keydown", onSearchKeydown);
document.addEventListener("mousedown", ev => {
  if (!ev.target.closest("#search-wrap")) {
    closeSuggest();
  }
});

/* ------------------------------------------------------------------ *
 * Typewriter welcome heading
 * ------------------------------------------------------------------ */

const PHRASES = [
  "Welcome to Adrenaline",
  "What will you discover today?",
  "Search anything, get there faster.",
  "Type a query and press Enter.",
];

function startTypewriter() {
  const el = $("type-text");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = PHRASES[0];
    $("type-caret").style.display = "none";
    return;
  }
  let phrase = 0;
  let chars = 0;
  let deleting = false;

  const tick = () => {
    const full = PHRASES[phrase];
    chars += deleting ? -1 : 1;
    el.textContent = full.slice(0, chars);

    let delay = deleting ? 40 : 75;
    if (!deleting && chars === full.length) {
      delay = 2000; // pause at the end of a phrase
      deleting = true;
    } else if (deleting && chars === 0) {
      deleting = false;
      phrase = (phrase + 1) % PHRASES.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  tick();
}

/* ------------------------------------------------------------------ *
 * Theme (dark = black, light = white)
 * ------------------------------------------------------------------ */

const THEME_KEY = "adrenaline.newtab.theme";

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch (e) {}
  if (window.__adrenalineBG) {
    window.__adrenalineBG.setTheme(t);
  }
}

applyTheme(
  readStoredTheme() ||
    (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
);

$("theme-toggle").addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light")
);

/* ------------------------------------------------------------------ *
 * Particle system - constellation + wave (self-contained, no deps)
 * ------------------------------------------------------------------ */

function initBackground() {
  const canvas = $("bg");
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    return;
  }

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0;
  let H = 0;
  let DPR = 1;
  let particles = [];
  let waves = [];
  const mouse = { x: -9999, y: -9999, active: false };

  const themes = {
    dark: { bg: "#000000", dot: "255,255,255", line: "150,170,255", wave: "80,120,255" },
    light: { bg: "#ffffff", dot: "20,24,40", line: "60,90,180", wave: "80,110,220" },
  };
  let palette = themes.dark;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.floor(innerWidth * DPR);
    H = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    // ~1 particle per 9000 css px^2, clamped to a few hundred.
    const targetCount = Math.max(
      120,
      Math.min(320, Math.round((innerWidth * innerHeight) / 9000))
    );
    particles = [];
    for (let i = 0; i < targetCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18 * DPR,
        vy: (Math.random() - 0.5) * 0.18 * DPR,
        r: (Math.random() * 1.4 + 0.6) * DPR,
      });
    }

    // A few stacked sine waves across the lower third.
    waves = [
      { amp: 26, len: 0.0016, speed: 0.0004, base: 0.72, alpha: 0.2, phase: 0 },
      { amp: 40, len: 0.0011, speed: 0.00028, base: 0.82, alpha: 0.14, phase: 1.6 },
      { amp: 60, len: 0.0008, speed: 0.00018, base: 0.92, alpha: 0.1, phase: 3.1 },
    ];
  }

  function drawWaves(t) {
    for (const w of waves) {
      ctx.beginPath();
      const yBase = H * w.base;
      const amp = w.amp * DPR;
      for (let x = 0; x <= W; x += 8 * DPR) {
        const y = yBase + Math.sin(x * w.len + t * w.speed + w.phase) * amp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = "rgba(" + palette.wave + "," + w.alpha + ")";
      ctx.lineWidth = 1.4 * DPR;
      ctx.stroke();
    }
  }

  const MAX_LINK = 140; // css px linking distance for constellation

  function frame(t) {
    ctx.fillStyle = palette.bg;
    ctx.fillRect(0, 0, W, H);

    drawWaves(t);

    const link = MAX_LINK * DPR;
    const link2 = link * link;

    // Move + wrap.
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) {
        p.x += W;
      } else if (p.x > W) {
        p.x -= W;
      }
      if (p.y < 0) {
        p.y += H;
      } else if (p.y > H) {
        p.y -= H;
      }
    }

    // Constellation lines.
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < link2) {
          const alpha = (1 - d2 / link2) * 0.5;
          ctx.strokeStyle = "rgba(" + palette.line + "," + alpha + ")";
          ctx.lineWidth = 1 * DPR;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Links to the cursor (subtle interactivity).
    if (mouse.active) {
      const mlink = 180 * DPR;
      const mlink2 = mlink * mlink;
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < mlink2) {
          const alpha = (1 - d2 / mlink2) * 0.5;
          ctx.strokeStyle = "rgba(" + palette.line + "," + alpha + ")";
          ctx.lineWidth = 1 * DPR;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // Dots.
    ctx.fillStyle = "rgba(" + palette.dot + ",0.9)";
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) {
      requestAnimationFrame(frame);
    }
  }

  addEventListener("resize", resize);
  addEventListener("mousemove", e => {
    mouse.x = e.clientX * DPR;
    mouse.y = e.clientY * DPR;
    mouse.active = true;
  });
  addEventListener("mouseout", () => {
    mouse.active = false;
  });

  window.__adrenalineBG = {
    setTheme(t) {
      palette = themes[t] || themes.dark;
      if (reduceMotion) {
        frame(0);
      }
    },
  };

  resize();
  palette = themes[document.documentElement.dataset.theme] || themes.dark;
  if (reduceMotion) {
    frame(0); // single static paint
  } else {
    requestAnimationFrame(frame);
  }
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

buildSuggestions();
startTypewriter();
initBackground();
$("search-input").focus();
