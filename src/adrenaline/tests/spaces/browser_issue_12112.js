/* Any copyright is dedicated to the Public Domain.
   https://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

add_setup(async function () {
  await SpecialPowers.pushPrefEnv({
    set: [["adrenaline.urlbar.replace-newtab", false]],
  });
  registerCleanupFunction(async () => {
    await SpecialPowers.popPrefEnv();
  });
});

add_task(
  async function test_focuses_urlbar_on_startup_without_replace_newtab() {
    await gAdrenalineWorkspaces.promiseInitialized;
    Assert.ok(
      !gAdrenalineVerticalTabsManager._canReplaceNewTab,
      "Precondition: adrenaline.urlbar.replace-newtab is disabled"
    );

    const originalTab = gBrowser.selectedTab;
    const originalOpenLocation = window.openLocation;
    const originalTestingEnabled = gAdrenalineUIManager.testingEnabled;

    let openLocationCalls = 0;
    window.openLocation = () => {
      openLocationCalls++;
    };

    // selectStartPage() and selectEmptyTab() are both no-ops while testing mode
    // is enabled; temporarily disable it to exercise the real startup path.
    gAdrenalineUIManager.testingEnabled = false;

    // The tab the startup page leaves selected, which Adrenaline wants to replace.
    const tabToRemove = BrowserTestUtils.addTab(gBrowser, "about:blank", {
      skipAnimation: true,
    });
    gBrowser.selectedTab = tabToRemove;
    gAdrenalineWorkspaces._tabToRemoveForEmpty = tabToRemove;
    delete gAdrenalineWorkspaces._tabToSelect;
    delete gAdrenalineWorkspaces._shouldOverrideTabs;
    delete gAdrenalineWorkspaces._initialTab;

    try {
      await gAdrenalineWorkspaces.selectStartPage();

      await TestUtils.waitForCondition(
        () => openLocationCalls > 0,
        "openLocation() should be called to focus the address bar"
      );

      Assert.equal(
        openLocationCalls,
        1,
        "The address bar was focused via openLocation()"
      );
      Assert.ok(
        !gBrowser.selectedTab.hasAttribute("adrenaline-empty-tab"),
        "A fallback homepage tab is selected (no adrenaline-empty-tab attribute), so " +
          "the focus decision came from initialTabWasEmpty, not shownEmptyTab"
      );
      Assert.ok(
        !gBrowser.tabs.includes(tabToRemove),
        "The empty tab added by the startup page was removed"
      );
    } finally {
      window.openLocation = originalOpenLocation;
      gAdrenalineUIManager.testingEnabled = originalTestingEnabled;
      delete gAdrenalineWorkspaces._tabToRemoveForEmpty;

      // Remove any tab created by the startup path, then restore the original.
      for (const tab of [...gBrowser.tabs]) {
        if (tab !== originalTab && !tab.hasAttribute("adrenaline-empty-tab")) {
          BrowserTestUtils.removeTab(tab);
        }
      }
      if (!originalTab.closing) {
        gBrowser.selectedTab = originalTab;
      }
    }
  }
);
