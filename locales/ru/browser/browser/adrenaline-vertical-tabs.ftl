# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Вкладки справа
    .accesskey = Р
adrenaline-toolbar-context-compact-mode = 
    .label = Компактный вид
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Включить компактный вид
    .accesskey = В
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Скрыть боковую панель
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Скрыть панель инструментов
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Скрыть оба
    .accesskey = Н
adrenaline-toolbar-context-move-to-folder = 
    .label = Переместить в папку...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Новая папка
    .accesskey = Т
sidebar-adrenaline-expand = 
    .label = Развернуть боковую панель
sidebar-adrenaline-create-new = 
    .label = Создать новый...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Выгрузить и переключиться на вкладку
           *[other] Выгрузить { $tabCount } вкладки(-ок) и переключиться на первую
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Сбросить и закрепить вкладку
           *[other] Сбросить и закрепить { $tabCount } вкладки(-ок)
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Назад к закрепленному адресу
        [adrenaline-default-pinned-cmd] Отделить от закреплённой вкладки
       *[other] { $tabSubtitle }
    }
