#!/usr/bin/env bash
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#
# Builds a Debian/Ubuntu .deb package from a Linux release tarball
# (the adrenaline-*.tar.xz produced by `npm run package`).
#
# Usage:
#   scripts/package-deb.sh [--tarball <path>] [--arch x86_64|aarch64]
#                          [--version <display-version>] [--out <dir>]
#
# Defaults: tarball is auto-detected in dist/, arch is x86_64, version is
# read from surfer.json (brands.release.release.displayVersion), output
# goes to dist/.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

TARBALL=""
ARCH="x86_64"
VERSION=""
OUT_DIR="$REPO_ROOT/dist"

while [ $# -gt 0 ]; do
  case "$1" in
    --tarball) TARBALL="$2"; shift 2 ;;
    --arch)    ARCH="$2";    shift 2 ;;
    --version) VERSION="$2"; shift 2 ;;
    --out)     OUT_DIR="$2"; shift 2 ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; exit 1 ;;
  esac
done

case "$ARCH" in
  x86_64)  DEB_ARCH="amd64" ;;
  aarch64) DEB_ARCH="arm64" ;;
  *) echo "Unsupported arch: $ARCH (expected x86_64 or aarch64)" >&2; exit 1 ;;
esac

if [ -z "$TARBALL" ]; then
  TARBALL="$(ls "$REPO_ROOT"/dist/adrenaline-*.tar.xz 2>/dev/null | head -n1 || true)"
  if [ -z "$TARBALL" ]; then
    echo "No tarball found in dist/. Run 'npm run package' first or pass --tarball." >&2
    exit 1
  fi
fi

if [ -z "$VERSION" ]; then
  VERSION="$(node -p "require('$REPO_ROOT/surfer.json').brands.release.release.displayVersion")"
fi

PKG_NAME="adrenaline-browser"
STAGING="$(mktemp -d)"
trap 'rm -rf "$STAGING"' EXIT

echo "Packaging $PKG_NAME $VERSION ($DEB_ARCH) from $TARBALL"

# Application files -> /usr/lib/adrenaline
install -d "$STAGING/usr/lib"
tar -xJf "$TARBALL" -C "$STAGING/usr/lib"
if [ ! -d "$STAGING/usr/lib/adrenaline" ]; then
  # Tarball may extract to a differently named single top-level directory
  EXTRACTED="$(ls "$STAGING/usr/lib" | head -n1)"
  mv "$STAGING/usr/lib/$EXTRACTED" "$STAGING/usr/lib/adrenaline"
fi

# There is no auto-update infrastructure for the .deb; updates come through
# new package versions, so disable the in-app updater.
install -Dm644 "$REPO_ROOT/build/AppDir/distribution/policies.json" \
  "$STAGING/usr/lib/adrenaline/distribution/policies.json"

# Launcher symlink
install -d "$STAGING/usr/bin"
ln -s /usr/lib/adrenaline/adrenaline "$STAGING/usr/bin/adrenaline"

# Desktop entry (reuse the AppImage one, minus the AppImage-only key)
install -d "$STAGING/usr/share/applications"
grep -v '^X-AppImage-Version=' "$REPO_ROOT/build/AppDir/adrenaline.desktop" \
  > "$STAGING/usr/share/applications/adrenaline.desktop"

# Icons
for size in 16 22 24 32 48 64 128 256 512; do
  icon="$REPO_ROOT/configs/branding/release/logo${size}.png"
  if [ -f "$icon" ]; then
    install -Dm644 "$icon" \
      "$STAGING/usr/share/icons/hicolor/${size}x${size}/apps/adrenaline.png"
  fi
done

# Normalize permissions (mktemp creates 0700, tarballs may carry group-write)
chmod 755 "$STAGING"
chmod -R u+rwX,go+rX,go-w "$STAGING"

INSTALLED_SIZE="$(du -sk "$STAGING" | cut -f1)"

install -d "$STAGING/DEBIAN"
cat > "$STAGING/DEBIAN/control" <<EOF
Package: $PKG_NAME
Version: $VERSION
Architecture: $DEB_ARCH
Maintainer: Adrenaline OSS Team <tuanphatnguyenhuu@gmail.com>
Installed-Size: $INSTALLED_SIZE
Depends: libc6, libgcc-s1, libstdc++6, libglib2.0-0t64 | libglib2.0-0, libgtk-3-0t64 | libgtk-3-0, libasound2t64 | libasound2, libdbus-1-3, libfontconfig1, libfreetype6, libx11-6, libx11-xcb1, libxcb1, libxcomposite1, libxdamage1, libxext6, libxfixes3, libxrandr2, libxtst6, libpango-1.0-0, libcairo2
Recommends: libpulse0
Provides: www-browser
Section: web
Priority: optional
Homepage: https://github.com/Bintaplaptrinh/Adrenaline_browser
Description: Adrenaline Browser
 A fast, private and secure web browser built on Firefox, focused on
 pushing your productivity to a new level - workspaces, split view,
 vertical tabs, live folders, mods and a customizable new-tab experience.
EOF

install -d "$OUT_DIR"
DEB_FILE="$OUT_DIR/${PKG_NAME}_${VERSION}_${DEB_ARCH}.deb"
dpkg-deb --build --root-owner-group -Zxz "$STAGING" "$DEB_FILE"
echo "Created $DEB_FILE"
