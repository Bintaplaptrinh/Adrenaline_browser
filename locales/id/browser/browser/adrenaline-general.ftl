# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

adrenaline-panel-ui-current-profile-text = profil saat ini
unified-extensions-description = Ekstensi digunakan untuk menambahkan fungsi ekstra ke { -brand-short-name }.
tab-context-adrenaline-reset-pinned-tab = 
    .label =
        { $isEssential ->
            [true] Reset Tab Esensial ke URL awal
           *[false] Reset Tab Sematan ke URL awal
        }
    .accesskey = R
tab-context-adrenaline-add-essential = 
    .label = Tambahkan ke Esensial
    .accesskey = E
tab-context-adrenaline-add-essential-badge = { $num } / { $max } slot terisi
tab-context-adrenaline-remove-essential = 
    .label = Hapus dari Esensial
    .accesskey = R
tab-context-adrenaline-replace-pinned-url-with-current = 
    .label =
        { $isEssential ->
            [true] Perbarui URL awal Tab Esensial
           *[false] Perbarui URL awal Tab Sematan
        }
    .accesskey = C
tab-context-adrenaline-edit-title = 
    .label = Ubah Label...
tab-context-adrenaline-edit-icon = 
    .label = Ubah Ikon...
adrenaline-themes-corrupted = Tidak dapat memuat file tema { -brand-short-name } Anda karena rusak. File tersebut telah diatur ulang ke tema default.
adrenaline-shortcuts-corrupted = File pintasan { -brand-short-name } Anda rusak. Mereka telah diatur ulang ke pintasan default.
# note: Do not translate the "<br/>" tags in the following string
adrenaline-new-urlbar-notification =
    Bilah URL baru telah diaktifkan, menghapus kebutuhan untuk halaman tab baru.<br/><br/>
    Coba buka tab baru untuk melihat bilah URL baru beraksi!
adrenaline-disable = Nonaktifkan
pictureinpicture-minimize-btn = 
    .aria-label = Minimalkan
    .tooltip = Minimalkan
adrenaline-panel-ui-gradient-generator-custom-color = Warna Kustom
adrenaline-copy-current-url-confirmation = URL Disalin!
adrenaline-copy-current-url-as-markdown-confirmation = URL disalin sebagai Markdown!
adrenaline-general-cancel-label = 
    .label = Batalkan
adrenaline-general-confirm = 
    .label = Konfirmasi
adrenaline-pinned-tab-replaced = URL awal dari tab yang disematkan telah diganti dengan URL saat ini.
adrenaline-tabs-renamed = Tab telah berhasil diubah namanya!
adrenaline-background-tab-opened-toast = Tab baru telah terbuka di latar belakang!
adrenaline-workspace-renamed-toast = Ruang Kerja telah berhasil diubah namanya!
adrenaline-split-view-limit-toast = Can't add more panels to the split view!
adrenaline-toggle-compact-mode-button = 
    .label = Mode Ringkas
    .tooltiptext = Aktifkan/Sembunyikan Mode Ringkas

# note: Do not translate the "<br/>" tags in the following string

adrenaline-learn-more-text = Pelajari Lebih Lanjut
adrenaline-close-label = Tutup
adrenaline-singletoolbar-urlbar-placeholder-with-name = 
    .placeholder = Cari...
adrenaline-icons-picker-emoji = 
    .label = Emoji
adrenaline-icons-picker-svg = 
    .label = Ikon
urlbar-search-mode-adrenaline_actions = Aksi
adrenaline-site-data-settings = Pengaturan
adrenaline-generic-manage = Kelola
adrenaline-generic-more = Selengkapnya
adrenaline-generic-next = Lanjut
adrenaline-essentials-promo-label = Tambahkan ke Esensial
adrenaline-essentials-promo-sublabel = Akses tab favorit Anda hanya dengan sekali klik
# These labels will be used for the site data panel settings
adrenaline-site-data-setting-allow = Diizinkan
adrenaline-site-data-setting-block = Diblokir
adrenaline-site-data-protections-enabled = Diaktifkan
adrenaline-site-data-protections-disabled = Dinonaktifkan
adrenaline-site-data-setting-cross-site = Kuki Lintas Situs
adrenaline-site-data-security-info-extension = 
    .label = Ekstensi
adrenaline-site-data-security-info-secure = 
    .label = Aman
adrenaline-site-data-security-info-not-secure = 
    .label = Tidak Aman
adrenaline-site-data-manage-addons = 
    .label = Kelola Ekstensi
adrenaline-site-data-get-addons = 
    .label = Tambahkan Ekstensi
adrenaline-site-data-site-settings = 
    .label = Semua Pengaturan Situs
adrenaline-site-data-header-share = 
    .tooltiptext = Bagikan Halaman Ini
adrenaline-site-data-header-reader-mode = 
    .tooltiptext = Masuki Mode Membaca
adrenaline-site-data-header-screenshot = 
    .tooltiptext = Ambil Tangkapan Layar
adrenaline-site-data-header-bookmark = 
    .tooltiptext = Markahi Laman Ini
adrenaline-urlbar-copy-url-button = 
    .tooltiptext = Salin URL
adrenaline-site-data-setting-site-protection = Perlindungan Pelacakan

# Section: Feature callouts

adrenaline-site-data-panel-feature-callout-title = Rumah baru untuk add-on, izin, dan lainnya
adrenaline-site-data-panel-feature-callout-subtitle = Klik ikon untuk mengelola pengaturan situs, melihat info keamanan, mengakses ekstensi, dan melakukan tindakan umum.
adrenaline-open-link-in-glance = 
    .label = Buka Tautan di Glance
    .accesskey = G
adrenaline-sidebar-notification-updated-heading = Pembaruan Selesai!

# See AdrenalineSidebarNotification.mjs to see how these would be used

adrenaline-sidebar-notification-updated-label = Apa yang baru di { -brand-short-name }
adrenaline-sidebar-notification-updated-tooltip = 
    .title = Lihat Catatan Rilis
adrenaline-sidebar-notification-restart-safe-mode-label = Ada yang rusak?
adrenaline-sidebar-notification-restart-safe-mode-tooltip = 
    .title = Mulai Ulang dalam Mode Aman
adrenaline-window-sync-migration-dialog-title = Jaga Jendela Anda Tetap Sinkron
adrenaline-window-sync-migration-dialog-message = Adrenaline kini menyinkronkan jendela pada perangkat yang sama, sehingga perubahan di satu jendela akan langsung terlihat di jendela lainnya.
adrenaline-window-sync-migration-dialog-learn-more = Pelajari Lebih Lanjut
adrenaline-window-sync-migration-dialog-accept = Oke!
adrenaline-appmenu-new-blank-window = 
    .label = Jendela Kosong Baru
