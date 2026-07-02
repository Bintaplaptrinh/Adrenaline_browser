# adrenaline_brow — changes on top of Adrenaline Browser

This is a fork of [adrenaline-browser/desktop](https://github.com/adrenaline-browser/desktop)
(Firefox `152.0.4`). Adrenaline ships as a set of patches/overlays that the `surfer`
build tool applies on top of a downloaded Firefox source tree (`engine/`). All
customizations therefore live under `src/`, `prefs/`, `configs/`, and
`locales/` — the Firefox source itself is fetched during `npm run init`.

## 1. Source

Cloned from `https://github.com/adrenaline-browser/desktop` (branch: stable).

## 2. Privacy — removed Adrenaline's own "phone-home" services (kept Firefox/Mozilla)

Adrenaline already disables Firefox telemetry via `prefs/privatefox/privacy.yaml` and
`disablemozilla.yaml` (telemetry, health report, Normandy, crash auto-submit,
etc.). On top of that, the following **Adrenaline-operated** background calls were
neutralized while leaving Mozilla/Firefox services intact:

| What | Before | After |
|------|--------|-------|
| App auto-update host | `updates.adrenaline-browser.app` (Adrenaline server) | Restored to Firefox default `aus5.mozilla.org` — removed `src/build/moz-build.patch`; set `surfer.json` → `updateHostname: aus5.mozilla.org` |
| Adrenaline mods/theme auto-update | background timer fetch of manifests from `adrenaline-browser.github.io` | Disabled: `adrenaline.mods.auto-update = false` (in `prefs/adrenaline/mods.yaml` and the settings default in `adrenaline-settings.js`). Marketplace still works for **manual** installs. |

Scope chosen: **repoint updates to Mozilla** + **remove only covert/background
phone-home**. User-initiated integrations (mods marketplace, GitHub live
folders, site injection on adrenaline-browser.app) were intentionally left in place.

No third-party analytics/crash endpoints (Sentry, GA, Plausible, etc.) exist in
the tree — verified by search.

## 3. Title bar — new "fixed" mode (default) with "floating" option

New preference **`adrenaline.view.titlebar-mode`** — `"fixed"` (default) or `"float"`.

- **fixed** (default): a title bar where the active page title is centered and
  minimize / maximize / close buttons sit on the right (classic layout).
- **float**: Adrenaline's original floating title bar.

Toggle in **Settings → Look and Feel → Title Bar**.

Files added:
- `prefs/adrenaline/titlebar.yaml` — the pref (default `fixed`).
- `src/adrenaline/common/modules/AdrenalineTitlebar.mjs` — builds the bar, keeps the title in
  sync with the active tab, draws min/max/close, and reacts to the pref live.
- `src/adrenaline/common/styles/adrenaline-titlebar.css` — styling; window-control glyphs are
  drawn in pure CSS (no icon-file dependency). Hides Adrenaline's floating controls
  while in fixed mode to avoid duplicates.

Files wired:
- `src/adrenaline/common/jar.inc.mn` — registers the module + stylesheet.
- `src/browser/base/content/adrenaline-assets.inc.xhtml` — links the stylesheet.
- `src/adrenaline/common/modules/AdrenalineStartup.mjs` — initializes the manager on startup.
- `src/browser/components/preferences/adrenalineLooksAndFeel.inc.xhtml` + `adrenaline-settings.js`
  — the settings UI + pref registration.
- `locales/en-US/.../adrenaline-preferences.ftl` and `adrenaline-general.ftl` — English strings.

## Building

Requires the standard Firefox build prerequisites (see Adrenaline docs). From the repo:

```
npm install
npm run init      # downloads Firefox source + imports Adrenaline/our patches + bootstrap
npm run build
npm start         # run the built browser
```

To change the title bar mode without the UI: set `adrenaline.view.titlebar-mode` to
`fixed` or `float` in `about:config`.

## Notes / not yet verified

These changes are source-level and consistent (JS/YAML/FTL validated), but a
full `mach` build was not run in this environment. The title-bar element
placement and glyph styling are best-effort and may need visual fine-tuning
once built (e.g. exact position within `#navigator-toolbox`, per-OS spacing).
