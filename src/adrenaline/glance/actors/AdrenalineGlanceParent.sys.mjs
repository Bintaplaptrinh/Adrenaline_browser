// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* eslint-disable consistent-return */

export class AdrenalineGlanceParent extends JSWindowActorParent {
  constructor() {
    super();
  }

  async receiveMessage(message) {
    switch (message.name) {
      case "AdrenalineGlance:GetActivationMethod": {
        return Services.prefs.getStringPref(
          "adrenaline.glance.activation-method",
          "ctrl"
        );
      }
      case "AdrenalineGlance:OpenGlance": {
        this.openGlance(this.browsingContext.topChromeWindow, message.data);
        break;
      }
      case "AdrenalineGlance:CloseGlance": {
        // Explicitly allowlist fields from content; never forward
        // skipPermitUnload or other privileged flags.
        const { noAnimation, setNewID, hasFocused } = message.data ?? {};
        this.browsingContext.topChromeWindow.gAdrenalineGlanceManager.closeGlance({
          onTabClose: true,
          noAnimation: !!noAnimation,
          setNewID: typeof setNewID === "string" ? setNewID : null,
          hasFocused: !!hasFocused,
        });
        break;
      }
      case "AdrenalineGlance:RecordLinkClickData": {
        this.browsingContext.topChromeWindow.gAdrenalineGlanceManager.lastLinkClickData =
          message.data;
        break;
      }
      default:
        console.warn(`[glance]: Unknown message: ${message.name}`);
    }
  }

  openGlance(window, data) {
    return window.gAdrenalineGlanceManager.openGlance(data);
  }
}
