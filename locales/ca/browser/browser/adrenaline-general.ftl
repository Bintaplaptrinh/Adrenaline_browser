# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = perfil actual
unified-extensions-description = Les extensions aporten funcionalitats addicionals a { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Restableix la pestanya essencial
           *[false] Restableix la pestanya fixada
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Afegeix als essencials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Elimina dels essencials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Substitueix l'URL essencial per l'actual
           *[false] Substitueix l'URL fixat per l'actual
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Canvia l'etiqueta...
tab-context-adrenaline-edit-icon = 
    .label = Canvia la icona...
adrenaline-themes-corrupted = El vostre fitxer de modificacions { -brand-short-name } està malmès. S'ha restablert al tema per defecte.
adrenaline-shortcuts-corrupted = El vostre fitxer de dreceres { -brand-short-name } està malmès. S'ha restablert a les dreceres per defecte.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    La nova barra d'URL s'ha activat, eliminant la necessitat de noves pàgines de pestanya.<br/><br/>
    Proveu d'obrir una pestanya nova per veure la nova barra d'URL en acció!
adrenaline-disable = Deshabilita
pictureinpicture-minimize-btn = 
    .aria-label = Minimitza
    .tooltip = Minimitza
adrenaline-panel-ui-gradient-generator-custom-color = Color personalitzat
adrenaline-copy-current-url-confirmation = L'URL actual s'ha copiat.
adrenaline-copy-current-url-as-markdown-confirmation = L'URL actual s'ha copiat com a Markdown!
adrenaline-general-cancel-label = 
    .label = Cancel·la
adrenaline-general-confirm = 
    .label = Confirma
adrenaline-pinned-tab-replaced = L'URL de la pestanya fixada s'ha substituït per l'URL actual.
adrenaline-tabs-renamed = S'ha canviat el nom de la pestanya correctament
adrenaline-background-tab-opened-toast = S'ha obert una nova pestanya de fons
adrenaline-workspace-renamed-toast = S'ha canviat el nom de l'espai de treball correctament
adrenaline-split-view-limit-toast = No es poden afegir més panells a la vista dividida!
adrenaline-toggle-compact-mode-button = 
    .label = Mode compacte
    .tooltiptext = Commuta el mode compacte

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Més informació
adrenaline-close-label = Tanca
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Cerca...
adrenaline-icons-picker-emoji = 
    .label = Emojis
adrenaline-icons-picker-svg = 
    .label = Icones
urlbar-search-mode-adrenaline_actions = Accions
adrenaline-site-data-settings = Configuració
adrenaline-generic-manage = Gestiona
adrenaline-generic-more = Més
adrenaline-generic-next = Següent
adrenaline-essentials-promo-label = Afegeix als essencials
adrenaline-essentials-promo-sublabel = Mantingueu les vostres pestanyes preferides a només un clic de distància
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Permès
adrenaline-site-data-setting-block = Bloquejat
adrenaline-site-data-protections-enabled = Habilitat
adrenaline-site-data-protections-disabled = Deshabilitat
adrenaline-site-data-setting-cross-site = Galetes entre llocs
adrenaline-site-data-security-info-extension = 
    .label = Extensió
adrenaline-site-data-security-info-secure = 
    .label = Segur
adrenaline-site-data-security-info-not-secure = 
    .label = No és segur
adrenaline-site-data-manage-addons = 
    .label = Gestiona les extensions
adrenaline-site-data-get-addons = 
    .label = Afegeix extensions
adrenaline-site-data-site-settings = 
    .label = Totes les configuracions del lloc
adrenaline-site-data-header-share = 
    .tooltiptext = Comparteix aquesta pàgina
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Accedeix al mode lectura
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Fes una captura de pantalla
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Afegeix la pàgina a les adreces d'interès
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Copia l'URL
adrenaline-site-data-setting-site-protection = Protecció contra el seguiment

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Una nova ubicació per a les extenions, permisos i molt més
adrenaline-site-data-panel-feature-callout-subtitle = Feu clic a la icona per gestionar la configuració del lloc, veure la informació de seguretat, accedir a les extensions i dur a terme accions habituals.
adrenaline-open-link-in-glance = 
    .label = Obre l'enllaç en un cop d'ull
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Actualització completada!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Novetats a { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Mostra les notes de la versió
adrenaline-sidebar-notification-restart-safe-mode-label = Alguna cosa no funciona?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Reinici en mode segur
adrenaline-window-sync-migration-dialog-title = Mantingueu les finestres sincronitzades
adrenaline-window-sync-migration-dialog-message = El Adrenaline ara sincronitza les finestres del mateix dispositiu, de manera que els canvis en una finestra es reflecteixen a les altres a l'instant.
adrenaline-window-sync-migration-dialog-learn-more = Més informació
adrenaline-window-sync-migration-dialog-accept = D'acord
adrenaline-appmenu-new-blank-window = 
    .label = Nova finestra en blanc
