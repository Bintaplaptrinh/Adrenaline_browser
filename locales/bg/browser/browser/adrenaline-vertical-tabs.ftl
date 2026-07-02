# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Tabs on the right
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Compact Mode
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Enable compact mode
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Hide sidebar
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Hide toolbar
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Hide both
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Move to Folder...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = New Folder
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Expand Sidebar
sidebar-adrenaline-create-new = 
    .label = Create New...
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
