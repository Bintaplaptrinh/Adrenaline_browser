// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

document.addEventListener(
  "MozBeforeInitialXULLayout",
  () => {
    // <commandset id="mainCommandSet"> defined in browser-sets.inc
    document
      .getElementById("adrenalineCommandSet")
      // eslint-disable-next-line complexity
      .addEventListener("command", event => {
        switch (event.target.id) {
          case "cmd_adrenalineCompactModeToggle":
            gAdrenalineCompactModeManager.toggle();
            break;
          case "cmd_toggleCompactModeIgnoreHover":
            gAdrenalineCompactModeManager.toggle(true);
            break;
          case "cmd_adrenalineCompactModeShowSidebar":
            gAdrenalineCompactModeManager.toggleSidebar();
            break;
          case "cmd_adrenalineWorkspaceForward":
            gAdrenalineWorkspaces.changeWorkspaceShortcut();
            break;
          case "cmd_adrenalineWorkspaceBackward":
            gAdrenalineWorkspaces.changeWorkspaceShortcut(-1);
            break;
          case "cmd_adrenalineSplitViewGrid":
            gAdrenalineViewSplitter.toggleShortcut("grid");
            break;
          case "cmd_adrenalineSplitViewVertical":
            gAdrenalineViewSplitter.toggleShortcut("vsep");
            break;
          case "cmd_adrenalineSplitViewHorizontal":
            gAdrenalineViewSplitter.toggleShortcut("hsep");
            break;
          case "cmd_adrenalineSplitViewUnsplit":
            gAdrenalineViewSplitter.toggleShortcut("unsplit");
            break;
          case "cmd_adrenalineSplitViewContextMenu":
            gAdrenalineViewSplitter.contextSplitTabs();
            break;
          case "cmd_adrenalineCopyCurrentURLMarkdown":
            gAdrenalineCommonActions.copyCurrentURLAsMarkdownToClipboard();
            break;
          case "cmd_adrenalineCopyCurrentURL":
            gAdrenalineCommonActions.copyCurrentURLToClipboard();
            break;
          case "cmd_adrenalinePinnedTabReset":
            gAdrenalinePinnedTabManager.resetPinnedTab(gBrowser.selectedTab);
            break;
          case "cmd_adrenalinePinnedTabResetNoTab":
            gAdrenalinePinnedTabManager.resetPinnedTab();
            break;
          case "cmd_adrenalineToggleSidebar":
            gAdrenalineVerticalTabsManager.toggleExpand();
            break;
          case "cmd_adrenalineOpenAdrenalineThemePicker":
            gAdrenalineThemePicker.openThemePicker(event);
            break;
          case "cmd_adrenalineChangeWorkspaceTab":
            gAdrenalineWorkspaces.changeTabWorkspace(
              event.sourceEvent.target.getAttribute("adrenaline-workspace-id")
            );
            break;
          case "cmd_adrenalineToggleTabsOnRight":
            gAdrenalineVerticalTabsManager.toggleTabsOnRight();
            break;
          case "cmd_adrenalineSplitViewLinkInNewTab":
            gAdrenalineViewSplitter.splitLinkInNewTab();
            break;
          case "cmd_adrenalineNewEmptySplit":
            setTimeout(() => {
              gAdrenalineViewSplitter.createEmptySplit();
            }, 0);
            break;
          case "cmd_adrenalineReplacePinnedUrlWithCurrent":
            gAdrenalinePinnedTabManager.replacePinnedUrlWithCurrent();
            break;
          case "cmd_adrenalineEditPinnedUrl":
            gAdrenalinePinnedTabManager.editPinnedUrl();
            break;
          case "cmd_contextAdrenalineAddToEssentials":
            gAdrenalinePinnedTabManager.addToEssentials();
            break;
          case "cmd_contextAdrenalineRemoveFromEssentials":
            gAdrenalinePinnedTabManager.removeEssentials();
            break;
          case "cmd_adrenalineCtxDeleteWorkspace":
            gAdrenalineWorkspaces.contextDeleteWorkspace(event);
            break;
          case "cmd_adrenalineChangeWorkspaceName":
            gAdrenalineVerticalTabsManager.renameTabStart({
              target: gAdrenalineWorkspaces.activeWorkspaceIndicator.querySelector(
                ".adrenaline-current-workspace-indicator-name"
              ),
            });
            break;
          case "cmd_adrenalineChangeWorkspaceIcon":
            gAdrenalineWorkspaces.changeWorkspaceIcon();
            break;
          case "cmd_adrenalineReorderWorkspaces":
            gAdrenalineUIManager.showToast("adrenaline-workspaces-how-to-reorder-title", {
              timeout: 9000,
              descriptionId: "adrenaline-workspaces-how-to-reorder-desc",
            });
            break;
          case "cmd_adrenalineOpenWorkspaceCreation":
            gAdrenalineWorkspaces.openWorkspaceCreation(event);
            break;
          case "cmd_adrenalineOpenFolderCreation":
            gAdrenalineFolders.createFolder([], {
              renameFolder: true,
            });
            break;
          case "cmd_adrenalineTogglePinTab": {
            const currentTab = gBrowser.selectedTab;
            if (currentTab && !currentTab.hasAttribute("adrenaline-empty-tab")) {
              if (currentTab.pinned) {
                gBrowser.unpinTab(currentTab);
              } else {
                gBrowser.pinTab(currentTab);
              }
            }
            break;
          }
          case "cmd_adrenalineCloseUnpinnedTabs":
            gAdrenalineWorkspaces.closeAllUnpinnedTabs();
            break;
          case "cmd_adrenalineUnloadWorkspace": {
            gAdrenalineWorkspaces.unloadWorkspace();
            break;
          }
          case "cmd_adrenalineUnloadAllOtherWorkspace": {
            gAdrenalineWorkspaces.unloadAllOtherWorkspaces();
            break;
          }
          case "cmd_adrenalineOpenSpaceRoutingSettings": {
            gAdrenalineSpaceRoutingManager.openSpaceRoutingDialog(window);
            break;
          }
          case "cmd_adrenalineNewNavigatorUnsynced":
            OpenBrowserWindow({ adrenalineSyncedWindow: false });
            break;
          case "cmd_adrenalineNewLiveFolder": {
            const { AdrenalineLiveFoldersManager } = ChromeUtils.importESModule(
              "resource:///modules/adrenaline/AdrenalineLiveFoldersManager.sys.mjs"
            );
            AdrenalineLiveFoldersManager.handleEvent(event);
            break;
          }
          case "cmd_adrenalineDuplicateTab": {
            const selectedTabs = gBrowser.selectedTabs;
            let insertAt = selectedTabs.at(-1)._tPos + 1;
            for (const tab of selectedTabs) {
              gBrowser.duplicateTab(tab, true, { tabIndex: insertAt++ });
            }
            break;
          }
          default:
            gAdrenalineGlanceManager.handleMainCommandSet(event);
            if (event.target.id.startsWith("cmd_adrenalineWorkspaceSwitch")) {
              const index =
                parseInt(
                  event.target.id.replace("cmd_adrenalineWorkspaceSwitch", ""),
                  10
                ) - 1;
              gAdrenalineWorkspaces.shortcutSwitchTo(index);
            }
            break;
        }
      });
  },
  { once: true }
);
