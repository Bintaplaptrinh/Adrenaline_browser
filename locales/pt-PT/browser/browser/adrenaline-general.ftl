# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = perfil atual
unified-extensions-description = As extensões são usadas para trazer funcionalidades adicionais para o { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Repor Separador Essencial
           *[false] Repor Separador Fixado
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Adicionar aos Essenciais
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } espaços preenchidos
tab-context-adrenaline-remove-essential = 
    .label = Remover dos Essenciais
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Substituir URL Essencial com o Atual
           *[false] Substituir URL Fixado com o Atual
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Alterar etiqueta...
tab-context-adrenaline-edit-icon = 
    .label = Alterar ícone...
adrenaline-themes-corrupted = O seu ficheiro de modificações do { -brand-short-name } está corrompido. Elas foram redefinidas como iguais às do tema padrão.
adrenaline-shortcuts-corrupted = O seu ficheiro de atalhos do { -brand-short-name } está corrompido. Eles foram redefinidos para os atalhos padrão.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    A nova barra de URL foi ativada, removendo a necessidade de páginas de novo separador.<br/><br/>
    Experimente abrir um novo separador para ver a nova barra de URL em ação!
adrenaline-disable = Desativar
pictureinpicture-minimize-btn = 
    .aria-label = Minimizar
    .tooltip = Minimizar
adrenaline-panel-ui-gradient-generator-custom-color = Cor personalizada
adrenaline-copy-current-url-confirmation = URL atual copiado!
adrenaline-copy-current-url-as-markdown-confirmation = URL atual copiado em Markdown!
adrenaline-general-cancel-label = 
    .label = Cancelar
adrenaline-general-confirm = 
    .label = Confirmar
adrenaline-pinned-tab-replaced = O URL do separador fixado foi substituído pelo URL atual.
adrenaline-tabs-renamed = Nome do separador alterado com sucesso!
adrenaline-background-tab-opened-toast = Novo separador aberto em segundo plano!
adrenaline-workspace-renamed-toast = Nome do espaço de trabalho alterado com sucesso!
adrenaline-split-view-limit-toast = Não é possível adicionar mais painéis à vista dividida!
adrenaline-toggle-compact-mode-button = 
    .label = Modo Compacto
    .tooltiptext = Alternar Modo Compacto

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Saber Mais
adrenaline-close-label = Fechar
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Pesquisar...
adrenaline-icons-picker-emoji = 
    .label = Emojis
adrenaline-icons-picker-svg = 
    .label = Ícones
urlbar-search-mode-adrenaline_actions = Ações
adrenaline-site-data-settings = Definições
adrenaline-generic-manage = Gerir
adrenaline-generic-more = Mais
adrenaline-generic-next = Seguinte
adrenaline-essentials-promo-label = Adicionar aos Essenciais
adrenaline-essentials-promo-sublabel = Mantenha os seus separadores favoritos a um clique de distância
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Permitido
adrenaline-site-data-setting-block = Bloqueado
adrenaline-site-data-protections-enabled = Ativado
adrenaline-site-data-protections-disabled = Desativado
adrenaline-site-data-setting-cross-site = Cookies entre sites
adrenaline-site-data-security-info-extension = 
    .label = Extensão
adrenaline-site-data-security-info-secure = 
    .label = Seguro
adrenaline-site-data-security-info-not-secure = 
    .label = Não Seguro
adrenaline-site-data-manage-addons = 
    .label = Gerir Extensões
adrenaline-site-data-get-addons = 
    .label = Adicionar Extensões
adrenaline-site-data-site-settings = 
    .label = Todas as Definições do Site
adrenaline-site-data-header-share = 
    .tooltiptext = Partilhar Esta Página
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Entrar no Modo Leitura
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Tirar uma Captura de Ecrã
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Adicionar esta Página aos Favoritos
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Copiar URL
adrenaline-site-data-setting-site-protection = Proteção contra rastreio

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Uma nova casa para extensões, permissões e mais
adrenaline-site-data-panel-feature-callout-subtitle = Clique no ícone para gerir definições do site, ver informações de segurança, extensões de acesso e executar ações comuns.
adrenaline-open-link-in-glance = 
    .label = Abrir Link no Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Atualização Concluída!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = O que há de novo no { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Ver Notas de Lançamento
adrenaline-sidebar-notification-restart-safe-mode-label = Falhou alguma coisa?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Reiniciar em Modo de Segurança
adrenaline-window-sync-migration-dialog-title = Mantenha As Suas Janelas Sincronizadas
adrenaline-window-sync-migration-dialog-message = Agora, o Adrenaline sincroniza as janelas no dispositivo, pelo que alterações numa janela são refletidas instantaneamente nas outras.
adrenaline-window-sync-migration-dialog-learn-more = Saber Mais
adrenaline-window-sync-migration-dialog-accept = Entendido
adrenaline-appmenu-new-blank-window = 
    .label = Nova janela sem sincronização
