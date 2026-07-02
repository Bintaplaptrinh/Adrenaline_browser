# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = gjeldende profil
unified-extensions-description = Utvidelser brukes for å bringe ekstra funksjonalitet til { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Nullstill Essential fane
           *[false] Nullstill festet fane
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Legg til i Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Fjern fra Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Erstatt Essential nettadresse med gjeldende
           *[false] Erstatt festet nettadresse med gjeldende
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Endre etikett...
tab-context-adrenaline-edit-icon = 
    .label = Endre ikon...
adrenaline-themes-corrupted = Din { -brand-short-name }-mods fil er skadet. De har blitt tilbakestilt til standardtemaet.
adrenaline-shortcuts-corrupted = { -brand-short-name } snarvei-filen din er skadet. De har blitt tilbakestilt til standard-snarveiene.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Det nye nettadressefeltet har blitt aktivert, som tar vekk behovet for nye fanesider.<br/><br/>
    Prøv å åpne en ny fane for å se det nye nettadressefeltet i action!
adrenaline-disable = Deaktiver
pictureinpicture-minimize-btn = 
    .aria-label = Minimer
    .tooltip = Minimer
adrenaline-panel-ui-gradient-generator-custom-color = Tilpasset Farge
adrenaline-copy-current-url-confirmation = Kopierte gjeldende nettadresse!
adrenaline-copy-current-url-as-markdown-confirmation = Kopierte gjeldende nettadresse som Markdown!
adrenaline-general-cancel-label = 
    .label = Avbryt
adrenaline-general-confirm = 
    .label = Bekreft
adrenaline-pinned-tab-replaced = Festet fanes nettadresse har blit erstattet med gjeldende nettadresse!
adrenaline-tabs-renamed = Fanen har fått nytt navn!
adrenaline-background-tab-opened-toast = Ny bakgrunnsfane åpnet!
adrenaline-workspace-renamed-toast = Arbeidsområdet har fått nytt navn!
adrenaline-split-view-limit-toast = Kan ikke legge til flere paneler i delt visning!
adrenaline-toggle-compact-mode-button = 
    .label = Kompakt modus
    .tooltiptext = Veksle kompakt modus

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Lær mer
adrenaline-close-label = Lukk
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Søk...
adrenaline-icons-picker-emoji = 
    .label = Emojier
adrenaline-icons-picker-svg = 
    .label = Ikoner
urlbar-search-mode-adrenaline_actions = Handlinger
adrenaline-site-data-settings = Innstillinger
adrenaline-generic-manage = Behandle
adrenaline-generic-more = Mer
adrenaline-generic-next = Neste
adrenaline-essentials-promo-label = Legg til i Essentials
adrenaline-essentials-promo-sublabel = Hold favorittfanene dine bare et klikk unna
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Tillat
adrenaline-site-data-setting-block = Blokker
adrenaline-site-data-protections-enabled = Aktivert
adrenaline-site-data-protections-disabled = Deaktivert
adrenaline-site-data-setting-cross-site = Tvers-side informasjonskapsel
adrenaline-site-data-security-info-extension = 
    .label = Utvidelse
adrenaline-site-data-security-info-secure = 
    .label = Sikker
adrenaline-site-data-security-info-not-secure = 
    .label = Ikke sikker
adrenaline-site-data-manage-addons = 
    .label = Behandle Utvidelser
adrenaline-site-data-get-addons = 
    .label = Legg til utvidelser
adrenaline-site-data-site-settings = 
    .label = Alle nettstedsinnstillinger
adrenaline-site-data-header-share = 
    .tooltiptext = Del denne siden
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Gå til lesermodus
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Ta et skjermbilde
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Bokmerk denne siden
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopier nettadresse
adrenaline-site-data-setting-site-protection = Sporingsbeskyttelse

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Et nytt hjem for tillegg, tillatelser, og mer
adrenaline-site-data-panel-feature-callout-subtitle = Klikk på ikonet for å behandle nettstedsinnstillinger, se sikkerhetsinformasjon, behandle utvidelser, og utføre vanlige handlinger.
adrenaline-open-link-in-glance = 
    .label = Åpne lenke i Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Oppdatering fullført!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Hva er nytt i { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Se versjonsnotater
adrenaline-sidebar-notification-restart-safe-mode-label = Er noe ødelagt?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Start på nytt i sikker modus
adrenaline-window-sync-migration-dialog-title = Hold vinduene dine synkronisert
adrenaline-window-sync-migration-dialog-message = Adrenaline synkroniserer nå vinduer på samme enhet, så endringer i ett vindu blir reflekterte på tvers de andre med en gang.
adrenaline-window-sync-migration-dialog-learn-more = Lær mer
adrenaline-window-sync-migration-dialog-accept = Skjønner
adrenaline-appmenu-new-blank-window = 
    .label = Nytt tomt vindu
