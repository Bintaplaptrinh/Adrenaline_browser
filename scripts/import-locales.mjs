// Post-import step: surfer applies code patches but does NOT copy Adrenaline's
// localized strings from this repo's `locales/` tree into the engine. Without
// this, every `data-l10n-id` / `document.l10n` lookup for Adrenaline UI
// (welcome screen, folders, workspaces, ...) resolves to null.
//
// This mirrors the repo's `locales/<locale>/<module>/<rest>` files into the
// engine's Firefox l10n layout `engine/<module>/locales/<locale>/<rest>`, where
// browser/locales/jar.mn already globs `browser/**/*.ftl` and registers them.
// Only files whose name contains "adrenaline" are copied, so vanilla locale
// files are never touched.
import {
  readdirSync,
  statSync,
  mkdirSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = join(ROOT, "locales");
const ENGINE = join(ROOT, "engine");

if (!existsSync(LOCALES) || !existsSync(ENGINE)) {
  console.log("import-locales: locales/ or engine/ missing, skipping");
  process.exit(0);
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (/adrenaline/i.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

let copied = 0;
for (const locale of readdirSync(LOCALES)) {
  const localeDir = join(LOCALES, locale);
  if (!statSync(localeDir).isDirectory()) {
    continue;
  }
  for (const src of walk(localeDir)) {
    // src = locales/<locale>/<module>/<rest...>
    const rel = src.slice(localeDir.length + 1); // <module>/<rest...>
    const slash = rel.indexOf("/");
    if (slash === -1) {
      continue;
    }
    const module = rel.slice(0, slash);
    const rest = rel.slice(slash + 1);
    const dest = join(ENGINE, module, "locales", locale, rest);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
    copied++;
  }
}
console.log(`import-locales: copied ${copied} Adrenaline locale file(s)`);
