# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = 使用中のプロファイル
unified-extensions-description = 拡張機能は{ -brand-short-name }に多く追加機能をもたらすために使用されます。
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Essentialタブの遷移をリセット
           *[false] ピン留めされたタブの遷移をリセット
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Essentialsに追加
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }スロットがいっぱいです
tab-context-adrenaline-remove-essential = 
    .label = Essentialsから削除
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] EssentialタブのURLを今開いているURLで置き換える
           *[false] ピン留めされたタブのURLを今開いているURLで置き換える
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = ラベルを変更する...
tab-context-adrenaline-edit-icon = 
    .label = アイコンを変更する...
adrenaline-themes-corrupted = { -brand-short-name }モッドファイルが文字化けしています。デフォルトのテーマにリセットされました。
adrenaline-shortcuts-corrupted = { -brand-short-name }ショートカットファイルが文字化けしています。デフォルトのショートカットにリセットされました。
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    新しいURLバーが有効になり、新しいタブページの必要性がなくなりました。<br/><br/>
    新しいタブを開いて、新しいURLバーを表示してみてください！
adrenaline-disable = 無効
pictureinpicture-minimize-btn = 
    .aria-label = 最小化
    .tooltip = 最小化
adrenaline-panel-ui-gradient-generator-custom-color = カスタムカラー
adrenaline-copy-current-url-confirmation = URLをクリップボードにコピーしました！
adrenaline-copy-current-url-as-markdown-confirmation = URLをMarkdownとしてコピーしました！
adrenaline-general-cancel-label = 
    .label = キャンセル
adrenaline-general-confirm = 
    .label = 確定
adrenaline-pinned-tab-replaced = 固定したタブのURLが現在のURLに置き換えられました！
adrenaline-tabs-renamed = タブの名前は無事に変更されました！
adrenaline-background-tab-opened-toast = 新しい背景タブが開きました！
adrenaline-workspace-renamed-toast = ワークスペースの名前が変更されました！
adrenaline-split-view-limit-toast = 分割ビューにこれ以上パネルを追加できません！
adrenaline-toggle-compact-mode-button = 
    .label = コンパクトモード
    .tooltiptext = コンパクトモードの切り替え

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = もっと詳しく知る
adrenaline-close-label = 閉じる
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = 検索…
adrenaline-icons-picker-emoji = 
    .label = 絵文字
adrenaline-icons-picker-svg = 
    .label = アイコン
urlbar-search-mode-adrenaline_actions = アクション
adrenaline-site-data-settings = 設定
adrenaline-generic-manage = 管理
adrenaline-generic-more = その他
adrenaline-generic-next = 次へ
adrenaline-essentials-promo-label = Essentialsに追加
adrenaline-essentials-promo-sublabel = お気に入りのタブをワンクリックで表示
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = 許可済み
adrenaline-site-data-setting-block = ブロック済み
adrenaline-site-data-protections-enabled = 有効
adrenaline-site-data-protections-disabled = 無効
adrenaline-site-data-setting-cross-site = クロスサイトクッキー
adrenaline-site-data-security-info-extension = 
    .label = 拡張機能
adrenaline-site-data-security-info-secure = 
    .label = 保護されています
adrenaline-site-data-security-info-not-secure = 
    .label = 保護されていません
adrenaline-site-data-manage-addons = 
    .label = 拡張機能を管理
adrenaline-site-data-get-addons = 
    .label = 拡張機能を追加
adrenaline-site-data-site-settings = 
    .label = すべてのサイト設定
adrenaline-site-data-header-share = 
    .tooltiptext = このページをシェアする
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = リーダーモードにする
adrenaline-site-data-header-screenshot = 
    .tooltiptext = スクリーンショットを撮る
adrenaline-site-data-header-bookmark = 
    .tooltiptext = このページをブックマークに登録する
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = URLをコピーする
adrenaline-site-data-setting-site-protection = トラッキング保護

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = アドオン、権限などの新しいホーム
adrenaline-site-data-panel-feature-callout-subtitle = アイコンをクリックすると、サイト設定の管理、セキュリティ情報の表示、拡張機能へのアクセス、一般的なアクションが行えます。
adrenaline-open-link-in-glance = 
    .label = Glanceでリンクを開く
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = アップデートが完了しました！

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = { -brand-short-name }の新機能
adrenaline-sidebar-notification-updated-tooltip = 
    .title = リリースノートを表示する
adrenaline-sidebar-notification-restart-safe-mode-label = 何か壊れましたか？
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = セーフモードで再起動する
adrenaline-window-sync-migration-dialog-title = Windowsを同期させておく
adrenaline-window-sync-migration-dialog-message = Adrenalineは同一デバイス内のウィンドウを同期するようになり、１つのウィンドウでの操作が、他のウィンドウに、即座に反映されます。
adrenaline-window-sync-migration-dialog-learn-more = もっと詳しく
adrenaline-window-sync-migration-dialog-accept = わかりました
adrenaline-appmenu-new-blank-window = 
    .label = 新しい空のウィンドウ
