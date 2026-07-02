# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Pestañas a la derecha
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = Modo compacto
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Habilitar modo compacto
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Ocultar barra lateral
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Ocultar barra de herramientas
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Ocultar ambas
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = Mover a la carpeta...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Nueva carpeta
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Expandir barra lateral
sidebar-adrenaline-create-new = 
    .label = Crear nuevo...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Suspender y cambiar de pestaña
           *[other] Suspender { $tabCount } pestañas y cambiar a la primera
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Restablecer y fijar pestaña
           *[other] Restablecer y fijar { $tabCount } pestañas
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Volver a la URL fijada
        [adrenaline-default-pinned-cmd] Separar de la pestaña fijada
       *[other] { $tabSubtitle }
    }
