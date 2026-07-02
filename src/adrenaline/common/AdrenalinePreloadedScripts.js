// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// prettier-ignore
// eslint-disable-next-line no-lone-blocks
{
  ChromeUtils.defineESModuleGetters(this, {
    gAdrenalineSpaceRoutingManager:
      "resource:///modules/adrenaline/spacerouting/AdrenalineSpaceRoutingManager.sys.mjs",
  });

  Services.scriptloader.loadSubScript("chrome://browser/content/adrenaline-components/AdrenalineSpaceBookmarksStorage.js", this);

  let scripts = [
    "chrome://browser/content/AdrenalineStartup.mjs",
    "resource:///modules/adrenaline/AdrenalineSpaceManager.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineCompactMode.mjs",
    "chrome://browser/content/AdrenalineUIManager.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineMods.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineKeyboardShortcuts.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineSessionStore.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineMediaController.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineGlanceManager.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalinePinnedTabManager.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineViewSplitter.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineFolders.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineEmojiPicker.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineLiveFoldersUI.mjs",
    "chrome://browser/content/adrenaline-components/AdrenalineDownloadAnimation.mjs",
  ];

  for (let script of scripts) {
    ChromeUtils.importESModule(script, { global: "current" });
  }

  let customAdrenalineElements = [
    ["adrenaline-folder", "chrome://browser/content/adrenaline-components/AdrenalineFolder.mjs"],
    ["adrenaline-workspace-creation", "resource:///modules/adrenaline/AdrenalineSpaceCreation.mjs"],
    ["adrenaline-workspace", "resource:///modules/adrenaline/AdrenalineSpace.mjs"],
    ["adrenaline-workspace-icons", "resource:///modules/adrenaline/AdrenalineSpaceIcons.mjs"]
  ];

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      // Only sync-import widgets once the document has loaded. If a widget is
      // used before DOMContentLoaded it will be imported and upgraded when
      // registering the customElements.setElementCreationCallback().
      for (let [tag, script] of customAdrenalineElements) {
        customElements.setElementCreationCallback(
          tag,
          function customElementCreationCallback() {
            ChromeUtils.importESModule(script, { global: "current" });
          }
        );
      }
    },
    { once: true }
  );

  Services.scriptloader.loadSubScript("chrome://browser/content/adrenaline-components/AdrenalineDragAndDrop.js", this);
}
