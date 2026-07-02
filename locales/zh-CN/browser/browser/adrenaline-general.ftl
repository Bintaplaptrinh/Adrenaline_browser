# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = 当前配置
unified-extensions-description = 扩展用于为 { -brand-short-name } 带来更多额外功能。
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] 重置常驻标签页
           *[false] 重置标签页
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = 添加到常驻标签页
    .accesskey = E
tab-context-adrenaline-add-essential-badge = 已使用 { $num } / { $max }
tab-context-adrenaline-remove-essential = 
    .label = 从常驻标签页中移除
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] 用当前内容替换常驻标签页URL
           *[false] 用当前内容替换标签页URL
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = 更改标签…
tab-context-adrenaline-edit-icon = 
    .label = 更改图标…
adrenaline-themes-corrupted = 您的 { -brand-short-name } 模组文件已损坏。它们已重置为默认主题。
adrenaline-shortcuts-corrupted = 您的 { -brand-short-name } 快捷键文件已损坏。它们已重置为默认快捷键。
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification = 新的地址栏已启用，不再需要新标签页。<br/><br/>打开一个新标签页来试试看新地址栏！
adrenaline-disable = 禁用
pictureinpicture-minimize-btn = 
    .aria-label = 最小化
    .tooltip = 最小化
adrenaline-panel-ui-gradient-generator-custom-color = 自定义颜色
adrenaline-copy-current-url-confirmation = 网址已复制到剪贴板！
adrenaline-copy-current-url-as-markdown-confirmation = 已将当前网址复制为 Markdown 格式！
adrenaline-general-cancel-label = 
    .label = 取消
adrenaline-general-confirm = 
    .label = 确认
adrenaline-pinned-tab-replaced = 固定标签页的网址已更新为当前页面网址！
adrenaline-tabs-renamed = 标签页重命名成功！
adrenaline-background-tab-opened-toast = 新的后台标签页已打开 ！
adrenaline-workspace-renamed-toast = 工作区重命名成功！
adrenaline-split-view-limit-toast = 无法在分屏视图中添加更多面板！
adrenaline-toggle-compact-mode-button = 
    .label = 简洁模式
    .tooltiptext = 切换简洁模式

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = 了解更多
adrenaline-close-label = 关闭
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = 搜索…
adrenaline-icons-picker-emoji = 
    .label = 表情符号
adrenaline-icons-picker-svg = 
    .label = 图标集
urlbar-search-mode-adrenaline_actions = 操作
adrenaline-site-data-settings = 设置
adrenaline-generic-manage = 管理
adrenaline-generic-more = 更多
adrenaline-generic-next = 下一步
adrenaline-essentials-promo-label = 添加到常驻标签页
adrenaline-essentials-promo-sublabel = 让您常用的标签页触手可及
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = 允许
adrenaline-site-data-setting-block = 阻止
adrenaline-site-data-protections-enabled = 开启
adrenaline-site-data-protections-disabled = 关闭
adrenaline-site-data-setting-cross-site = 跨站 Cookie
adrenaline-site-data-security-info-extension = 
    .label = 扩展
adrenaline-site-data-security-info-secure = 
    .label = 安全
adrenaline-site-data-security-info-not-secure = 
    .label = 不安全
adrenaline-site-data-manage-addons = 
    .label = 管理扩展
adrenaline-site-data-get-addons = 
    .label = 添加扩展
adrenaline-site-data-site-settings = 
    .label = 所有站点设置
adrenaline-site-data-header-share = 
    .tooltiptext = 分享此页面
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = 进入阅读模式
adrenaline-site-data-header-screenshot = 
    .tooltiptext = 截图
adrenaline-site-data-header-bookmark = 
    .tooltiptext = 为此页面添加书签
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = 复制链接
adrenaline-site-data-setting-site-protection = 跟踪保护

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = 附加组件、权限和各种功能的一站式界面
adrenaline-site-data-panel-feature-callout-subtitle = 点击图标以管理站点设置、查看安全信息、访问扩展，还可执行各种操作。
adrenaline-open-link-in-glance = 
    .label = 在浮窗预览中打开链接
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = 更新完成！

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = 了解 { -brand-short-name } 的新版变化
adrenaline-sidebar-notification-updated-tooltip = 
    .title = 查看更新日志
adrenaline-sidebar-notification-restart-safe-mode-label = 出了什么问题吗？
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = 在排障模式下重启
adrenaline-window-sync-migration-dialog-title = 保持您的窗口同步
adrenaline-window-sync-migration-dialog-message = Adrenaline 现已支持同一设备上的窗口同步，一个窗口的更改将即时同步到其他窗口。
adrenaline-window-sync-migration-dialog-learn-more = 了解更多
adrenaline-window-sync-migration-dialog-accept = 知道了
adrenaline-appmenu-new-blank-window = 
    .label = 新建空白窗口
