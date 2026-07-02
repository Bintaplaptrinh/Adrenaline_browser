# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = текущ профил
unified-extensions-description = Разширенията се използват за добавяне на допълнителна функционалност към { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Reset Essential Tab
           *[false] Reset Pinned Tab
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Добавяне към Основни
    .accesskey = E
tab-context-adrenaline-add-essential-badge = Запълнени слотове: { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Премахване от Основни
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Replace Essential URL with Current
           *[false] Replace Pinned URL with Current
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Промени етикета...
tab-context-adrenaline-edit-icon = 
    .label = Промени иконата...
adrenaline-themes-corrupted = Файлът с модификации на { -brand-short-name } е повреден. Те бяха нулирани до темата по подразбиране.
adrenaline-shortcuts-corrupted = Файлът с клавишни комбинации на { -brand-short-name } е повреден. Комбинациите бяха нулирани до настройките по подразбиране.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Новата адресна лента е активирана, което премахва нуждата от страници за нов раздел.<br/><br/>
    Опитай да отвориш нов раздел, за да видиш новата адресна лента в действие!
adrenaline-disable = Изключи
pictureinpicture-minimize-btn = 
    .aria-label = Минимизирай
    .tooltip = Минимизирай
adrenaline-panel-ui-gradient-generator-custom-color = Персонализиран цвят
adrenaline-copy-current-url-confirmation = Текущият адрес е копиран!
adrenaline-copy-current-url-as-markdown-confirmation = Copied current URL as Markdown!
adrenaline-general-cancel-label = 
    .label = Отказ
adrenaline-general-confirm = 
    .label = Потвърди
adrenaline-pinned-tab-replaced = Адресът на закачения раздел беше заменен с текущия адрес!
adrenaline-tabs-renamed = Разделът беше успешно преименуван!
adrenaline-background-tab-opened-toast = Отворен е нов раздел на заден план!
adrenaline-workspace-renamed-toast = Работното пространство беше преименувано успешно!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = Компактен изглед
    .tooltiptext = Превключи компактен режим

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Научи повече
adrenaline-close-label = Затвори
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Търси...
adrenaline-icons-picker-emoji = 
    .label = Емоджита
adrenaline-icons-picker-svg = 
    .label = Икони
urlbar-search-mode-adrenaline_actions = Действия
adrenaline-site-data-settings = Настройки
adrenaline-generic-manage = Управление
adrenaline-generic-more = Повече
adrenaline-generic-next = Напред
adrenaline-essentials-promo-label = Добави към Основни
adrenaline-essentials-promo-sublabel = Дръж любимите си раздели само на един клик разстояние
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Позволено
adrenaline-site-data-setting-block = Блокирани
adrenaline-site-data-protections-enabled = Включено
adrenaline-site-data-protections-disabled = Изключено
adrenaline-site-data-setting-cross-site = Междусайтови бисквитки
adrenaline-site-data-security-info-extension = 
    .label = Разширение
adrenaline-site-data-security-info-secure = 
    .label = Защитено
adrenaline-site-data-security-info-not-secure = 
    .label = Няма защита
adrenaline-site-data-manage-addons = 
    .label = Управление на разширения
adrenaline-site-data-get-addons = 
    .label = Добавяне на разширения
adrenaline-site-data-site-settings = 
    .label = Всички настройки за сайтове
adrenaline-site-data-header-share = 
    .tooltiptext = Сподели тази страница
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Отвори режим на четене
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Направи екранна снимка
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Добави тази страница в отметки
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Копирай адрес
adrenaline-site-data-setting-site-protection = Защита от проследяване

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Ново място за добавки, разширения и още
adrenaline-site-data-panel-feature-callout-subtitle = Натисни върху иконата, за да управляваш настройките на сайта, да видиш информацията за сигурността, да получиш достъп до разширенията и да извършваш често използвани действия.
adrenaline-open-link-in-glance = 
    .label = Отвори връзката в Glance
    .accesskey = Ж
adrenaline-sidebar-notification-updated-heading = Актуализацията е завършена!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Какво е ново в { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Виж бележките към изданието
adrenaline-sidebar-notification-restart-safe-mode-label = Има проблем?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Рестартирай в безопасен режим
adrenaline-window-sync-migration-dialog-title = Синхронизирай прозорците си
adrenaline-window-sync-migration-dialog-message = Adrenaline вече синхронизира прозорците на едно и също устройство, така че промените в един прозорец се отразяват незабавно във всички останали.
adrenaline-window-sync-migration-dialog-learn-more = Научи повече
adrenaline-window-sync-migration-dialog-accept = Добре
adrenaline-appmenu-new-blank-window = 
    .label = New blank window
