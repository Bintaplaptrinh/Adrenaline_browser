# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = oraingo profila
unified-extensions-description = Gehigarriek funtzioak eransten dizkiote { -brand-short-name }i.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Berrezarri Funtsezko Fitxa
           *[false] Berrezarri Ainguratutako Fitxa
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Funtsezko fitxetara Gehitu
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } hutsune beteta
tab-context-adrenaline-remove-essential = 
    .label = Funtsezko fitxetatik Kendu
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Ordezkatu Funtsezko URLa Oraingoarekin
           *[false] Ordezkatu Ainguratutako URLa Oraingoarekin
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Etiketa aldatu...
tab-context-adrenaline-edit-icon = 
    .label = Ikonoa aldatu...
adrenaline-themes-corrupted = Zure { -brand-short-name }eko mod-artxiboa kaltetuta dago. Lehenetsitako gaia berrezarri da.
adrenaline-shortcuts-corrupted = Zure { -brand-short-name }eko lasterbide-artxiboa kaltetuta dago. Lehenetsitako lasterbideak berrezarri dira.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    URL-barra berria gaitu da. Jada ez dira beharrezkoa fitxa berriak.<br/><br/>
    Saiatu fitxa berri bat zabaltzen URL-barra berria ikusteko!
adrenaline-disable = Desgaitu
pictureinpicture-minimize-btn = 
    .aria-label = Ikonotu
    .tooltip = Ikonotu
adrenaline-panel-ui-gradient-generator-custom-color = Neurrirako kolorea
adrenaline-copy-current-url-confirmation = Oraingo esteka kopiatu da!
adrenaline-copy-current-url-as-markdown-confirmation = Oraingo esteka kopiatu da Markdown gisa!
adrenaline-general-cancel-label = 
    .label = Ezeztatu
adrenaline-general-confirm = 
    .label = Baieztatu
adrenaline-pinned-tab-replaced = Oraingo estekak ordezkatu du ainguratutako fitxarena!
adrenaline-tabs-renamed = Fitxaren izena ongi aldatu da!
adrenaline-background-tab-opened-toast = Fitxa berri bat zabaldu da bigarren planoan!
adrenaline-workspace-renamed-toast = Lan-eremuaren izena ongi aldatu da!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = Modu Trinkoa
    .tooltiptext = Modu Trinkoa Aktibatu/Desaktibatu

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Gehiago ikasi
adrenaline-close-label = Itxi
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Bilatu...
adrenaline-icons-picker-emoji = 
    .label = Emojiak
adrenaline-icons-picker-svg = 
    .label = Ikonoak
urlbar-search-mode-adrenaline_actions = Ekintzak
adrenaline-site-data-settings = Ezarpenak
adrenaline-generic-manage = Kudeatu
adrenaline-generic-more = Gehiago
adrenaline-generic-next = Hurrengoa
adrenaline-essentials-promo-label = Funtsezkoetara Gehitu
adrenaline-essentials-promo-sublabel = Izan zure fitxa gogokoenak klik bakar batera
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Baimenduta
adrenaline-site-data-setting-block = Blokeatuta
adrenaline-site-data-protections-enabled = Gaituta
adrenaline-site-data-protections-disabled = Ezgaituta
adrenaline-site-data-setting-cross-site = Bitartekoen cookieak
adrenaline-site-data-security-info-extension = 
    .label = Gehigarria
adrenaline-site-data-security-info-secure = 
    .label = Segurua
adrenaline-site-data-security-info-not-secure = 
    .label = Ez segurua
adrenaline-site-data-manage-addons = 
    .label = Gehigarriak Kudeatu
adrenaline-site-data-get-addons = 
    .label = Gehigarriak Erantsi
adrenaline-site-data-site-settings = 
    .label = Webgunearen Ezarpen Guztiak
adrenaline-site-data-header-share = 
    .tooltiptext = Orri Hau Partekatu
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Irakurle-moduan Sartu
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Pantaila-argazkia Atera
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Gehitu Orria Laster-marketara
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Esteka Kopiatu
adrenaline-site-data-setting-site-protection = Tracking Protection

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = A new home for add-ons, permissions, and more
adrenaline-site-data-panel-feature-callout-subtitle = Click the icon to manage site settings, view security info, access extensions, and perform common actions.
adrenaline-open-link-in-glance = 
    .label = Open Link in Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Update Complete!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = What's new in { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = View Release Notes
adrenaline-sidebar-notification-restart-safe-mode-label = Something broke?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Restart in Safe Mode
adrenaline-window-sync-migration-dialog-title = Keep Your Windows in Sync
adrenaline-window-sync-migration-dialog-message = Adrenaline now syncs windows on the same device, so changes in one window are reflected across the others instantly.
adrenaline-window-sync-migration-dialog-learn-more = Learn More
adrenaline-window-sync-migration-dialog-accept = Got It
adrenaline-appmenu-new-blank-window = 
    .label = New blank window
