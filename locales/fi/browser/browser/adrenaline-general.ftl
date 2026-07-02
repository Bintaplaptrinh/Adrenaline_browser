# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = nykyinen profiili
unified-extensions-description = Laajennuksia käytetään tuomaan enemmän ylimääräisiä toimintoja { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Reset Essential Tab
           *[false] Reset Pinned Tab
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Lisää olennaisiin
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } täytetty paikka
tab-context-adrenaline-remove-essential = 
    .label = Poista olennaisista
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Replace Essential URL with Current
           *[false] Replace Pinned URL with Current
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Change Label...
tab-context-adrenaline-edit-icon = 
    .label = Change Icon...
adrenaline-themes-corrupted = { -brand-short-name } modejasi tiedosto on vioittunut. Ne on palautettu oletusteemaan.
adrenaline-shortcuts-corrupted = { -brand-short-name } Oikotietä sisältävä tiedosto on korruptoitunut. Ne on palautettu oletus oikoteihin.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Uusi URL-palkki on otettu käyttöön, uusia välilehtisivuja ei enää tarvita.<br/><br/>
    Kokeile avata uusi välilehti nähdäksesi uuden URL-palkin toiminnassa!
adrenaline-disable = Poista käytöstä
pictureinpicture-minimize-btn = 
    .aria-label = Minimoi
    .tooltip = Minimoi
adrenaline-panel-ui-gradient-generator-custom-color = Muokattu Väri
adrenaline-copy-current-url-confirmation = Nykyinen URL-osoite kopioitu!
adrenaline-copy-current-url-as-markdown-confirmation = Copied current URL as Markdown!
adrenaline-general-cancel-label = 
    .label = Peruuta
adrenaline-general-confirm = 
    .label = Vahvista
adrenaline-pinned-tab-replaced = Pinned tab URL has been replaced with the current URL.
adrenaline-tabs-renamed = Välilehti on nimetty uudelleen!
adrenaline-background-tab-opened-toast = Uusi taustavälilehti avattu!
adrenaline-workspace-renamed-toast = Työtila on nimetty uudelleen!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = Kompakti Tila
    .tooltiptext = Ota käyttöön Kompakti tila

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Lue Lisää
adrenaline-close-label = Sulje
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Hae...
adrenaline-icons-picker-emoji = 
    .label = Emojit
adrenaline-icons-picker-svg = 
    .label = Kuvakkeet
urlbar-search-mode-adrenaline_actions = Toiminnot
adrenaline-site-data-settings = Asetukset
adrenaline-generic-manage = Hallitse
adrenaline-generic-more = Lisää
adrenaline-generic-next = Seuraava
adrenaline-essentials-promo-label = Add to Essentials
adrenaline-essentials-promo-sublabel = Keep your favorite tabs just a click away
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Sallittu
adrenaline-site-data-setting-block = Estetty
adrenaline-site-data-protections-enabled = Käytössä
adrenaline-site-data-protections-disabled = Pois käytöstä
adrenaline-site-data-setting-cross-site = Sivuston välinen eväste
adrenaline-site-data-security-info-extension = 
    .label = Laajennus
adrenaline-site-data-security-info-secure = 
    .label = Turvallinen
adrenaline-site-data-security-info-not-secure = 
    .label = Ei turvallinen
adrenaline-site-data-manage-addons = 
    .label = Hallita Laajennuksia
adrenaline-site-data-get-addons = 
    .label = Lisää Laajennuksia
adrenaline-site-data-site-settings = 
    .label = Kaikki Sivuston Asetukset
adrenaline-site-data-header-share = 
    .tooltiptext = Jaa Tämä Sivu
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Siirry lukutilaan
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Ota kuvakaappaus
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Lisää Tämä Sivu Kirjanmerkkeihin
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopioi URL
adrenaline-site-data-setting-site-protection = Seuranta Suojaus

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Uusi koti lisäosille, käyttöoikeuksille ja paljon muuta
adrenaline-site-data-panel-feature-callout-subtitle = Klikkaa kuvaketta hallitaksesi sivuston asetuksia, tarkastella tietoturvatietoja, käyttää laajennuksia ja suorittaa yhteisiä toimintoja.
adrenaline-open-link-in-glance = 
    .label = Avaa linkki vilkaisussa
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Päivitys valmis!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Mitä uutta { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Katso Julkaisutiedot
adrenaline-sidebar-notification-restart-safe-mode-label = Jotain rikki?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Käynnistä uudelleen vianmääritystilassa
adrenaline-window-sync-migration-dialog-title = Keep Your Windows in Sync
adrenaline-window-sync-migration-dialog-message = Adrenaline now syncs windows on the same device, so changes in one window are reflected across the others instantly.
adrenaline-window-sync-migration-dialog-learn-more = Learn More
adrenaline-window-sync-migration-dialog-accept = Got It
adrenaline-appmenu-new-blank-window = 
    .label = New blank window
