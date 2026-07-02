# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Karty vpravo
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Kompaktný Režim
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Povoliť kompaktný režim
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Skryť bočný panel
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Skryť panel nástrojov
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Skryť oboje
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Move to Folder...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Nový Priečinok
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Rozšíriť Bočný Panel
sidebar-adrenaline-create-new = 
    .label = Vytvoriť nové...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Uvoľniť z pamäte a prepnúť na kartu
            [few] Uvoľniť { $tabCount } karty z pamäte a prepnúť na prvú
           *[other] Uvoľniť { $tabCount } kariet z pamäte a prepnúť na prvú
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Resetovať a pripnúť kartu
            [few] Resetovať a pripnúť { $tabCount } karty
           *[other] Resetovať a pripnúť { $tabCount } kariet
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Back to pinned url
        [adrenaline-default-pinned-cmd] Separate from pinned tab
       *[other] { $tabSubtitle }
    }
