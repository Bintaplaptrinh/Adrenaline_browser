# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = 현재 프로필
unified-extensions-description = 확장 프로그램은 { -brand-short-name }에 더 많은 추가 기능을 제공하는 데 사용됩니다.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] 에센셜 탭 초기화
           *[false] 고정된 탭 초기화
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = 에센셜에 추가
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max }개 추가됨
tab-context-adrenaline-remove-essential = 
    .label = 에센셜에서 제거하기
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] 에센셜 탭을 현재 URL로 초기화
           *[false] 고정된 탭을 현재 URL로 초기화
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = 라벨 편집...
tab-context-adrenaline-edit-icon = 
    .label = 아이콘 편집...
adrenaline-themes-corrupted = { -brand-short-name } 모드 파일이 손상되었습니다. 기본 테마로 재설정되었습니다.
adrenaline-shortcuts-corrupted = { -brand-short-name } 단축키 파일이 손상되었습니다. 기본 단축키 설정으로 재설정 되었습니다.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    새 탭 페이지가 필요 없는 새로운 주소 표시줄이 활성화 되었습니다.<br/><br/>
    새 탭을 열어서 새로운 URL 바를 만나보세요!
adrenaline-disable = 비활성화
pictureinpicture-minimize-btn = 
    .aria-label = 최소화
    .tooltip = 최소화
adrenaline-panel-ui-gradient-generator-custom-color = 커스텀 색상
adrenaline-copy-current-url-confirmation = 현재 URL을 복사했습니다!
adrenaline-copy-current-url-as-markdown-confirmation = 현재 URL을 마크다운으로 복사했습니다!
adrenaline-general-cancel-label = 
    .label = 취소
adrenaline-general-confirm = 
    .label = 확인
adrenaline-pinned-tab-replaced = 고정 URL이 현재 URL로 변경되었습니다!
adrenaline-tabs-renamed = 탭의 이름이 성공적으로 변경되었습니다!
adrenaline-background-tab-opened-toast = 새 백그라운드 탭이 열렸습니다!
adrenaline-workspace-renamed-toast = 워크스페이스 이름이 변경되었습니다!
adrenaline-split-view-limit-toast = 패널을 더 추가할 수 없습니다!
adrenaline-toggle-compact-mode-button = 
    .label = 사이드바 축소 모드
    .tooltiptext = 사이드바 축소 토글

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = 더 알아보기
adrenaline-close-label = 닫기
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = 검색...
adrenaline-icons-picker-emoji = 
    .label = 이모티콘
adrenaline-icons-picker-svg = 
    .label = 아이콘
urlbar-search-mode-adrenaline_actions = 액션
adrenaline-site-data-settings = 설정
adrenaline-generic-manage = 관리
adrenaline-generic-more = 더 보기
adrenaline-generic-next = 다음
adrenaline-essentials-promo-label = 에센셜에 추가
adrenaline-essentials-promo-sublabel = 가장 좋아하는 탭을 바로 열 수 있게
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = 허용됨
adrenaline-site-data-setting-block = 금지됨
adrenaline-site-data-protections-enabled = 활성화됨
adrenaline-site-data-protections-disabled = 비활성화됨
adrenaline-site-data-setting-cross-site = 사이트 간 공유 쿠키
adrenaline-site-data-security-info-extension = 
    .label = 확장
adrenaline-site-data-security-info-secure = 
    .label = 안전함
adrenaline-site-data-security-info-not-secure = 
    .label = 안전하지 않음
adrenaline-site-data-manage-addons = 
    .label = 확장 프로그램 관리
adrenaline-site-data-get-addons = 
    .label = 확장 프로그램 추가
adrenaline-site-data-site-settings = 
    .label = 모든 사이트 설정
adrenaline-site-data-header-share = 
    .tooltiptext = 이 페이지 공유
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = 읽기 모드 켜기
adrenaline-site-data-header-screenshot = 
    .tooltiptext = 화면 캡쳐
adrenaline-site-data-header-bookmark = 
    .tooltiptext = 이 페이지 북마크
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = URL 복사
adrenaline-site-data-setting-site-protection = 추적 보호

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = 애드온, 권한, 그리고 더 많은 것을 위한 새로운 곳
adrenaline-site-data-panel-feature-callout-subtitle = 아이콘을 클릭해 사이트 설정, 보안 정보 조회, 확장 프로그램 접근, 기타 행동을 수행할 수 있습니다.
adrenaline-open-link-in-glance = 
    .label = 글랜스로 링크 열기
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = 업데이트 완료!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = { -brand-short-name }의 새로운 기능
adrenaline-sidebar-notification-updated-tooltip = 
    .title = 업데이트 기록 보기
adrenaline-sidebar-notification-restart-safe-mode-label = 무언가 고장났나요?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = 안전 모드로 다시 시작
adrenaline-window-sync-migration-dialog-title = 창을 동기화 상태로 유지
adrenaline-window-sync-migration-dialog-message = Adrenaline이 이제 같은 기기에서 창을 동기화합니다. 한 창에서의 변경이 다른 창에서도 즉시 적용됩니다.
adrenaline-window-sync-migration-dialog-learn-more = 더 알아보기
adrenaline-window-sync-migration-dialog-accept = 알겠습니다
adrenaline-appmenu-new-blank-window = 
    .label = 새 빈 창
