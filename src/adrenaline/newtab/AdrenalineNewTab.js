/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* Adrenaline New Tab — "Gemini in Adrenaline"
 * Three modes:
 *  - search: traditional Google search (navigates)
 *  - gemini: single Gemini call grounded in Google Search (sources + links)
 *  - agent:  plan queries -> grounded research -> synthesized, cited answer
 * Anti-hallucination: google_search grounding tool is always on for AI modes,
 * the prompt forbids unsourced claims, and every answer renders its sources.
 */

"use strict";

// ---------- prefs (works both privileged and unprivileged) ----------
const PREF_KEY = "adrenaline.gemini.api-key";
const PREF_MODEL = "adrenaline.gemini.model";
const DEFAULT_MODEL = "gemini-3-flash-preview";
// Fallbacks tried automatically if the configured model is rejected:
const MODEL_FALLBACKS = ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.0-flash"];

const prefs = {
  _svc: null,
  init() {
    try {
      // System-principal pages have Services available.
      // eslint-disable-next-line no-undef
      this._svc = Services.prefs;
    } catch (e) {
      this._svc = null;
    }
  },
  get(name, fallback) {
    try {
      if (this._svc && this._svc.prefHasUserValue(name) !== undefined) {
        return this._svc.getStringPref(name, fallback);
      }
    } catch (e) {}
    return localStorage.getItem(name) ?? fallback;
  },
  set(name, value) {
    try {
      if (this._svc) {
        this._svc.setStringPref(name, value);
        return;
      }
    } catch (e) {}
    localStorage.setItem(name, value);
  },
};
prefs.init();

// ---------- navigation helpers ----------
function openURL(url, inNewTab) {
  try {
    const win = window.browsingContext.topChromeWindow;
    win.openTrustedLinkIn(url, inNewTab ? "tab" : "current");
    return;
  } catch (e) {}
  if (inNewTab) {
    window.open(url, "_blank");
  } else {
    window.location.href = url;
  }
}
const googleURL = q => "https://www.google.com/search?q=" + encodeURIComponent(q);

// ---------- tiny DOM helpers ----------
const $ = id => document.getElementById(id);
const esc = s =>
  String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

// minimal, safe markdown renderer (input already HTML-escaped)
function renderMarkdown(text) {
  let html = esc(text);
  html = html.replace(/```([\s\S]*?)```/g, (m, code) => `<pre>${code.trim()}</pre>`);
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|\s)\*([^*\n]+)\*/g, "$1<em>$2</em>");
  // lists
  html = html.replace(/(?:^|\n)((?:[-*] .*(?:\n|$))+)/g, m => {
    const items = m.trim().split("\n").map(l => `<li>${l.replace(/^[-*] /, "")}</li>`).join("");
    return `\n<ul>${items}</ul>`;
  });
  html = html.replace(/(?:^|\n)((?:\d+\. .*(?:\n|$))+)/g, m => {
    const items = m.trim().split("\n").map(l => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("");
    return `\n<ol>${items}</ol>`;
  });
  // paragraphs
  html = html
    .split(/\n{2,}/)
    .map(b => (/^\s*<(h\d|ul|ol|pre)/.test(b) ? b : `<p>${b.replace(/\n/g, "<br/>")}</p>`))
    .join("");
  return html;
}

// ---------- Gemini API ----------
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/";

async function geminiCall(promptText, { grounded = true, model = null, temperature = 0.3 } = {}) {
  const key = prefs.get(PREF_KEY, "");
  if (!key) {
    throw new Error("No API key set. Click the ⚙ icon to add your Google AI Studio key.");
  }
  const models = [model || prefs.get(PREF_MODEL, DEFAULT_MODEL), ...MODEL_FALLBACKS];
  let lastError = null;
  for (const m of models) {
    try {
      const body = {
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: { temperature },
      };
      if (grounded) {
        body.tools = [{ google_search: {} }];
      }
      const res = await fetch(`${API_BASE}${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errText = await res.text();
        // model not found / not supported -> try next fallback
        if (res.status === 404 || res.status === 400) {
          lastError = new Error(`Model "${m}": HTTP ${res.status} — ${errText.slice(0, 300)}`);
          continue;
        }
        throw new Error(`HTTP ${res.status} — ${errText.slice(0, 300)}`);
      }
      const data = await res.json();
      const cand = data.candidates && data.candidates[0];
      if (!cand) {
        throw new Error("Empty response from Gemini.");
      }
      const text = (cand.content?.parts || []).map(p => p.text || "").join("");
      return { text, grounding: cand.groundingMetadata || null, model: m };
    } catch (e) {
      lastError = e;
      if (!String(e.message).includes("HTTP 404") && !String(e.message).includes("HTTP 400")) {
        throw e;
      }
    }
  }
  throw lastError || new Error("All models failed.");
}

// ---------- rendering ----------
let currentSources = [];

function renderSources(grounding) {
  const list = $("sources-list");
  const queriesBox = $("search-queries");
  list.textContent = "";
  queriesBox.textContent = "";
  currentSources = [];

  const chunks = grounding?.groundingChunks || [];
  chunks.forEach((chunk, i) => {
    const web = chunk.web;
    if (!web || !web.uri) return;
    currentSources.push(web);
    let host = "";
    try { host = new URL(web.uri).hostname; } catch (e) {}
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = web.uri;
    a.addEventListener("click", ev => { ev.preventDefault(); openURL(web.uri, true); });
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = String(i + 1);
    const txt = document.createElement("span");
    txt.className = "src-title";
    txt.textContent = web.title || host || web.uri;
    const hostEl = document.createElement("span");
    hostEl.className = "src-host";
    hostEl.textContent = host;
    txt.appendChild(hostEl);
    a.append(num, txt);
    li.appendChild(a);
    list.appendChild(li);
  });

  (grounding?.webSearchQueries || []).forEach(q => {
    const chip = document.createElement("span");
    chip.className = "q";
    chip.textContent = "🔎 " + q;
    chip.title = "Open this search on Google";
    chip.addEventListener("click", () => openURL(googleURL(q), true));
    queriesBox.appendChild(chip);
  });

  $("sources-card").hidden = chunks.length === 0 && !(grounding?.webSearchQueries || []).length;
}

function attachCitations(text, grounding) {
  // Insert [n] citation links based on groundingSupports segments.
  const supports = grounding?.groundingSupports;
  if (!supports || !supports.length) return renderMarkdown(text);
  // Work on the raw text: collect insertion points (end of segment).
  const inserts = [];
  for (const s of supports) {
    const end = s.segment?.endIndex;
    const idxs = s.groundingChunkIndices || [];
    if (typeof end === "number" && idxs.length) {
      inserts.push({ at: end, idxs });
    }
  }
  inserts.sort((a, b) => b.at - a.at);
  let out = text;
  for (const ins of inserts) {
    const marker = ins.idxs.map(i => `⟦${i + 1}⟧`).join("");
    out = out.slice(0, ins.at) + marker + out.slice(ins.at);
  }
  let html = renderMarkdown(out);
  html = html.replace(/⟦(\d+)⟧/g, (m, n) => `<a class="cite" data-src="${n}" href="#">[${n}]</a>`);
  return html;
}

function showAnswer(html, model) {
  const card = $("answer-card");
  card.hidden = false;
  $("answer-model").textContent = model || "";
  $("answer-body").innerHTML = html; // content is escaped + generated markup only
  $("answer-warning").hidden = false;
  for (const cite of $("answer-body").querySelectorAll(".cite")) {
    cite.addEventListener("click", ev => {
      ev.preventDefault();
      const src = currentSources[Number(cite.dataset.src) - 1];
      if (src) openURL(src.uri, true);
    });
  }
}

function showError(message, query) {
  $("error-card").hidden = false;
  $("error-text").textContent = message;
  $("error-google").onclick = () => openURL(googleURL(query), true);
}

function resetResults() {
  $("stage").classList.add("has-results");
  $("results").hidden = false;
  for (const id of ["answer-card", "sources-card", "error-card", "agent-steps"]) $(id).hidden = true;
  $("answer-body").textContent = "";
  $("agent-steps-list").textContent = "";
}

// ---------- agent mode ----------
function addStep(label) {
  const li = document.createElement("li");
  li.textContent = label;
  $("agent-steps-list").appendChild(li);
  return {
    activate() { li.className = "active"; },
    done(suffix) { li.className = "done"; if (suffix) li.textContent = label + " — " + suffix; },
  };
}

async function runAgent(query) {
  $("agent-steps").hidden = false;

  const s1 = addStep("Planning search queries");
  const s2 = addStep("Searching the web (Google grounding)");
  const s3 = addStep("Synthesizing verified answer with citations");

  s1.activate();
  let plan = [];
  try {
    const planRes = await geminiCall(
      `You are a research planner. For the user question below, output ONLY a JSON array (no markdown) of 2-4 short, effective Google search queries that together cover the question.\nQuestion: ${query}`,
      { grounded: false, temperature: 0.2 }
    );
    const match = planRes.text.match(/\[[\s\S]*\]/);
    if (match) plan = JSON.parse(match[0]).filter(q => typeof q === "string").slice(0, 4);
  } catch (e) { /* planning is best-effort */ }
  if (!plan.length) plan = [query];
  s1.done(plan.map(q => `"${q}"`).join(", "));

  s2.activate();
  const research = await geminiCall(
    [
      "You are a careful research agent inside the Adrenaline browser.",
      "Use Google Search to research the question. Search for each of these queries as needed:",
      ...plan.map(q => `- ${q}`),
      "",
      "STRICT RULES:",
      "1. Only state facts supported by the search results. Never invent facts, numbers, names or dates.",
      "2. If the search results do not answer something, say exactly what is unknown.",
      "3. Prefer recent, primary sources. Mention dates when information may change over time.",
      "4. Answer clearly and concisely in the user's language.",
      "",
      `Question: ${query}`,
    ].join("\n"),
    { grounded: true, temperature: 0.2 }
  );
  s2.done(`${(research.grounding?.groundingChunks || []).length} sources found`);

  s3.activate();
  renderSources(research.grounding);
  showAnswer(attachCitations(research.text, research.grounding), research.model + " · agent");
  s3.done();
}

// ---------- gemini (single-shot) mode ----------
async function runGemini(query) {
  const res = await geminiCall(
    [
      "You are Gemini inside the Adrenaline browser. Use Google Search to ground your answer.",
      "Rules: never state a fact that is not supported by the search results; if unsure, say so;",
      "answer concisely in the user's language.",
      "",
      `Question: ${query}`,
    ].join("\n"),
    { grounded: true }
  );
  renderSources(res.grounding);
  showAnswer(attachCitations(res.text, res.grounding), res.model);
}

// ---------- UI wiring ----------
let mode = "gemini";

for (const pill of document.querySelectorAll(".pill")) {
  pill.addEventListener("click", () => {
    document.querySelector(".pill.active")?.classList.remove("active");
    pill.classList.add("active");
    mode = pill.dataset.mode;
    $("search-input").placeholder =
      mode === "search" ? "Search Google…" :
      mode === "agent" ? "Ask the agent to research anything…" :
      "Ask anything…";
    $("search-input").focus();
  });
}

$("search-form").addEventListener("submit", async ev => {
  ev.preventDefault();
  const query = $("search-input").value.trim();
  if (!query) return;

  if (mode === "search") {
    // Traditional search: URLs go straight there, everything else -> Google.
    if (/^(https?:\/\/|[\w-]+(\.[\w-]+)+([/?#]|$))/.test(query)) {
      openURL(/^https?:\/\//.test(query) ? query : "https://" + query, false);
    } else {
      openURL(googleURL(query), false);
    }
    return;
  }

  resetResults();
  $("open-google").onclick = () => openURL(googleURL(query), true);
  const go = $("search-go");
  go.disabled = true;
  $("answer-card").hidden = false;
  $("answer-body").innerHTML = '<span class="cursor"></span>';
  try {
    if (mode === "agent") {
      await runAgent(query);
    } else {
      await runGemini(query);
    }
  } catch (e) {
    $("answer-card").hidden = true;
    showError(String(e.message || e), query);
  } finally {
    go.disabled = false;
  }
});

// theme
const THEME_KEY = "adrenaline.newtab.theme";
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem(THEME_KEY, t);
}
applyTheme(
  localStorage.getItem(THEME_KEY) ||
  (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
);
$("theme-toggle").addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light")
);

// settings
$("settings-toggle").addEventListener("click", () => {
  $("setting-key").value = prefs.get(PREF_KEY, "");
  $("setting-model").value = prefs.get(PREF_MODEL, DEFAULT_MODEL);
  $("settings-dialog").showModal();
});
$("settings-cancel").addEventListener("click", () => $("settings-dialog").close());
$("settings-save").addEventListener("click", () => {
  prefs.set(PREF_KEY, $("setting-key").value.trim());
  prefs.set(PREF_MODEL, $("setting-model").value.trim() || DEFAULT_MODEL);
  $("settings-dialog").close();
});

$("search-input").focus();
