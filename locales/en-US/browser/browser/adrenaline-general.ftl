# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = current profile

unified-extensions-description = Extensions are used to bring more extra functionality into { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab =
    .label =
        { $isEssential ->
            [true] Reset Essential Tab
           *[false] Reset Pinned Tab
        }
    .accesskey = R
tab-context-adrenaline-add-essential =
    .label = Add to Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential =
    .label = Remove from Essentials
    .accesskey = R
tab-context-adrenaline-edit-pinned-page =
    .label =
        { $isEssential ->
            [true] Edit Essential URL
           *[false] Edit Pinned URL
        }
    .accesskey = P
tab-context-adrenaline-replace-pinned-url-with-current =
    .label = Replace with Current URL
    .accesskey = C
tab-context-adrenaline-edit-pinned-url =
    .label = Edit…
    .accesskey = E
tab-context-adrenaline-edit-title =
    .label = Change Label…
tab-context-adrenaline-edit-icon =
    .label = Change Icon…

adrenaline-themes-corrupted = Your { -brand-short-name } mods file is corrupted. They have been reset to the default theme.
adrenaline-shortcuts-corrupted = Your { -brand-short-name } shortcuts file is corrupted. They have been reset to the default shortcuts.

# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification = The new URL bar has been enabled, removing the need for new tab pages.<br/><br/>
    Try opening a new tab to see the new URL bar in action!

adrenaline-disable = Disable

pictureinpicture-minimize-btn =
  .aria-label = Minimize
  .tooltip = Minimize

adrenaline-panel-ui-gradient-generator-custom-color = Custom Color

adrenaline-copy-current-url-confirmation = Copied current URL!
adrenaline-copy-current-url-as-markdown-confirmation = Copied current URL as Markdown!

adrenaline-general-cancel-label =
    .label = Cancel
adrenaline-general-confirm =
    .label = Confirm

adrenaline-pinned-tab-replaced = Pinned tab URL has been replaced with the current URL!
adrenaline-pinned-tab-url-edited = Pinned tab URL has been updated!
adrenaline-pinned-tab-url-invalid = That doesn't look like a valid URL.
adrenaline-pinned-tab-edit-url-title = Edit Pinned URL
adrenaline-pinned-tab-edit-url-label = Enter the URL this pinned tab should point to:
adrenaline-tabs-renamed = Tab has been successfully renamed!
adrenaline-background-tab-opened-toast = New background tab opened!
adrenaline-workspace-renamed-toast = Workspace has been successfully renamed!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!

adrenaline-toggle-compact-mode-button =
    .label = Compact Mode
    .tooltiptext = Toggle Compact Mode

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Learn More

adrenaline-close-label = Close

adrenaline-singletoolbar-urlbar-placeholder-with-name =
  .placeholder = Search...

adrenaline-icons-picker-emoji =
  .label = Emojis
adrenaline-icons-picker-svg =
  .label = Icons

urlbar-search-mode-adrenaline_actions = Actions
adrenaline-site-data-settings = Settings

adrenaline-generic-manage = Manage
adrenaline-generic-more = More
adrenaline-generic-next = Next

adrenaline-essentials-promo-label = Add to Essentials
adrenaline-essentials-promo-sublabel = Keep your favorite tabs just a click away

# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Allowed
adrenaline-site-data-setting-block = Blocked
adrenaline-site-data-protections-enabled = Enabled
adrenaline-site-data-protections-disabled = Disabled
adrenaline-site-data-setting-cross-site = Cross-Site cookie
adrenaline-site-data-security-info-extension =
    .label = Extension
adrenaline-site-data-security-info-secure =
    .label = Secure
adrenaline-site-data-security-info-not-secure =
    .label = Not Secure

adrenaline-site-data-manage-addons =
    .label = Manage Extensions
adrenaline-site-data-get-addons =
    .label = Add Extensions
adrenaline-site-data-site-settings =
    .label = All Site Settings


adrenaline-site-data-header-share =
    .tooltiptext = Share This Page
adrenaline-site-data-header-reader-mode =
    .tooltiptext = Enter Reader Mode
adrenaline-site-data-header-screenshot =
    .tooltiptext = Take a Screenshot
adrenaline-site-data-header-bookmark =
    .tooltiptext = Bookmark This Page

adrenaline-urlbar-copy-url-button =
  .tooltiptext = Copy URL

adrenaline-site-data-setting-site-protection = Tracking Protection

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = A new home for add-ons, permissions, and more
adrenaline-site-data-panel-feature-callout-subtitle = Click the icon to manage site settings, view security info, access extensions, and perform common actions.

adrenaline-open-link-in-glance =
    .label = Open Link in Glance
    .accesskey = G

adrenaline-sidebar-notification-updated-heading = Update Complete!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = What's new in { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip =
    .title = View Release Notes
adrenaline-sidebar-notification-restart-safe-mode-label = Something broke?
adrenaline-sidebar-notification-restart-safe-mode-tooltip =
    .title = Restart in Safe Mode

adrenaline-window-sync-migration-dialog-title = Keep Your Windows in Sync
adrenaline-window-sync-migration-dialog-message = Adrenaline now syncs windows on the same device, so changes in one window are reflected across the others instantly.
adrenaline-window-sync-migration-dialog-learn-more = Learn More
adrenaline-window-sync-migration-dialog-accept = Got It

adrenaline-appmenu-new-blank-window =
    .label = New blank window


# [adrenaline_brow] Fixed title bar window controls
adrenaline-titlebar-cmd-minimize =
    .tooltiptext = Minimize
adrenaline-titlebar-cmd-maximize =
    .tooltiptext = Maximize
adrenaline-titlebar-cmd-close =
    .tooltiptext = Close
