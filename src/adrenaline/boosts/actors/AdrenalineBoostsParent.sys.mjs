// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const lazy = {};

ChromeUtils.defineESModuleGetters(lazy, {
  gAdrenalineBoostsManager: "resource:///modules/adrenaline/boosts/AdrenalineBoostsManager.sys.mjs",
});

export class AdrenalineBoostsParent extends JSWindowActorParent {
  static OBSERVERS = [
    "adrenaline-boosts-update",
    "adrenaline-space-gradient-update",
    "adrenaline-boosts-disable-zap",
    "adrenaline-boosts-disable-picker",
  ];

  // Topics the content child is allowed to forward to the observer service.
  // Anything outside this set is rejected to prevent content-triggered
  // notifications on unrelated chrome observers.
  static ALLOWED_NOTIFY_TOPICS = new Set([
    "zap-state-update",
    "zap-list-update",
    "selector-picker-state-update",
    "selector-picker-picked",
  ]);

  /**
   * Creates a new AdrenalineBoostsParent actor instance and sets up an observer
   * for boost update notifications.
   */
  constructor() {
    super();

    this._observe = this.observe.bind(this);
    AdrenalineBoostsParent.OBSERVERS.forEach(observe => {
      Services.obs.addObserver(this._observe, observe);
    });
  }

  /**
   * Called when the actor is destroyed. Cleans up the observer.
   */
  didDestroy() {
    AdrenalineBoostsParent.OBSERVERS.forEach(observe => {
      Services.obs.removeObserver(this._observe, observe);
    });
  }

  /**
   * Observer callback that handles boost update notifications.
   * Sends a message to child actors when boosts are updated.
   *
   * @param {object} subject - The subject of the notification.
   * @param {string} topic - The topic of the notification.
   */
  observe(subject, topic) {
    switch (topic) {
      case "adrenaline-boosts-update":
      case "adrenaline-space-gradient-update":
        this.sendAsyncMessage("AdrenalineBoost:BoostDataUpdated", {
          unloadStyles: true,
        });
        break;
      case "adrenaline-boosts-disable-zap":
        this.sendAsyncMessage("AdrenalineBoost:DisableZapMode");
        break;
      case "adrenaline-boosts-disable-picker":
        this.sendAsyncMessage("AdrenalineBoost:DisablePickerMode");
        break;
    }
  }

  /**
   * Handles messages received from child actors.
   * Retrieves boost data for a domain when requested.
   *
   * @param {object} message - The message object containing name and data.
   * @returns {Promise<object | null>} A promise that resolves to the boost data or null.
   */
  async receiveMessage(message) {
    switch (message.name) {
      case "AdrenalineBoost:OpenInspector": {
        const { require } = ChromeUtils.importESModule(
          "resource://devtools/shared/loader/Loader.sys.mjs"
        );

        const { gDevTools } = require("devtools/client/framework/devtools");

        let win = Services.wm.getMostRecentWindow("navigator:browser");
        let tab = win.gBrowser.selectedTab;

        let toolbox = gDevTools.getToolboxForTab(tab);

        if (toolbox) {
          await gDevTools.closeToolboxForTab(tab);
        } else {
          await gDevTools.showToolboxForTab(tab, "inspector");
        }
        break;
      }
      case "AdrenalineBoost:Notify": {
        const { topic, msg } = message.data ?? {};
        if (!AdrenalineBoostsParent.ALLOWED_NOTIFY_TOPICS.has(topic)) {
          console.warn(
            `[AdrenalineBoostsParent]: Rejected notify for disallowed topic: ${topic}`
          );
          break;
        }
        Services.obs.notifyObservers(null, topic, msg);
        break;
      }
      case "AdrenalineBoost:ZapSelector": {
        const data = message.data;

        if (!data.action) {
          break;
        }
        if (!data.selector) {
          break;
        }
        if (!data.domain) {
          break;
        }

        if (data.action == "add") {
          lazy.gAdrenalineBoostsManager.addZapSelectorToActive(
            data.selector,
            data.domain
          );
        } else if (data.action == "remove") {
          lazy.gAdrenalineBoostsManager.removeZapSelectorToActive(
            data.selector,
            data.domain
          );
        } else if (data.action == "clear") {
          lazy.gAdrenalineBoostsManager.clearZapSelectorsForActive(data.domain);
        }
        break;
      }
      case "AdrenalineBoost:GetBoostForDomain": {
        const domain = message.data;
        const embedder = this.browsingContext.top.embedderElement;

        if (!embedder || !domain) {
          break;
        }

        const exists = lazy.gAdrenalineBoostsManager.registeredBoostForDomain(domain);
        if (!exists) {
          break;
        }

        const boost = lazy.gAdrenalineBoostsManager.loadActiveBoostFromStore(domain);
        let workspaceGradient = [];
        if (boost.boostEntry.boostData.autoTheme) {
          const currentWorkspace =
            await this.browsingContext.topChromeWindow.gAdrenalineWorkspaces.getActiveWorkspace();
          workspaceGradient = currentWorkspace.theme.gradientColors;
        }

        const styleData =
          await lazy.gAdrenalineBoostsManager.getStyleSheetForBoost(domain);

        return {
          ...boost,
          workspaceGradient,
          styleSheet: styleData
            ? {
                uuid: styleData.uuid,
                uri: styleData.uri.spec,
              }
            : null,
        };
      }
      default: {
        console.warn(`[AdrenalineBoostsParent]: Unknown message: ${message.name}`);
        break;
      }
    }

    return null;
  }
}
