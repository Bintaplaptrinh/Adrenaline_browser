<!--
   - This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->

# Adrenaline Browser

Adrenaline is a free, open-source web browser built on Mozilla Firefox, focused on pushing your productivity to a new level. It ships features like workspaces/spaces, split view, vertical tabs, live folders, mods (boosts), and a customizable new-tab experience - all on top of the latest stable Firefox engine.

**Status: Open Beta** - expect rough edges. Please report bugs on the [issue tracker](https://github.com/adrenaline-browser/desktop/issues).

## About this project

Adrenaline is an independent community fork derived from the open-source codebase of the Zen Browser project (itself based on Firefox), used under the terms of the Mozilla Public License 2.0.

- **Adrenaline is not Zen Browser.** It is a separate project with its own name, logo, branding, settings, and release channel, as required by the Zen Browser branding/trademark terms. No Zen names, logos, or icons are used anywhere in this project.
- Adrenaline is **not affiliated with, endorsed by, or supported by** the Zen Browser team or the Mozilla Foundation/Corporation. "Firefox" and "Zen Browser" are trademarks of their respective owners.
- All source code is available under the [Mozilla Public License 2.0](./LICENSE). We are grateful to the Mozilla and Zen communities whose work made this project possible.

## Downloads & links

| | |
|---|---|
| Download | [Latest Debian/Ubuntu packages (.deb)](https://github.com/Bintaplaptrinh/Adrenaline_browser/releases/latest) |
| Website | Coming Soon |

## Engine versions

- `Release` — built on Firefox `152.0.4`
- `Twilight` (pre-release channel) — built on Firefox `RC 152.0.4`

## Building from source

Prerequisites: Node.js (see `.nvmrc`), Python (see `.python-version`), Rust (see `.rust-toolchain`), Git, and the standard Firefox build toolchain for your platform (installed by the bootstrap step). A Firefox build needs roughly 40 GB of free disk space and several hours on a first run.

```bash
npm install          # install build tooling
npm run init         # download Firefox source, import patches, bootstrap toolchain
npm run build        # compile the browser
npm run start        # run your build (no profile)
npm run package      # create distributable installers (e.g. dist/adrenaline.installer.exe on Windows)
```

On Windows, run the above from the MozillaBuild shell. Official release binaries are produced by the CI workflows in `.github/workflows/`.

### Linux (Ubuntu/Debian)

Install the system build dependencies and the Rust toolchain first:

```bash
sudo apt update
sudo apt install -y dos2unix yasm nasm build-essential \
  libgtk2.0-dev libpython3-dev m4 uuid libasound2-dev libcurl4-openssl-dev \
  libdbus-1-dev libdrm-dev libdbus-glib-1-dev libgtk-3-dev libpulse-dev \
  libx11-xcb-dev libxt-dev xvfb lld llvm clang

# Rust (version pinned in .rust-toolchain)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$(cat .rust-toolchain)"
source "$HOME/.cargo/env"
```

Then build and package:

```bash
npm install
npm run init         # downloads Firefox source, imports patches, bootstraps the toolchain

export SURFER_PLATFORM=linux
export SURFER_COMPAT=x86_64            # or aarch64
export ADRENALINE_RELEASE=1            # release mozconfig (stripping, lld)
export ADRENALINE_GA_DISABLE_PGO=true  # PGO needs a two-stage build; skip it locally

npm run build        # compile the browser (several hours on a first run)
npm run package      # creates dist/adrenaline-<version>.en-US.linux-x86_64.tar.xz
npm run package:deb  # wraps the tarball into dist/adrenaline-browser_<version>_amd64.deb
```

Install the resulting package with:

```bash
sudo apt install ./dist/adrenaline-browser_*.deb
```

The `.deb` installs to `/usr/lib/adrenaline` with an `adrenaline` launcher on `PATH`, a desktop entry, and icons. It checks this repository's GitHub Releases for updates, then offers **Download and install update** in **Help → About Adrenaline**. Installation uses PolicyKit and apt, prompts for administrator authorization, and offers a browser restart after success. Firefox's MAR updater stays disabled for Debian installations.

### Automatic Debian releases

Pushing code to `master` runs [Debian Auto Build and Release](.github/workflows/deb-release.yml). It builds `amd64` and `arm64` packages on runners labelled `self-hosted`, `linux`, `x64`. Both builds and the updater/package tests must pass before `softprops/action-gh-release` publishes the packages to [GitHub Releases](https://github.com/Bintaplaptrinh/Adrenaline_browser/releases). If newer code arrives during a build, its superseded packages stay as workflow artifacts instead of becoming the latest release. The automated workflow does not build Windows or macOS packages. Documentation-only pushes are skipped; a manual run is available in Actions.

Each release has a unique `deb-YYYYMMDDHHMMSS` tag, a Debian package version such as `1.21.5b+20261020180000`, an `adrenaline-update.json` manifest, and `SHA256SUMS`. The browser checks one minute after startup and every six hours, ignores old builds and releases without Debian metadata, and validates the architecture, size, SHA-256, and Debian package identity before invoking apt. You can disable these checks in the About dialog or with `adrenaline.deb.updates.enabled` in `about:config`.

The runner must use Debian/Ubuntu on x86_64, have at least 60 GiB free per build, and allow noninteractive `sudo` for build dependencies and Firefox bootstrap. Keep the runner application current for Node 24 actions. The release job uses the repository's `GITHUB_TOKEN` with `contents: write`; no cross-repository deploy token or MAR signing infrastructure is needed. Builds run without PGO and LTO to reduce resource requirements. On desktop installations, apt normally installs the recommended `pkexec` package; a PolicyKit authentication agent must be running for in-browser installation.

Existing installations need to install a `.deb` containing this updater once before they can discover subsequent releases automatically. Older `.exe` releases are not used as Debian updates. To run the package/updater tests locally:

```bash
node --experimental-vm-modules tests/deb-updates.test.mjs
python3 -m unittest discover -s tests -p 'test_deb_release.py'
```

## Privacy & security

Adrenaline disables Firefox telemetry, data reporting, Normandy/experiments, and automatic crash-report submission by default. Security issues should be reported privately via [security advisories](https://github.com/adrenaline-browser/desktop/security/advisories/new) — see [SECURITY.md](./SECURITY.md).

## Contributing

Adrenaline is an open-source project - contributions are welcome. Please read the [contribution guidelines](./docs/contribute.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md) before getting started.

## License

[Mozilla Public License 2.0](./LICENSE)
