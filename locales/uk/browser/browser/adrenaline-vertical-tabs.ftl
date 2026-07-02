# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = Вкладки праворуч
    .accesskey = Р
adrenaline-toolbar-context-compact-mode = 
    .label = Компактний режим
adrenaline-toolbar-context-compact-mode-enable = 
    .label = Увімкнути компактний режим
    .accesskey = Ре
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = Приховати бічну панель
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = Приховати панель інструментів
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = Приховувати обидві
    .accesskey = Н
adrenaline-toolbar-context-move-to-folder = 
    .label = Перемістити до теки...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = Нова тека
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = Розгорнути бічну панель
sidebar-adrenaline-create-new = 
    .label = Створити новий...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Вивантажити й перемкнутися на вкладку
            [few] Вивантажити { $tabCount } вкладки й перемкнутися до першої
           *[other] Вивантажити { $tabCount } вкладок й перемкнутися до першої
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] Скинути та закріпити вкладку
            [few] Скинути та закріпити { $tabCount } вкладки
           *[other] Скинути та закріпити { $tabCount } вкладок
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] Назад до закріпленої URL-адреси
        [adrenaline-default-pinned-cmd] Відокремити від закріпленої вкладки
       *[other] { $tabSubtitle }
    }
