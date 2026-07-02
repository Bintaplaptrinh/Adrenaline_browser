/* Any copyright is dedicated to the Public Domain.
   https://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

add_setup(async function () {});

// verify that with only one workspace, regular tabs should remain loaded
add_task(async function test_UnloadAllOtherWorkspace_oneWorkspace() {
  const workspace =
    await gAdrenalineWorkspaces.createAndSaveWorkspace("Test Workspace");
  const workspaceId = workspace.uuid;
  await gAdrenalineWorkspaces.changeWorkspace(workspace);

  const tabs = [];
  for (let i = 0; i < 3; i++) {
    const tab = await BrowserTestUtils.openNewForegroundTab(
      window.gBrowser,
      `data:text/html,<title>Hi! I am regular tab ${i}</title>`,
      true,
      { skipAnimation: true }
    );
    tabs.push(tab);
  }

  for (const tab of tabs) {
    ok(!tab.hasAttribute("pending"), "Tab should not be pending before unload");
    ok(tab.linkedPanel, "Tab should have linked panel before unload");
  }

  await gAdrenalineWorkspaces.unloadAllOtherWorkspaces();

  for (const tab of tabs) {
    ok(!tab.hasAttribute("pending"), "Tab should not be pending after unload");
    ok(tab.linkedPanel, "Tab should have linked panel after unload");
  }

  await gAdrenalineWorkspaces.removeWorkspace(workspaceId);
});

// with multiple workspaces, only regular tabs in other workspaces should be unloaded
add_task(async function test_UnloadAllOtherWorkspace_multipleWorkspaces() {
  const inactiveWorkspace =
    await gAdrenalineWorkspaces.createAndSaveWorkspace("Inactive Workspace");
  const activeWorkspace =
    await gAdrenalineWorkspaces.createAndSaveWorkspace("Active Workspace");

  const inactiveWorkspaceId = inactiveWorkspace.uuid;
  const activeWorkspaceId = activeWorkspace.uuid;

  const inactiveWorkspaceTabs = [];
  for (let i = 0; i < 2; i++) {
    const tab = await BrowserTestUtils.openNewForegroundTab(
      gBrowser,
      `data:text/html,<title>Regular Tab ${i} in Inactive</title>`,
      true,
      { skipAnimation: true }
    );
    tab.setAttribute("adrenaline-workspace-id", inactiveWorkspaceId);
    inactiveWorkspaceTabs.push(tab);
  }

  const activeWorkspaceTabs = [];
  for (let i = 0; i < 2; i++) {
    const tab = await BrowserTestUtils.openNewForegroundTab(
      gBrowser,
      `data:text/html,<title>Regular Tab ${i} in Active</title>`,
      true,
      { skipAnimation: true }
    );
    tab.setAttribute("adrenaline-workspace-id", activeWorkspaceId);
    activeWorkspaceTabs.push(tab);
  }

  await gAdrenalineWorkspaces.unloadAllOtherWorkspaces();

  for (const tab of activeWorkspaceTabs) {
    ok(
      !tab.hasAttribute("pending"),
      "Tab in active workspace should not be unloaded"
    );
    ok(tab.linkedPanel, "Tab in active workspace should have linked panel");
  }

  for (const tab of inactiveWorkspaceTabs) {
    ok(
      tab.hasAttribute("pending"),
      "Tab in inactive workspace should be unloaded"
    );
    ok(
      !tab.linkedPanel,
      "Tab in inactive workspace should not have linked panel"
    );
  }
  await gAdrenalineWorkspaces.removeWorkspace(inactiveWorkspaceId);
  await gAdrenalineWorkspaces.removeWorkspace(activeWorkspaceId);
});

// essentials in any workspace are not unloaded
add_task(async function test_UnloadAllOtherWorkspace_essentials() {
  const activeWorkspace =
    await gAdrenalineWorkspaces.createAndSaveWorkspace("Active Workspace");
  const inactiveWorkspace =
    await gAdrenalineWorkspaces.createAndSaveWorkspace("Inactive Workspace");

  const activeWorkspaceId = activeWorkspace.uuid;
  const inactiveWorkspaceId = inactiveWorkspace.uuid;

  const activeWorkspaceTabs = [];
  for (let i = 0; i < 2; i++) {
    const tab = await BrowserTestUtils.openNewForegroundTab(
      gBrowser,
      `data:text/html,<title>Essential Tab ${i} in Active</title>`,
      true,
      { skipAnimation: true }
    );
    tab.setAttribute("adrenaline-workspace-id", activeWorkspaceId);
    tab.setAttribute("adrenaline-essential", "true");
    activeWorkspaceTabs.push(tab);
  }

  const inactiveWorkspaceTabs = [];
  for (let i = 0; i < 2; i++) {
    const tab = await BrowserTestUtils.openNewForegroundTab(
      gBrowser,
      `data:text/html,<title>Essential Tab ${i} in Inactive</title>`,
      true,
      { skipAnimation: true }
    );
    gAdrenalinePinnedTabManager.addToEssentials(tab);
    inactiveWorkspaceTabs.push(tab);
  }

  await gAdrenalineWorkspaces.unloadAllOtherWorkspaces();

  for (const tab of activeWorkspaceTabs) {
    ok(
      !tab.hasAttribute("pending"),
      "Essential Tab in active workspace should not be unloaded"
    );
    ok(
      tab.linkedPanel,
      "Essential Tab in active workspace should have linked panel"
    );
  }

  for (const tab of inactiveWorkspaceTabs) {
    ok(
      !tab.hasAttribute("pending"),
      "Essential Tab in inactive workspace should not be unloaded"
    );
    ok(
      tab.linkedPanel,
      "Essential Tab in inactive workspace should have linked panel"
    );
  }
  for (const tab of inactiveWorkspaceTabs) {
    gBrowser.removeTab(tab);
  }
  await gAdrenalineWorkspaces.removeWorkspace(inactiveWorkspaceId);
  await gAdrenalineWorkspaces.removeWorkspace(activeWorkspaceId);
});
