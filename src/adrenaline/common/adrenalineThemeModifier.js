/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

/* INCLUDE THIS FILE AS:
 *   <script src="chrome://browser/content/adrenalineThemeModifier.js"></script>
 *
 * FOR ANY WEBSITE THAT WOULD NEED TO USE THE ACCENT COLOR, ETC
 */
{
  const { AppConstants } = ChromeUtils.importESModule(
    "resource://gre/modules/AppConstants.sys.mjs"
  );

  const kAdrenalineThemePrefsList = [
    "adrenaline.theme.accent-color",
    "adrenaline.theme.border-radius",
    "adrenaline.theme.content-element-separation",
  ];
  const kAdrenalineMaxElementSeparation = 12;

  /**
   * AdrenalineThemeModifier controls the application of theme data to the browser,
   * for example, it injects the accent color to the document. This is used
   * because we need a way to apply the accent color without having to worry about
   * shadow roots not inheriting the accent color.
   *
   * note: It must be a Firefox builtin page with access to the browser's configuration
   *  and services.
   */
  window.AdrenalineThemeModifier = {
    _inMainBrowserWindow: false,

    /**
     * Listen for theming updates from the LightweightThemeChild actor, and
     * begin listening to changes in preferred color scheme.
     */
    init() {
      this._inMainBrowserWindow =
        window.location.href == "chrome://browser/content/browser.xhtml";
      this.listenForEvents();
      this.updateAllThemeBasics();
    },

    listenForEvents() {
      var handleEvent = this.handleEvent.bind(this);
      // Listen for changes in the accent color and border radius
      for (let pref of kAdrenalineThemePrefsList) {
        Services.prefs.addObserver(pref, handleEvent);
      }

      // Add fullscreen listener to update the theme when going in and out of fullscreen
      const eventsForSeparation = [
        "AdrenalineViewSplitter:SplitViewDeactivated",
        "AdrenalineViewSplitter:SplitViewActivated",
        "fullscreen",
        "AdrenalineCompactMode:Toggled",
        "MozDOMFullscreen:Entered",
        "MozDOMFullscreen:Exited",
      ];
      const separationHandler = this.updateElementSeparation.bind(this);
      for (let eventName of eventsForSeparation) {
        window.addEventListener(eventName, separationHandler, {
          capture: true,
        });
      }

      window.addEventListener(
        "unload",
        () => {
          for (let pref of kAdrenalineThemePrefsList) {
            Services.prefs.removeObserver(pref, handleEvent);
          }
          for (let eventName of eventsForSeparation) {
            window.removeEventListener(eventName, separationHandler, {
              capture: true,
            });
          }
        },
        { once: true }
      );
    },

    handleEvent() {
      // note: even might be undefined, but we shoudnt use it!
      this.updateAllThemeBasics();
    },

    /**
     * Update all theme basics, like the accent color.
     */
    async updateAllThemeBasics() {
      this.updateAccentColor();
      this.updateBorderRadius();
      this.updateElementSeparation();
    },

    updateBorderRadius() {
      const borderRadius = Services.prefs.getIntPref(
        "adrenaline.theme.border-radius",
        -1
      );

      // -1 is the default value, will use platform-native values
      // otherwise, use the custom value
      if (borderRadius == -1) {
        if (AppConstants.platform == "macosx") {
          const targetRadius = window.matchMedia("(-moz-mac-tahoe-theme)")
            .matches
            ? 14
            : 10;
          document.documentElement.style.setProperty(
            "--adrenaline-border-radius",
            targetRadius + "px"
          );
        } else if (AppConstants.platform == "linux") {
          // Linux uses GTK CSD titlebar radius, default to 8px
          document.documentElement.style.setProperty(
            "--adrenaline-border-radius",
            "env(-moz-gtk-csd-titlebar-radius, 8px)"
          );
        } else {
          // Windows defaults to 8px
          document.documentElement.style.setProperty(
            "--adrenaline-border-radius",
            "8px"
          );
        }
      } else {
        // Use the overridden value
        document.documentElement.style.setProperty(
          "--adrenaline-border-radius",
          borderRadius + "px"
        );
      }
    },

    /**
     * @param {Event|undefined} event - The event that triggered the update, if any.
     *  If the event is a fullscreen change event, the element separation will be updated accordingly.
     */
    updateElementSeparation(event = undefined) {
      const kMinElementSeparation = 0.1; // in px
      let separation = this.elementSeparation;
      let domFullscreen =
        event?.type === "MozDOMFullscreen:Entered" ||
        document.documentElement.hasAttribute("inDOMFullscreen");
      if (
        document.documentElement.hasAttribute("inFullscreen") &&
        (!domFullscreen || event?.type === "MozDOMFullscreen:Exited") &&
        window.gAdrenalineCompactModeManager?.preference &&
        !document
          .getElementById("tabbrowser-tabbox")
          ?.hasAttribute("adrenaline-split-view") &&
        Services.prefs.getBoolPref("adrenaline.view.borderless-fullscreen", true)
      ) {
        separation = 0;
      }
      // In order to still use it on fullscreen, even if it's 0px, add .1px (almost invisible)
      separation = Math.max(kMinElementSeparation, separation);
      document.documentElement.style.setProperty(
        "--adrenaline-element-separation",
        separation + "px"
      );
      if (separation == kMinElementSeparation) {
        document.documentElement.setAttribute("adrenaline-no-padding", true);
      } else {
        document.documentElement.removeAttribute("adrenaline-no-padding");
      }
      if (domFullscreen) {
        const selectedBrowser = gBrowser.selectedBrowser;
        selectedBrowser.style.paddingRight = "0.5px";
        window.addEventListener(
          "MozAfterPaint",
          () => {
            selectedBrowser.style.paddingRight = "";
          },
          { once: true }
        );
      }
    },

    get elementSeparation() {
      return Math.min(
        Services.prefs.getIntPref("adrenaline.theme.content-element-separation"),
        kAdrenalineMaxElementSeparation
      );
    },

    /**
     * Update the accent color.
     */
    updateAccentColor() {
      const accentColor = Services.prefs.getStringPref(
        "adrenaline.theme.accent-color"
      );
      document.documentElement.style.setProperty(
        "--adrenaline-primary-color",
        accentColor
      );
    },
  };

  if (typeof Services !== "undefined") {
    AdrenalineThemeModifier.init();
  }
}
