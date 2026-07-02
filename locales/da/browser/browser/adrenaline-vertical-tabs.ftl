# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Faner til højre
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Kompakt tilstand
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Aktivér kompakt tilstand
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Skjul sidepanel
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Skjul værktøjslinje
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Skjul begge
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Move to Folder...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Ny mappe
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Udvid Sidepanel
sidebar-adrenaline-create-new = 
    .label = Opret ny...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Stop indlæsning og skift til fane
           *[other] Stop indlæsning af { $tabCount } faner og skift til den første
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Nulstil og fastgør fane
           *[other] Nulstil og fastgør { $tabCount } faner
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Back to pinned url
        [adrenaline-default-pinned-cmd] Separate from pinned tab
       *[other] { $tabSubtitle }
    }
