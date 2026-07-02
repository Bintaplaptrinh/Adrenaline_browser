// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
// Utility to register JSWindowActors

import { ActorManagerParent } from "resource://gre/modules/ActorManagerParent.sys.mjs";

/**
 * Fission-compatible JSProcess implementations.
 * Each actor options object takes the form of a ProcessActorOptions dictionary.
 * Detailed documentation of these options is in dom/docs/ipc/jsactors.rst,
 * available at https://firefox-source-docs.mozilla.org/dom/ipc/jsactors.html
 */
let JSPROCESSACTORS = {};

/**
 * Fission-compatible JSWindowActor implementations.
 * Detailed documentation of these options is in dom/docs/ipc/jsactors.rst,
 * available at https://firefox-source-docs.mozilla.org/dom/ipc/jsactors.html
 */
let JSWINDOWACTORS = {
  AdrenalineModsMarketplace: {
    parent: {
      esModuleURI: "resource:///actors/AdrenalineModsMarketplaceParent.sys.mjs",
    },
    child: {
      esModuleURI: "resource:///actors/AdrenalineModsMarketplaceChild.sys.mjs",
      events: {
        DOMContentLoaded: {},
      },
    },
    matches: [
      ...Services.prefs.getStringPref("adrenaline.injections.match-urls").split(","),
      "about:preferences",
    ],
  },
  AdrenalineGlance: {
    parent: {
      esModuleURI: "resource:///actors/AdrenalineGlanceParent.sys.mjs",
    },
    child: {
      esModuleURI: "resource:///actors/AdrenalineGlanceChild.sys.mjs",
      events: {
        DOMContentLoaded: {},
        mousedown: {
          capture: true,
        },
        keydown: {
          capture: true,
        },
        click: {
          capture: true,
        },
      },
    },
    allFrames: true,
    remoteTypes: ["web", "file"],
    enablePreference: "adrenaline.glance.enabled",
  },
};

if (!Services.appinfo.inSafeMode) {
  JSWINDOWACTORS.AdrenalineBoosts = {
    parent: {
      esModuleURI: "resource:///actors/AdrenalineBoostsParent.sys.mjs",
    },
    child: {
      esModuleURI: "resource:///actors/AdrenalineBoostsChild.sys.mjs",
      events: {
        // Needed to let the actor be created, please don't remove
        // without checking if boosts still work without it, thanks <3
        DOMWindowCreated: {},
      },
    },
    allFrames: true,
    remoteTypes: ["web", "file"],
    enablePreference: "adrenaline.boosts.enabled",
  };
}

export let gAdrenalineActorsManager = {
  init() {
    ActorManagerParent.addJSProcessActors(JSPROCESSACTORS);
    ActorManagerParent.addJSWindowActors(JSWINDOWACTORS);
  },
};
