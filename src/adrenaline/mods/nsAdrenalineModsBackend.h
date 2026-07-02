/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_AdrenalineModsBackend_h_
#define mozilla_AdrenalineModsBackend_h_

#include "nsIAdrenalineModsBackend.h"
#include "nsIAdrenalineCommonUtils.h"

#include "mozilla/ServoStyleSet.h"
#include "mozilla/dom/Document.h"

namespace adrenaline {

class nsAdrenalineModsBackend final : public nsIAdrenalineModsBackend {
  NS_DECL_ISUPPORTS
  NS_DECL_NSIADRENALINEMODSBACKEND

 public:
  explicit nsAdrenalineModsBackend();

 protected:
  /**
   * @brief Check for the preference and see if the app is on safe mode.
   */
  auto CheckEnabled() -> void;

 private:
  ~nsAdrenalineModsBackend() = default;
  bool mEnabled = false;
};

}  // namespace adrenaline

#endif
