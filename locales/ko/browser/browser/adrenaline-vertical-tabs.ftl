# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-toolbar-context-tabs-right = 
    .label = 탭을 우측으로 놓기
    .accesskey = R
adrenaline-toolbar-context-compact-mode = 
    .label = 사이드바 축소 모드
adrenaline-toolbar-context-compact-mode-enable = 
    .label = 사이드바 축소 모드 활성화
    .accesskey = D
adrenaline-toolbar-context-compact-mode-just-tabs = 
    .label = 사이드바 숨기기
adrenaline-toolbar-context-compact-mode-just-toolbar = 
    .label = 툴바 숨기기
adrenaline-toolbar-context-compact-mode-hide-both = 
    .label = 둘 다 숨기기
    .accesskey = H
adrenaline-toolbar-context-move-to-folder = 
    .label = 폴더로 옮기기...
    .accesskey = M
adrenaline-toolbar-context-new-folder = 
    .label = 새 폴더
    .accesskey = N
sidebar-adrenaline-expand = 
    .label = 사이드바 확장
sidebar-adrenaline-create-new = 
    .label = 새로 만들기...
tabbrowser-unload-tab-button = 
    .tooltiptext =
        { $tabCount ->
            [one] 언로드 후 탭 변경
           *[other] { $tabCount }개 탭 언로드 후 첫 번째 탭으로 변경
        }
tabbrowser-reset-pin-button = 
    .tooltiptext =
        { $tabCount ->
            [one] 탭 초기화 후 고정
           *[other] { $tabCount }개 탭 초기화 후 고정
        }
adrenaline-tab-sublabel =
    { $tabSubtitle ->
        [adrenaline-default-pinned] 고정된 URL로 돌아가기
        [adrenaline-default-pinned-cmd] 고정된 탭에서 분리
       *[other] { $tabSubtitle }
    }
