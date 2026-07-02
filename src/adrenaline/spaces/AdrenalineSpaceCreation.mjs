/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

class nsAdrenalineWorkspaceCreation extends MozXULElement {
  #wasInCollapsedMode = false;

  promiseInitialized = new Promise(resolve => {
    this.resolveInitialized = resolve;
  });

  #hiddenElements = [];

  static get elementsToDisable() {
    return [
      "cmd_adrenalineOpenWorkspacePanel",
      "cmd_adrenalineOpenWorkspaceCreation",
      "cmd_adrenalineOpenFolderCreation",
      "cmd_adrenalineToggleSidebar",
      "cmd_newNavigatorTab",
      "cmd_newNavigatorTabNoEvent",
    ];
  }

  static get markup() {
    return `
        <vbox class="adrenaline-workspace-creation" flex="1">
          <form>
            <vbox>
              <html:h1 data-l10n-id="adrenaline-workspace-creation-header" class="adrenaline-workspace-creation-title" />
              <html:div>
                <label data-l10n-id="adrenaline-workspace-creation-label" class="adrenaline-workspace-creation-label" />
              </html:div>
            </vbox>
            <vbox class="adrenaline-workspace-creation-form">
              <hbox class="adrenaline-workspace-creation-name-wrapper">
                <toolbarbutton class="adrenaline-workspace-creation-icon-label" />
                <html:input
                  class="adrenaline-workspace-creation-name"
                  type="text"
                  data-l10n-id="adrenaline-workspace-creation-name" />
              </hbox>
              <hbox class="adrenaline-workspace-creation-profile-wrapper">
                <label class="adrenaline-workspace-creation-profile-label" data-l10n-id="adrenaline-workspace-creation-profile" />
                <button class="adrenaline-workspace-creation-profile" />
              </hbox>
              <button
                class="adrenaline-workspace-creation-edit-theme-button"
                data-l10n-id="adrenaline-workspaces-change-theme"
                command="cmd_adrenalineOpenAdrenalineThemePicker" />
              <menupopup class="adrenaline-workspace-creation-profiles-popup" />
            </vbox>
            <vbox class="adrenaline-workspace-creation-buttons">
              <html:div>
                <button class="adrenaline-workspace-creation-create-button footer-button primary"
                  data-l10n-id="adrenaline-panel-ui-workspaces-create" disabled="true" />
              </html:div>
              <button class="adrenaline-workspace-creation-cancel-button footer-button"
                data-l10n-id="adrenaline-general-cancel-label" />
            </vbox>
          </form>
        </vbox>
      `;
  }

  get workspaceId() {
    return this.getAttribute("workspace-id");
  }

  get previousWorkspaceId() {
    return this.getAttribute("previous-workspace-id");
  }

  get elementsToAnimate() {
    return [
      this.querySelector(".adrenaline-workspace-creation-title"),
      this.querySelector(".adrenaline-workspace-creation-label").parentElement,
      this.querySelector(".adrenaline-workspace-creation-name-wrapper"),
      this.querySelector(".adrenaline-workspace-creation-profile-wrapper"),
      this.querySelector(".adrenaline-workspace-creation-edit-theme-button"),
      this.createButton.parentNode,
      this.cancelButton,
    ];
  }

  connectedCallback() {
    if (this.delayConnectedCallback()) {
      // If we are not ready yet, or if we have already connected, we
      // don't need to do anything.
      return;
    }

    this.appendChild(this.constructor.fragment);
    this.initializeAttributeInheritance();

    this.inputName = this.querySelector(".adrenaline-workspace-creation-name");
    this.inputIcon = this.querySelector(".adrenaline-workspace-creation-icon-label");
    this.inputProfile = this.querySelector(".adrenaline-workspace-creation-profile");
    this.createButton = this.querySelector(
      ".adrenaline-workspace-creation-create-button"
    );
    this.cancelButton = this.querySelector(
      ".adrenaline-workspace-creation-cancel-button"
    );

    for (const element of this.elementsToAnimate) {
      element.style.opacity = 0;
    }

    this.#wasInCollapsedMode =
      document.documentElement.getAttribute("adrenaline-sidebar-expanded") !== "true";

    gNavToolbox.setAttribute("adrenaline-sidebar-expanded", "true");
    document.documentElement.setAttribute("adrenaline-sidebar-expanded", "true");

    window.docShell.treeOwner
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIAppWindow)
      .rollupAllPopups();

    this.handleAdrenalineWorkspacesChangeBind =
      this.handleAdrenalineWorkspacesChange.bind(this);

    for (const element of this.parentElement.children) {
      if (element !== this) {
        element.hidden = true;
        this.#hiddenElements.push(element);
      }
    }

    for (const element of nsAdrenalineWorkspaceCreation.elementsToDisable) {
      const el = document.getElementById(element);
      if (el) {
        el.setAttribute("disabled", "true");
      }
    }

    this.createButton.addEventListener(
      "command",
      this.onCreateButtonCommand.bind(this)
    );
    this.cancelButton.addEventListener(
      "command",
      this.onCancelButtonCommand.bind(this)
    );

    this.inputName.addEventListener("input", () => {
      this.createButton.disabled = !this.inputName.value.trim();
    });

    this.inputName.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (!this.createButton.disabled) {
          this.createButton.doCommand();
        }
      }
    });

    // Bound on the root so Esc works regardless of which child has focus
    // (name input, icon picker trigger, profile button, primary button).
    // Open popups consume Esc before it reaches us, so the emoji/profile
    // pickers still close as expected.
    this.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        this.cancelButton.doCommand();
      }
    });

    this.inputIcon.addEventListener("command", this.onIconCommand.bind(this));

    this.profilesPopup = this.querySelector(
      ".adrenaline-workspace-creation-profiles-popup"
    );

    if (gAdrenalineWorkspaces.shouldShowContainers) {
      this.inputProfile.addEventListener(
        "command",
        this.onProfileCommand.bind(this)
      );
      this.profilesPopup.addEventListener(
        "popupshowing",
        this.onProfilePopupShowing.bind(this)
      );
      this.profilesPopup.addEventListener(
        "command",
        this.onProfilePopupCommand.bind(this)
      );

      this.currentProfile = {
        id: 0,
        name: "Default",
      };
    } else {
      this.inputProfile.parentNode.hidden = true;
    }

    document.getElementById("adrenaline-sidebar-splitter").style.pointerEvents =
      "none";

    gAdrenalineUIManager.motion
      .animate(
        [gBrowser.tabContainer, gURLBar],
        {
          opacity: [1, 0],
        },
        {
          duration: 0.3,
          type: "spring",
          bounce: 0,
        }
      )
      .then(() => {
        gBrowser.tabContainer.style.visibility = "collapse";
        if (gAdrenalineVerticalTabsManager._hasSetSingleToolbar) {
          document.getElementById("nav-bar").style.visibility = "collapse";
        }
        this.style.visibility = "visible";
        gAdrenalineCompactModeManager.getAndApplySidebarWidth({});
        this.resolveInitialized();
        let animation = gAdrenalineUIManager.motion.animate(
          this.elementsToAnimate,
          {
            y: [20, 0],
            opacity: [0, 1],
            filter: ["blur(2px)", "blur(0)"],
          },
          {
            duration: 0.6,
            type: "spring",
            bounce: 0,
            delay: gAdrenalineUIManager.motion.stagger(0.05, { startDelay: 0.2 }),
          }
        );
        if (gReduceMotion) {
          animation.complete();
        }
        animation.then(() => {
          this.inputName.focus();
          gAdrenalineWorkspaces.workspaceElement(this.workspaceId).hidden = false;
        });
      });
  }

  async onCreateButtonCommand() {
    const workspace = gAdrenalineWorkspaces.getActiveWorkspace();
    workspace.name = this.inputName.value.trim();
    workspace.icon = this.inputIcon.image || this.inputIcon.label || undefined;
    workspace.containerTabId = this.currentProfile;
    await gAdrenalineWorkspaces.saveWorkspace(workspace);

    await this.#cleanup();

    gAdrenalineWorkspaces._organizeWorkspaceStripLocations(workspace, true);
    gAdrenalineWorkspaces.updateTabsContainers();

    gBrowser.tabContainer._invalidateCachedTabs();
  }

  async onCancelButtonCommand() {
    document.documentElement.removeAttribute("adrenaline-creating-workspace");
    await gAdrenalineWorkspaces.changeWorkspaceWithID(this.previousWorkspaceId);
  }

  onIconCommand(event) {
    gAdrenalineEmojiPicker.open(event.target, {
      closeOnSelect: false,
      onSelect: async icon => {
        const isSvg = icon && icon.endsWith(".svg");
        if (isSvg) {
          this.inputIcon.label = "";
          this.inputIcon.image = icon;
          this.inputIcon.setAttribute("has-svg-icon", "true");
        } else {
          this.inputIcon.image = "";
          this.inputIcon.label = icon || "";
          this.inputIcon.removeAttribute("has-svg-icon");
        }
      },
    });
  }

  set currentProfile(profile) {
    this.inputProfile.label = profile.name;
    this._profileId = profile.id;
  }

  get currentProfile() {
    return this._profileId;
  }

  onProfileCommand(event) {
    this.profilesPopup.openPopup(event.target, "after_start");
  }

  onProfilePopupShowing(event) {
    return window.createUserContextMenu(event, {
      isContextMenu: true,
      showDefaultTab: true,
    });
  }

  onProfilePopupCommand(event) {
    let userContextId = parseInt(
      event.target.getAttribute("data-usercontextid")
    );
    if (isNaN(userContextId)) {
      return;
    }
    this.currentProfile = {
      id: userContextId,
      name: event.target.label,
    };
  }

  finishSetup() {
    gAdrenalineWorkspaces.addChangeListeners(this.handleAdrenalineWorkspacesChangeBind, {
      once: true,
    });
  }

  async handleAdrenalineWorkspacesChange() {
    await gAdrenalineWorkspaces.removeWorkspace(this.workspaceId);
    await this.#cleanup();
  }

  async #cleanup() {
    if (!gReduceMotion) {
      await gAdrenalineUIManager.motion.animate(
        this.elementsToAnimate.reverse(),
        {
          y: [0, 20],
          opacity: [1, 0],
          filter: ["blur(0)", "blur(2px)"],
        },
        {
          duration: 0.4,
          type: "spring",
          bounce: 0,
          delay: gAdrenalineUIManager.motion.stagger(0.05),
        }
      );
    }

    document.getElementById("adrenaline-sidebar-splitter").style.pointerEvents = "";

    gAdrenalineWorkspaces.removeChangeListeners(this.handleAdrenalineWorkspacesChangeBind);
    for (const element of this.constructor.elementsToDisable) {
      const el = document.getElementById(element);
      if (el) {
        el.removeAttribute("disabled");
      }
    }

    if (this.#wasInCollapsedMode) {
      gNavToolbox.removeAttribute("adrenaline-sidebar-expanded");
      document.documentElement.removeAttribute("adrenaline-sidebar-expanded");
    }

    document.documentElement.removeAttribute("adrenaline-creating-workspace");

    gBrowser.tabContainer.style.visibility = "";
    gBrowser.tabContainer.style.opacity = 0;
    if (gAdrenalineVerticalTabsManager._hasSetSingleToolbar) {
      document.getElementById("nav-bar").style.visibility = "";
      gURLBar.style.opacity = 0;
    }

    this.remove();
    gAdrenalineUIManager.updateTabsToolbar();

    const workspace = gAdrenalineWorkspaces.getActiveWorkspace();
    gAdrenalineWorkspaces._organizeWorkspaceStripLocations(workspace);
    gAdrenalineWorkspaces.updateTabsContainers();

    await gAdrenalineUIManager.motion.animate(
      [gBrowser.tabContainer, gURLBar],
      {
        opacity: [0, 1],
      },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0,
      }
    );

    gBrowser.tabContainer.style.opacity = "";
    if (gAdrenalineVerticalTabsManager._hasSetSingleToolbar) {
      gURLBar.style.opacity = "";
    }

    for (const element of this.#hiddenElements) {
      element.hidden = false;
    }

    this.#hiddenElements = [];
  }
}

customElements.define("adrenaline-workspace-creation", nsAdrenalineWorkspaceCreation);
