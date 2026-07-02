# adrenaline_brow — changes on top of Zen Browser

This is a fork of [zen-browser/desktop](https://github.com/zen-browser/desktop)
(Firefox `152.0.4`). Zen ships as a set of patches/overlays that the `surfer`
build tool applies on top of a downloaded Firefox source tree (`engine/`). All
customizations therefore live under `src/`, `prefs/`, `configs/`, and
`locales/` — the Firefox source itself is fetched during `npm run init`.

## 1. Source

Cloned from `https://github.com/zen-browser/desktop` (branch: stable).

## 2. Privacy — removed Zen's own "phone-home" services (kept Firefox/Mozilla)

Zen already disables Firefox telemetry via `prefs/privatefox/privacy.yaml` and
`disablemozilla.yaml` (telemetry, health report, Normandy, crash auto-submit,
etc.). On top of that, the following **Zen-operated** background calls were
neutralized while leaving Mozilla/Firefox services intact:

| What | Before | After |
|------|--------|-------|
| App auto-update host | `updates.zen-browser.app` (Zen server) | Restored to Firefox default `aus5.mozilla.org` — removed `src/build/moz-build.patch`; set `surfer.json` → `updateHostname: aus5.mozilla.org` |
| Zen mods/theme auto-update | background timer fetch of manifests from `zen-browser.github.io` | Disabled: `zen.mods.auto-update = false` (in `prefs/zen/mods.yaml` and the settings default in `zen-settings.js`). Marketplace still works for **manual** installs. |

Scope chosen: **repoint updates to Mozilla** + **remove only covert/background
phone-home**. User-initiated integrations (mods marketplace, GitHub live
folders, site injection on zen-browser.app) were intentionally left in place.

No third-party analytics/crash endpoints (Sentry, GA, Plausible, etc.) exist in
the tree — verified by search.

## 3. Title bar — new "fixed" mode (default) with "floating" option

New preference **`zen.view.titlebar-mode`** — `"fixed"` (default) or `"float"`.

- **fixed** (default): a title bar where the active page title is centered and
  minimize / maximize / close buttons sit on the right (classic layout).
- **float**: Zen's original floating title bar.

Toggle in **Settings → Look and Feel → Title Bar**.

Files added:
- `prefs/zen/titlebar.yaml` — the pref (default `fixed`).
- `src/zen/common/modules/ZenTitlebar.mjs` — builds the bar, keeps the title in
  sync with the active tab, draws min/max/close, and reacts to the pref live.
- `src/zen/common/styles/zen-titlebar.css` — styling; window-control glyphs are
  drawn in pure CSS (no icon-file dependency). Hides Zen's floating controls
  while in fixed mode to avoid duplicates.

Files wired:
- `src/zen/common/jar.inc.mn` — registers the module + stylesheet.
- `src/browser/base/content/zen-assets.inc.xhtml` — links the stylesheet.
- `src/zen/common/modules/ZenStartup.mjs` — initializes the manager on startup.
- `src/browser/components/preferences/zenLooksAndFeel.inc.xhtml` + `zen-settings.js`
  — the settings UI + pref registration.
- `locales/en-US/.../zen-preferences.ftl` and `zen-general.ftl` — English strings.

## Building

Requires the standard Firefox build prerequisites (see Zen docs). From the repo:

```
npm install
npm run init      # downloads Firefox source + imports Zen/our patches + bootstrap
npm run build
npm start         # run the built browser
```

To change the title bar mode without the UI: set `zen.view.titlebar-mode` to
`fixed` or `float` in `about:config`.

## Notes / not yet verified

These changes are source-level and consistent (JS/YAML/FTL validated), but a
full `mach` build was not run in this environment. The title-bar element
placement and glyph styling are best-effort and may need visual fine-tuning
once built (e.g. exact position within `#navigator-toolbox`, per-OS spacing).
