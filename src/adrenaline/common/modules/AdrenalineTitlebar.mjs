// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// [adrenaline_brow] Fixed title bar.
//
// Adds an optional "fixed" title bar mode where the active page title is
// centered and the minimize / maximize / close controls sit on the right,
// mirroring a classic window title bar. The alternative "float" mode keeps
// Adrenaline's original floating layout. Controlled by the `adrenaline.view.titlebar-mode`
// preference ("fixed" | "float"); default is "fixed".

const HTML_NS = "http://www.w3.org/1999/xhtml";
const PREF_MODE = "adrenaline.view.titlebar-mode";

class AdrenalineTitlebarManager {
  #bar = null;
  #label = null;
  #boundUpdate = null;
  #listenersAttached = false;

  constructor(win) {
    this.window = win;
    this.#boundUpdate = this.updateTitle.bind(this);
    this.init();
  }

  init() {
    try {
      Services.prefs.addObserver(PREF_MODE, this);
      this.window.addEventListener(
        "unload",
        () => {
          try {
            Services.prefs.removeObserver(PREF_MODE, this);
          } catch (e) {}
          this.#detachListeners();
        },
        { once: true }
      );
      this.applyMode();
    } catch (e) {
      console.error("[AdrenalineTitlebar] init failed", e);
    }
  }

  get mode() {
    return Services.prefs.getStringPref(PREF_MODE, "fixed") === "float"
      ? "float"
      : "fixed";
  }

  observe(aSubject, aTopic, aData) {
    if (aTopic === "nsPref:changed" && aData === PREF_MODE) {
      this.applyMode();
    }
  }

  applyMode() {
    const mode = this.mode;
    document.documentElement.setAttribute("adrenaline-titlebar-mode", mode);
    if (mode === "fixed") {
      this.#buildBar();
      this.#attachListeners();
      this.updateTitle();
    } else {
      this.#detachListeners();
    }
  }

  #buildBar() {
    if (this.#bar) {
      return;
    }
    // The bar must span the full window width, so it is inserted at the very
    // top of the document body — NOT inside #navigator-toolbox, which is the
    // vertical-tabs sidebar in Adrenaline's layout.
    const container = document.body;
    if (!container) {
      return;
    }

    const bar = document.createXULElement("hbox");
    bar.id = "adrenaline-fixed-titlebar";
    bar.setAttribute("skipintoolbarset", "true");

    const label = document.createXULElement("label");
    label.id = "adrenaline-fixed-titlebar-label";
    label.setAttribute("crop", "end");

    const controls = document.createXULElement("hbox");
    controls.className = "adrenaline-fixed-titlebar-controls";
    controls.appendChild(
      this.#makeButton("minimize", "adrenaline-titlebar-cmd-minimize", () =>
        this.window.minimize()
      )
    );
    controls.appendChild(
      this.#makeButton("maximize", "adrenaline-titlebar-cmd-maximize", () =>
        this.#toggleMaximize()
      )
    );
    controls.appendChild(
      this.#makeButton("close", "adrenaline-titlebar-cmd-close", () =>
        this.window.close()
      )
    );

    bar.append(label, controls);
    container.prepend(bar);

    this.#bar = bar;
    this.#label = label;
  }

  #makeButton(kind, l10nId, command) {
    const btn = document.createElementNS(HTML_NS, "button");
    btn.className = "adrenaline-fixed-titlebar-button";
    btn.setAttribute("adrenaline-titlebar-action", kind);
    if (document.l10n) {
      document.l10n.setAttributes(btn, l10nId);
    }
    btn.addEventListener("click", command);
    return btn;
  }

  #toggleMaximize() {
    const win = this.window;
    if (win.windowState === win.STATE_MAXIMIZED) {
      win.restore();
    } else {
      win.maximize();
    }
  }

  #attachListeners() {
    if (this.#listenersAttached || typeof gBrowser === "undefined") {
      return;
    }
    this.#listenersAttached = true;
    gBrowser.tabContainer.addEventListener("TabSelect", this.#boundUpdate);
    gBrowser.tabContainer.addEventListener("TabAttrModified", this.#boundUpdate);
    gBrowser.addEventListener("DOMTitleChanged", this.#boundUpdate);
  }

  #detachListeners() {
    if (!this.#listenersAttached || typeof gBrowser === "undefined") {
      return;
    }
    this.#listenersAttached = false;
    gBrowser.tabContainer.removeEventListener("TabSelect", this.#boundUpdate);
    gBrowser.tabContainer.removeEventListener(
      "TabAttrModified",
      this.#boundUpdate
    );
    gBrowser.removeEventListener("DOMTitleChanged", this.#boundUpdate);
  }

  updateTitle() {
    if (!this.#label) {
      return;
    }
    let title = "";
    try {
      title =
        gBrowser?.selectedBrowser?.contentTitle ||
        gBrowser?.selectedTab?.label ||
        "";
    } catch (e) {}
    if (!title) {
      try {
        title = document.title || "";
      } catch (e) {}
    }
    this.#label.textContent = title;
    this.#label.setAttribute("tooltiptext", title);
  }
}

export default function initAdrenalineTitlebar(win) {
  return new AdrenalineTitlebarManager(win);
}
