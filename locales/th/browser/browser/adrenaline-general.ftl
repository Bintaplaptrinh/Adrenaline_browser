# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = โปรไฟล์ปัจจุบัน
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
tab-context-adrenaline-add-essential-badge = { $num } / { $max } slots filled
tab-context-adrenaline-remove-essential = 
    .label = Remove from Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Replace Essential URL with Current
           *[false] Replace Pinned URL with Current
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Change Label...
tab-context-adrenaline-edit-icon = 
    .label = Change Icon...
adrenaline-themes-corrupted = Your { -brand-short-name } mods file is corrupted. They have been reset to the default theme.
adrenaline-shortcuts-corrupted = Your { -brand-short-name } shortcuts file is corrupted. They have been reset to the default shortcuts.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    The new URL bar has been enabled, removing the need for new tab pages.<br/><br/>
    Try opening a new tab to see the new URL bar in action!
adrenaline-disable = ปิดใช้งาน
pictureinpicture-minimize-btn = 
    .aria-label = ย่อ
    .tooltip = ย่อ
adrenaline-panel-ui-gradient-generator-custom-color = เลือกสีเอง
adrenaline-copy-current-url-confirmation = คัดลอก URL ปัจจุบันแล้ว!
adrenaline-copy-current-url-as-markdown-confirmation = Copied current URL as Markdown!
adrenaline-general-cancel-label = 
    .label = ยกเลิก
adrenaline-general-confirm = 
    .label = ยืนยัน
adrenaline-pinned-tab-replaced = Pinned tab URL has been replaced with the current URL.
adrenaline-tabs-renamed = Tab has been successfully renamed!
adrenaline-background-tab-opened-toast = New background tab opened!
adrenaline-workspace-renamed-toast = Workspace has been successfully renamed!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = โหมดกะทัดรัด
    .tooltiptext = Toggle Compact Mode

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = เรียนรู้เพิ่มเติม
adrenaline-close-label = ปิด
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = ค้นหา...
adrenaline-icons-picker-emoji = 
    .label = อิโมจิ
adrenaline-icons-picker-svg = 
    .label = ไอคอน
urlbar-search-mode-adrenaline_actions = Actions
adrenaline-site-data-settings = การตั้งค่า
adrenaline-generic-manage = จัดการ
adrenaline-generic-more = เพิ่มเติม
adrenaline-generic-next = ถัดไป
adrenaline-essentials-promo-label = Add to Essentials
adrenaline-essentials-promo-sublabel = Keep your favorite tabs just a click away
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = อนุญาต
adrenaline-site-data-setting-block = ถูกบล็อก
adrenaline-site-data-protections-enabled = เปิดใช้งานอยู่
adrenaline-site-data-protections-disabled = ปิดใช้งานอยู่
adrenaline-site-data-setting-cross-site = Cross-Site cookie
adrenaline-site-data-security-info-extension = 
    .label = ส่วนขยาย
adrenaline-site-data-security-info-secure = 
    .label = ปลอดภัย
adrenaline-site-data-security-info-not-secure = 
    .label = ไม่ปลอดภัย
adrenaline-site-data-manage-addons = 
    .label = จัดการส่วนขยาย
adrenaline-site-data-get-addons = 
    .label = เพิ่มส่วนขยาย
adrenaline-site-data-site-settings = 
    .label = All Site Settings
adrenaline-site-data-header-share = 
    .tooltiptext = แชร์หน้านี้
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Enter Reader Mode
adrenaline-site-data-header-screenshot = 
    .tooltiptext = ถ่ายภาพหน้าจอ
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Bookmark This Page
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = คัดลอก URL
adrenaline-site-data-setting-site-protection = การป้องกันการติดตาม

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = A new home for add-ons, permissions, and more
adrenaline-site-data-panel-feature-callout-subtitle = Click the icon to manage site settings, view security info, access extensions, and perform common actions.
adrenaline-open-link-in-glance = 
    .label = Open Link in Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = อัปเดตเสร็จสมบูรณ์แล้ว!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = มีอะไรใหม่ใน { -brand-short-name }
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
