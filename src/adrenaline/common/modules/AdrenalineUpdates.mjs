// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import createSidebarNotification from "chrome://browser/content/adrenaline-components/AdrenalineSidebarNotification.mjs";

const ADRENALINE_UPDATE_PREF = "adrenaline.updates.last-version";
const ADRENALINE_BUILD_ID_PREF = "adrenaline.updates.last-build-id";
const ADRENALINE_UPDATE_SHOW = "adrenaline.updates.show-update-notification";

export default function checkForAdrenalineUpdates() {
  const version = Services.appinfo.version;
  const lastVersion = Services.prefs.getStringPref(ADRENALINE_UPDATE_PREF, "");
  Services.prefs.setStringPref(ADRENALINE_UPDATE_PREF, version);
  if (
    version === lastVersion ||
    gAdrenalineUIManager.testingEnabled ||
    !Services.prefs.getBoolPref(ADRENALINE_UPDATE_SHOW, true)
  ) {
    return;
  }
  const updateUrl = Services.prefs.getStringPref(
    "app.releaseNotesURL.prompt",
    ""
  );
  createSidebarNotification({
    headingL10nId: "adrenaline-sidebar-notification-updated-heading",
    links: [
      {
        url: Services.urlFormatter.formatURL(
          updateUrl.replace("%VERSION%", version)
        ),
        l10nId: "adrenaline-sidebar-notification-updated",
        special: true,
        icon: "chrome://browser/skin/adrenaline-icons/heart-circle-fill.svg",
      },
      {
        action: () => {
          Services.obs.notifyObservers(window, "restart-in-safe-mode");
        },
        l10nId: "adrenaline-sidebar-notification-restart-safe-mode",
        icon: "chrome://browser/skin/adrenaline-icons/security-broken.svg",
      },
    ],
  });
}

export async function createWindowUpdateAnimation() {
  const appID = Services.appinfo.appBuildID;
  if (
    Services.prefs.getStringPref(ADRENALINE_BUILD_ID_PREF, "") === appID ||
    gAdrenalineUIManager.testingEnabled
  ) {
    return;
  }
  Services.prefs.setStringPref(ADRENALINE_BUILD_ID_PREF, appID);
  await gAdrenalineWorkspaces.promiseInitialized;
  const appWrapper = document.getElementById("adrenaline-main-app-wrapper");
  const element = document.createElement("div");
  element.id = "adrenaline-update-animation";
  const elementBorder = document.createElement("div");
  elementBorder.id = "adrenaline-update-animation-border";
  requestIdleCallback(() => {
    if (gReduceMotion) {
      return;
    }
    appWrapper.appendChild(element);
    appWrapper.appendChild(elementBorder);
    Promise.all([
      gAdrenalineUIManager.motion.animate(
        "#adrenaline-update-animation",
        {
          top: ["100%", "-50%"],
          opacity: [0.5, 1],
        },
        {
          duration: 0.35,
        }
      ),
      gAdrenalineUIManager.motion.animate(
        "#adrenaline-update-animation-border",
        {
          "--background-top": ["150%", "-50%"],
        },
        {
          duration: 0.35,
          delay: 0.08,
        }
      ),
    ]).then(() => {
      element.remove();
      elementBorder.remove();
    });
  });
}
