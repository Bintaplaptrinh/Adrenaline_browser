# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = profil actuel
unified-extensions-description = Les extensions sont utilisées pour ajouter plus de fonctionnalités à { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Réinitialiser l'onglet Essential
           *[false] Réinitialiser l'onglet épinglé
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Ajouter aux Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = Retirer des Essentials
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Remplacer l'URL de l'Essential par l'actuelle
           *[false] Remplacer l'URL de l'onglet épinglé par l'actuelle
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Changer le libellé...
tab-context-adrenaline-edit-icon = 
    .label = Changer l'icône...
adrenaline-themes-corrupted = Votre fichier de thèmes { -brand-short-name } est corrompu. Il a été réinitialisé au thème par défaut.
adrenaline-shortcuts-corrupted = Votre fichier de raccourcis { -brand-short-name } est corrompu. Ils ont été réinitialisés aux raccourcis par défaut.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    La nouvelle barre d’adresse a été activée, supprimant la nécessité de nouvelles pages d’onglets.<br/><br/>
    Essayez d’ouvrir un nouvel onglet pour voir la nouvelle barre d’adresse en action !
adrenaline-disable = Désactiver
pictureinpicture-minimize-btn = 
    .aria-label = Minimiser
    .tooltip = Minimiser
adrenaline-panel-ui-gradient-generator-custom-color = Couleur personnalisée
adrenaline-copy-current-url-confirmation = URL actuelle copiée !
adrenaline-copy-current-url-as-markdown-confirmation = URL actuelle copiée en tant que Markdown !
adrenaline-general-cancel-label = 
    .label = Annuler
adrenaline-general-confirm = 
    .label = Confirmer
adrenaline-pinned-tab-replaced = L’adresse de l'onglet épinglé a été remplacée par l’adresse actuelle.
adrenaline-tabs-renamed = L’onglet a été renommé avec succès !
adrenaline-background-tab-opened-toast = Nouvel onglet ouvert en arrière-plan !
adrenaline-workspace-renamed-toast = L'espace de travail a été renommé avec succès !
adrenaline-split-view-limit-toast = Impossible d'ajouter d'autres panneaux à la vue fractionnée !
adrenaline-toggle-compact-mode-button = 
    .label = Mode compact
    .tooltiptext = Activer/Désactiver le mode compact

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = En savoir plus
adrenaline-close-label = Fermer
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Rechercher...
adrenaline-icons-picker-emoji = 
    .label = Émojis
adrenaline-icons-picker-svg = 
    .label = Icônes
urlbar-search-mode-adrenaline_actions = Actions
adrenaline-site-data-settings = Paramètres
adrenaline-generic-manage = Gérer
adrenaline-generic-more = Plus
adrenaline-generic-next = Suivant
adrenaline-essentials-promo-label = Ajouter aux Essentials
adrenaline-essentials-promo-sublabel = Accédez à vos onglets favoris en un clic
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Autorisé
adrenaline-site-data-setting-block = Bloqué
adrenaline-site-data-protections-enabled = Activé
adrenaline-site-data-protections-disabled = Désactivé
adrenaline-site-data-setting-cross-site = Cookie intersite
adrenaline-site-data-security-info-extension = 
    .label = Extension
adrenaline-site-data-security-info-secure = 
    .label = Sécurisé
adrenaline-site-data-security-info-not-secure = 
    .label = Non sécurisé
adrenaline-site-data-manage-addons = 
    .label = Gérer les extensions
adrenaline-site-data-get-addons = 
    .label = Ajouter des extensions
adrenaline-site-data-site-settings = 
    .label = Tous les paramètres du site
adrenaline-site-data-header-share = 
    .tooltiptext = Partager cette page
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Entrer en mode lecture
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Prendre une capture d'écran
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Marquer cette page
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Copier l'URL
adrenaline-site-data-setting-site-protection = Protection contre le pistage

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Un nouvel endroit pour vos extensions, permissions et plus encore
adrenaline-site-data-panel-feature-callout-subtitle = Cliquez sur l'icône pour gérer les paramètres du site, afficher les infos de sécurité, accéder aux extensions et effectuer d'autres actions.
adrenaline-open-link-in-glance = 
    .label = Ouvrir le lien dans Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Mise à jour terminée !

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Quoi de neuf dans { -brand-short-name } ?
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Voir les notes de version
adrenaline-sidebar-notification-restart-safe-mode-label = Un problème est survenu ?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Redémarrer en mode de dépannage
adrenaline-window-sync-migration-dialog-title = Gardez vos fenêtres synchronisées
adrenaline-window-sync-migration-dialog-message = Adrenaline synchronise désormais les fenêtres sur le même appareil, de sorte que les modifications apportées à une fenêtre sont instantanément répercutées sur les autres.
adrenaline-window-sync-migration-dialog-learn-more = En savoir plus
adrenaline-window-sync-migration-dialog-accept = J'ai compris
adrenaline-appmenu-new-blank-window = 
    .label = Nouvelle fenêtre vide
