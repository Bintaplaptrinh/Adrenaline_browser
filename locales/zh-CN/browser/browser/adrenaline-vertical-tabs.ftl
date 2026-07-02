# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = 右侧标签页
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = 简洁模式
adrenaline-toolbar-context-compact-mode-enable = 
    .label = 启用简洁模式
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = 隐藏侧边栏
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = 隐藏工具栏
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = 两者都隐藏
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = 移动到文件夹…
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = 新建文件夹
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = 展开侧边栏
sidebar-adrenaline-create-new = 
    .label = 新建…
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] 卸载并切换到标签页
           *[other] 卸载 { $tabCount } 个标签页并切换到首个
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] 重置并固定标签页
           *[other] 重置并固定 { $tabCount } 个标签页
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] 返回标签页
        [adrenaline-default-pinned-cmd] 从标签页分离
       *[other] { $tabSubtitle }
    }
