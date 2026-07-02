# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = แท็บทางด้านขวา
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = โหมดกะทัดรัด
adrenaline-toolbar-context-compact-mode-enable = 
    .label = เปิดใช้โหมดกะทัดรัด
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = ซ่อนแถบด้านข้าง
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = ซ่อนแถบเครื่องมือ
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = ซ่อนทั้งคู่
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Move to Folder...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = สร้างโฟลเดอร์ใหม่
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = ขยายแถบด้านข้าง
sidebar-adrenaline-create-new = 
    .label = สร้างใหม่...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Unload and switch to tab
           *[other] Unload { $tabCount } tabs and switch to the first
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Reset and pin tab
           *[other] Reset and pin { $tabCount } tabs
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Back to pinned url
        [adrenaline-default-pinned-cmd] Separate from pinned tab
       *[other] { $tabSubtitle }
    }
