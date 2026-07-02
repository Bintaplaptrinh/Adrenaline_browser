# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Pestanyes a la dreta
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Mode compacte
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Habilita el mode compacte
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Amaga la barra lateral
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Amaga la barra d'eines
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Amaga les dues
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Mou a la carpeta...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Carpeta nova
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Expandeix la barra lateral
sidebar-adrenaline-create-new = 
    .label = Crea una nova...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Hiberna i canvia a la pestanya
           *[other] Hiberna { $tabCount } pestanyes i canvia a la primera
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Restableix i fixa la pestanya
           *[other] Restableix i fixa les { $tabCount } pestanyes
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Torna a l'URL fixat
        [adrenaline-default-pinned-cmd] Separa de la pestanya fixada
       *[other] { $tabSubtitle }
    }
