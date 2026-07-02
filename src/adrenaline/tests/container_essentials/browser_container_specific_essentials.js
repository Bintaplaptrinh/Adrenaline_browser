/* Any copyright is dedicated to the Public Domain.
   https://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

add_task(async function test_Check_Creation() {
  await gAdrenalineWorkspaces.createAndSaveWorkspace(
    "Container Profile 1",
    undefined,
    false,
    1
  );
  const workspaces = gAdrenalineWorkspaces.getWorkspaces();
  Assert.strictEqual(workspaces.length, 2, "Two workspaces should exist.");

  await gAdrenalineWorkspaces.changeWorkspace(workspaces[1]);
  let newTab = BrowserTestUtils.addTab(gBrowser, "about:blank", {
    skipAnimation: true,
    userContextId: 1,
  });
  ok(newTab, "New tab should be opened.");
  gAdrenalinePinnedTabManager.addToEssentials(newTab);
  ok(
    newTab.hasAttribute("adrenaline-essential") &&
      newTab.parentNode.getAttribute("container") == "1",
    "New tab should be marked as essential."
  );
  ok(
    gBrowser.tabs.find(
      t =>
        t.hasAttribute("adrenaline-essential") && t.getAttribute("usercontextid") == 1
    ),
    "New tab should be marked as essential."
  );
  const newWorkspaceUUID = gAdrenalineWorkspaces.activeWorkspace;

  // Change to the original workspace, there should be no essential tabs
  await gAdrenalineWorkspaces.changeWorkspace(workspaces[0]);
  ok(
    !gBrowser.tabs.find(
      t =>
        t.hasAttribute("adrenaline-essential") && t.getAttribute("usercontextid") == 1
    ),
    "No essential tabs should be found in the original workspace."
  );

  await gAdrenalineWorkspaces.removeWorkspace(newWorkspaceUUID);
});
