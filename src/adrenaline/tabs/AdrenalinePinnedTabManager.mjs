// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { nsAdrenalineDOMOperatedFeature } from "chrome://browser/content/adrenaline-components/AdrenalineCommonUtils.mjs";

const lazy = {};

class AdrenalinePinnedTabsObserver {
  static ALL_EVENTS = ["TabPinned", "TabUnpinned"];

  #listeners = [];

  constructor() {
    // eslint-disable-next-line mozilla/valid-lazy
    XPCOMUtils.defineLazyPreferenceGetter(
      lazy,
      "adrenalinePinnedTabRestorePinnedTabsToPinnedUrl",
      "adrenaline.pinned-tab-manager.restore-pinned-tabs-to-pinned-url",
      false
    );
    XPCOMUtils.defineLazyPreferenceGetter(
      lazy,
      "adrenalinePinnedTabCloseShortcutBehavior",
      "adrenaline.pinned-tab-manager.close-shortcut-behavior",
      "switch"
    );
    XPCOMUtils.defineLazyPreferenceGetter(
      lazy,
      "adrenalineTabsEssentialsMax",
      "adrenaline.tabs.essentials.max",
      12
    );
    ChromeUtils.defineESModuleGetters(lazy, {
      // eslint-disable-next-line mozilla/valid-lazy
      E10SUtils: "resource://gre/modules/E10SUtils.sys.mjs",
      TabStateCache: "resource:///modules/sessionstore/TabStateCache.sys.mjs",
    });
    this.#listenPinnedTabEvents();
  }

  #listenPinnedTabEvents() {
    const eventListener = this.#eventListener.bind(this);
    for (const event of AdrenalinePinnedTabsObserver.ALL_EVENTS) {
      window.addEventListener(event, eventListener);
    }
    window.addEventListener("unload", () => {
      for (const event of AdrenalinePinnedTabsObserver.ALL_EVENTS) {
        window.removeEventListener(event, eventListener);
      }
    });
  }

  #eventListener(event) {
    for (const listener of this.#listeners) {
      listener(event.type, event);
    }
  }

  addPinnedTabListener(listener) {
    this.#listeners.push(listener);
  }
}

class nsAdrenalinePinnedTabManager extends nsAdrenalineDOMOperatedFeature {
  init() {
    if (!this.enabled) {
      return;
    }
    this._canLog = Services.prefs.getBoolPref(
      "adrenaline.pinned-tab-manager.debug",
      false
    );
    this.observer = new AdrenalinePinnedTabsObserver();
    this._initClosePinnedTabShortcut();
    this._insertItemsIntoTabContextMenu();
    this.observer.addPinnedTabListener(this._onPinnedTabEvent.bind(this));

    this._adrenalineClickEventListener = this._onTabClick.bind(this);

    gAdrenalineWorkspaces._resolvePinnedInitialized();
    gAdrenalineWorkspaces.promiseInitialized.then(() => {
      gBrowser.addTabsProgressListener(this);
      if (lazy.adrenalinePinnedTabRestorePinnedTabsToPinnedUrl) {
        for (const tab of gAdrenalineWorkspaces.allStoredTabs) {
          try {
            this.resetPinnedTab(tab);
          } catch (ex) {
            console.error("Error restoring pinned tab:", ex);
          }
        }
      }
    });
  }

  log(message) {
    if (this._canLog) {
      /* eslint-disable-next-line no-console */
      console.log(`[AdrenalinePinnedTabManager] ${message}`);
    }
  }

  onTabIconChanged(tab, url = null) {
    tab.dispatchEvent(
      new CustomEvent("AdrenalineTabIconChanged", { bubbles: true, detail: { tab } })
    );
    if (tab.hasAttribute("adrenaline-essential")) {
      this.setEssentialTabIcon(tab, url);
    }
  }

  setEssentialTabIcon(tab, url = null) {
    const iconUrl = url ?? tab.getAttribute("image") ?? "";
    tab.style.setProperty("--adrenaline-essential-tab-icon", `url(${iconUrl})`);
  }

  _onTabResetPinButton(event, tab) {
    event.stopPropagation();
    if (event.getModifierState("Accel")) {
      let newTab = gBrowser.duplicateTab(tab, true);
      newTab.addEventListener(
        "SSTabRestored",
        () => {
          this.#resetTabToStoredState(tab);
        },
        { once: true }
      );
    } else {
      this.#resetTabToStoredState(tab);
    }
    gBrowser.selectedTab = tab;
  }

  get enabled() {
    return !gAdrenalineWorkspaces.privateWindowOrDisabled;
  }

  get maxEssentialTabs() {
    return lazy.adrenalineTabsEssentialsMax;
  }

  _onPinnedTabEvent(action, event) {
    if (!this.enabled) {
      return;
    }
    const tab = event.target;
    if (this._ignoreNextTabPinnedEvent) {
      delete this._ignoreNextTabPinnedEvent;
      return;
    }
    switch (action) {
      case "TabPinned":
        tab._adrenalineClickEventListener = this._adrenalineClickEventListener;
        tab.addEventListener("click", tab._adrenalineClickEventListener);
        break;
      // [Fall through]
      case "TabUnpinned":
        if (tab._adrenalineClickEventListener) {
          tab.removeEventListener("click", tab._adrenalineClickEventListener);
          delete tab._adrenalineClickEventListener;
        }
        this.resetPinChangedUrl(tab);
        break;
      default:
        console.warn("AdrenalinePinnedTabManager: Unhandled tab event", action);
        break;
    }
  }

  #getTabState(tab) {
    return JSON.parse(SessionStore.getTabState(tab));
  }

  async _onTabClick(e) {
    const tab = e.target?.closest("tab");
    if (e.button === 1 && tab) {
      await this.onCloseTabShortcut(e, tab, {
        closeIfPending: Services.prefs.getBoolPref(
          "adrenaline.pinned-tab-manager.wheel-close-if-pending"
        ),
      });
    }
  }

  _onAccelKeyChange(e) {
    let tab = this._tabWithResetPinButtonHovered;
    if (!tab) {
      return;
    }
    let accelHeld =
      e.getModifierState("Accel") || (e.metaKey && e.type == "keydown");
    this._setResetPinSublabel(tab, accelHeld);
    // Up <-> down events until the mouse leaves the button.
    // When hovered with accelHeld, we should listen to the next keyup event
    let nextEvent = accelHeld ? "keyup" : "keydown";
    let handler = nextE => this._onAccelKeyChange(nextE);
    window.addEventListener(nextEvent, handler, { once: true });
  }

  _setResetPinSublabel(tab, accelHeld) {
    let label = tab.querySelector(".adrenaline-tab-sublabel");
    const getLabel = b => (b ? "adrenaline-default-pinned-cmd" : "adrenaline-default-pinned");
    // We might not want to change the sublabel if it was already customized by,
    // for example, live folders, so only change it if it's currently the default one.
    if (
      document.l10n.getAttributes(label).args.tabSubtitle !=
      getLabel(!accelHeld)
    ) {
      return;
    }
    document.l10n.setArgs(label, {
      tabSubtitle: getLabel(accelHeld),
    });
  }

  onResetPinButtonMouseOver(tab, event) {
    this._tabWithResetPinButtonHovered = tab;
    this._onAccelKeyChange(event);
  }

  onResetPinButtonMouseOut(tab) {
    this._setResetPinSublabel(tab, false);
    delete this._tabWithResetPinButtonHovered;
  }

  resetPinnedTab(tab) {
    if (!tab) {
      tab = TabContextMenu.contextTab;
    }

    if (!tab || !tab.pinned) {
      return;
    }

    this.#resetTabToStoredState(tab);
  }

  replacePinnedUrlWithCurrent(tab = undefined) {
    tab ??= TabContextMenu.contextTab;
    if (!tab || !tab.pinned) {
      return;
    }

    window.gAdrenalineWindowSync.setPinnedTabState(tab);
    this.resetPinChangedUrl(tab);
    gAdrenalineUIManager.showToast("adrenaline-pinned-tab-replaced");
  }

  async editPinnedUrl(tab = undefined) {
    tab ??= TabContextMenu.contextTab;
    if (!tab || !tab.pinned) {
      return;
    }

    const initialUrl =
      tab._adrenalinePinnedInitialState?.entry?.url ||
      tab.linkedBrowser?.currentURI?.spec;
    const [title, label] = await document.l10n.formatValues([
      { id: "adrenaline-pinned-tab-edit-url-title" },
      { id: "adrenaline-pinned-tab-edit-url-label" },
    ]);
    const result = { value: initialUrl ?? "" };
    const confirmed = Services.prompt.prompt(
      window,
      title,
      label,
      result,
      null,
      { value: false }
    );
    if (!confirmed) {
      return;
    }

    let uri;
    try {
      uri = Services.uriFixup.getFixupURIInfo(
        result.value.trim(),
        Ci.nsIURIFixup.FIXUP_FLAG_FIX_SCHEME_TYPOS
      ).preferredURI;
    } catch (_) {}
    if (!uri) {
      gAdrenalineUIManager.showToast("adrenaline-pinned-tab-url-invalid");
      return;
    }
    const url = uri.spec;

    // Skip when the value wasn't actually changed from what was prefilled.
    if (!url || url === initialUrl) {
      return;
    }

    const image = tab.adrenalineStaticIcon || (await this.#getCachedFavicon(uri));
    window.gAdrenalineWindowSync.setPinnedUrl(tab, url, image);
    this.#resetTabToStoredState(tab);
    gAdrenalineUIManager.showToast("adrenaline-pinned-tab-url-edited");
  }

  async #getCachedFavicon(uri) {
    try {
      const favicon = await PlacesUtils.favicons.getFaviconForPage(uri);
      return favicon?.dataURI?.spec;
    } catch (ex) {
      console.error("Failed to get favicon for edited pinned url:", ex);
      return null;
    }
  }

  _initClosePinnedTabShortcut() {
    let cmdClose = document.getElementById("cmd_close");

    if (cmdClose) {
      cmdClose.addEventListener("command", this.onCloseTabShortcut.bind(this));
    }
  }

  // eslint-disable-next-line complexity
  async onCloseTabShortcut(
    event,
    selectedTab = gBrowser.selectedTab,
    {
      behavior = lazy.adrenalinePinnedTabCloseShortcutBehavior,
      noClose = false,
      closeIfPending = false,
      alwaysUnload = false,
      folderToUnload = null,
    } = {}
  ) {
    try {
      const tabs = Array.isArray(selectedTab) ? selectedTab : [selectedTab];
      const pinnedTabs = [
        ...new Set(
          tabs
            .flatMap(tab => {
              if (tab.group?.hasAttribute("split-view-group")) {
                return tab.group.tabs;
              }
              return tab;
            })
            .filter(tab => tab?.pinned)
        ),
      ];

      if (!pinnedTabs.length) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      if (noClose && behavior === "close") {
        behavior = "unload-switch";
      }

      if (
        alwaysUnload &&
        ["close", "reset", "switch", "reset-switch"].includes(behavior)
      ) {
        behavior = behavior.contains("reset")
          ? "reset-unload-switch"
          : "unload-switch";
      }

      switch (behavior) {
        case "close": {
          for (const tab of pinnedTabs) {
            gBrowser.removeTab(tab, { animate: true });
          }
          break;
        }
        case "reset-unload-switch":
        case "unload-switch":
        case "reset-switch":
        case "switch":
          if (behavior.includes("unload")) {
            for (const tab of pinnedTabs) {
              if (tab.hasAttribute("glance-id")) {
                // We have a glance tab inside the tab we are trying to unload,
                // before we used to just ignore it but now we need to fully close
                // it as well.
                gAdrenalineGlanceManager.manageTabClose(tab.glanceTab);
                await new Promise(resolve => {
                  let hasRan = false;
                  const onGlanceClose = () => {
                    hasRan = true;
                    resolve();
                  };
                  window.addEventListener("GlanceClose", onGlanceClose, {
                    once: true,
                  });
                  // Set a timeout to resolve the promise if the event doesn't fire.
                  // We do this to prevent any future issues where glance woudnt close such as
                  // glance requering to ask for permit unload.
                  setTimeout(() => {
                    if (!hasRan) {
                      console.warn(
                        "GlanceClose event did not fire within 3 seconds"
                      );
                      resolve();
                    }
                  }, 3000);
                });
                return;
              }
              const isSpltView = tab.group?.hasAttribute("split-view-group");
              const group = isSpltView ? tab.group.group : tab.group;
              if (!folderToUnload && tab.hasAttribute("folder-active")) {
                await gAdrenalineFolders.animateUnload(group, tab);
              }
            }
            if (folderToUnload) {
              await gAdrenalineFolders.animateUnloadAll(folderToUnload);
            }
            const allAreUnloaded = pinnedTabs.every(
              tab =>
                tab.hasAttribute("pending") &&
                !tab.hasAttribute("adrenaline-essential")
            );
            for (const tabItem of pinnedTabs) {
              if (allAreUnloaded && closeIfPending) {
                await this.onCloseTabShortcut(event, tabItem, {
                  behavior: "close",
                });
                return;
              }
            }
            let successful = await gBrowser.explicitUnloadTabs(pinnedTabs);
            if (!successful) {
              return;
            }
            for (const tab of pinnedTabs) {
              tab.removeAttribute("discarded");
            }
          } else if (pinnedTabs.some(tab => tab.selected)) {
            const selectedTabs = pinnedTabs.filter(tab => tab.selected);
            gBrowser.selectedTab = gBrowser._findTabToBlurTo(
              selectedTabs[0],
              selectedTabs
            );
          }
          if (behavior.includes("reset")) {
            for (const tab of pinnedTabs) {
              this.#resetTabToStoredState(tab);
            }
          }
          break;
        case "reset":
          for (const tab of pinnedTabs) {
            this.#resetTabToStoredState(tab);
          }
          break;
        default:
      }
    } catch (ex) {
      console.error("Error handling close tab shortcut for pinned tab:", ex);
    }
  }

  #resetTabToStoredState(tab) {
    const state = this.#getTabState(tab);

    const initialState = tab._adrenalinePinnedInitialState;
    if (!initialState?.entry) {
      return;
    }

    // Remove everything except the entry we want to keep
    state.entries = [
      {
        ...initialState.entry,
        triggeringPrincipal_base64: E10SUtils.serializePrincipal(
          Services.scriptSecurityManager.createContentPrincipal(
            Services.io.newURI(initialState.entry.url),
            {}
          )
        ),
      },
    ];

    state.image = tab.adrenalineStaticIcon || initialState.image;
    state.index = 0;

    // See gh-13024, we need to remove the scroll position from the state,
    // otherwise when we reset the pinned tab, it will scroll to the previous position
    // which can be confusing for the user, especially if they have a long page.
    delete state.scroll;

    SessionStore.setTabState(tab, state);
    this.resetPinChangedUrl(tab);
  }

  async getFaviconAsBase64(pageUrl) {
    try {
      const faviconData = await PlacesUtils.favicons.getFaviconForPage(pageUrl);
      if (!faviconData) {
        // empty favicon
        return null;
      }
      return faviconData.dataURI;
    } catch (ex) {
      console.error("Failed to get favicon:", ex);
      return null;
    }
  }

  addToEssentials(tab) {
    // eslint-disable-next-line no-nested-ternary
    const tabs = tab
      ? // if it's already an array, dont make it [tab]
        tab?.length
        ? tab
        : [tab]
      : TabContextMenu.contextTab.multiselected
        ? gBrowser.selectedTabs
        : [TabContextMenu.contextTab];
    let movedAll = true;
    for (let i = 0; i < tabs.length; i++) {
      // eslint-disable-next-line no-shadow
      let tab = tabs[i];
      const section = gAdrenalineWorkspaces.getEssentialsSection(tab);
      if (!this.canEssentialBeAdded(tab)) {
        movedAll = false;
        continue;
      }
      if (tab.hasAttribute("adrenaline-essential")) {
        continue;
      }
      tab.setAttribute("adrenaline-essential", "true");
      if (tab.hasAttribute("adrenaline-workspace-id")) {
        tab.removeAttribute("adrenaline-workspace-id");
      }
      if (tab.pinned) {
        gBrowser.adrenalineHandleTabMove(tab, () => {
          if (tab.documentGlobal !== window) {
            tab = gBrowser.adoptTab(tab, {
              selectTab: tab.selected,
            });
            tab.setAttribute("adrenaline-essential", "true");
          }
          section.appendChild(tab);
        });
      } else {
        gBrowser.pinTab(tab);
        this._ignoreNextTabPinnedEvent = true;
      }
      tab.setAttribute("adrenalineDefaultUserContextId", true);
      if (tab.selected) {
        gAdrenalineWorkspaces.switchTabIfNeeded(tab);
      }
      this.onTabIconChanged(tab);
      // Dispatch the event to update the UI
      const event = new CustomEvent("TabAddedToEssentials", {
        detail: { tab },
        bubbles: true,
        cancelable: false,
      });
      tab.dispatchEvent(event);
    }
    gAdrenalineUIManager.updateTabsToolbar();
    return movedAll;
  }

  removeEssentials(tab, unpin = true) {
    // eslint-disable-next-line no-nested-ternary
    const tabs = tab
      ? [tab]
      : TabContextMenu.contextTab.multiselected
        ? gBrowser.selectedTabs
        : [TabContextMenu.contextTab];
    for (let i = 0; i < tabs.length; i++) {
      // eslint-disable-next-line no-shadow
      const tab = tabs[i];
      tab.removeAttribute("adrenaline-essential");
      if (
        gAdrenalineWorkspaces.workspaceEnabled &&
        gAdrenalineWorkspaces.getActiveWorkspaceFromCache().uuid
      ) {
        tab.setAttribute(
          "adrenaline-workspace-id",
          gAdrenalineWorkspaces.getActiveWorkspaceFromCache().uuid
        );
      }
      if (unpin) {
        gBrowser.unpinTab(tab);
      } else {
        gBrowser.adrenalineHandleTabMove(tab, () => {
          const pinContainer = gAdrenalineWorkspaces.pinnedTabsContainer;
          pinContainer.prepend(tab);
        });
      }
      // Dispatch the event to update the UI
      const event = new CustomEvent("TabRemovedFromEssentials", {
        detail: { tab },
        bubbles: true,
        cancelable: false,
      });
      tab.dispatchEvent(event);
    }
    gAdrenalineUIManager.updateTabsToolbar();
  }

  _insertItemsIntoTabContextMenu() {
    if (!this.enabled) {
      return;
    }
    const elements = window.MozXULElement.parseXULToFragment(`
            <menuseparator id="context_adrenaline-pinned-tab-separator" hidden="true"/>
            <menu id="context_adrenaline-edit-pinned-page"
                  data-lazy-l10n-id="tab-context-adrenaline-edit-pinned-page"
                  data-l10n-args="{&quot;isEssential&quot;:&quot;&quot;}"
                  hidden="true">
              <menupopup>
                <menuitem id="context_adrenaline-replace-pinned-url-with-current"
                          data-lazy-l10n-id="tab-context-adrenaline-replace-pinned-url-with-current"
                          data-l10n-args="{&quot;isEssential&quot;:&quot;&quot;}"
                          command="cmd_adrenalineReplacePinnedUrlWithCurrent"/>
                <menuitem id="context_adrenaline-edit-pinned-url"
                          data-lazy-l10n-id="tab-context-adrenaline-edit-pinned-url"
                          command="cmd_adrenalineEditPinnedUrl"/>
              </menupopup>
            </menu>
            <menuitem id="context_adrenaline-reset-pinned-tab"
                      data-lazy-l10n-id="tab-context-adrenaline-reset-pinned-tab"
                      data-l10n-args="{&quot;isEssential&quot;:&quot;&quot;}"
                      hidden="true"
                      command="cmd_adrenalinePinnedTabResetNoTab"/>
        `);
    document.getElementById("tabContextMenu").appendChild(elements);

    const element = window.MozXULElement.parseXULToFragment(`
            <menuitem id="context_adrenaline-add-essential"
                      data-l10n-id="tab-context-adrenaline-add-essential"
                      hidden="true"
                      disabled="true"
                      command="cmd_contextAdrenalineAddToEssentials"/>
            <menuitem id="context_adrenaline-remove-essential"
                      data-lazy-l10n-id="tab-context-adrenaline-remove-essential"
                      hidden="true"
                      command="cmd_contextAdrenalineRemoveFromEssentials"/>
            <menuseparator/>
            <menuitem id="context_adrenaline-edit-tab-title"
                      data-lazy-l10n-id="tab-context-adrenaline-edit-title"
                      hidden="true"/>
            <menuitem id="context_adrenaline-edit-tab-icon"
                      data-lazy-l10n-id="tab-context-adrenaline-edit-icon"/>
            <menuseparator/>
        `);

    document.getElementById("context_pinTab")?.before(element);
    document
      .getElementById("context_adrenaline-edit-tab-title")
      .addEventListener("command", event => {
        gAdrenalineVerticalTabsManager.renameTabStart(event);
      });
    document
      .getElementById("context_adrenaline-edit-tab-icon")
      .addEventListener("command", () => {
        const tab = TabContextMenu.contextTab;
        gAdrenalineEmojiPicker.open(tab.iconImage, {
          emojiAsSVG: true,
          closeOnSelect: false,
          allowNone: Boolean(tab.adrenalineStaticIcon),
          onSelect: icon => {
            if (icon) {
              tab.adrenalineStaticIcon = icon;
            } else {
              delete tab.adrenalineStaticIcon;
            }
            gBrowser.setIcon(tab, icon);
            lazy.TabStateCache.update(tab.permanentKey, {
              image: null,
            });
          },
        });
      });
  }

  updatePinnedTabContextMenu(contextTab) {
    if (!this.enabled) {
      document.getElementById("context_pinTab").hidden = true;
      return;
    }
    const isVisible = contextTab.pinned && !contextTab.multiselected;
    const isEssential = contextTab.getAttribute("adrenaline-essential");
    const adrenalineAddEssential = document.getElementById(
      "context_adrenaline-add-essential"
    );
    const adrenalineResetPinnedTab = document.getElementById(
      "context_adrenaline-reset-pinned-tab"
    );
    const adrenalineEditPinnedPage = document.getElementById(
      "context_adrenaline-edit-pinned-page"
    );
    const adrenalineReplacePinnedUrl = document.getElementById(
      "context_adrenaline-replace-pinned-url-with-current"
    );
    [adrenalineResetPinnedTab, adrenalineEditPinnedPage].forEach(element => {
      if (element) {
        element.hidden = !isVisible;
      }
    });
    [adrenalineResetPinnedTab, adrenalineEditPinnedPage, adrenalineReplacePinnedUrl].forEach(
      element => {
        if (element) {
          document.l10n.setArgs(element, { isEssential });
        }
      }
    );
    adrenalineAddEssential.hidden = isEssential || !!contextTab.group;
    document.l10n
      .formatValue("tab-context-adrenaline-add-essential-badge", {
        num: gBrowser._numAdrenalineEssentials,
        max: this.maxEssentialTabs,
      })
      .then(badgeText => {
        adrenalineAddEssential.setAttribute("badge", badgeText);
      });
    document
      .getElementById("cmd_contextAdrenalineAddToEssentials")
      .toggleAttribute("disabled", !this.canEssentialBeAdded(contextTab));
    document.getElementById("context_closeTab").hidden =
      contextTab.hasAttribute("adrenaline-essential");
    document.getElementById("context_adrenaline-remove-essential").hidden =
      !isEssential;
    document.getElementById("context_unpinTab").hidden =
      document.getElementById("context_unpinTab").hidden || isEssential;
    document.getElementById("context_unpinSelectedTabs").hidden =
      document.getElementById("context_unpinSelectedTabs").hidden ||
      isEssential;
    document.getElementById("context_adrenaline-pinned-tab-separator").hidden =
      !isVisible;
    document.getElementById("context_adrenaline-edit-tab-title").hidden =
      isEssential ||
      !Services.prefs.getBoolPref("adrenaline.tabs.rename-tabs") ||
      !gAdrenalineVerticalTabsManager._prefsSidebarExpanded;
  }

  // eslint-disable-next-line complexity
  moveToAnotherTabContainerIfNecessary(
    event,
    draggedTab,
    movingTabs,
    dropIndex
  ) {
    let newIndex = dropIndex;
    let fromDifferentWindow = false;
    let ownedTabs = Array.from(movingTabs || draggedTab)
      .reverse()
      .map(tab => {
        if (!gBrowser.isTab(tab)) {
          return tab;
        }
        let workspaceId;
        if (
          !tab.hasAttribute("adrenaline-essential") &&
          tab.getAttribute("adrenaline-workspace-id") != gAdrenalineWorkspaces.activeWorkspace
        ) {
          workspaceId = gAdrenalineWorkspaces.activeWorkspace;
        }
        if (tab.documentGlobal !== window) {
          fromDifferentWindow = true;
          if (workspaceId) {
            tab.documentGlobal.gBrowser.selectedTab =
              tab.documentGlobal.gBrowser._findTabToBlurTo(tab, movingTabs);
            tab.documentGlobal.gAdrenalineWorkspaces.moveTabToWorkspace(
              tab,
              workspaceId
            );
          }
          // Move the tabs into this window. To avoid multiple tab-switches in
          // the original window, the selected tab should be adopted last.
          tab = gBrowser.adoptTab(tab, {
            elementIndex: newIndex,
            selectTab: tab == draggedTab,
            spaceId: workspaceId,
          });
          if (tab) {
            ++newIndex;
          }
        }
        if (workspaceId) {
          tab.setAttribute("adrenaline-workspace-id", workspaceId);
        }
        return tab;
      });
    if (!fromDifferentWindow) {
      // See gh-13796 and gh-12156
      ownedTabs = ownedTabs.reverse();
    }
    movingTabs = [...ownedTabs];
    if (fromDifferentWindow) {
      gBrowser.addRangeToMultiSelectedTabs(
        gBrowser.tabContainer.dragAndDropElements[dropIndex],
        gBrowser.tabContainer.dragAndDropElements[newIndex - 1]
      );
    }
    try {
      const pinnedTabsTarget = event.target.closest(
        ":is(.adrenaline-current-workspace-indicator, .adrenaline-workspace-pinned-tabs-section)"
      );
      const essentialTabsTarget = event.target.closest(
        ".adrenaline-essentials-container"
      );
      const tabsTarget = !pinnedTabsTarget;
      let currentEssenialContainer =
        gAdrenalineWorkspaces.getCurrentEssentialsContainer();
      if (currentEssenialContainer?.essentialsPromo) {
        currentEssenialContainer.essentialsPromo.remove();
      }

      movingTabs = movingTabs.filter(tab =>
        gBrowser.isTabGroupLabel(tab) && tab.group?.isAdrenalineFolder
          ? !tabsTarget && !essentialTabsTarget
          : true
      );

      // TODO: Solve the issue of adding a tab between two groups
      // Remove group labels from the moving tabs and replace it
      // with the sub tabs
      for (let i = 0; i < movingTabs.length; i++) {
        const tab = movingTabs[i];
        if (gBrowser.isTabGroupLabel(tab)) {
          const group = tab.group;
          // remove label and add sub tabs to moving tabs
          if (group) {
            movingTabs.splice(i, 1, ...group.tabs);
          }
        }
      }

      let isVertical = this.expandedSidebarMode;
      let moved = false;
      let hasActuallyMoved;
      for (const tab of movingTabs) {
        let isRegularTabs = false;
        // Check for essentials container
        if (essentialTabsTarget) {
          if (
            !tab.hasAttribute("adrenaline-essential") &&
            !tab?.group?.hasAttribute("split-view-group")
          ) {
            moved = true;
            isVertical = false;
            hasActuallyMoved = this.addToEssentials(tab);
          }
        }
        // Check for pinned tabs container
        else if (pinnedTabsTarget) {
          if (!tab.pinned) {
            gBrowser.pinTab(tab);
          } else if (tab.hasAttribute("adrenaline-essential")) {
            this.removeEssentials(tab, false);
            moved = true;
          }
        }
        // Check for normal tabs container
        else if (tabsTarget || event.target.id === "adrenaline-tabs-wrapper") {
          if (tab.pinned && !tab.hasAttribute("adrenaline-essential")) {
            gBrowser.unpinTab(tab);
            isRegularTabs = true;
          } else if (tab.hasAttribute("adrenaline-essential")) {
            this.removeEssentials(tab);
            moved = true;
            isRegularTabs = true;
          }
        }

        if (typeof hasActuallyMoved === "undefined") {
          hasActuallyMoved = moved;
        }

        // If the tab was moved, adjust its position relative to the target tab
        if (hasActuallyMoved) {
          const targetTab = event.target.closest(".tabbrowser-tab");
          const targetFolder = event.target.closest("adrenaline-folder");
          let targetElem = targetTab || targetFolder?.labelElement;
          if (targetElem?.group?.activeGroups?.length > 0) {
            const activeGroup = targetElem.group.activeGroups.at(-1);
            targetElem = activeGroup.labelElement;
          }
          if (targetElem) {
            const rect = targetElem.getBoundingClientRect();
            let elementIndex = targetElem.elementIndex;

            if (isVertical || !this.expandedSidebarMode) {
              const middleY = targetElem.screenY + rect.height / 2;
              if (!isRegularTabs && event.screenY > middleY) {
                elementIndex++;
              } else if (isRegularTabs && event.screenY < middleY) {
                elementIndex--;
              }
            } else {
              const middleX = targetElem.screenX + rect.width / 2;
              if (event.screenX > middleX) {
                elementIndex++;
              }
            }
            // If it's the last tab, move it to the end
            if (tabsTarget === gBrowser.tabs.at(-1)) {
              elementIndex++;
            }

            gBrowser.moveTabTo(tab, {
              elementIndex,
              forceUngrouped: targetElem?.group?.collapsed !== false,
            });
          }
        }
      }
    } catch (ex) {
      console.error("Error moving tabs:", ex);
    }
    return [draggedTab, ownedTabs];
  }

  onLocationChange(aBrowser, aWebProgress, aRequest, aLocationURI) {
    if (!aWebProgress.isTopLevel) {
      return;
    }
    // eslint-disable-next-line no-shadow
    let location = aLocationURI ? aLocationURI.spec : "";
    if (
      (location == "about:blank" &&
        BrowserUIUtils.checkEmptyPageOrigin(aBrowser)) ||
      location == ""
    ) {
      return;
    }
    const tab = gBrowser.getTabForBrowser(aBrowser);
    if (
      !tab ||
      !tab.pinned ||
      tab.hasAttribute("adrenaline-essential") ||
      !tab._adrenalinePinnedInitialState?.entry
    ) {
      return;
    }
    // Remove # from the URL
    const pinUrl = tab._adrenalinePinnedInitialState.entry.url.split("#")[0];
    const currentUrl = location.split("#")[0];
    // Add an indicator that the pin has been changed
    if (
      Services.io.newURI(currentUrl).spec === Services.io.newURI(pinUrl).spec
    ) {
      this.resetPinChangedUrl(tab);
      return;
    }
    this.pinHasChangedUrl(tab);
  }

  resetPinChangedUrl(tab) {
    if (!tab.hasAttribute("adrenaline-pinned-changed")) {
      return;
    }
    tab.removeAttribute("adrenaline-pinned-changed");
    tab.removeAttribute("had-adrenaline-pinned-changed");
    tab.style.removeProperty("--adrenaline-original-tab-icon");
  }

  pinHasChangedUrl(tab) {
    if (tab.hasAttribute("adrenaline-pinned-changed")) {
      const showSublabel = tab.hasAttribute("adrenaline-show-sublabel");
      if (showSublabel) {
        tab.removeAttribute("adrenaline-show-sublabel");

        const label = tab.querySelector(".adrenaline-tab-sublabel");
        document.l10n.setArgs(label, {
          tabSubtitle: "adrenaline-default-pinned",
        });
      }
      return;
    }
    if (tab.group?.hasAttribute("split-view-group")) {
      tab.setAttribute("had-adrenaline-pinned-changed", "true");
    } else {
      tab.setAttribute("adrenaline-pinned-changed", "true");
    }
    if (tab._adrenalinePinnedInitialState.image) {
      tab.style.setProperty(
        "--adrenaline-original-tab-icon",
        `url(${tab._adrenalinePinnedInitialState.image})`
      );
    } else {
      tab.style.removeProperty("--adrenaline-original-tab-icon");
    }
  }

  removeTabContainersDragoverClass(hideIndicator = true) {
    this.dragIndicator.remove();
    this._dragIndicator = null;
    if (hideIndicator) {
      gAdrenalineWorkspaces.activeWorkspaceIndicator?.removeAttribute("open");
    }
  }

  get dragIndicator() {
    if (!this._dragIndicator) {
      this._dragIndicator = document.createElement("div");
      this._dragIndicator.id = "adrenaline-drag-indicator";
      gNavToolbox.appendChild(this._dragIndicator);
    }
    return this._dragIndicator;
  }

  get expandedSidebarMode() {
    return (
      document.documentElement.getAttribute("adrenaline-sidebar-expanded") === "true"
    );
  }

  canEssentialBeAdded(tab) {
    return (
      !(
        (tab.getAttribute("usercontextid") || 0) !=
          gAdrenalineWorkspaces.getActiveWorkspaceFromCache().containerTabId &&
        gAdrenalineWorkspaces.containerSpecificEssentials
      ) && gBrowser._numAdrenalineEssentials < this.maxEssentialTabs
    );
  }

  // eslint-disable-next-line complexity
  applyDragoverClass(event, draggedTab) {
    if (!this.enabled) {
      return;
    }
    let isVertical = this.expandedSidebarMode;
    if (
      gBrowser.isTabGroupLabel(draggedTab) &&
      !draggedTab?.group?.hasAttribute("split-view-group")
    ) {
      // If the target is a tab group label, we don't want to apply the dragover class
      this.removeTabContainersDragoverClass();
      return;
    }
    const pinnedTabsTarget = event.target.closest(
      ".adrenaline-workspace-pinned-tabs-section"
    );
    const essentialTabsTarget = event.target.closest(
      ".adrenaline-essentials-container"
    );
    const tabsTarget = event.target.closest(
      ".adrenaline-workspace-normal-tabs-section"
    );
    const folderTarget = event.target.closest("adrenaline-folder");
    let targetTab = event.target.closest(".tabbrowser-tab");
    targetTab = targetTab?.group || targetTab;
    draggedTab = draggedTab?.group?.hasAttribute("split-view-group")
      ? draggedTab.group
      : draggedTab;
    const isHoveringIndicator = !!event.target.closest(
      ".adrenaline-current-workspace-indicator"
    );
    if (isHoveringIndicator) {
      this.removeTabContainersDragoverClass(false);
      gAdrenalineWorkspaces.activeWorkspaceIndicator?.setAttribute("open", true);
    } else {
      gAdrenalineWorkspaces.activeWorkspaceIndicator?.removeAttribute("open");
    }

    if (draggedTab?._dragData?.movingTabs) {
      gAdrenalineFolders.ungroupTabsFromActiveGroups(draggedTab._dragData.movingTabs);
    }

    let shouldAddDragOverElement = false;

    // Decide whether we should show a dragover class for the given target
    if (essentialTabsTarget) {
      if (
        !draggedTab.hasAttribute("adrenaline-essential") &&
        this.canEssentialBeAdded(draggedTab)
      ) {
        shouldAddDragOverElement = true;
        isVertical = false;
      }
    } else if (pinnedTabsTarget) {
      if (draggedTab.hasAttribute("adrenaline-essential")) {
        shouldAddDragOverElement = true;
      }
    } else if (tabsTarget) {
      if (draggedTab.hasAttribute("adrenaline-essential")) {
        shouldAddDragOverElement = true;
      }
    }

    if (
      !shouldAddDragOverElement ||
      (!targetTab && !folderTarget) ||
      !targetTab
    ) {
      this.removeTabContainersDragoverClass(!isHoveringIndicator);
      return;
    }

    // Calculate middle to decide 'before' or 'after'
    const rect = targetTab.getBoundingClientRect();
    let shouldPlayHapticFeedback = false;
    if (isVertical || !this.expandedSidebarMode) {
      const separation = 8;
      const middleY = targetTab.screenY + rect.height / 2;
      const indicator = this.dragIndicator;
      // eslint-disable-next-line no-shadow
      let top = 0;
      if (event.screenY > middleY) {
        top = Math.round(rect.top + rect.height) + "px";
      } else {
        top = Math.round(rect.top) + "px";
      }
      if (indicator.style.top !== top) {
        shouldPlayHapticFeedback = true;
      }
      indicator.setAttribute("orientation", "horizontal");
      indicator.style.setProperty(
        "--indicator-left",
        rect.left + separation / 2 + "px"
      );
      indicator.style.setProperty(
        "--indicator-width",
        rect.width - separation + "px"
      );
      indicator.style.top = top;
      indicator.style.removeProperty("left");
    } else {
      const separation = 8;
      const middleX = targetTab.screenX + rect.width / 2;
      const indicator = this.dragIndicator;
      let left = 0;
      if (event.screenX > middleX) {
        left = Math.round(rect.left + rect.width + 1) + "px";
      } else {
        left = Math.round(rect.left - 2) + "px";
      }
      if (indicator.style.left !== left) {
        shouldPlayHapticFeedback = true;
      }
      indicator.setAttribute("orientation", "vertical");
      indicator.style.setProperty(
        "--indicator-top",
        rect.top + separation / 2 + "px"
      );
      indicator.style.setProperty(
        "--indicator-height",
        rect.height - separation + "px"
      );
      indicator.style.left = left;
      indicator.style.removeProperty("top");
    }
    if (shouldPlayHapticFeedback) {
      // eslint-disable-next-line mozilla/valid-services
      Services.adrenaline.playHapticFeedback();
    }
  }

  onTabLabelChanged(tab) {
    tab.dispatchEvent(
      new CustomEvent("AdrenalineTabLabelChanged", { bubbles: true, detail: { tab } })
    );
  }
}

window.gAdrenalinePinnedTabManager = new nsAdrenalinePinnedTabManager();
