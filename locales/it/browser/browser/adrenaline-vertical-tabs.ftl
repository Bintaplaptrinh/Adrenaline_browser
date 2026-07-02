# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Schede a destra
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Modalità compatta
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Abilita modalità compatta
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Nascondi barra laterale
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Nascondi barra degli strumenti
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Nascondi entrambi
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Move to Folder...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Nuova cartella
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Espandi barra laterale
sidebar-adrenaline-create-new = 
    .label = Crea nuova...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Scarica e passa alla scheda
           *[other] Scarica le { $tabCount } schede e passa alla prima
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Reimposta e fissa la scheda
           *[other] Reimposta e fissa le { $tabCount } schede
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Back to pinned url
        [adrenaline-default-pinned-cmd] Separate from pinned tab
       *[other] { $tabSubtitle }
    }
