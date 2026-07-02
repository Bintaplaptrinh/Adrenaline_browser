# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = dabartinis profilis
unified-extensions-description = Plėtiniai naudojami norint į „{ -brand-short-name }“ įtraukti daugiau papildomų funkcijų.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Atkurti butiniausią kortelę
           *[false] Atkurti prisegtą kortelę
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Įtraukti į būtiniausius
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } užpildytų vietų
tab-context-adrenaline-remove-essential = 
    .label = Šalinti iš būtiniausių
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Keisti būtiniausią URL su dabartiniu
           *[false] Keisti prisegtą URL su dabartiniu
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Keisti žymę...
tab-context-adrenaline-edit-icon = 
    .label = Keisti piktogramą...
adrenaline-themes-corrupted = Jūsų „{ -brand-short-name }“ modifikacijos failas sugadintas. Jie buvo atkurti į numatytąją temą.
adrenaline-shortcuts-corrupted = Jūsų „{ -brand-short-name }“ sparčiųjų klavišų failas sugadintas. Jie buvo atkurti į numatytuosius sparčiuosius klavišus.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Įjungta naujoji URL juosta, todėl nebereikia naujų kortelių puslapių.<br/><br/>
    Pabandykite atverti naują kortelę, kad matytumėte veikiantį naująjį URL juostą!
adrenaline-disable = Išjungti
pictureinpicture-minimize-btn = 
    .aria-label = Sumažinti
    .tooltip = Sumažinti
adrenaline-panel-ui-gradient-generator-custom-color = Pasirinktinė spalva
adrenaline-copy-current-url-confirmation = Nukopijuotas dabartinis URL.
adrenaline-copy-current-url-as-markdown-confirmation = Nukopijuotas dabartinis URL kaip ženklinimas.
adrenaline-general-cancel-label = 
    .label = Atšaukti
adrenaline-general-confirm = 
    .label = Patvirtinti
adrenaline-pinned-tab-replaced = Prisegtos kortelės URL pakeistas dabartiniu URL.
adrenaline-tabs-renamed = Kortelė sėkmingai pervadinta.
adrenaline-background-tab-opened-toast = Nauja fonos kortelė atverta.
adrenaline-workspace-renamed-toast = Darbo sritis sėkmingai pervadintas.
adrenaline-split-view-limit-toast = Negalima įtraukti daugiau skydelių į suskaidytą rodinį.
adrenaline-toggle-compact-mode-button = 
    .label = Kompaktinis režimas
    .tooltiptext = Perjungti kompaktinį režimą

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Sužinoti daugiau
adrenaline-close-label = Užverti
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Ieškokite...
adrenaline-icons-picker-emoji = 
    .label = Jaustukai
adrenaline-icons-picker-svg = 
    .label = Piktogramos
urlbar-search-mode-adrenaline_actions = Veiksmai
adrenaline-site-data-settings = Nustatymai
adrenaline-generic-manage = Tvarkyti
adrenaline-generic-more = Daugiau
adrenaline-generic-next = Sekantis
adrenaline-essentials-promo-label = Įtraukti į būtiniausius
adrenaline-essentials-promo-sublabel = Laikykite mėgstamas korteles vos nuo vienu paspaudimu
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Leidžiama
adrenaline-site-data-setting-block = Užblokuota
adrenaline-site-data-protections-enabled = Įjungta
adrenaline-site-data-protections-disabled = Išjungta
adrenaline-site-data-setting-cross-site = Tarpusavio svetainės slapukas
adrenaline-site-data-security-info-extension = 
    .label = Plėtinys
adrenaline-site-data-security-info-secure = 
    .label = Saugi
adrenaline-site-data-security-info-not-secure = 
    .label = Nesaugi
adrenaline-site-data-manage-addons = 
    .label = Tvarkyti plėtinius
adrenaline-site-data-get-addons = 
    .label = Įtraukti plėtinius
adrenaline-site-data-site-settings = 
    .label = Visi svetainės nustatymai
adrenaline-site-data-header-share = 
    .tooltiptext = Bendrinti šį puslapį
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Įeiti į skaitytojo režimą
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Daryti ekrano kopiją
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Įtraukti šį puslapį į adresyną
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Kopijuoti URL
adrenaline-site-data-setting-site-protection = Stebėjimo apsauga

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Nauji namai priedams, leidimams ir daugiau
adrenaline-site-data-panel-feature-callout-subtitle = Spustelėkite piktogramą, kad tvarkytumėte svetainės nustatymus, peržiūrėtumėte saugumo informaciją, pasiektumėte plėtinius ir atliktumėte įprastus veiksmus.
adrenaline-open-link-in-glance = 
    .label = Atverti nuorodą rodinyje „Glance“
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Naujinimas baigtas.

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Kas naujo naršyklėje „{ -brand-short-name }“
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Peržiūrėti leidimo pastabas
adrenaline-sidebar-notification-restart-safe-mode-label = Kažkas neveikia?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Paleisti iš naujo saugioje režime
adrenaline-window-sync-migration-dialog-title = Išlaikykite savo langus sinchronizuotus
adrenaline-window-sync-migration-dialog-message = „Adrenaline“ dabar sinchronizuoja langus tame pačiame įrenginyje, todėl viename lange atlikti pakeitimai iš karto atsispindi ir kituose.
adrenaline-window-sync-migration-dialog-learn-more = Sužinoti daugiau
adrenaline-window-sync-migration-dialog-accept = Supratau
adrenaline-appmenu-new-blank-window = 
    .label = Naujas tuščias langas
