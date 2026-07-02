# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = aktuálny profil
unified-extensions-description = Rozšírenia slúžia na pridanie ďalších funkcií do { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Reset Essential Tab
           *[false] Reset Pinned Tab
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Pridať medzi hlavné
    .accesskey = E
tab-context-adrenaline-add-essential-badge = Využité pozície: { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Odstrániť z hlavných
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Replace Essential URL with Current
           *[false] Replace Pinned URL with Current
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Zmeniť Označenie...
tab-context-adrenaline-edit-icon = 
    .label = Zmeniť Ikonu...
adrenaline-themes-corrupted = Váš súbor módov { -brand-short-name } je poškodený. Témy boli resetované na predvolené.
adrenaline-shortcuts-corrupted = Váš súbor skratiek { -brand-short-name } je poškodený. Skratky boli resetované na predvolené.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification = Nový panel adries bol aktivovaný, takže stránky novej karty už nie sú potrebné.<br/><br/>Skúste otvoriť novú kartu a pozrite si nový panel adries v akcii!
adrenaline-disable = Zakázať
pictureinpicture-minimize-btn = 
    .aria-label = Minimalizovať
    .tooltip = Minimalizovať
adrenaline-panel-ui-gradient-generator-custom-color = Vlastná Farba
adrenaline-copy-current-url-confirmation = Aktuálna URL skopírovaná!
adrenaline-copy-current-url-as-markdown-confirmation = Copied current URL as Markdown!
adrenaline-general-cancel-label = 
    .label = Zrušiť
adrenaline-general-confirm = 
    .label = Potvrdiť
adrenaline-pinned-tab-replaced = URL pripnutej karty bola nahradená aktuálnou URL!
adrenaline-tabs-renamed = Karta bola úspešne premenovaná!
adrenaline-background-tab-opened-toast = Nová karta otvorená na pozadí!
adrenaline-workspace-renamed-toast = Pracovný priestor bol úspešne premenovaný!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = Kompaktný Režim
    .tooltiptext = Prepnúť Kompaktný Režim

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Zistiť Viac
adrenaline-close-label = Zatvoriť
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Hľadať...
adrenaline-icons-picker-emoji = 
    .label = Emoji
adrenaline-icons-picker-svg = 
    .label = Ikony
urlbar-search-mode-adrenaline_actions = Akcie
adrenaline-site-data-settings = Nastavenia
adrenaline-generic-manage = Spravovať
adrenaline-generic-more = Viac
adrenaline-generic-next = Ďalšie
adrenaline-essentials-promo-label = Pridať do Hlavných
adrenaline-essentials-promo-sublabel = Majte svoje obľúbené karty na dosah jediným kliknutím
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Povolené
adrenaline-site-data-setting-block = Zablokované
adrenaline-site-data-protections-enabled = Zapnuté
adrenaline-site-data-protections-disabled = Vypnuté
adrenaline-site-data-setting-cross-site = Cookie tretích strán
adrenaline-site-data-security-info-extension = 
    .label = Rozšírenie
adrenaline-site-data-security-info-secure = 
    .label = Zabezpečené
adrenaline-site-data-security-info-not-secure = 
    .label = Nezabezpečené
adrenaline-site-data-manage-addons = 
    .label = Spravovať Rozšírenia
adrenaline-site-data-get-addons = 
    .label = Pridať Rozšírenia
adrenaline-site-data-site-settings = 
    .label = Všetky Nastavenia Webov
adrenaline-site-data-header-share = 
    .tooltiptext = Zdieľať Túto Stránku
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Prejsť do Režimu Čítačky
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Vytvoriť Snímku Obrazovky
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Pridať Túto Stránku k Záložkám
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopírovať URL adresu
adrenaline-site-data-setting-site-protection = Ochrana pred Sledovaním

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Nové miesto pre doplnky, povolenia a ďalšie funkcie
adrenaline-site-data-panel-feature-callout-subtitle = Kliknutím na túto ikonu môžete spravovať nastavenia webu, zobraziť informácie o zabezpečení, pristupovať k rozšíreniam a vykonávať bežné akcie.
adrenaline-open-link-in-glance = 
    .label = Otvoriť odkaz v Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Aktualizácia Dokončená!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Čo je nové v { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Zobraziť Poznámky k Vydaniu
adrenaline-sidebar-notification-restart-safe-mode-label = Niečo sa pokazilo?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Reštartovať v Núdzovom Režime
adrenaline-window-sync-migration-dialog-title = Majte svoje okná synchronizované
adrenaline-window-sync-migration-dialog-message = Adrenaline teraz synchronizuje okná v rámci jedného zariadenia, takže zmeny v jednom okne sa okamžite prejavia vo všetkých ostatných.
adrenaline-window-sync-migration-dialog-learn-more = Dozvedieť sa Viac
adrenaline-window-sync-migration-dialog-accept = Rozumiem
adrenaline-appmenu-new-blank-window = 
    .label = New blank window
