// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

const WINDOW_SCHEME_PREF = "adrenaline.view.window.scheme";
const WINDOW_SCHEME_MAPPING = {
  dark: 0,
  light: 1,
  auto: 2,
};

export class nsAdrenalineMenuBar {
  constructor() {
    window.addEventListener(
      "AdrenalineKeyboardShortcutsReady",
      () => {
        this.#init();
      },
      { once: true }
    );
  }

  #init() {
    this.#initViewMenu();
    this.#initSpacesMenu();
    this.#initAppMenu();
    this.#hideWindowRestoreMenus();
  }

  #initViewMenu() {
    let appearanceMenu = window.MozXULElement.parseXULToFragment(`
      <menu data-l10n-id="adrenaline-menubar-appearance">
        <menupopup>
          <menuitem data-l10n-id="adrenaline-menubar-appearance-description" disabled="true" />
          <menuitem data-l10n-id="adrenaline-menubar-appearance-auto" data-type="auto" type="radio" checked="true" />
          <menuitem data-l10n-id="adrenaline-menubar-appearance-light" data-type="light" type="radio" />
          <menuitem data-l10n-id="adrenaline-menubar-appearance-dark" data-type="dark" type="radio" />
        </menupopup>
      </menu>`);
    const menu = appearanceMenu.querySelector("menu");
    menu.addEventListener("command", event => {
      const type = event.target.getAttribute("data-type");
      const schemeValue = WINDOW_SCHEME_MAPPING[type];
      Services.prefs.setIntPref(WINDOW_SCHEME_PREF, schemeValue);
    });
    const viewMenu = document.getElementById("view-menu");
    const parentPopup = viewMenu.querySelector("menupopup");
    parentPopup.prepend(document.createXULElement("menuseparator"));
    parentPopup.prepend(menu);

    const sibling = document.getElementById("viewSidebarMenuMenu");
    const togglePinnedItem = window.MozXULElement.parseXULToFragment(
      '<menuitem data-l10n-id="adrenaline-menubar-toggle-pinned-tabs"' +
        ' data-l10n-args="{&quot;pinnedAreCollapsed&quot;:&quot;&quot;}" />'
    ).querySelector("menuitem");
    if (!gAdrenalineWorkspaces.privateWindowOrDisabled) {
      sibling.after(togglePinnedItem);
    }

    parentPopup.addEventListener("popupshowing", () => {
      const currentScheme = Services.prefs.getIntPref(WINDOW_SCHEME_PREF);
      for (const [type, value] of Object.entries(WINDOW_SCHEME_MAPPING)) {
        let menuItem = menu.querySelector(`menuitem[data-type="${type}"]`);
        if (value === currentScheme) {
          menuItem.setAttribute("checked", "true");
        } else {
          menuItem.removeAttribute("checked");
        }
      }
      const pinnedAreCollapsed =
        gAdrenalineWorkspaces.activeWorkspaceElement?.hasCollapsedPinnedTabs ?? false;
      const args = { pinnedAreCollapsed };
      document.l10n.setArgs(togglePinnedItem, args);
    });

    togglePinnedItem.addEventListener("command", () => {
      gAdrenalineWorkspaces.activeWorkspaceElement?.collapsiblePins.toggle();
    });
  }

  #initSpacesMenu() {
    let spacesMenubar = window.MozXULElement.parseXULToFragment(`
      <menu id="adrenaline-spaces-menubar" data-l10n-id="adrenaline-panel-ui-spaces-label">
        <menupopup>
          <menuitem data-l10n-id="adrenaline-panel-ui-workspaces-create" command="cmd_adrenalineOpenWorkspaceCreation"/>
          <menuitem data-l10n-id="adrenaline-workspaces-change-theme" command="cmd_adrenalineOpenAdrenalineThemePicker"/>
          <menuitem data-l10n-id="adrenaline-workspaces-panel-change-name" command="cmd_adrenalineChangeWorkspaceName"/>
          <menuitem data-l10n-id="adrenaline-workspaces-panel-change-icon" command="cmd_adrenalineChangeWorkspaceIcon"/>
          <menuseparator/>
          <menuitem 
            data-l10n-id="adrenaline-panel-ui-workspaces-change-forward"
            command="cmd_adrenalineWorkspaceForward"
            key="adrenaline-workspace-forward"/>
          <menuitem
            data-l10n-id="adrenaline-panel-ui-workspaces-change-back"
            command="cmd_adrenalineWorkspaceBackward"
            key="adrenaline-workspace-backward"/>
        </menupopup>
      </menu>`);
    document.getElementById("view-menu").after(spacesMenubar);
    document
      .getElementById("adrenaline-spaces-menubar")
      .addEventListener("popupshowing", () => {
        if (AppConstants.platform === "linux") {
          // On linux, there seems to be a bug where the menu freezes up and makes the browser
          // suppiciously unresponsive if we try to update the menu while it's opening.
          // See https://github.com/adrenaline-browser/desktop/issues/12024
          return;
        }
        gAdrenalineWorkspaces.updateWorkspacesChangeContextMenu();
      });
  }

  #initAppMenu() {
    const openUnsyncedWindowItem = window.MozXULElement.parseXULToFragment(
      `<toolbarbutton id="appMenu-new-adrenaline-unsynced-window-button"
                class="subviewbutton"
                data-l10n-id="adrenaline-appmenu-new-blank-window"
                key="adrenaline-new-unsynced-window"
                command="cmd_adrenalineNewNavigatorUnsynced"/>`
    ).querySelector("toolbarbutton");
    PanelMultiView.getViewNode(document, "appMenu-new-window-button2").after(
      openUnsyncedWindowItem
    );
    document.getElementById("menu_newNavigator").after(
      window.MozXULElement.parseXULToFragment(`
        <menuitem id="menu_new_adrenaline_unsynced_window"
                class="subviewbutton"
                data-l10n-id="adrenaline-menubar-new-blank-window"
                key="adrenaline-new-unsynced-window"
                command="cmd_adrenalineNewNavigatorUnsynced"/>`)
    );
  }

  #hideWindowRestoreMenus() {
    if (!Services.prefs.getBoolPref("adrenaline.window-sync.enabled", true)) {
      return;
    }
    const itemsToHide = [
      "appMenuRecentlyClosedWindows",
      "historyUndoWindowMenu",
    ];
    for (const id of itemsToHide) {
      const element = PanelMultiView.getViewNode(document, id);
      element.setAttribute("hidden", "true");
    }
  }
}
