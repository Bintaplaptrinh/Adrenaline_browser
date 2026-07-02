# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = perfil actual
unified-extensions-description = Las extensiones se utilizan para agregar más funcionalidades a { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Restablecer pestaña esencial
           *[false] Restablecer pestaña fijada
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Añadir a esenciales
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } huecos llenos
tab-context-adrenaline-remove-essential = 
    .label = Quitar de esenciales
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Reemplazar URL esencial con la actual
           *[false] Reemplazar URL fijada con la actual
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Cambiar etiqueta...
tab-context-adrenaline-edit-icon = 
    .label = Cambiar icono...
adrenaline-themes-corrupted = Su archivo de mods de { -brand-short-name } está dañado. Se ha restablecido el tema por defecto.
adrenaline-shortcuts-corrupted = Su archivo de atajos de { -brand-short-name } está dañado. Se han restablecido los atajos por defecto.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Se ha habilitado la nueva barra de direcciones, eliminando la necesidad de la página de nueva pestaña.<br/><br/>
    ¡Pruebe a abrir una nueva pestaña para ver la nueva barra de direcciones en acción!
adrenaline-disable = Deshabilitar
pictureinpicture-minimize-btn = 
    .aria-label = Minimizar
    .tooltip = Minimizar
adrenaline-panel-ui-gradient-generator-custom-color = Color personalizado
adrenaline-copy-current-url-confirmation = ¡URL actual copiada!
adrenaline-copy-current-url-as-markdown-confirmation = ¡La URL actual se copió como Markdown!
adrenaline-general-cancel-label = 
    .label = Cancelar
adrenaline-general-confirm = 
    .label = Confirmar
adrenaline-pinned-tab-replaced = La URL de la pestaña fijada se ha reemplazado por la URL actual.
adrenaline-tabs-renamed = ¡La pestaña se ha renombrado con éxito!
adrenaline-background-tab-opened-toast = ¡Nueva pestaña abierta en segundo plano!
adrenaline-workspace-renamed-toast = ¡El espacio de trabajo ha sido renombrado con éxito!
adrenaline-split-view-limit-toast = ¡No se pueden añadir más paneles a la vista dividida!
adrenaline-toggle-compact-mode-button = 
    .label = Modo compacto
    .tooltiptext = Alternar modo compacto

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Más información
adrenaline-close-label = Cerrar
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Buscar...
adrenaline-icons-picker-emoji = 
    .label = Emojis
adrenaline-icons-picker-svg = 
    .label = Iconos
urlbar-search-mode-adrenaline_actions = Acciones
adrenaline-site-data-settings = Ajustes
adrenaline-generic-manage = Administrar
adrenaline-generic-more = Más
adrenaline-generic-next = Siguiente
adrenaline-essentials-promo-label = Añadir a esenciales
adrenaline-essentials-promo-sublabel = Mantenga sus pestañas favoritas a solo un clic de distancia
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Permitido
adrenaline-site-data-setting-block = Bloqueado
adrenaline-site-data-protections-enabled = Activada
adrenaline-site-data-protections-disabled = Desactivada
adrenaline-site-data-setting-cross-site = Cookie de terceros
adrenaline-site-data-security-info-extension = 
    .label = Extensión
adrenaline-site-data-security-info-secure = 
    .label = Seguro
adrenaline-site-data-security-info-not-secure = 
    .label = No seguro
adrenaline-site-data-manage-addons = 
    .label = Administrar extensiones
adrenaline-site-data-get-addons = 
    .label = Añadir extensión
adrenaline-site-data-site-settings = 
    .label = Todas las configuraciones del sitio
adrenaline-site-data-header-share = 
    .tooltiptext = Compartir esta página
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Entrar en modo lectura
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Tomar una captura de pantalla
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Añadir esta página a marcadores
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Copiar URL
adrenaline-site-data-setting-site-protection = Protección contra el rastreo

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Un nuevo hogar para complementos, permisos y más
adrenaline-site-data-panel-feature-callout-subtitle = Haga clic en el icono para administrar la configuración del sitio, ver información de seguridad, acceder a extensiones, y realizar acciones comunes.
adrenaline-open-link-in-glance = 
    .label = Abrir enlace en Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = ¡Actualización completada!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Novedades en { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Ver notas de la versión
adrenaline-sidebar-notification-restart-safe-mode-label = ¿Algo dejó de funcionar?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Reiniciar en modo seguro
adrenaline-window-sync-migration-dialog-title = Mantenga sus ventanas sincronizadas
adrenaline-window-sync-migration-dialog-message = Ahora Adrenaline sincroniza las ventanas en el mismo dispositivo, por lo que los cambios en una ventana se reflejan en las demás instantáneamente.
adrenaline-window-sync-migration-dialog-learn-more = Más información
adrenaline-window-sync-migration-dialog-accept = Entendido
adrenaline-appmenu-new-blank-window = 
    .label = Nueva ventana en blanco
