// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

{
  let _tabsToPinEssentials = [];
  let lazy = {};

  ChromeUtils.defineESModuleGetters(lazy, {
    SearchService: "moz-src:///toolkit/components/search/SearchService.sys.mjs",
  });

  const kAdrenalineElementsToIgnore = [
    "adrenaline-browser-background",
    "adrenaline-toast-container",
  ];

  function clearBrowserElements() {
    for (const element of document.getElementById("browser").children) {
      if (kAdrenalineElementsToIgnore.includes(element.id)) {
        continue;
      }
      element.style.display = "none";
    }
  }

  function getMotion() {
    return gAdrenalineUIManager.motion;
  }

  async function animate(...args) {
    return getMotion().animate(...args);
  }

  function initializeAdrenalineWelcome() {
    document.documentElement.setAttribute("adrenaline-welcome-stage", "true");
    const XUL = `
      <html:div id="adrenaline-welcome">
        <html:div id="adrenaline-welcome-start">
          <html:h1 class="adrenaline-branding-title" id="adrenaline-welcome-title"></html:h1>
          <button class="footer-button primary" id="adrenaline-welcome-start-button">
          </button>
        </html:div>
        <hbox id="adrenaline-welcome-pages">
          <vbox id="adrenaline-welcome-page-sidebar">
            <vbox id="adrenaline-welcome-page-sidebar-content">
            </vbox>
            <vbox id="adrenaline-welcome-page-sidebar-buttons">
            </vbox>
          </vbox>
          <html:div id="adrenaline-welcome-page-content">
          </html:div>
        </hbox>
      </html:div>
    `;
    const fragment = window.MozXULElement.parseXULToFragment(XUL);
    document.getElementById("browser").appendChild(fragment);
    window.MozXULElement.insertFTLIfNeeded("browser/adrenaline-welcome.ftl");
  }

  var _iconToData = {};

  async function getIconData(iconURL) {
    if (_iconToData[iconURL]) {
      return _iconToData[iconURL];
    }
    const response = await fetch(iconURL);
    if (!response.ok) {
      console.error(`Failed to fetch icon: ${iconURL}`);
      return null;
    }
    const blob = await response.blob();
    const reader = new FileReader();
    const data = await new Promise(resolve => {
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        _iconToData[iconURL] = `data:${blob.type};base64,${base64Data}`;
        resolve(_iconToData[iconURL]);
      };
      reader.readAsDataURL(blob);
    });
    return data;
  }

  class nsAdrenalineWelcomePages {
    constructor(pages) {
      this._currentPage = -1;
      this._pages = pages;
      this.init();
      this.next();
    }

    init() {
      document.getElementById("adrenaline-welcome-pages").style.display = "flex";
      document.getElementById("adrenaline-welcome-start").remove();
      window.maximize();
      animate(
        "#adrenaline-welcome-pages",
        { opacity: [0, 1] },
        { delay: 0.2, duration: 0.1 }
      );
    }

    async fadeInTitles(page) {
      const [title1, description1, description2] =
        await document.l10n.formatValues(page.text);
      const titleElement = document.getElementById(
        "adrenaline-welcome-page-sidebar-content"
      );
      /* eslint-disable no-unsanitized/property */
      titleElement.innerHTML =
        `<html:h1>${title1}</html:h1><html:p>${description1}</html:p>` +
        (description2 ? `<html:p>${description2}</html:p>` : "");
      await animate(
        "#adrenaline-welcome-page-sidebar-content > *",
        { x: ["150%", 0] },
        {
          delay: getMotion().stagger(0.05),
          type: "spring",
          bounce: 0.2,
        }
      );
    }

    async fadeInButtons(page) {
      const buttons = document.getElementById(
        "adrenaline-welcome-page-sidebar-buttons"
      );
      let i = 0;
      const insertedButtons = [];
      for (const button of page.buttons) {
        const buttonElement = document.createXULElement("button");
        document.l10n.setAttributes(buttonElement, button.l10n);
        if (i++ === 0) {
          buttonElement.classList.add("primary");
        }
        buttonElement.classList.add("footer-button");
        buttonElement.addEventListener("click", async () => {
          const shouldSkip = await button.onclick();
          if (shouldSkip) {
            this.next();
          }
        });
        buttonElement.style.pointerEvents = "none"; // Disable pointer events until animation is done
        insertedButtons.push(buttonElement);
        buttons.appendChild(buttonElement);
      }
      await animate(
        "#adrenaline-welcome-page-sidebar-buttons button",
        { x: ["150%", 0] },
        {
          delay: getMotion().stagger(0.1, { startDelay: 0.4 }),
          type: "spring",
          bounce: 0.2,
        }
      );
      for (const button of insertedButtons) {
        button.style.pointerEvents = ""; // Enable pointer events after animation
      }
    }

    async fadeInContent() {
      await animate(
        "#adrenaline-welcome-page-content > *",
        { opacity: [0, 1] },
        {
          delay: getMotion().stagger(0.1),
          type: "spring",
          bounce: 0.2,
        }
      );
    }

    async fadeOutButtons() {
      await animate(
        "#adrenaline-welcome-page-sidebar-buttons button",
        { x: [0, "-150%"] },
        {
          type: "spring",
          bounce: 0,
          delay: getMotion().stagger(0.1, { startDelay: 0.4 }),
        }
      );
      document.getElementById("adrenaline-welcome-page-sidebar-buttons").innerHTML =
        "";
      document.getElementById("adrenaline-welcome-page-sidebar-content").innerHTML =
        "";
    }

    async fadeOutTitles() {
      await animate(
        "#adrenaline-welcome-page-sidebar-content > *",
        { x: [0, "-150%"] },
        {
          delay: getMotion().stagger(0.05, { startDelay: 0.3 }),
          type: "spring",
          bounce: 0,
        }
      );
    }

    async fadeOutContent() {
      await animate(
        "#adrenaline-welcome-page-content > *",
        { opacity: [1, 0] },
        {
          delay: getMotion().stagger(0.05, { startDelay: 0.3 }),
          type: "spring",
          bounce: 0,
          duration: 0.1,
        }
      );
    }

    async next() {
      if (this._currentPage !== -1) {
        const previousPage = this._pages[this._currentPage];
        const promises = [this.fadeOutTitles(), this.fadeOutButtons()];
        if (!previousPage.dontFadeOut) {
          promises.push(this.fadeOutContent());
        }
        await Promise.all(promises);
        await previousPage.fadeOut();
        document.getElementById("adrenaline-welcome-page-content").innerHTML = "";
      }
      this._currentPage++;
      const currentPage = this._pages[this._currentPage];
      if (!currentPage) {
        this.finish();
        return;
      }
      await Promise.all([
        this.fadeInTitles(currentPage),
        this.fadeInButtons(currentPage),
      ]);
      await currentPage.fadeIn();
      await this.fadeInContent();
    }

    async finish() {
      _iconToData = undefined; // Unload icon data
      gAdrenalineWorkspaces.reorganizeTabsAfterWelcome();
      await animate(
        "#adrenaline-welcome-page-content",
        { x: [0, "100%"] },
        { bounce: 0 }
      );
      document.getElementById("adrenaline-welcome-page-content").remove();
      await this.animHeart();
      await this.#pinRemainingTabs();
      await animate("#adrenaline-welcome-pages", { opacity: [1, 0] });
      document.getElementById("adrenaline-welcome").remove();
      document.documentElement.removeAttribute("adrenaline-welcome-stage");
      for (const element of document.getElementById("browser").children) {
        if (kAdrenalineElementsToIgnore.includes(element.id)) {
          continue;
        }
        element.style.opacity = 0;
        element.style.removeProperty("display");
      }
      gAdrenalineUIManager.updateTabsToolbar();
      let elementsToIgnore = kAdrenalineElementsToIgnore
        .map(id => `#${id}`)
        .join(", ");
      await animate(`#browser > *:not(${elementsToIgnore})`, {
        opacity: [0, 1],
      });
      gAdrenalineUIManager.showToast("adrenaline-welcome-finished");
    }

    async #pinRemainingTabs() {
      for (const tab of _tabsToPinEssentials) {
        tab.removeAttribute("pending"); // Make it appear loaded
        gAdrenalinePinnedTabManager.addToEssentials(tab);
      }
      let tabsToGroup = [];
      if (!gBrowser.selectedTab.hasAttribute("adrenaline-empty-tab")) {
        tabsToGroup.push(gBrowser.selectedTab);
      }
      gAdrenalineFolders.createFolder(tabsToGroup, {
        renameFolder: false,
        label: "adrenaline basics",
      });
    }

    async animHeart() {
      const heart = document.createElement("div");
      heart.id = "adrenaline-welcome-heart";
      const sidebar = document.getElementById("adrenaline-welcome-page-sidebar");
      sidebar.style.width = "100%";
      sidebar.appendChild(heart);
      sidebar.setAttribute("animate-heart", "true");
      await animate(
        "#adrenaline-welcome-heart",
        { opacity: [0, 1, 1, 1, 0], scale: [0.5, 1, 1.2, 1, 1.2] },
        {
          duration: 1.5,
          delay: 0.2,
          bounce: 0,
        }
      );
    }
  }

  class AdrenalineSearchEngineStore {
    constructor() {
      this._engines = [];
    }

    async init() {
      const visibleEngines = await lazy.SearchService.getVisibleEngines();
      this.initSpecificEngine(visibleEngines);
    }

    getEngines() {
      return this._engines.filter(
        engine =>
          !(
            engine.name.toLowerCase().includes("wikipedia") ||
            engine.name.toLowerCase().includes("ebay")
          )
      );
    }

    initSpecificEngine(engines) {
      for (const engine of engines) {
        try {
          this._engines.push(this._cloneEngine(engine));
        } catch (e) {
          // Ignore engines that throw an exception when cloning.
          console.error(e);
        }
      }
    }

    getEngineByName(aName) {
      return this._engines.find(engine => engine.name == aName);
    }

    _cloneEngine(aEngine) {
      const clonedObj = {};

      for (const i of ["name", "alias", "_iconURI", "hidden"]) {
        clonedObj[i] = aEngine[i];
      }

      clonedObj.originalEngine = aEngine;

      return clonedObj;
    }

    async getDefaultEngine() {
      let engineName = await lazy.SearchService.getDefault();
      return this.getEngineByName(engineName._name);
    }

    async setDefaultEngine(engine) {
      await lazy.SearchService.setDefault(
        engine.originalEngine,
        lazy.SearchService.CHANGE_REASON.USER
      );
    }
  }

  function getWelcomePages() {
    return [
      {
        text: [
          {
            id: "adrenaline-welcome-import-title",
          },
          {
            id: "adrenaline-welcome-import-description-1",
          },
          {
            id: "adrenaline-welcome-import-description-2",
          },
        ],
        buttons: [
          {
            l10n: "adrenaline-welcome-import-button",
            onclick: async () => {
              MigrationUtils.showMigrationWizard(window, {
                isStartupMigration: true,
              });
              document
                .querySelector("#adrenaline-welcome-page-sidebar-buttons button")
                .remove();
              const newButton = document.querySelector(
                "#adrenaline-welcome-page-sidebar-buttons button"
              );
              newButton.classList.add("primary");
              document.l10n.setAttributes(newButton, "adrenaline-generic-next");
              return false;
            },
          },
          {
            l10n: "adrenaline-welcome-skip-button",
            onclick: async () => {
              return true;
            },
          },
        ],
        fadeIn() {
          const xul = `
            <html:label for="adrenaline-welcome-set-default-browser">
              <html:input type="radio" id="adrenaline-welcome-set-default-browser" name="adrenaline-welcome-set-default-browser"></html:input>
              <html:span data-l10n-id="adrenaline-welcome-set-default-browser"></html:span>
            </html:label>
            <html:label for="adrenaline-welcome-dont-set-default-browser">
              <html:input checked="true" type="radio" id="adrenaline-welcome-dont-set-default-browser" name="adrenaline-welcome-set-default-browser"></html:input>
              <html:span data-l10n-id="adrenaline-welcome-dont-set-default-browser"></html:span>
            </html:label>
          `;
          const fragment = window.MozXULElement.parseXULToFragment(xul);
          document
            .getElementById("adrenaline-welcome-page-content")
            .appendChild(fragment);
        },
        async fadeOut() {
          const shouldSetDefault = document.getElementById(
            "adrenaline-welcome-set-default-browser"
          ).checked;
          if (AppConstants.HAVE_SHELL_SERVICE && shouldSetDefault) {
            let shellSvc = window.getShellService();
            if (!shellSvc) {
              return;
            }

            try {
              await shellSvc.setDefaultBrowser(false);
            } catch (ex) {
              console.error(ex);
            }
          }
        },
      },
      {
        text: [
          {
            id: "adrenaline-welcome-default-search-title",
          },
          {
            id: "adrenaline-welcome-default-search-description",
          },
        ],
        buttons: [
          {
            l10n: "adrenaline-generic-next",
            onclick: async () => {
              return true;
            },
          },
        ],
        async fadeIn() {
          const content = document.getElementById("adrenaline-welcome-page-content");
          const engineStore = new AdrenalineSearchEngineStore();
          engineStore.init();

          content.setAttribute("select-engine", "true");

          const defaultEngine = await lazy.SearchService.getDefault();
          const promises = [];
          engineStore.getEngines().forEach(engine => {
            const label = document.createElement("label");
            const engineId = engine.name.replace(/\s+/g, "-").toLowerCase();
            label.setAttribute("for", engineId);
            const input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("id", engineId);
            input.setAttribute("name", "adrenaline-welcome-set-default-browser");
            input.setAttribute("hidden", "true");
            if (engine.name === defaultEngine.name) {
              input.setAttribute("checked", true);
            }
            label.appendChild(input);
            const engineLabel = document.createXULElement("label");
            engineLabel.textContent = engine.name;
            const icon = document.createElement("img");
            promises.push(
              (async () => {
                icon.setAttribute(
                  "src",
                  await engine.originalEngine.getIconURL()
                );
              })()
            );
            icon.setAttribute("width", "32");
            icon.setAttribute("height", "32");
            icon.setAttribute("class", "engine-icon");
            label.appendChild(icon);
            label.appendChild(engineLabel);
            content.appendChild(label);
            label.addEventListener("click", async () => {
              const selectedEngine = engineStore.getEngineByName(engine.name);
              if (selectedEngine) {
                await engineStore.setDefaultEngine(selectedEngine);
              }
            });
          });
          await Promise.all(promises);
        },
        async fadeOut() {
          document
            .getElementById("adrenaline-welcome-page-content")
            .removeAttribute("select-engine");
        },
      },
      {
        text: [
          {
            id: "adrenaline-welcome-initial-essentials-title",
          },
          {
            id: "adrenaline-welcome-initial-essentials-description-1",
          },
          {
            id: "adrenaline-welcome-initial-essentials-description-2",
          },
        ],
        buttons: [
          {
            l10n: "adrenaline-generic-next",
            onclick: async () => {
              return true;
            },
          },
        ],
        fadeIn() {
          const xul = `
            <hbox id="adrenaline-welcome-initial-essentials-browser">
              <vbox id="adrenaline-welcome-initial-essentials-browser-sidebar">
                <hbox id="adrenaline-welcome-initial-essentials-browser-sidebar-win-buttons">
                  <html:div></html:div>
                  <html:div></html:div>
                  <html:div></html:div>
                </hbox>
                <html:div id="adrenaline-welcome-initial-essentials-browser-sidebar-essentials">
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://obsidian.md" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/obsidian.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://discord.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/discord.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://trello.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/trello.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://slack.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/slack.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://github.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/github.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://app.tuta.com/" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/tuta.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://notion.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/notion.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://calendar.google.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/calendar.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="tabbrowser-tab" fadein="" data-url="https://figma.com" style="--adrenaline-essential-tab-icon: url('chrome://browser/content/adrenaline-images/favicons/figma.svg');">
                    <stack class="tab-stack">
                      <html:div class="tab-background"></html:div>
                    </stack>
                  </html:div>
                  <html:div class="extra-tab"></html:div>
                  <html:div class="extra-tab"></html:div>
                </html:div>
              </vbox>
            </hbox>
          `;
          const fragment = window.MozXULElement.parseXULToFragment(xul);
          document
            .getElementById("adrenaline-welcome-page-content")
            .appendChild(fragment);
          document
            .getElementById(
              "adrenaline-welcome-initial-essentials-browser-sidebar-essentials"
            )
            .addEventListener("click", async event => {
              const tab = event.target.closest(".tabbrowser-tab");
              if (!tab) {
                return;
              }
              tab.toggleAttribute("visuallyselected");
            });
        },
        async fadeOut() {
          const selectedTabs = document
            .getElementById(
              "adrenaline-welcome-initial-essentials-browser-sidebar-essentials"
            )
            .querySelectorAll(".tabbrowser-tab[visuallyselected]");

          if (selectedTabs.length) {
            await PlacesUtils.history.insertMany(
              [...selectedTabs].map(tab => ({
                url: tab.getAttribute("data-url"),
                visits: [
                  {
                    transition: PlacesUtils.history.TRANSITIONS.TYPED,
                  },
                ],
              }))
            );
          }

          const { TabStateCache } = ChromeUtils.importESModule(
            "resource:///modules/sessionstore/TabStateCache.sys.mjs"
          );
          for (const tab of selectedTabs) {
            const url = tab.getAttribute("data-url");
            const createdTab = window.gBrowser.addTrustedTab(url, {
              inBackground: true,
              createLazyBrowser: true,
            });
            let essentialIconUrl = tab.style.getPropertyValue(
              "--adrenaline-essential-tab-icon"
            );
            // Remove url() from the icon URL
            essentialIconUrl = essentialIconUrl
              .replace(/url\(['"]?/, "")
              .replace(/['"]?\)/, "");
            essentialIconUrl = await getIconData(essentialIconUrl);
            // Update the persistent tab state cache with |tabData| information.
            TabStateCache.update(createdTab.linkedBrowser.permanentKey, {
              history: { entries: [{ url }], index: 0 },
              image: essentialIconUrl,
            });
            gBrowser.setIcon(createdTab, essentialIconUrl);
            _tabsToPinEssentials.push(createdTab);
          }
        },
      },
      {
        text: [
          {
            id: "adrenaline-welcome-start-browsing-title",
          },
          {
            id: "adrenaline-welcome-start-browsing-description-1",
          },
        ],
        buttons: [
          {
            l10n: "adrenaline-welcome-start-browsing",
            onclick: async () => {
              return true;
            },
          },
        ],
        fadeIn() {},
        fadeOut() {},
      },
    ];
  }

  async function animateInitialStage() {
    const [title1, title2] = await document.l10n.formatValues([
      { id: "adrenaline-welcome-title-line1" },
      { id: "adrenaline-welcome-title-line2" },
    ]);
    const titleElement = document.getElementById("adrenaline-welcome-title");
    /* eslint-disable no-unsanitized/property */
    titleElement.innerHTML = `<html:span>${title1}</html:span><html:span>${title2}</html:span>`;
    await animate(
      "#adrenaline-welcome-title span",
      { opacity: [0, 1], y: [20, 0], filter: ["blur(2px)", "blur(0px)"] },
      {
        delay: getMotion().stagger(0.6, { startDelay: 0.2 }),
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1.8,
      }
    );
    const button = document.getElementById("adrenaline-welcome-start-button");
    button.addEventListener("click", async () => {
      await animate(
        "#adrenaline-welcome-title span, #adrenaline-welcome-start-button",
        { opacity: [1, 0], y: [0, -10], filter: ["blur(0px)", "blur(2px)"] },
        {
          type: "spring",
          ease: [0.755, 0.05, 0.855, 0.06],
          bounce: 0.4,
          delay: getMotion().stagger(0.4),
        }
      );
      new nsAdrenalineWelcomePages(getWelcomePages());
    });
    await animate(
      button,
      { opacity: [0, 1], y: [20, 0], filter: ["blur(2px)", "blur(0px)"] },
      {
        delay: 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1.8,
      }
    );
  }

  function centerWindowOnScreen() {
    window.addEventListener(
      "MozAfterPaint",
      function () {
        window.resizeTo(875, 560);
        window.focus();
        const appWin = window.docShell.treeOwner
          .QueryInterface(Ci.nsIInterfaceRequestor)
          .getInterface(Ci.nsIAppWindow);
        appWin.rollupAllPopups();
        window.moveTo(
          screen.availLeft + (screen.availWidth - outerWidth) / 2,
          screen.availTop + (screen.availHeight - outerHeight) / 2
        );
      },
      { once: true }
    );
  }

  function startAdrenalineWelcome() {
    clearBrowserElements();
    centerWindowOnScreen();
    initializeAdrenalineWelcome();
    animateInitialStage();
  }

  startAdrenalineWelcome();
}
