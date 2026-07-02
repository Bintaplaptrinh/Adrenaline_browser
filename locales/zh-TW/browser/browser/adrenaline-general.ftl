# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = 當前設定檔
unified-extensions-description = 擴充功能可為 { -brand-short-name } 帶來更多額外功能。
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] 重置Essentials
           *[false] 重置釘選分頁
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = 新增至 Essentials
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = 從 Essentials 中移除
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] 以當前網址替換Essentials
           *[false] 以當前網址替換釘選分頁
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = 重新命名
tab-context-adrenaline-edit-icon = 
    .label = 變更圖示
adrenaline-themes-corrupted = 你的 { -brand-short-name } 模組文件已損壞，它們已重設為預設主題。
adrenaline-shortcuts-corrupted = 你的 { -brand-short-name } 快捷鍵文件已損壞。已被重設為預設值。
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification = 新的 URL 欄已啟用，你不再需要新增新分頁。<br/><br/>馬上打開新分頁來看看新的 URL 欄！
adrenaline-disable = 停用
pictureinpicture-minimize-btn = 
    .aria-label = 最小化
    .tooltip = 最小化
adrenaline-panel-ui-gradient-generator-custom-color = 自訂顏色
adrenaline-copy-current-url-confirmation = 網址已複製到剪貼簿！
adrenaline-copy-current-url-as-markdown-confirmation = 已以Markdown格式複製當前網址！
adrenaline-general-cancel-label = 
    .label = 取消
adrenaline-general-confirm = 
    .label = 確認
adrenaline-pinned-tab-replaced = 釘選分頁網址已替換為當前網址！
adrenaline-tabs-renamed = 成功重新命名分頁！
adrenaline-background-tab-opened-toast = 新分頁已在背景開啟！
adrenaline-workspace-renamed-toast = 成功重新命名工作區！
adrenaline-split-view-limit-toast = 無法加入更多分頁至分割畫面！
adrenaline-toggle-compact-mode-button = 
    .label = 緊湊模式
    .tooltiptext = 切換緊湊模式

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = 瞭解更多
adrenaline-close-label = 關閉
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = 搜尋...
adrenaline-icons-picker-emoji = 
    .label = 表情符號
adrenaline-icons-picker-svg = 
    .label = 圖示
urlbar-search-mode-adrenaline_actions = 操作
adrenaline-site-data-settings = 設定
adrenaline-generic-manage = 管理
adrenaline-generic-more = 更多
adrenaline-generic-next = 下一個
adrenaline-essentials-promo-label = 新增至 Essentials
adrenaline-essentials-promo-sublabel = 僅需點擊一下就能切換至您的最愛分頁
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = 允許
adrenaline-site-data-setting-block = 已封鎖
adrenaline-site-data-protections-enabled = 已啟用
adrenaline-site-data-protections-disabled = 已停用
adrenaline-site-data-setting-cross-site = 跨站 cookie
adrenaline-site-data-security-info-extension = 
    .label = 擴充套件
adrenaline-site-data-security-info-secure = 
    .label = 安全
adrenaline-site-data-security-info-not-secure = 
    .label = 不安全
adrenaline-site-data-manage-addons = 
    .label = 管理擴充套件
adrenaline-site-data-get-addons = 
    .label = 新增擴充套件
adrenaline-site-data-site-settings = 
    .label = 全部網站的設定
adrenaline-site-data-header-share = 
    .tooltiptext = 分享此頁面
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = 進入閱讀模式
adrenaline-site-data-header-screenshot = 
    .tooltiptext = 擷取螢幕
adrenaline-site-data-header-bookmark = 
    .tooltiptext = 將此頁加入書籤
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = 複製網址
adrenaline-site-data-setting-site-protection = 追蹤器保護

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = 擴充套件、權限管理與其他功能的新家
adrenaline-site-data-panel-feature-callout-subtitle = 按這個圖示來管理網站設定、查看安全性資訊、存取擴充套件與執行基本動作。
adrenaline-open-link-in-glance = 
    .label = 在 Glance 內開啟連結
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = 更新成功！

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = { -brand-short-name } 更新了什麼
adrenaline-sidebar-notification-updated-tooltip = 
    .title = 查看版本資訊
adrenaline-sidebar-notification-restart-safe-mode-label = 有東西壞掉了嗎？
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = 在安全模式下重新啟動
adrenaline-window-sync-migration-dialog-title = 讓您的視窗處於同步狀態
adrenaline-window-sync-migration-dialog-message = Adrenaline現在能同步同裝置上的各個視窗，在某一視窗上的變動將會立即在其它視窗上反映出來。
adrenaline-window-sync-migration-dialog-learn-more = 了解更多
adrenaline-window-sync-migration-dialog-accept = 明白了
adrenaline-appmenu-new-blank-window = 
    .label = 開新簡白視窗
