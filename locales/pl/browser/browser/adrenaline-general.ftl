# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = aktualny profil
unified-extensions-description = Rozszerzenia są używane, aby zapewnić dodatkową funkcjonalność w { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Zresetuj niezbędną kartę
           *[false] Zresetuj przypiętą kartę
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Dodaj do niezbędnych
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Usuń z niezbędnych
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Zastąp adres URL niezbędnej karty bieżącym
           *[false] Zastąp adres URL przypiętej karty bieżącym
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Zmień nazwę...
tab-context-adrenaline-edit-icon = 
    .label = Zmień ikonę...
adrenaline-themes-corrupted = Twój plik modyfikacji { -brand-short-name } jest uszkodzony. Został on zresetowany do domyślnego stanu.
adrenaline-shortcuts-corrupted = Twój plik skrótów { -brand-short-name } jest uszkodzony. Został on zresetowany do domyślnego stanu.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Włączono nowy pasek adresu URL, dzięki czemu nie ma już potrzeby korzystania ze strony nowej karty.<br/><br/>
    Spróbuj otworzyć nową kartę, aby zobaczyć, jak działa nowy pasek adresu URL!
adrenaline-disable = Deaktywuj
pictureinpicture-minimize-btn = 
    .aria-label = Zminimalizuj
    .tooltip = Zminimalizuj
adrenaline-panel-ui-gradient-generator-custom-color = Niestandardowy kolor
adrenaline-copy-current-url-confirmation = Skopiowano bieżący URL!
adrenaline-copy-current-url-as-markdown-confirmation = Skopiowano bieżący adres URL jako Markdown!
adrenaline-general-cancel-label = 
    .label = Anuluj
adrenaline-general-confirm = 
    .label = Potwierdź
adrenaline-pinned-tab-replaced = URL przypiętej karty został zastąpiony bieżącym adresem!
adrenaline-tabs-renamed = Nazwa karty została pomyślnie zmieniona!
adrenaline-background-tab-opened-toast = Nowa karta została otworzona w tle!
adrenaline-workspace-renamed-toast = Zmieniono nazwę przestrzeni roboczej!
adrenaline-split-view-limit-toast = Nie można dodać kolejnych paneli do widoku podzielonego!
adrenaline-toggle-compact-mode-button = 
    .label = Tryb kompaktowy
    .tooltiptext = Przełącz tryb kompaktowy

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Dowiedz się więcej
adrenaline-close-label = Zamknij
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Szukaj...
adrenaline-icons-picker-emoji = 
    .label = Emotikony
adrenaline-icons-picker-svg = 
    .label = Ikony
urlbar-search-mode-adrenaline_actions = Akcje
adrenaline-site-data-settings = Ustawienia
adrenaline-generic-manage = Zarządzaj
adrenaline-generic-more = Więcej
adrenaline-generic-next = Następne
adrenaline-essentials-promo-label = Dodaj do niezbędnych
adrenaline-essentials-promo-sublabel = Utrzymuj swoje ulubione karty w zasięgu myszki
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Dozwolone
adrenaline-site-data-setting-block = Zablokowane
adrenaline-site-data-protections-enabled = Włączone
adrenaline-site-data-protections-disabled = Wyłączone
adrenaline-site-data-setting-cross-site = Pliki cookie między witrynami
adrenaline-site-data-security-info-extension = 
    .label = Rozszerzenie
adrenaline-site-data-security-info-secure = 
    .label = Zabezpieczone
adrenaline-site-data-security-info-not-secure = 
    .label = Niezabezpieczone
adrenaline-site-data-manage-addons = 
    .label = Zarządzaj rozszerzeniami
adrenaline-site-data-get-addons = 
    .label = Dodaj rozszerzenia
adrenaline-site-data-site-settings = 
    .label = Wszystkie ustawienia strony
adrenaline-site-data-header-share = 
    .tooltiptext = Udostępnij tę stronę
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Przejdź do trybu czytania
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Zrzut ekranu
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Dodaj tę stronę do zakładek
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopiuj URL
adrenaline-site-data-setting-site-protection = Ochrona przed śledzeniem

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Nowy dom dla dodatków, uprawnień i więcej
adrenaline-site-data-panel-feature-callout-subtitle = Kliknij ikonę, aby zarządzać ustawieniami witryny, wyświetlić informacje o zabezpieczeniach, rozszerzeniach i wykonać akcje.
adrenaline-open-link-in-glance = 
    .label = Otwórz link w szybkim podglądzie
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Aktualizacja ukończona!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Co nowego w { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Zobacz informacje o aktualizacji
adrenaline-sidebar-notification-restart-safe-mode-label = Coś się zepsuło?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Zrestartuj w trybie bezpiecznym
adrenaline-window-sync-migration-dialog-title = Utrzymuj synchronizację okien
adrenaline-window-sync-migration-dialog-message = Adrenaline synchronizuje teraz okna na tym samym urządzeniu, dzięki czemu zmiany wprowadzone w jednym oknie są natychmiast odzwierciedlane w pozostałych.
adrenaline-window-sync-migration-dialog-learn-more = Dowiedz się więcej
adrenaline-window-sync-migration-dialog-accept = Rozumiem
adrenaline-appmenu-new-blank-window = 
    .label = Nowe puste okno
