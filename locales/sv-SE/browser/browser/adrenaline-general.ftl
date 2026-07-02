# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = nuvarande profil
unified-extensions-description = Tillägg används för att få fler extra funktioner i { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Återställ Essential flik
           *[false] Återställ fäst flik
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Lägg till Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } platser fyllda
tab-context-adrenaline-remove-essential = 
    .label = Ta bort från Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Ersätt Essential webbadress med nuvarande
           *[false] Ersätt fäst webbadress med nuvarande
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Ändra etikett...
tab-context-adrenaline-edit-icon = 
    .label = Ändra ikon...
adrenaline-themes-corrupted = Din { -brand-short-name } modds-fil är skadad. De har återställts till standardtemat.
adrenaline-shortcuts-corrupted = Din { -brand-short-name } Genvägsfil är korrupt. De har återställts till standardgenvägarna.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Det nya adressfältet har aktiverats, vilket eliminerar behovet av nya fliksidor.<br/><br/>
    Försök att öppna en ny flik för att se det nya adressfältet användas!
adrenaline-disable = Inaktivera
pictureinpicture-minimize-btn = 
    .aria-label = Minimera
    .tooltip = Minimera
adrenaline-panel-ui-gradient-generator-custom-color = Anpassad färg
adrenaline-copy-current-url-confirmation = Kopierade nuvarande URL!
adrenaline-copy-current-url-as-markdown-confirmation = Kopierade nuvarande webbadress som Markdown!
adrenaline-general-cancel-label = 
    .label = Avbryt
adrenaline-general-confirm = 
    .label = Bekräfta
adrenaline-pinned-tab-replaced = Den fästa flikens URL har ersatts med den aktuella URL!
adrenaline-tabs-renamed = Fliken har fått nytt namn!
adrenaline-background-tab-opened-toast = Ny bakgrundsflik öppnad!
adrenaline-workspace-renamed-toast = Arbetsytan har fått ett nytt namn!
adrenaline-split-view-limit-toast = Kan inte lägga till fler paneler till delad vy!
adrenaline-toggle-compact-mode-button = 
    .label = Kompakt läge
    .tooltiptext = Växla kompakt läge

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Läs mer
adrenaline-close-label = Stäng
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Sök...
adrenaline-icons-picker-emoji = 
    .label = Emojis
adrenaline-icons-picker-svg = 
    .label = Ikoner
urlbar-search-mode-adrenaline_actions = Åtgärder
adrenaline-site-data-settings = Inställningar
adrenaline-generic-manage = Hantera
adrenaline-generic-more = Mer
adrenaline-generic-next = Nästa
adrenaline-essentials-promo-label = Lägg till Essentials
adrenaline-essentials-promo-sublabel = Behåll dina favoritflikar bara ett klick bort
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Tillåtet
adrenaline-site-data-setting-block = Blockerade
adrenaline-site-data-protections-enabled = Aktiverad
adrenaline-site-data-protections-disabled = Inaktiverad
adrenaline-site-data-setting-cross-site = Globala kakor
adrenaline-site-data-security-info-extension = 
    .label = Tillägg
adrenaline-site-data-security-info-secure = 
    .label = Säker
adrenaline-site-data-security-info-not-secure = 
    .label = Inte säker
adrenaline-site-data-manage-addons = 
    .label = Hantera tillägg
adrenaline-site-data-get-addons = 
    .label = Lägg till tillägg
adrenaline-site-data-site-settings = 
    .label = Alla webbplatsinställningar
adrenaline-site-data-header-share = 
    .tooltiptext = Dela denna sida
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Öppna läsläge
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Ta en skärmdump
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Bokmärk denna sida
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopiera URL
adrenaline-site-data-setting-site-protection = Spårningsskydd

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Ett nytt hem för tillägg, behörigheter och mer
adrenaline-site-data-panel-feature-callout-subtitle = Klicka på ikonen för att hantera webbplatsinställningar, visa säkerhetsinformation, öppna tillägg och utföra vanliga åtgärder.
adrenaline-open-link-in-glance = 
    .label = Öppna länk i Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Uppdatering slutförd!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Vad är nytt i { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Visa versionsfakta
adrenaline-sidebar-notification-restart-safe-mode-label = Har något gått sönder?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Starta om i felsäkert läge
adrenaline-window-sync-migration-dialog-title = Behåll dina fönster i Sync
adrenaline-window-sync-migration-dialog-message = Adrenaline synkroniserar nu fönster på samma enhet, så ändringar i ett fönster återspeglas direkt i de andra.
adrenaline-window-sync-migration-dialog-learn-more = Läs mer
adrenaline-window-sync-migration-dialog-accept = Jag förstår
adrenaline-appmenu-new-blank-window = 
    .label = Nytt blankt fönster
