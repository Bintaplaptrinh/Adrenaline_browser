# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Panely napravo
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Kompaktní režim
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Povolit kompaktní režim
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Skrýt boční panel
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Skrýt panel nástrojů
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Skrýt obojí
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Přesunout do složky...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Nová složka
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Zvětšit boční panel
sidebar-adrenaline-create-new = 
    .label = Vytvořit nový...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Uspat a přepnout na panel
            [few] Uspat { $tabCount } panely a přepnout na první
           *[other] Uspat { $tabCount } panelů a přepnout na první
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Resetovat a připnout kartu
            [few] Resetovat a připnout { $tabCount } panely
           *[other] Resetovat a připnout { $tabCount } panelů
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Back to pinned url
        [adrenaline-default-pinned-cmd] Separate from pinned tab
       *[other] { $tabSubtitle }
    }
