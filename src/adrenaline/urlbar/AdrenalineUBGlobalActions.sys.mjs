/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { XPCOMUtils } from "resource://gre/modules/XPCOMUtils.sys.mjs";

const lazy = {};

XPCOMUtils.defineLazyPreferenceGetter(
  lazy,
  "currentTheme",
  "adrenaline.view.window.scheme",
  2
);

function isNotEmptyTab(window) {
  return !window.gBrowser.selectedTab.hasAttribute("adrenaline-empty-tab");
}

const globalActionsTemplate = [
  {
    label: "Toggle Compact Mode",
    command: "cmd_adrenalineCompactModeToggle",
    icon: "chrome://browser/skin/adrenaline-icons/sidebar.svg",
  },
  {
    label: "Open Theme Picker",
    command: "cmd_adrenalineOpenAdrenalineThemePicker",
    icon: "chrome://browser/skin/adrenaline-icons/edit-theme.svg",
  },
  {
    label: "New Split View",
    command: "cmd_adrenalineNewEmptySplit",
    icon: "chrome://browser/skin/adrenaline-icons/split.svg",
  },
  {
    label: "New Folder",
    command: "cmd_adrenalineOpenFolderCreation",
    icon: "chrome://browser/skin/adrenaline-icons/folder.svg",
  },
  {
    label: "Copy Current URL",
    command: "cmd_adrenalineCopyCurrentURL",
    icon: "chrome://browser/skin/adrenaline-icons/link.svg",
  },
  {
    label: "Settings",
    command: window => window.openPreferences(),
    icon: "chrome://browser/skin/adrenaline-icons/settings.svg",
  },
  {
    label: "Open Private Window",
    command: "Tools:PrivateBrowsing",
    icon: "chrome://browser/skin/adrenaline-icons/private-window.svg",
  },
  {
    label: "Open New Window",
    command: "cmd_newNavigator",
    icon: "chrome://browser/skin/adrenaline-icons/window.svg",
  },
  {
    label: "New Blank Window",
    command: "cmd_adrenalineNewNavigatorUnsynced",
    icon: "chrome://browser/skin/adrenaline-icons/window.svg",
  },
  {
    label: "Pin Tab",
    command: "cmd_adrenalineTogglePinTab",
    icon: "chrome://browser/skin/adrenaline-icons/pin.svg",
    isAvailable: window => {
      const tab = window.gBrowser.selectedTab;
      return !tab.hasAttribute("adrenaline-empty-tab") && !tab.pinned;
    },
  },
  {
    label: "Unpin Tab",
    command: "cmd_adrenalineTogglePinTab",
    icon: "chrome://browser/skin/adrenaline-icons/unpin.svg",
    isAvailable: window => {
      const tab = window.gBrowser.selectedTab;
      return !tab.hasAttribute("adrenaline-empty-tab") && tab.pinned;
    },
  },
  {
    label: "Open Space Routing",
    command: "cmd_adrenalineOpenSpaceRoutingSettings",
    icon: "chrome://browser/skin/adrenaline-icons/selectable/airplane.svg",
  },
  {
    label: "New Boost",
    icon: "chrome://browser/skin/adrenaline-icons/boost.svg",
    isAvailable: window => {
      if (!isNotEmptyTab(window)) {
        return false;
      }

      // Keep this action consistent with the rest of the Boosts UI.
      if (!Services.prefs.getBoolPref("adrenaline.boosts.enabled", false)) {
        return false;
      }

      const uri = window.gBrowser.currentURI;
      return !!uri?.schemeIs && (uri.schemeIs("http") || uri.schemeIs("https"));
    },
    command: window => {
      const uri = window.gBrowser.currentURI;
      if (!uri?.schemeIs || !(uri.schemeIs("http") || uri.schemeIs("https"))) {
        return;
      }

      let domain = "";
      try {
        domain = uri.host;
      } catch {
        return;
      }

      if (!domain) {
        return;
      }

      const { gAdrenalineBoostsManager } = ChromeUtils.importESModule(
        "resource:///modules/adrenaline/boosts/AdrenalineBoostsManager.sys.mjs"
      );
      const boost = gAdrenalineBoostsManager.createNewBoost(domain);
      if (!boost) {
        return;
      }
      gAdrenalineBoostsManager.openBoostWindow(window, boost, uri);
    },
  },
  {
    label: "Next Space",
    command: "cmd_adrenalineWorkspaceForward",
    icon: "chrome://browser/skin/adrenaline-icons/forward.svg",
    isAvailable: window => {
      return window.gAdrenalineWorkspaces._workspaceCache.length > 1;
    },
  },
  {
    label: "Previous Space",
    command: "cmd_adrenalineWorkspaceBackward",
    icon: "chrome://browser/skin/adrenaline-icons/back.svg",
    isAvailable: window => {
      // This also covers the case of being in private mode
      return window.gAdrenalineWorkspaces._workspaceCache.length > 1;
    },
  },
  {
    label: "Close Tab",
    command: "cmd_close",
    icon: "chrome://browser/skin/adrenaline-icons/close.svg",
    isAvailable: window => {
      return isNotEmptyTab(window);
    },
  },
  {
    label: "Reload Tab",
    command: "Browser:Reload",
    icon: "chrome://browser/skin/adrenaline-icons/reload.svg",
  },
  {
    label: "Reload Tab Without Cache",
    command: "Browser:ReloadSkipCache",
    icon: "chrome://browser/skin/adrenaline-icons/reload.svg",
  },
  {
    label: "Next Tab",
    command: "Browser:NextTab",
    icon: "chrome://browser/skin/adrenaline-icons/forward.svg",
  },
  {
    label: "Previous Tab",
    command: "Browser:PrevTab",
    icon: "chrome://browser/skin/adrenaline-icons/back.svg",
  },
  {
    label: "Capture Screenshot",
    command: "Browser:Screenshot",
    icon: "chrome://browser/skin/adrenaline-icons/screenshot.svg",
    isAvailable: window => {
      return isNotEmptyTab(window);
    },
  },
  {
    label: "Toggle Tabs on right",
    command: "cmd_adrenalineToggleTabsOnRight",
    icon: "chrome://browser/skin/adrenaline-icons/sidebars-right.svg",
  },
  {
    label: "Add to Essentials",
    command: window =>
      window.gAdrenalinePinnedTabManager.addToEssentials(window.gBrowser.selectedTab),
    isAvailable: window => {
      return (
        window.gAdrenalinePinnedTabManager.canEssentialBeAdded(
          window.gBrowser.selectedTab
        ) && !window.gBrowser.selectedTab.hasAttribute("adrenaline-essential")
      );
    },
    icon: "chrome://browser/skin/adrenaline-icons/essential-add.svg",
  },
  {
    label: "Remove from Essentials",
    command: window =>
      window.gAdrenalinePinnedTabManager.removeEssentials(window.gBrowser.selectedTab),
    isAvailable: window =>
      window.gBrowser.selectedTab.hasAttribute("adrenaline-essential"),
    icon: "chrome://browser/skin/adrenaline-icons/essential-remove.svg",
  },
  {
    label: "Find in Page",
    command: "cmd_find",
    icon: "chrome://browser/skin/adrenaline-icons/search-page.svg",
    isAvailable: window => {
      return isNotEmptyTab(window);
    },
  },
  {
    label: "Manage Extensions",
    command: "Tools:Addons",
    icon: "chrome://browser/skin/adrenaline-icons/extension.svg",
  },
  {
    label: "Switch to Automatic Appearance",
    command: () => Services.prefs.setIntPref("adrenaline.view.window.scheme", 2),
    icon: "chrome://browser/skin/adrenaline-icons/sparkles.svg",
    isAvailable: () => {
      return lazy.currentTheme !== 2;
    },
  },
  {
    label: "Switch to Light Mode",
    command: () => Services.prefs.setIntPref("adrenaline.view.window.scheme", 1),
    icon: "chrome://browser/skin/adrenaline-icons/face-sun.svg",
    isAvailable: () => {
      return lazy.currentTheme !== 1;
    },
  },
  {
    label: "Switch to Dark Mode",
    command: () => Services.prefs.setIntPref("adrenaline.view.window.scheme", 0),
    icon: "chrome://browser/skin/adrenaline-icons/moon-stars.svg",
    isAvailable: () => {
      return lazy.currentTheme !== 0;
    },
  },
  {
    label: "Print",
    command: "cmd_print",
    icon: "chrome://browser/skin/adrenaline-icons/print.svg",
    isAvailable: window => {
      return isNotEmptyTab(window);
    },
  },
];

export const globalActions = globalActionsTemplate.map(action => ({
  isAvailable: window => {
    return (
      window.document
        .getElementById(action.command)
        ?.getAttribute("disabled") !== "true"
    );
  },
  commandId:
    typeof action.command === "string"
      ? action.command
      : `adrenaline:global-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`,
  extraPayload: {},
  ...action,
}));
