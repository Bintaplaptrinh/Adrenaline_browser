// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { nsAdrenalinePreloadedFeature } from "chrome://browser/content/adrenaline-components/AdrenalineCommonUtils.mjs";

class AdrenalineSessionStore extends nsAdrenalinePreloadedFeature {
  init() {
    this.#waitAndCleanup();
  }

  promiseInitialized = new Promise(resolve => {
    this._resolveInitialized = resolve;
  });

  restoreInitialTabData(tab, tabData) {
    if (tabData.adrenalineWorkspace) {
      tab.setAttribute("adrenaline-workspace-id", tabData.adrenalineWorkspace);
    }
    if (tabData.adrenalineLiveFolderItemId) {
      tab.setAttribute("adrenaline-live-folder-item-id", tabData.adrenalineLiveFolderItemId);
    }
    // Keep for now, for backward compatibility for window sync to work.
    if (tabData.adrenalineSyncId || tabData.adrenalinePinnedId) {
      tab.setAttribute("id", tabData.adrenalineSyncId || tabData.adrenalinePinnedId);
    }
    if (typeof tabData.adrenalineStaticLabel === "string") {
      tab.adrenalineStaticLabel = tabData.adrenalineStaticLabel;
    }
    if (tabData.adrenalineHasStaticIcon && tabData.image) {
      tab.adrenalineStaticIcon = tabData.image;
    }
    if (tabData.adrenalineEssential) {
      tab.setAttribute("adrenaline-essential", "true");
    }
    if (tabData.adrenalineDefaultUserContextId) {
      tab.setAttribute("adrenalineDefaultUserContextId", "true");
    }
    if (tabData._adrenalinePinnedInitialState) {
      tab._adrenalinePinnedInitialState = tabData._adrenalinePinnedInitialState;
    }
  }

  async #waitAndCleanup() {
    await SessionStore.promiseInitialized;
    this.#cleanup();
  }

  #cleanup() {
    this._resolveInitialized();
  }
}

window.gAdrenalineSessionStore = new AdrenalineSessionStore();
