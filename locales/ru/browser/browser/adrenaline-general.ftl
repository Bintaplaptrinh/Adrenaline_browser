# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = текущий профиль
unified-extensions-description = Расширения дополняют функционал { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Сбросить важную вкладку
           *[false] Сбросить закрепленную вкладку
        }
    .accesskey = К
tab-context-adrenaline-add-essential = 
    .label = Добавить в важное
    .accesskey = У
tab-context-adrenaline-add-essential-badge = { $num }/{ $max } мест занято
tab-context-adrenaline-remove-essential = 
    .label = Удалить из важного
    .accesskey = К
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Заменить адрес важной вкладки на текущий
           *[false] Заменить адрес закреплённой вкладки на текущий
        }
    .accesskey = С
tab-context-adrenaline-edit-title = 
    .label = Переименовать...
tab-context-adrenaline-edit-icon = 
    .label = Изменить значок...
adrenaline-themes-corrupted = Файл модов { -brand-short-name } повреждён. Тема сброшена к стандартной.
adrenaline-shortcuts-corrupted = Файл сочетаний клавиш { -brand-short-name } повреждён. Возвращены сочетания клавиш по умолчанию.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Новая адресная строка активирована, теперь нет необходимости использовать отдельные страницы для новых вкладок.<br/><br/>
    Попробуйте открыть новую вкладку, чтобы увидеть новую адресную строку в действии!
adrenaline-disable = Выключить
pictureinpicture-minimize-btn = 
    .aria-label = Свернуть
    .tooltip = Свернуть
adrenaline-panel-ui-gradient-generator-custom-color = Свой цвет
adrenaline-copy-current-url-confirmation = Адрес скопирован!
adrenaline-copy-current-url-as-markdown-confirmation = Текущий адрес скопирован как Markdown!
adrenaline-general-cancel-label = 
    .label = Отменить
adrenaline-general-confirm = 
    .label = Подтвердить
adrenaline-pinned-tab-replaced = Адрес закреплённой вкладки заменён на текущий адрес!
adrenaline-tabs-renamed = Вкладка успешно переименована!
adrenaline-background-tab-opened-toast = Открыта новая фоновая вкладка!
adrenaline-workspace-renamed-toast = Пространство успешно переименовано!
adrenaline-split-view-limit-toast = Невозможно добавить больше панелей в раздельный вид!
adrenaline-toggle-compact-mode-button = 
    .label = Компактный режим
    .tooltiptext = Переключить компактный режим

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Узнать больше
adrenaline-close-label = Закрыть
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Найти...
adrenaline-icons-picker-emoji = 
    .label = Эмодзи
adrenaline-icons-picker-svg = 
    .label = Иконки
urlbar-search-mode-adrenaline_actions = Действия
adrenaline-site-data-settings = Настройки
adrenaline-generic-manage = Изменить
adrenaline-generic-more = Ещё
adrenaline-generic-next = Далее
adrenaline-essentials-promo-label = Добавить в важное
adrenaline-essentials-promo-sublabel = Доступ к любимым вкладкам в один клик
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Разрешено
adrenaline-site-data-setting-block = Запрещено
adrenaline-site-data-protections-enabled = Включено
adrenaline-site-data-protections-disabled = Отключено
adrenaline-site-data-setting-cross-site = Межсайтовые куки
adrenaline-site-data-security-info-extension = 
    .label = Расширение
adrenaline-site-data-security-info-secure = 
    .label = Безопасно
adrenaline-site-data-security-info-not-secure = 
    .label = Небезопасно
adrenaline-site-data-manage-addons = 
    .label = Управление расширениями
adrenaline-site-data-get-addons = 
    .label = Добавить расширения
adrenaline-site-data-site-settings = 
    .label = Все настройки сайта
adrenaline-site-data-header-share = 
    .tooltiptext = Поделиться страницей
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Режим чтения
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Сделать снимок экрана
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Добавить в закладки
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Скопировать URL
adrenaline-site-data-setting-site-protection = Защита от отслеживания

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Новый дом для расширений, разрешений и всего остального
adrenaline-site-data-panel-feature-callout-subtitle = Нажмите на значок для доступа к настройкам сайта, параметрам безопасности, расширениям и прочим действиям.
adrenaline-open-link-in-glance = 
    .label = Открыть ссылку в предпросмотре
    .accesskey = П
adrenaline-sidebar-notification-updated-heading = Обновление завершено!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Что нового в { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Примечания к выпуску
adrenaline-sidebar-notification-restart-safe-mode-label = Что-то пошло не так?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Перезапустить в безопасном режиме
adrenaline-window-sync-migration-dialog-title = Синхронизируйте окна
adrenaline-window-sync-migration-dialog-message = Теперь Adrenaline синхронизирует окна на одном устройстве, поэтому изменения в одном окне будут мгновенно отображаться в других.
adrenaline-window-sync-migration-dialog-learn-more = Узнать больше
adrenaline-window-sync-migration-dialog-accept = Понятно
adrenaline-appmenu-new-blank-window = 
    .label = Новое пустое окно
