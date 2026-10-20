// This Source Code Form is subject to the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { AdrenalineDebUpdater } from "resource:///modules/AdrenalineDebUpdater.sys.mjs";
import { DEB_RELEASES_URL } from "resource:///modules/AdrenalineDebRelease.mjs";
import { PrivateBrowsingUtils } from "resource://gre/modules/PrivateBrowsingUtils.sys.mjs";

const TOPIC = "adrenaline-deb-update-state";

/** Start one process-wide poller and expose available releases in browser UI. */
export function startDebianUpdateChecks(window) {
  if (
    !AdrenalineDebUpdater.isDebPackage ||
    PrivateBrowsingUtils.isWindowPrivate(window) ||
    window.gAdrenalineUIManager?.testingEnabled ||
    Services.env.get("MOZ_HEADLESS")
  ) {
    return;
  }
  let notifiedBuild = null;
  const notify = async () => {
    const update = AdrenalineDebUpdater.update;
    if (
      AdrenalineDebUpdater.state !== "available" ||
      !update ||
      notifiedBuild === update.build_id
    ) {
      return;
    }
    notifiedBuild = update.build_id;
    const label = await window.document.l10n.formatValue(
      "adrenaline-deb-update-open",
    );
    if (window.closed) {
      return;
    }
    const box = window.gNotificationBox;
    await box.appendNotification(
      "adrenaline-deb-update",
      {
        label: {
          "l10n-id": "adrenaline-deb-update-available",
          "l10n-args": { version: update.version },
        },
        priority: box.PRIORITY_INFO_MEDIUM,
      },
      [
        {
          label,
          callback: () => {
            window.openAboutDialog();
          },
        },
      ],
    );
  };
  const observer = () => notify().catch(console.error);
  Services.obs.addObserver(observer, TOPIC);
  window.addEventListener(
    "unload",
    () => Services.obs.removeObserver(observer, TOPIC),
    { once: true },
  );
  AdrenalineDebUpdater.start();
  observer();
}

/** Replace the MAR controls in About with Debian release/update controls. */
export async function initDebianAboutDialog(window) {
  const { document } = window;
  const installed = await AdrenalineDebUpdater.installedPackage();
  if (!installed || window.closed) {
    return;
  }
  document.l10n.addResourceIds(["browser/adrenaline-general.ftl"]);
  for (const id of ["updateDeck", "updateIcon", "currentChannelText"]) {
    const element = document.getElementById(id);
    if (element) {
      element.hidden = true;
    }
  }
  const container = document.createXULElement("vbox");
  container.id = "adrenaline-deb-updates";
  const status = document.createXULElement("description");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const check = document.createXULElement("button");
  document.l10n.setAttributes(check, "adrenaline-deb-update-check");
  const install = document.createXULElement("button");
  const automatic = document.createXULElement("checkbox");
  document.l10n.setAttributes(automatic, "adrenaline-deb-update-automatic");
  automatic.checked = AdrenalineDebUpdater.enabled;
  automatic.addEventListener("command", () => {
    Services.prefs.setBoolPref(
      "adrenaline.deb.updates.enabled",
      automatic.checked,
    );
    if (automatic.checked) {
      AdrenalineDebUpdater.start();
      AdrenalineDebUpdater.check(true).catch(console.error);
    }
    render();
  });
  const releases = document.createXULElement("label", { is: "text-link" });
  releases.href = DEB_RELEASES_URL;
  document.l10n.setAttributes(releases, "adrenaline-deb-update-releases");
  container.append(status, check, install, automatic, releases);
  (
    document.getElementById("updateInfo") ||
    document.getElementById("updateBox")
  ).prepend(container);

  const render = () => {
    const { state, update, progress, enabled } = AdrenalineDebUpdater;
    const busy = [
      "checking",
      "downloading",
      "verifying",
      "installing",
    ].includes(state);
    document.l10n.setAttributes(
      status,
      `adrenaline-deb-update-${enabled ? state : "disabled"}`,
      {
        version: update?.version || installed.version,
        progress,
      },
    );
    check.disabled = busy || !enabled || state === "installed";
    automatic.disabled = busy || state === "installed";
    install.hidden = !update && state !== "installed";
    install.disabled = busy || (!enabled && state !== "installed");
    document.l10n.setAttributes(
      install,
      state === "installed"
        ? "adrenaline-deb-update-restart"
        : "adrenaline-deb-update-install",
    );
  };
  check.addEventListener("command", () =>
    AdrenalineDebUpdater.check(true).catch(console.error),
  );
  install.addEventListener("command", () => {
    if (AdrenalineDebUpdater.state === "installed") {
      const cancelled = Cc["@mozilla.org/supports-PRBool;1"].createInstance(
        Ci.nsISupportsPRBool,
      );
      Services.obs.notifyObservers(
        cancelled,
        "quit-application-requested",
        "restart",
      );
      if (!cancelled.data) {
        Services.startup.quit(
          Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart,
        );
      }
      return;
    }
    AdrenalineDebUpdater.downloadAndInstall().catch(console.error);
  });
  Services.obs.addObserver(render, TOPIC);
  window.addEventListener(
    "unload",
    () => Services.obs.removeObserver(render, TOPIC),
    { once: true },
  );
  render();
  window.sizeToContent();
  if (AdrenalineDebUpdater.enabled) {
    await AdrenalineDebUpdater.check(true).catch(console.error);
  }
  window.sizeToContent();
}
