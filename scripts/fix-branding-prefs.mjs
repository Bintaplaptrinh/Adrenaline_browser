// Post-import step: the surfer build tool hardcodes zen-browser.app URLs into
// the generated branding prefs (engine/browser/branding/*/pref/firefox-branding.js).
// This script rewrites them so Adrenaline never points at Zen's website:
//  - first-run / what's-new pages -> disabled (Adrenaline has its own internal
//    welcome overlay and update notification)
//  - update/release-notes links   -> this fork's GitHub Releases
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BRANDING_DIR = join(ROOT, "engine", "browser", "branding");

const REPLACEMENTS = [
  [/pref\("startup\.homepage_override_url",.*\);/, 'pref("startup.homepage_override_url", "");'],
  [/pref\("startup\.homepage_welcome_url",.*\);/, 'pref("startup.homepage_welcome_url", "");'],
  [/pref\("startup\.homepage_welcome_url\.additional",.*\);/, 'pref("startup.homepage_welcome_url.additional", "");'],
  [/pref\("app\.update\.url\.manual",.*\);/, 'pref("app.update.url.manual", "https://github.com/Bintaplaptrinh/Adrenaline_browser/releases");'],
  [/pref\("app\.update\.url\.details",.*\);/, 'pref("app.update.url.details", "https://github.com/Bintaplaptrinh/Adrenaline_browser/releases");'],
  [/pref\("app\.releaseNotesURL",.*\);/, 'pref("app.releaseNotesURL", "https://github.com/Bintaplaptrinh/Adrenaline_browser/releases");'],
  [/pref\("app\.releaseNotesURL\.aboutDialog",.*\);/, 'pref("app.releaseNotesURL.aboutDialog", "https://github.com/Bintaplaptrinh/Adrenaline_browser/releases");'],
  [/pref\("app\.releaseNotesURL\.prompt",.*\);/, 'pref("app.releaseNotesURL.prompt", "https://github.com/Bintaplaptrinh/Adrenaline_browser/releases");'],
];

if (!existsSync(BRANDING_DIR)) {
  console.log("fix-branding-prefs: engine/browser/branding not found, skipping");
  process.exit(0);
}

let fixed = 0;
for (const brand of readdirSync(BRANDING_DIR)) {
  const prefFile = join(BRANDING_DIR, brand, "pref", "firefox-branding.js");
  if (!existsSync(prefFile)) continue;
  let content = readFileSync(prefFile, "utf8");
  const before = content;
  for (const [re, repl] of REPLACEMENTS) content = content.replace(re, repl);
  // safety net: no zen-browser.app URL may survive
  content = content.replaceAll(/https?:\/\/(www\.)?zen-browser\.app[^"]*/g, "https://adrenaline-browser.app/coming-soon");
  if (content !== before) {
    writeFileSync(prefFile, content);
    fixed++;
    console.log(`fix-branding-prefs: fixed ${brand}`);
  }
}
console.log(`fix-branding-prefs: done (${fixed} brand(s) updated)`);
