/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable consistent-return */

const lazy = {};

XPCOMUtils.defineLazyPreferenceGetter(
  lazy,
  "COMPACT_MODE_FLASH_DURATION",
  "adrenaline.view.compact.toolbar-flash-popup.duration",
  800
);

XPCOMUtils.defineLazyPreferenceGetter(
  lazy,
  "COMPACT_MODE_FLASH_ENABLED",
  "adrenaline.view.compact.toolbar-flash-popup",
  true
);

XPCOMUtils.defineLazyPreferenceGetter(
  lazy,
  "COMPACT_MODE_CAN_ANIMATE_SIDEBAR",
  "adrenaline.view.compact.animate-sidebar",
  true
);

XPCOMUtils.defineLazyPreferenceGetter(
  lazy,
  "COMPACT_MODE_SHOW_SIDEBAR_AND_TOOLBAR_ON_HOVER",
  "adrenaline.view.compact.show-sidebar-and-toolbar-on-hover",
  true
);

ChromeUtils.defineLazyGetter(lazy, "mainAppWrapper", () =>
  document.getElementById("adrenaline-main-app-wrapper")
);

window.gAdrenalineCompactModeManager = {
  _flashTimeouts: {},
  _eventListeners: [],
  _removeHoverFrames: {},

  // Delay to avoid flickering when hovering over the sidebar
  HOVER_HACK_DELAY: Services.prefs.getIntPref(
    "adrenaline.view.compact.hover-hack-delay",
    0
  ),

  preInit() {
    this._wasInCompactMode = Services.prefs.getBoolPref(
      "adrenaline.view.compact.enable-at-startup",
      false
    );
    this._canDebugLog = Services.prefs.getBoolPref(
      "adrenaline.view.compact.debug",
      false
    );

    this.addContextMenu();
  },

  init() {
    this.addMouseActions();

    const tabIsRightObserver = this._updateSidebarIsOnRight.bind(this);
    Services.prefs.addObserver(
      "adrenaline.tabs.vertical.right-side",
      tabIsRightObserver
    );

    window.addEventListener(
      "unload",
      () => {
        Services.prefs.removeObserver(
          "adrenaline.tabs.vertical.right-side",
          tabIsRightObserver
        );
      },
      { once: true }
    );

    gAdrenalineUIManager.addPopupTrackingAttribute(this.sidebar);
    gAdrenalineUIManager.addPopupTrackingAttribute(
      document.getElementById("adrenaline-appcontent-navbar-wrapper")
    );

    this.addHasPolyfillObserver();

    // Clear hover states when window state changes (minimize, maximize, etc.)
    window.addEventListener("sizemodechange", () =>
      this._clearAllHoverStates()
    );

    this._canShowBackgroundTabToast = Services.prefs.getBoolPref(
      "adrenaline.view.compact.show-background-tab-toast",
      true
    );

    if (AppConstants.platform == "macosx") {
      window.addEventListener("mouseover", event => {
        const buttons = gAdrenalineVerticalTabsManager.actualWindowButtons;
        if (event.target.closest(".titlebar-buttonbox-container") === buttons) {
          return;
        }
        this._setElementExpandAttribute(buttons, false);
      });
    }

    SessionStore.promiseAllWindowsRestored.then(() => {
      this.preference = this._wasInCompactMode;
    });
  },

  log(...args) {
    if (this._canDebugLog) {
      // eslint-disable-next-line no-console
      console.debug("[Adrenaline Compact Mode]", ...args);
    }
  },

  get preference() {
    return document.documentElement.getAttribute("adrenaline-compact-mode") === "true";
  },

  get shouldBeCompact() {
    return !document.documentElement
      .getAttribute("chromehidden")
      ?.includes("toolbar");
  },

  set preference(value) {
    if (!this.shouldBeCompact) {
      value = false;
    }
    this.log("Setting compact mode preference to", value);
    if (
      this.preference === value ||
      document.documentElement.hasAttribute("adrenaline-compact-animating")
    ) {
      if (typeof this._wasInCompactMode !== "undefined") {
        // We wont do anything with it anyway, so we remove it
        delete this._wasInCompactMode;
      }
      delete this._ignoreNextHover;
      // We dont want the user to be able to spam the button
      return;
    }
    delete this._isTabBeingDragged;
    this.sidebar.removeAttribute("adrenaline-user-show");
    // We use this element in order to make it persis across restarts, by using the XULStore.
    // main-window can't store attributes other than window sizes, so we use this instead
    lazy.mainAppWrapper.setAttribute("adrenaline-compact-mode", value);
    document.documentElement.setAttribute("adrenaline-compact-mode", value);
    if (typeof this._wasInCompactMode === "undefined") {
      Services.prefs.setBoolPref("adrenaline.view.compact.enable-at-startup", value);
    }
    this._updateEvent();
  },

  get sidebarIsOnRight() {
    if (typeof this._sidebarIsOnRight !== "undefined") {
      return this._sidebarIsOnRight;
    }
    this._sidebarIsOnRight = Services.prefs.getBoolPref(
      "adrenaline.tabs.vertical.right-side"
    );
    return this._sidebarIsOnRight;
  },

  get sidebar() {
    return gNavToolbox;
  },

  addHasPolyfillObserver() {
    const attributes = [
      "panelopen",
      "open",
      "breakout-extend",
      "adrenaline-floating-urlbar",
    ];
    this.sidebarObserverId = AdrenalineHasPolyfill.observeSelectorExistence(
      this.sidebar,
      [
        {
          selector:
            ":where([panelopen], [open], [breakout-extend])" +
            ":not(#urlbar[adrenaline-floating-urlbar='true']):not(tab):not(.adrenaline-compact-mode-ignore)",
        },
      ],
      "adrenaline-compact-mode-active",
      attributes
    );
    this.toolbarObserverId = AdrenalineHasPolyfill.observeSelectorExistence(
      document.getElementById("adrenaline-appcontent-navbar-wrapper"),
      [
        {
          selector:
            ":where([panelopen], [open], #urlbar:focus-within, [breakout-extend])" +
            ":not(.adrenaline-compact-mode-ignore)",
        },
      ],
      "adrenaline-compact-mode-active",
      attributes
    );
    // Always connect this observer, we need it even if compact mode is disabled
    AdrenalineHasPolyfill.connectObserver(this.toolbarObserverId);
  },

  flashSidebarIfNecessary(aInstant = false) {
    // This function is called after exiting DOM fullscreen mode,
    // so we do a bit of a hack to re-calculate the URL height
    if (aInstant) {
      gAdrenalineVerticalTabsManager.recalculateURLBarHeight(true);
    }
    if (
      !aInstant &&
      this.preference &&
      lazy.COMPACT_MODE_FLASH_ENABLED &&
      !gAdrenalineGlanceManager._animating
    ) {
      this.flashSidebar();
    }
  },

  addContextMenu() {
    const fragment = window.MozXULElement.parseXULToFragment(`
      <menu id="adrenaline-context-menu-compact-mode" data-l10n-id="adrenaline-toolbar-context-compact-mode">
        <menupopup>
          <menuitem id="adrenaline-context-menu-compact-mode-toggle" data-l10n-id="adrenaline-toolbar-context-compact-mode-enable" type="checkbox" command="cmd_adrenalineCompactModeToggle"/>
          <menuseparator/>
          <menuitem id="adrenaline-context-menu-compact-mode-hide-sidebar" data-l10n-id="adrenaline-toolbar-context-compact-mode-just-tabs" type="radio" />
          <menuitem id="adrenaline-context-menu-compact-mode-hide-toolbar" data-l10n-id="adrenaline-toolbar-context-compact-mode-just-toolbar" type="radio" />
          <menuitem id="adrenaline-context-menu-compact-mode-hide-both" data-l10n-id="adrenaline-toolbar-context-compact-mode-hide-both" type="radio" />
        </menupopup>
      </menu>
      <menuseparator />
    `);

    const idToAction = {
      "adrenaline-context-menu-compact-mode-hide-sidebar": this.hideSidebar.bind(this),
      "adrenaline-context-menu-compact-mode-hide-toolbar": this.hideToolbar.bind(this),
      "adrenaline-context-menu-compact-mode-hide-both": this.hideBoth.bind(this),
    };

    for (let menuitem of fragment.querySelectorAll("menuitem")) {
      if (menuitem.id in idToAction) {
        menuitem.addEventListener("command", idToAction[menuitem.id]);
      }
    }

    document.getElementById("toolbar-context-menu").prepend(fragment);
    this.updateContextMenu();
  },

  updateCompactModeContext(isSingleToolbar) {
    const isIllegalState = this.checkIfIllegalState();
    const menuitem = document.getElementById(
      "adrenaline-context-menu-compact-mode-toggle"
    );
    const menu = document.getElementById("adrenaline-context-menu-compact-mode");
    if (!menu) {
      return;
    }
    if (isSingleToolbar) {
      menu.setAttribute("hidden", "true");
      menu.before(menuitem);
    } else {
      menu.removeAttribute("hidden");
      menu.querySelector("menupopup").prepend(menuitem);
    }
    const hideToolbarMenuItem = document.getElementById(
      "adrenaline-context-menu-compact-mode-hide-toolbar"
    );
    if (isIllegalState) {
      hideToolbarMenuItem.setAttribute("disabled", "true");
    } else {
      hideToolbarMenuItem.removeAttribute("disabled");
    }
  },

  hideSidebar() {
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-tabbar", true);
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-toolbar", false);
    this.callAllEventListeners();
  },

  hideToolbar() {
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-toolbar", true);
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-tabbar", false);
    this.callAllEventListeners();
  },

  hideBoth() {
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-tabbar", true);
    Services.prefs.setBoolPref("adrenaline.view.compact.hide-toolbar", true);
    this.callAllEventListeners();
  },

  /**
   * Check for illegal states and fix them
   *
   * @returns {boolean} If the context menu should just show the "toggle" item
   *    instead of a submenu with hide options
   */
  checkIfIllegalState() {
    // Due to how we layout the sidebar and toolbar, there are some states
    // that are not allowed mainly due to the caption buttons not being accessible
    // at the top left/right of the window.
    const isSidebarExpanded = gAdrenalineVerticalTabsManager._prefsSidebarExpanded;
    if (isSidebarExpanded) {
      // Fast exit if the sidebar is expanded, as we dont have illegal states then
      return false;
    }
    const canHideSidebar = this.canHideSidebar;
    const canHideToolbar = this.canHideToolbar;
    const isLeftSideButtons = !gAdrenalineVerticalTabsManager.isWindowsStyledButtons;
    const isRightSidebar = gAdrenalineVerticalTabsManager._prefsRightSide;
    // on macos: collapsed + left side + only toolbar
    // on windows: collapsed + right side + only toolbar
    const closelyIllegalState =
      (isLeftSideButtons && !isRightSidebar) ||
      (!isLeftSideButtons && isRightSidebar);
    if (closelyIllegalState && canHideToolbar && !canHideSidebar) {
      // This state is illegal
      Services.prefs.setBoolPref("adrenaline.view.compact.hide-tabbar", true);
      Services.prefs.setBoolPref("adrenaline.view.compact.hide-toolbar", false);
      this.callAllEventListeners();
      return true;
    }
    return closelyIllegalState;
  },

  callAllEventListeners() {
    this._eventListeners.forEach(callback => callback());
  },

  addEventListener(callback) {
    this._eventListeners.push(callback);
  },

  removeEventListener(callback) {
    const index = this._eventListeners.indexOf(callback);
    if (index !== -1) {
      this._eventListeners.splice(index, 1);
    }
  },

  async _updateEvent() {
    const isUrlbarFocused = gURLBar.focused;
    // IF we are animating IN, call the callbacks first so we can calculate the width
    // once the window buttons are shown
    this.updateContextMenu();
    gAdrenalineWorkspaces._processingResize = true;
    if (!this.preference) {
      this.callAllEventListeners();
      await this.animateCompactMode();
    } else {
      await this.animateCompactMode();
      this.callAllEventListeners();
    }
    gAdrenalineWorkspaces._processingResize = false;
    if (isUrlbarFocused) {
      gURLBar.focus();
    }
    if (this.preference) {
      AdrenalineHasPolyfill.connectObserver(this.sidebarObserverId);
    } else {
      AdrenalineHasPolyfill.disconnectObserver(this.sidebarObserverId);
    }
    window.dispatchEvent(
      new CustomEvent("AdrenalineCompactMode:Toggled", { detail: this.preference })
    );
  },

  // NOTE: Dont actually use event, it's just so we make sure
  // the caller is from the ResizeObserver
  getAndApplySidebarWidth(event = undefined) {
    if (this._ignoreNextResize) {
      delete this._ignoreNextResize;
      return;
    }
    let sidebarWidth = this.sidebar.getBoundingClientRect().width;
    const shouldRecalculate =
      this.preference ||
      document.documentElement.hasAttribute("adrenaline-creating-workspace");
    const sidebarExpanded = document.documentElement.hasAttribute(
      "adrenaline-sidebar-expanded"
    );
    if (sidebarWidth > 1) {
      if (shouldRecalculate && sidebarExpanded) {
        sidebarWidth = Math.max(sidebarWidth, 150);
      }
      // Second variable to get the genuine width of the sidebar
      this.sidebar.style.setProperty(
        "--actual-adrenaline-sidebar-width",
        `${sidebarWidth}px`
      );
      if (!gAdrenalineWorkspaces._processingResize) {
        window.dispatchEvent(new window.Event("resize")); // To recalculate the layout
      }
      if (
        event &&
        shouldRecalculate &&
        sidebarExpanded &&
        !gAdrenalineVerticalTabsManager._hadSidebarCollapse
      ) {
        return;
      }
      delete gAdrenalineVerticalTabsManager._hadSidebarCollapse;
      this.sidebar.style.setProperty(
        "--adrenaline-sidebar-width",
        `${sidebarWidth}px`
      );
    }
    return sidebarWidth;
  },

  get canHideSidebar() {
    return (
      Services.prefs.getBoolPref("adrenaline.view.compact.hide-tabbar") ||
      gAdrenalineVerticalTabsManager._hasSetSingleToolbar
    );
  },

  get canHideToolbar() {
    return (
      Services.prefs.getBoolPref("adrenaline.view.compact.hide-toolbar") &&
      !gAdrenalineVerticalTabsManager._hasSetSingleToolbar
    );
  },

  animateCompactMode() {
    // Get the splitter width before hiding it (we need to hide it before animating on right)
    document.documentElement.setAttribute("adrenaline-compact-animating", "true");
    return new Promise(resolve => {
      // We need to set the splitter width before hiding it
      let splitterWidth = document
        .getElementById("adrenaline-sidebar-splitter")
        .getBoundingClientRect().width;
      const isCompactMode = this.preference;
      const canHideSidebar = this.canHideSidebar;
      let canAnimate =
        lazy.COMPACT_MODE_CAN_ANIMATE_SIDEBAR &&
        !this.isSidebarPotentiallyOpen();
      if (typeof this._wasInCompactMode !== "undefined") {
        canAnimate = false;
        delete this._wasInCompactMode;
      }
      // Do this so we can get the correct width ONCE compact mode styled have been applied
      if (canAnimate) {
        this.sidebar.setAttribute("animate", "true");
      }
      if (this._ignoreNextHover) {
        this._setElementExpandAttribute(this.sidebar, false);
      }
      this.sidebar.style.removeProperty("margin-right");
      this.sidebar.style.removeProperty("margin-left");
      this.sidebar.style.removeProperty("transform");
      window.requestAnimationFrame(() => {
        delete this._ignoreNextResize;
        let sidebarWidth = this.getAndApplySidebarWidth();
        const elementSeparation = AdrenalineThemeModifier.elementSeparation;
        if (!canAnimate) {
          this.sidebar.removeAttribute("animate");
          document.documentElement.removeAttribute("adrenaline-compact-animating");

          this.getAndApplySidebarWidth({});
          this._ignoreNextResize = true;

          delete this._ignoreNextHover;

          resolve();
          return;
        }
        if (document.documentElement.hasAttribute("adrenaline-sidebar-expanded")) {
          sidebarWidth -= 0.5 * splitterWidth;
          if (elementSeparation < splitterWidth) {
            // Subtract from the splitter width to end up with the correct element separation
            sidebarWidth += 1.5 * splitterWidth - elementSeparation;
          }
        } else {
          sidebarWidth -= elementSeparation;
        }
        if (canHideSidebar && isCompactMode) {
          this._setElementExpandAttribute(this.sidebar, false);
          gAdrenalineUIManager.motion
            .animate(
              this.sidebar,
              {
                marginRight: [
                  0,
                  this.sidebarIsOnRight ? `-${sidebarWidth}px` : 0,
                ],
                marginLeft: [
                  0,
                  this.sidebarIsOnRight ? 0 : `-${sidebarWidth}px`,
                ],
              },
              {
                ease: "easeIn",
                type: "spring",
                bounce: 0,
                duration: 0.12,
              }
            )
            .then(() => {
              this.sidebar.style.transition = "none";
              this.sidebar.style.pointEvents = "none";
              const titlebar = document.getElementById("titlebar");
              titlebar.style.visibility = "hidden";
              titlebar.style.transition = "none";
              this.sidebar.removeAttribute("animate");
              document.documentElement.removeAttribute("adrenaline-compact-animating");

              if (this._ignoreNextHover) {
                setTimeout(() => {
                  delete this._ignoreNextHover;
                });
              }

              this.getAndApplySidebarWidth({});
              this._ignoreNextResize = true;

              this.sidebar.style.removeProperty("margin-right");
              this.sidebar.style.removeProperty("margin-left");
              this.sidebar.style.removeProperty("transition");
              this.sidebar.style.removeProperty("transform");
              this.sidebar.style.removeProperty("point-events");

              titlebar.style.removeProperty("visibility");
              titlebar.style.removeProperty("transition");

              gURLBar.style.removeProperty("visibility");

              resolve();
            });
        } else if (canHideSidebar && !isCompactMode) {
          // Shouldn't be ever true, but just in case
          delete this._ignoreNextHover;
          document.getElementById("browser").style.overflow = "clip";
          if (this.sidebarIsOnRight) {
            this.sidebar.style.marginRight = `-${sidebarWidth}px`;
          } else {
            this.sidebar.style.marginLeft = `-${sidebarWidth}px`;
          }
          gAdrenalineUIManager.motion
            .animate(
              this.sidebar,
              this.sidebarIsOnRight
                ? {
                    marginRight: [`-${sidebarWidth}px`, 0],
                    transform: ["translateX(100%)", "translateX(0)"],
                  }
                : { marginLeft: 0 },
              {
                ease: "easeOut",
                type: "spring",
                bounce: 0,
                duration: 0.12,
              }
            )
            .then(() => {
              this.sidebar.removeAttribute("animate");
              document
                .getElementById("browser")
                .style.removeProperty("overflow");
              this.sidebar.style.transition = "none";
              this.sidebar.style.removeProperty("margin-right");
              this.sidebar.style.removeProperty("margin-left");
              this.sidebar.style.removeProperty("transform");
              document.documentElement.removeAttribute("adrenaline-compact-animating");
              setTimeout(() => {
                this.sidebar.style.removeProperty("transition");
                resolve();
              });
            });
        } else {
          this.sidebar.removeAttribute("animate"); // remove the attribute if we are not animating
          document.documentElement.removeAttribute("adrenaline-compact-animating");
          delete this._ignoreNextHover;
          resolve();
        }
      });
    });
  },

  updateContextMenu() {
    const toggle = document.getElementById(
      "adrenaline-context-menu-compact-mode-toggle"
    );
    if (!toggle) {
      return;
    }
    toggle.toggleAttribute("checked", this.preference);

    const hideTabBar = this.canHideSidebar;
    const hideToolbar = this.canHideToolbar;
    const hideBoth = hideTabBar && hideToolbar;

    const idName = "adrenaline-context-menu-compact-mode-hide-";
    const sidebarItem = document.getElementById(idName + "sidebar");
    const toolbarItem = document.getElementById(idName + "toolbar");
    const bothItem = document.getElementById(idName + "both");
    sidebarItem.toggleAttribute("checked", !hideBoth && hideTabBar);
    toolbarItem.toggleAttribute("checked", !hideBoth && hideToolbar);
    bothItem.toggleAttribute("checked", hideBoth);
  },

  _removeOpenStateOnUnifiedExtensions() {
    // Fix for bug https://github.com/adrenaline-browser/desktop/issues/1925
    const buttons = document.querySelectorAll(
      "toolbarbutton:is(#unified-extensions-button, .webextension-browser-action)"
    );
    for (let button of buttons) {
      button.removeAttribute("open");
    }
  },

  toggle(ignoreHover = false) {
    // Only ignore the next hover when we are enabling compact mode
    this._ignoreNextHover = ignoreHover && !this.preference;
    return (this.preference = !this.preference);
  },

  _updateSidebarIsOnRight() {
    this._sidebarIsOnRight = Services.prefs.getBoolPref(
      "adrenaline.tabs.vertical.right-side"
    );
  },

  toggleSidebar() {
    this.sidebar.toggleAttribute("adrenaline-user-show");
  },

  get hideAfterHoverDuration() {
    if (this._hideAfterHoverDuration) {
      return this._hideAfterHoverDuration;
    }
    return Services.prefs.getIntPref(
      "adrenaline.view.compact.toolbar-hide-after-hover.duration"
    );
  },

  get hoverableElements() {
    return [
      {
        element: this.sidebar,
        screenEdge: this.sidebarIsOnRight ? "right" : "left",
        keepHoverDuration: Services.prefs.getIntPref(
          "adrenaline.view.compact.sidebar-keep-hover.duration"
        ),
      },
      {
        element: document.getElementById("adrenaline-appcontent-navbar-wrapper"),
        screenEdge: "top",
      },
      {
        element: gAdrenalineVerticalTabsManager.actualWindowButtons,
      },
    ];
  },

  flashSidebar(duration = lazy.COMPACT_MODE_FLASH_DURATION) {
    let tabPanels = document.getElementById("tabbrowser-tabpanels");
    if (!tabPanels.matches("[adrenaline-split-view='true']")) {
      this.flashElement(this.sidebar, duration, this.sidebar.id);
    }
  },

  flashElement(element, duration, id, attrName = "flash-popup") {
    if (this._flashTimeouts[id]) {
      clearTimeout(this._flashTimeouts[id]);
    } else {
      requestAnimationFrame(() =>
        this._setElementExpandAttribute(element, true, attrName)
      );
    }
    this._flashTimeouts[id] = setTimeout(() => {
      window.requestAnimationFrame(() => {
        this._setElementExpandAttribute(element, false, attrName);
        this._flashTimeouts[id] = null;
      });
    }, duration);
  },

  clearFlashTimeout(id) {
    clearTimeout(this._flashTimeouts[id]);
    this._flashTimeouts[id] = null;
  },

  _setElementExpandAttribute(element, value, attr = "adrenaline-has-hover") {
    const kVerifiedAttributes = [
      "adrenaline-has-hover",
      "has-popup-menu",
      "adrenaline-compact-mode-active",
    ];
    const isToolbar = element.id === "adrenaline-appcontent-navbar-wrapper";
    this.log("Setting", attr, "to", value, "on element", element?.id);
    if (value) {
      if (
        attr === "adrenaline-has-hover" &&
        element !== gAdrenalineVerticalTabsManager.actualWindowButtons
      ) {
        element.setAttribute("adrenaline-has-implicit-hover", "true");
        if (!lazy.COMPACT_MODE_SHOW_SIDEBAR_AND_TOOLBAR_ON_HOVER) {
          return;
        }
      }
      element.setAttribute(attr, "true");
      if (
        isToolbar &&
        ((gAdrenalineVerticalTabsManager._hasSetSingleToolbar &&
          (element.hasAttribute("should-hide") ||
            document.documentElement.hasAttribute("adrenaline-has-bookmarks"))) ||
          (this.preference &&
            Services.prefs.getBoolPref("adrenaline.view.compact.hide-toolbar") &&
            !gAdrenalineVerticalTabsManager._hasSetSingleToolbar))
      ) {
        gBrowser.tabpanels.setAttribute("has-toolbar-hovered", "true");
      }
    } else {
      if (attr === "adrenaline-has-hover") {
        element.removeAttribute("adrenaline-has-implicit-hover");
        gURLBar.updateTextOverflow();
      }
      element.removeAttribute(attr);
      // Only remove if none of the verified attributes are present
      if (
        isToolbar &&
        !kVerifiedAttributes.some(verifiedAttr =>
          element.hasAttribute(verifiedAttr)
        )
      ) {
        gBrowser.tabpanels.removeAttribute("has-toolbar-hovered");
      }
    }
  },

  addMouseActions() {
    gURLBar.addEventListener("mouseenter", event => {
      this.log("Mouse entered URL bar:", event.target);
      if (event.target.closest("#urlbar[adrenaline-floating-urlbar]")) {
        window.requestAnimationFrame(() => {
          this._setElementExpandAttribute(
            gAdrenalineVerticalTabsManager.actualWindowButtons,
            false
          );
        });
        this._hasHoveredUrlbar = true;
      }
    });

    for (let i = 0; i < this.hoverableElements.length; i++) {
      let target = this.hoverableElements[i].element;

      // Add the attribute on startup if the mouse is already over the element
      if (target.matches(":hover")) {
        this._setElementExpandAttribute(target, true);
      }

      const onEnter = event => {
        setTimeout(() => {
          if (event.type === "mouseenter" && !event.target.matches(":hover")) {
            return;
          }
          if (event.target.closest("panel")) {
            return;
          }
          // Dont register the hover if the urlbar is floating and we are hovering over it
          this.clearFlashTimeout("has-hover" + target.id);
          window.requestAnimationFrame(() => {
            if (
              document.documentElement.getAttribute(
                "supress-primary-adjustment"
              ) === "true" ||
              this._hasHoveredUrlbar ||
              this._ignoreNextHover ||
              target.hasAttribute("adrenaline-has-hover")
            ) {
              return;
            }
            this._setElementExpandAttribute(target, true);
          });
        }, this.HOVER_HACK_DELAY);
      };

      const onLeave = event => {
        if (AppConstants.platform == "macosx") {
          const buttonRect =
            gAdrenalineVerticalTabsManager.actualWindowButtons.getBoundingClientRect();
          const MAC_WINDOW_BUTTONS_X_BORDER = buttonRect.width + buttonRect.x;
          const MAC_WINDOW_BUTTONS_Y_BORDER = buttonRect.height + buttonRect.y;
          if (
            event.clientX < MAC_WINDOW_BUTTONS_X_BORDER &&
            event.clientY < MAC_WINDOW_BUTTONS_Y_BORDER &&
            event.clientX > buttonRect.x &&
            event.clientY > buttonRect.y
          ) {
            return;
          }
        }

        // See bug https://bugzilla.mozilla.org/show_bug.cgi?id=1979340 and issue https://github.com/adrenaline-browser/desktop/issues/7746.
        // If we want the toolbars to be draggable, we need to make sure to check the hover state after a short delay.
        // This is because the mouse is left to be handled natively so firefox thinks the mouse left the window for a split second.
        setTimeout(() => {
          // Let's double check if the mouse is still hovering over the element, see the bug above.
          if (event.target.matches(":hover")) {
            return;
          }

          if (
            event.explicitOriginalTarget?.closest?.(
              "#urlbar[adrenaline-floating-urlbar]"
            ) ||
            (document.documentElement.getAttribute(
              "supress-primary-adjustment"
            ) === "true" &&
              gAdrenalineVerticalTabsManager._hasSetSingleToolbar) ||
            this._hasHoveredUrlbar ||
            this._ignoreNextHover ||
            (event.type === "dragleave" &&
              event.explicitOriginalTarget !== target &&
              target.contains?.(event.explicitOriginalTarget))
          ) {
            return;
          }

          if (this._isTabBeingDragged) {
            return;
          }

          if (this.hoverableElements[i].keepHoverDuration) {
            this.flashElement(
              target,
              this.hoverableElements[i].keepHoverDuration,
              "has-hover" + target.id,
              "adrenaline-has-hover"
            );
          } else {
            this._removeHoverFrames[target.id] = window.requestAnimationFrame(
              () => this._setElementExpandAttribute(target, false)
            );
          }
        }, this.HOVER_HACK_DELAY);
      };

      target.addEventListener("mouseover", onEnter);
      target.addEventListener("dragover", onEnter);

      target.addEventListener("mouseleave", onLeave);
      target.addEventListener("dragleave", onLeave);
    }

    document.documentElement.addEventListener("mouseleave", event => {
      setTimeout(() => {
        const screenEdgeCrossed = this._getCrossedEdge(
          event.pageX,
          event.pageY
        );
        if (!screenEdgeCrossed) {
          return;
        }
        for (let entry of this.hoverableElements) {
          if (screenEdgeCrossed !== entry.screenEdge) {
            continue;
          }
          const target = entry.element;
          const boundAxis =
            entry.screenEdge === "right" || entry.screenEdge === "left"
              ? "y"
              : "x";
          if (
            !this._positionInBounds(
              boundAxis,
              target,
              event.pageX,
              event.pageY,
              7
            )
          ) {
            continue;
          }
          window.cancelAnimationFrame(this._removeHoverFrames[target.id]);

          this.flashElement(
            target,
            this.hideAfterHoverDuration,
            "has-hover" + target.id,
            "adrenaline-has-hover"
          );
          document.addEventListener(
            "mousemove",
            () => {
              if (target.matches(":hover")) {
                return;
              }
              this._setElementExpandAttribute(target, false);
              this.clearFlashTimeout("has-hover" + target.id);
            },
            { once: true }
          );
        }
      }, this.HOVER_HACK_DELAY);
    });

    gURLBar.addEventListener("mouseleave", () => {
      setTimeout(() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            delete this._hasHoveredUrlbar;
          });
        }, 10);
      }, 0);
    });
  },

  _getCrossedEdge(
    posX,
    posY,
    element = document.documentElement,
    maxDistance = 10
  ) {
    const targetBox = element.getBoundingClientRect();
    posX = Math.max(targetBox.left, Math.min(posX, targetBox.right));
    posY = Math.max(targetBox.top, Math.min(posY, targetBox.bottom));
    return ["top", "bottom", "left", "right"].find((edge, i) => {
      const distance = Math.abs((i < 2 ? posY : posX) - targetBox[edge]);
      return distance <= maxDistance;
    });
  },

  _positionInBounds(axis = "x", element, x, y, error = 0) {
    const bBox = element.getBoundingClientRect();
    if (axis === "y") {
      return bBox.top - error < y && y < bBox.bottom + error;
    }
    return bBox.left - error < x && x < bBox.right + error;
  },

  _clearAllHoverStates() {
    // Clear hover attributes from all hoverable elements
    for (let entry of this.hoverableElements) {
      const target = entry.element;
      if (
        target &&
        !target.matches(":hover") &&
        target.hasAttribute("adrenaline-has-hover")
      ) {
        this._setElementExpandAttribute(target, false);
        this.clearFlashTimeout("has-hover" + target.id);
      }
    }
  },

  isSidebarPotentiallyOpen() {
    if (this._ignoreNextHover) {
      this._setElementExpandAttribute(this.sidebar, false);
    }
    return (
      this.sidebar.hasAttribute("adrenaline-user-show") ||
      this.sidebar.hasAttribute("adrenaline-has-hover") ||
      this.sidebar.hasAttribute("adrenaline-has-empty-tab")
    );
  },

  async _onTabOpen(tab, inBackground, beforeRouteResult = {}) {
    const isSidebarHidden = this.preference && !this.isSidebarPotentiallyOpen();

    if (
      inBackground &&
      (isSidebarHidden || beforeRouteResult.isRouteFound) &&
      this._canShowBackgroundTabToast &&
      !gAdrenalineGlanceManager._animating &&
      !this._nextTimeWillBeActive
    ) {
      let messageId = "adrenaline-background-tab-opened-toast";
      let toastOptions = {
        button: {
          id: "adrenaline-open-background-tab-button",
          command: () => {
            const targetWindow = window.parent || window;
            targetWindow.gBrowser.selectedTab = tab;
          },
        },
      };

      if (beforeRouteResult.isRouteFound) {
        messageId = "adrenaline-space-routing-tab-routed-toast";
        toastOptions = {
          l10nArgs: { targetWorkspace: beforeRouteResult.targetWorkspaceName },
        };
      }

      gAdrenalineUIManager.showToast(messageId, toastOptions);
    }
    delete this._nextTimeWillBeActive;
  },
};

document.addEventListener(
  "MozBeforeInitialXULLayout",
  () => {
    gAdrenalineCompactModeManager.preInit();
  },
  { once: true }
);
