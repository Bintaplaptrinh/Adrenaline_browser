# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Tabs rechts anzeigen
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Kompaktmodus
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Kompaktmodus einschalten
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Nur Seitenleiste ausblenden
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Nur Symbolleiste ausblenden
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Beides ausblenden
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = In Ordner verschieben...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Neuer Ordner
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Seitenleiste ausklappen
sidebar-adrenaline-create-new = 
    .label = Neu erstellen...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Tab entladen und wechseln
           *[other] { $tabCount } Tabs entladen und zum ersten wechseln
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Tab zurücksetzen und anheften
           *[other] { $tabCount } Tabs zurücksetzen und anheften
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Zurück zur angehefteten URL
        [adrenaline-default-pinned-cmd] Vom angehefteten Tab lösen
       *[other] { $tabSubtitle }
    }
