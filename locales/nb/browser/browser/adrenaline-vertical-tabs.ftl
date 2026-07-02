# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Faner til høyre
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Kompaktmodus
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Aktiver kompaktmodus
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Skjul sidepanelet
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Skjul verktøylinjen
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Skjul begge
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Flytt til mappe...
    .accesskey = Flytt
adrenaline-toolbar-context-new-folder = 
    .label = Ny mappe
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Utvid sidepanelet
sidebar-adrenaline-create-new = 
    .label = Opprett ny...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Avlast og bytt til fane
           *[other] Avlast { $tabCount } faner og bytt til den første
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Tilbakestill og fest fane
           *[other] Tilbakestill og fest { $tabCount } faner
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Tilbake til festet nettadresse
        [adrenaline-default-pinned-cmd] Separer fra festet nettadresse
       *[other] { $tabSubtitle }
    }
