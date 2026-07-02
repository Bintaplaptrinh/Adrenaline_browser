/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

class nsAdrenalineWorkspaceIcons extends MozXULElement {
  #hasConnected = false;

  connectedCallback() {
    if (this.delayConnectedCallback() || this.#hasConnected) {
      return;
    }

    this.#hasConnected = true;
    window.addEventListener("AdrenalineWorkspacesUIUpdate", this, true);

    this.initDragAndDrop();
    this.addEventListener("mouseover", e => {
      if (e.shiftKey || this.isReorderMode) {
        return;
      }
      const target = e.target.closest("toolbarbutton[adrenaline-workspace-id]");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", inline: "nearest" });
      }
    });
  }

  initDragAndDrop() {
    let dragStart = 0;
    let draggedTab = null;

    this.addEventListener("mousedown", e => {
      const target = e.target.closest("toolbarbutton[adrenaline-workspace-id]");
      if (!target || e.button != 0 || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const isVertical =
        document.documentElement.getAttribute("adrenaline-sidebar-expanded") != "true";
      const clientPos = isVertical ? "clientY" : "clientX";

      this.isReorderMode = false;
      dragStart = e[clientPos];
      draggedTab = target;
      draggedTab.setAttribute("dragged", "true");

      e.stopPropagation();

      const mouseMoveHandler = moveEvent => {
        if (Math.abs(moveEvent[clientPos] - dragStart) > 5) {
          this.isReorderMode = true;
        }

        if (this.isReorderMode) {
          const tabs = [...this.children];
          const mouse = moveEvent[clientPos];

          for (const tab of tabs) {
            if (tab === draggedTab) {
              continue;
            }
            const rect = tab.getBoundingClientRect();
            if (
              mouse > rect[isVertical ? "top" : "left"] &&
              mouse < rect[isVertical ? "bottom" : "right"]
            ) {
              const nextSibling = draggedTab.nextSibling;
              if (
                mouse <
                rect[isVertical ? "top" : "left"] +
                  rect[isVertical ? "height" : "width"] / 2
              ) {
                this.insertBefore(draggedTab, tab);
              } else {
                this.insertBefore(draggedTab, tab.nextSibling);
              }
              if (nextSibling !== draggedTab.nextSibling) {
                /* eslint-disable mozilla/valid-services */
                Services.adrenaline.playHapticFeedback();
              }
            }
          }
        }
      };

      const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);

        draggedTab.removeAttribute("dragged");

        this.reorderWorkspaceToIndex(
          draggedTab,
          Array.from(this.children).indexOf(draggedTab)
        );

        draggedTab = null;
        this.isReorderMode = false;
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    });
  }

  #createWorkspaceIcon(workspace) {
    const button = document.createXULElement("toolbarbutton");
    button.setAttribute("class", "subviewbutton toolbarbutton-1");
    button.setAttribute("tooltiptext", workspace.name);
    button.setAttribute("adrenaline-workspace-id", workspace.uuid);
    button.setAttribute("context", "adrenalineWorkspaceMoreActions");
    const icon = document.createXULElement("label");
    icon.setAttribute("class", "adrenaline-workspace-icon");
    const isSvgIcon = workspace.icon && workspace.icon.endsWith(".svg");
    if (gAdrenalineWorkspaces.workspaceHasIcon(workspace)) {
      if (isSvgIcon) {
        const image = document.createElement("img");
        image.src = workspace.icon;
        image.classList.add("adrenaline-workspace-icon");
        button.appendChild(image);
      } else {
        icon.textContent = workspace.icon;
      }
    } else {
      icon.setAttribute("no-icon", true);
    }
    if (!isSvgIcon) {
      button.appendChild(icon);
    }
    button.addEventListener("command", this);
    return button;
  }

  async #updateIcons() {
    const workspaces = gAdrenalineWorkspaces.getWorkspaces();
    this.innerHTML = "";
    for (const workspace of workspaces) {
      const button = this.#createWorkspaceIcon(workspace);
      this.appendChild(button);
    }
    if (workspaces.length <= 1) {
      this.setAttribute("dont-show", "true");
    } else {
      this.removeAttribute("dont-show");
    }
    gAdrenalineWorkspaces.onWindowResize();
  }

  on_command(event) {
    const button = event.target;
    const uuid = button.getAttribute("adrenaline-workspace-id");
    if (uuid) {
      gAdrenalineWorkspaces.changeWorkspaceWithID(uuid);
    }
  }

  async on_AdrenalineWorkspacesUIUpdate(event) {
    await this.#updateIcons();
    this.activeIndex = event.detail.activeIndex;
  }

  set activeIndex(uuid) {
    const buttons = this.querySelectorAll("toolbarbutton");
    if (!buttons.length) {
      return;
    }
    let i = 0;
    let selected = -1;
    for (const button of buttons) {
      if (button.getAttribute("adrenaline-workspace-id") == uuid) {
        selected = i;
      } else {
        button.removeAttribute("active");
      }
      i++;
    }
    if (selected == -1) {
      return;
    }
    buttons[selected].setAttribute("active", true);
    buttons[selected].scrollIntoView({ behavior: "smooth", inline: "nearest" });
    this.setAttribute("selected", selected);
  }

  get activeIndex() {
    const selected = this.getAttribute("selected");
    const buttons = this.querySelectorAll("toolbarbutton");
    let i = 0;
    for (const button of buttons) {
      if (i == selected) {
        return button.getAttribute("adrenaline-workspace-id");
      }
      i++;
    }
    return null;
  }

  get isReorderMode() {
    return this.hasAttribute("reorder-mode");
  }

  set isReorderMode(value) {
    if (value) {
      this.setAttribute("reorder-mode", "true");
    } else {
      this.removeAttribute("reorder-mode");
      this.style.removeProperty("--adrenaline-workspace-icon-width");
      this.style.removeProperty("--adrenaline-workspace-icon-height");
    }
  }

  reorderWorkspaceToIndex(draggedTab, index) {
    const workspaceId = draggedTab.getAttribute("adrenaline-workspace-id");
    gAdrenalineWorkspaces.reorderWorkspace(workspaceId, index);
  }
}

customElements.define("adrenaline-workspace-icons", nsAdrenalineWorkspaceIcons);
