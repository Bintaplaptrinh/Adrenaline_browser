# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = aktuální profil
unified-extensions-description = Rozšíření slouží k přidání dalších funkcí do prohlížeče { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Resetovat Essential panel
           *[false] Resetovat připnutý panel
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Přidat do Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } zaplněných slotů
tab-context-adrenaline-remove-essential = 
    .label = Odstranit z Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Nahradit Essential URL aktuální
           *[false] Nahradit připnutou URL aktuální
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Změnit název...
tab-context-adrenaline-edit-icon = 
    .label = Změnit ikonu...
adrenaline-themes-corrupted = Váš { -brand-short-name } mods soubor je poškozen. Byl obnoven na výchozí motiv.
adrenaline-shortcuts-corrupted = Soubor se zkratky prohlížeče { -brand-short-name } je poškozen. Zkratky byly resetovány na výchozí nastavení.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Nový adresní řádek je nyní zapnutý, takže už není potřeba otevírat nové karty.<br/><br/>
    Zkuste otevřít nový panel a podívejte se, jak funguje!
adrenaline-disable = Zavřít
pictureinpicture-minimize-btn = 
    .aria-label = Minimalizovat
    .tooltip = Minimalizovat
adrenaline-panel-ui-gradient-generator-custom-color = Vlastní barva
adrenaline-copy-current-url-confirmation = URL adresa byla zkopírována!
adrenaline-copy-current-url-as-markdown-confirmation = Kopírovat aktuální URL jako Markdown!
adrenaline-general-cancel-label = 
    .label = Zrušit
adrenaline-general-confirm = 
    .label = Potvrdit
adrenaline-pinned-tab-replaced = Připnutá URL adresa panelu byla nahrazena aktuální URL adresou.
adrenaline-tabs-renamed = Panel byl úspěšně přejmenován!
adrenaline-background-tab-opened-toast = Nový panel na pozadí byl otevřen!
adrenaline-workspace-renamed-toast = Pracovní prostor byl úspěšně přejmenován!
adrenaline-split-view-limit-toast = Do rozděleného zobrazení nelze přidat více panelů!
adrenaline-toggle-compact-mode-button = 
    .label = Kompaktní režim
    .tooltiptext = Přepnout kompaktní režim

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Zjistit více
adrenaline-close-label = Zavřít
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Hledat...
adrenaline-icons-picker-emoji = 
    .label = Emodži
adrenaline-icons-picker-svg = 
    .label = Ikony
urlbar-search-mode-adrenaline_actions = Akce
adrenaline-site-data-settings = Nastavení
adrenaline-generic-manage = Spravovat
adrenaline-generic-more = Více
adrenaline-generic-next = Další
adrenaline-essentials-promo-label = Přídat do Essentials
adrenaline-essentials-promo-sublabel = Mějte oblíbené panely na dosah jedním kliknutím
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Povoleno
adrenaline-site-data-setting-block = Blokováno
adrenaline-site-data-protections-enabled = Zapnuto
adrenaline-site-data-protections-disabled = Vypnuto
adrenaline-site-data-setting-cross-site = Mezi stránkové cookies
adrenaline-site-data-security-info-extension = 
    .label = Rozšíření
adrenaline-site-data-security-info-secure = 
    .label = Bezpečné
adrenaline-site-data-security-info-not-secure = 
    .label = Nezabezpečeno
adrenaline-site-data-manage-addons = 
    .label = Spravovat rozšíření
adrenaline-site-data-get-addons = 
    .label = Přidat rozšíření
adrenaline-site-data-site-settings = 
    .label = Nastavení všech stránek
adrenaline-site-data-header-share = 
    .tooltiptext = Sdílet tuto stránku
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Zapnout čtecí režim
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Pořídit snímek obrazovky
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Přidat tuto stránku do záložek
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopírovat URL
adrenaline-site-data-setting-site-protection = Ochrana proti sledování

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Nový domov pro doplňky, oprávnění a další
adrenaline-site-data-panel-feature-callout-subtitle = Klikněte na ikonu pro správu nastavení webu, zobrazení bezpečnostních informací, přístup k rozšíření a provádění běžných akcí.
adrenaline-open-link-in-glance = 
    .label = Otevřít odkaz v Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Aktualizace byla dokončena!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Co je nového v prohlížeči { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Zobrazit změny
adrenaline-sidebar-notification-restart-safe-mode-label = Něco se rozbilo?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Restartovat v Nouzovém Režimu
adrenaline-window-sync-migration-dialog-title = Mějte svá okna synchronizovaná
adrenaline-window-sync-migration-dialog-message = Adrenaline nyní synchronizuje okna na stejném zařízení. Změny provedené v jednom okně se okamžitě projeví v ostatních.
adrenaline-window-sync-migration-dialog-learn-more = Zjistit více
adrenaline-window-sync-migration-dialog-accept = Rozumím
adrenaline-appmenu-new-blank-window = 
    .label = Nové prázdné okno
