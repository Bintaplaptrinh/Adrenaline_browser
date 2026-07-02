# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = поточний профіль
unified-extensions-description = Розширення використовуються, щоб додати більше функціональних можливостей до { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Скинути основну вкладку
           *[false] Скинути закріплену вкладку
        }
    .accesskey = Р
tab-context-adrenaline-add-essential = 
    .label = Додати до необхідного
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } комірок заповнено
tab-context-adrenaline-remove-essential = 
    .label = Вилучити з основних елементів
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Замінити основну адресу на поточну
           *[false] Замінити закріплену адресу на поточну
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Змінити мітку...
tab-context-adrenaline-edit-icon = 
    .label = Змінити значок...
adrenaline-themes-corrupted = Ваш файл модифікацій { -brand-short-name } пошкоджено. Вони були скинуті до типової теми.
adrenaline-shortcuts-corrupted = Ваш файл { -brand-short-name } комбінацій пошкоджено. Їх було скинуто до типових комбінацій.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Увімкнено новий рядок URL-адрес, що усуває потребу в нових сторінках вкладок.<br/><br/>
    Спробуйте відкрити нову вкладку, щоб побачити новий рядок URL-адреси в дії!
adrenaline-disable = Вимкнути
pictureinpicture-minimize-btn = 
    .aria-label = Згорнути
    .tooltip = Згорнути
adrenaline-panel-ui-gradient-generator-custom-color = Власний колір
adrenaline-copy-current-url-confirmation = Скопійовано поточну URL-адресу!
adrenaline-copy-current-url-as-markdown-confirmation = Скопійовано поточну URL-адресу як Markdown!
adrenaline-general-cancel-label = 
    .label = Скасувати
adrenaline-general-confirm = 
    .label = Підтвердити
adrenaline-pinned-tab-replaced = URL-адресу закріпленої вкладки замінено на поточну URL-адресу.
adrenaline-tabs-renamed = Вкладку успішно перейменовано!
adrenaline-background-tab-opened-toast = Відкрито нову фонову вкладку!
adrenaline-workspace-renamed-toast = Робочий простір успішно перейменовано!
adrenaline-split-view-limit-toast = Неможливо додати більше панелей до розділеного перегляду!
adrenaline-toggle-compact-mode-button = 
    .label = Компактний режим
    .tooltiptext = Увімк. / Вимк. компактний режим

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Дізнатися більше
adrenaline-close-label = Закрити
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Пошук...
adrenaline-icons-picker-emoji = 
    .label = Емоджі
adrenaline-icons-picker-svg = 
    .label = Значки
urlbar-search-mode-adrenaline_actions = Дії
adrenaline-site-data-settings = Налаштування
adrenaline-generic-manage = Керувати
adrenaline-generic-more = Більше
adrenaline-generic-next = Далі
adrenaline-essentials-promo-label = Додати до необхідного
adrenaline-essentials-promo-sublabel = Тримайте ваші улюблені вкладки на відстані одного клацу
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Дозволено
adrenaline-site-data-setting-block = Заблоковано
adrenaline-site-data-protections-enabled = Увімкнено
adrenaline-site-data-protections-disabled = Вимкнено
adrenaline-site-data-setting-cross-site = Міжсайтові cookie
adrenaline-site-data-security-info-extension = 
    .label = Розширення
adrenaline-site-data-security-info-secure = 
    .label = Захищено
adrenaline-site-data-security-info-not-secure = 
    .label = Не захищено
adrenaline-site-data-manage-addons = 
    .label = Керування розширеннями
adrenaline-site-data-get-addons = 
    .label = Додати розширення
adrenaline-site-data-site-settings = 
    .label = Усі налаштування сайту
adrenaline-site-data-header-share = 
    .tooltiptext = Поділитися цією сторінкою
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Увійти у режим читання
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Зробити знімок екрана
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Додати цю сторінку в закладки
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Копіювати URL-адресу
adrenaline-site-data-setting-site-protection = Захист від відстеження

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Новий дім для доповнень, дозволів тощо
adrenaline-site-data-panel-feature-callout-subtitle = Натисніть значок, щоби керувати налаштуваннями сайту, переглядати інформацію про безпеку, отримувати доступ до розширень і виконувати поширені дії.
adrenaline-open-link-in-glance = 
    .label = Відкрити посилання в передперегляді
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Оновлення завершено!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Що нового в { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Переглянути примітки до випуску
adrenaline-sidebar-notification-restart-safe-mode-label = Щось зламалося?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Перезапустити в безпечному режимі
adrenaline-window-sync-migration-dialog-title = Тримати ваші вікна синхронізованими
adrenaline-window-sync-migration-dialog-message = Adrenaline тепер синхронізує вікна на одному пристрої, тому зміни в одному вікні миттєво показуватимуться в інших.
adrenaline-window-sync-migration-dialog-learn-more = Дізнатися більше
adrenaline-window-sync-migration-dialog-accept = Зрозуміло
adrenaline-appmenu-new-blank-window = 
    .label = Нове несинхронізоване вікно
