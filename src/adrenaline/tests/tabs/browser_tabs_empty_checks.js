/* Any copyright is dedicated to the Public Domain.
   https://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

add_task(async function test_Empty_Tab_Transparent() {
  const emptyTab = gAdrenalineWorkspaces._emptyTab;
  ok(emptyTab, "Empty tab should exist");
  ok(emptyTab.parentElement, "Empty tab should be in the DOM");
  ok(
    emptyTab.hasAttribute("adrenaline-empty-tab"),
    "Empty tab should have the adrenaline-empty-tab attribute"
  );
  ok(
    emptyTab.linkedBrowser.hasAttribute("transparent"),
    "Empty tab should have the transparent attribute"
  );
});

add_task(async function test_Empty_Tab_Always_First() {
  ok(
    gBrowser.tabs[0].hasAttribute("adrenaline-empty-tab"),
    "First tab should be the empty tab"
  );
  await BrowserTestUtils.withNewTab(
    {
      gBrowser,
      url: "https://example.com",
    },
    async () => {
      ok(
        gBrowser.tabs[0].hasAttribute("adrenaline-empty-tab"),
        "First tab should be the empty tab"
      );
    }
  );
});
