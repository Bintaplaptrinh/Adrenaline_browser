<!--
   - This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at http://mozilla.org/MPL/2.0/.
   -->

# Adrenaline Browser

Adrenaline is a free, open-source web browser built on Mozilla Firefox, focused on pushing your productivity to a new level. It ships features like workspaces/spaces, split view, vertical tabs, live folders, mods (boosts), and a customizable new-tab experience — all on top of the latest stable Firefox engine.

**Status: Open Beta** - expect rough edges. Please report bugs on the [issue tracker](https://github.com/adrenaline-browser/desktop/issues).

## About this project

Adrenaline is an independent community fork derived from the open-source codebase of the Zen Browser project (itself based on Firefox), used under the terms of the Mozilla Public License 2.0.

- **Adrenaline is not Zen Browser.** It is a separate project with its own name, logo, branding, settings, and release channel, as required by the Zen Browser branding/trademark terms. No Zen names, logos, or icons are used anywhere in this project.
- Adrenaline is **not affiliated with, endorsed by, or supported by** the Zen Browser team or the Mozilla Foundation/Corporation. "Firefox" and "Zen Browser" are trademarks of their respective owners.
- All source code is available under the [Mozilla Public License 2.0](./LICENSE). We are grateful to the Mozilla and Zen communities whose work made this project possible.

## Downloads & links

| | |
|---|---|
| Download | Coming Soon |
| Website | Coming Soon |
| Documentation | Coming Soon |
| Release Notes | Coming Soon |

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

## Privacy & security

Adrenaline disables Firefox telemetry, data reporting, Normandy/experiments, and automatic crash-report submission by default. Security issues should be reported privately via [security advisories](https://github.com/adrenaline-browser/desktop/security/advisories/new) — see [SECURITY.md](./SECURITY.md).

## Contributing

Adrenaline is an open-source project - contributions are welcome. Please read the [contribution guidelines](./docs/contribute.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md) before getting started.

## License

[Mozilla Public License 2.0](./LICENSE)
