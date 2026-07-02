# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = huidig profiel
unified-extensions-description = Extensies worden gebruikt om extra functionaliteit toe te voegen aan { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Essential-tabblad herstellen
           *[false] Vastgezet tabblad herstellen
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Toevoegen aan Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } plekken bezet
tab-context-adrenaline-remove-essential = 
    .label = Verwijderen uit Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Essential-URL vervangen door huidige
           *[false] Vastgezette URL vervangen door huidige
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Naam veranderen...
tab-context-adrenaline-edit-icon = 
    .label = Icoon veranderen...
adrenaline-themes-corrupted = Je { -brand-short-name } mods bestand is beschadigd. Ze zijn gereset naar het standaard thema.
adrenaline-shortcuts-corrupted = Je { -brand-short-name } snelkoppelingsbestand is beschadigd. Ze zijn gereset naar de standaard snelkoppelingen.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    De nieuwe URL-balk is ingeschakeld, waardoor nieuwe tabbladen niet meer nodig zijn.<br/><br/>
    Probeer een nieuw tabblad te openen om de nieuwe URL-balk in actie te zien!
adrenaline-disable = Uitschakelen
pictureinpicture-minimize-btn = 
    .aria-label = Minimaliseren
    .tooltip = Minimaliseren
adrenaline-panel-ui-gradient-generator-custom-color = Aangepaste kleur
adrenaline-copy-current-url-confirmation = Huidige URL gekopieerd!
adrenaline-copy-current-url-as-markdown-confirmation = Huidige URL gekopieerd als Markdown!
adrenaline-general-cancel-label = 
    .label = Annuleren
adrenaline-general-confirm = 
    .label = Bevestigen
adrenaline-pinned-tab-replaced = Vastgemaakte tabblad URL is vervangen met de huidige URL!
adrenaline-tabs-renamed = Tabblad is succesvol hernoemd!
adrenaline-background-tab-opened-toast = Nieuw achtergrondtabblad geopend!
adrenaline-workspace-renamed-toast = Werkruimte succesvol is hernoemd!
adrenaline-split-view-limit-toast = Kan geen panelen meer toevoegen aan de gesplitste weergave!
adrenaline-toggle-compact-mode-button = 
    .label = Compacte modus
    .tooltiptext = Compacte modus togglen

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Meer leren
adrenaline-close-label = Sluiten
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Zoeken…
adrenaline-icons-picker-emoji = 
    .label = Emoji's
adrenaline-icons-picker-svg = 
    .label = Iconen
urlbar-search-mode-adrenaline_actions = Acties
adrenaline-site-data-settings = Instellingen
adrenaline-generic-manage = Beheren
adrenaline-generic-more = Meer
adrenaline-generic-next = Volgende
adrenaline-essentials-promo-label = Toevoegen aan Essentials
adrenaline-essentials-promo-sublabel = Krijg in één klik toegang tot je favoriete tabbladen
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Toegestaan
adrenaline-site-data-setting-block = Geblokkeerd
adrenaline-site-data-protections-enabled = Ingeschakeld
adrenaline-site-data-protections-disabled = Uitgeschakeld
adrenaline-site-data-setting-cross-site = Cross-site cookie
adrenaline-site-data-security-info-extension = 
    .label = Extensie
adrenaline-site-data-security-info-secure = 
    .label = Beveiligd
adrenaline-site-data-security-info-not-secure = 
    .label = Niet beveiligd
adrenaline-site-data-manage-addons = 
    .label = Extensies beheren
adrenaline-site-data-get-addons = 
    .label = Extensies toevoegen
adrenaline-site-data-site-settings = 
    .label = Alle site-instellingen
adrenaline-site-data-header-share = 
    .tooltiptext = Deze pagina delen
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Leesmodus openen
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Maak een schermafbeelding
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Bladwijzer toevoegen voor deze pagina
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = URL kopiëren
adrenaline-site-data-setting-site-protection = Tracking bescherming

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Een nieuw thuis voor add-ons, machtigingen en meer
adrenaline-site-data-panel-feature-callout-subtitle = Klik op het icoon om de site-instellingen te beheren, beveiligingsinfo te bekijken, extensies te openen en gemeenschappelijke acties uit te voeren.
adrenaline-open-link-in-glance = 
    .label = Link openen in Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Update voltooid!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Wat is er veranderd in { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Versie-informatie bekijken
adrenaline-sidebar-notification-restart-safe-mode-label = Werkt er iets niet?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Herstarten in veilige modus
adrenaline-window-sync-migration-dialog-title = Hou je vensters gesynchroniseerd
adrenaline-window-sync-migration-dialog-message = Vanaf nu synchroniseert Adrenaline alle vensters op hetzelfde apparaat, dus aanpassingen in het ene venster worden tegelijkertijd op het andere venster toegepast.
adrenaline-window-sync-migration-dialog-learn-more = Meer info
adrenaline-window-sync-migration-dialog-accept = Begrepen
adrenaline-appmenu-new-blank-window = 
    .label = Nieuw blanco venster
