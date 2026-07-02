/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "nsAdrenalineModsBackend.h"

#include "nsIXULRuntime.h"
#include "nsStyleSheetService.h"

#include "mozilla/PresShell.h"
#include "mozilla/dom/ContentParent.h"

#include "nsIURI.h"
#include "nsIFile.h"

#include "AdrenalineStyleSheetCache.h"

namespace adrenaline {

namespace {
/// @brief Helper function to get the singleton instance of AdrenalineStyleSheetCache.
/// @return A pointer to the singleton instance of AdrenalineStyleSheetCache.
static auto GetAdrenalineStyleSheetCache() -> AdrenalineStyleSheetCache* {
  return AdrenalineStyleSheetCache::Singleton();
}
}  // namespace

// Use the macro to inject all of the definitions for nsISupports.
NS_IMPL_ISUPPORTS(nsAdrenalineModsBackend, nsIAdrenalineModsBackend)

nsAdrenalineModsBackend::nsAdrenalineModsBackend() { (void)CheckEnabled(); }

auto nsAdrenalineModsBackend::CheckEnabled() -> void {
  // Check if the mods backend is enabled based on the preference.
  bool inSafeMode = false;
  if (nsCOMPtr<nsIXULRuntime> appInfo =
          do_GetService("@mozilla.org/xre/app-info;1")) {
    appInfo->GetInSafeMode(&inSafeMode);
  }
  mEnabled = !inSafeMode &&
             !mozilla::Preferences::GetBool("adrenaline.themes.disable-all", false);
}

auto nsAdrenalineModsBackend::RebuildModsStyles(const nsACString& aContents)
    -> nsresult {
  // Notify that the mods stylesheets have been rebuilt.
  return GetAdrenalineStyleSheetCache()->RebuildModsStylesheets(aContents);
}

}  // namespace adrenaline

auto nsStyleSheetService::AdrenalineMarkStylesAsChanged() -> void {
  for (auto& presShell : mPresShells) {
    if (presShell) {
      if (auto doc = presShell->GetDocument();
          doc && doc->IsInChromeDocShell()) {
        // Notify the document that styles have changed.
        doc->ApplicableStylesChanged();
      }
    }
  }
}
