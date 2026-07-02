/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_AdrenalineDragAndDrop_h_
#define mozilla_AdrenalineDragAndDrop_h_

#include "nsIAdrenalineDragAndDrop.h"
#include "nsCOMPtr.h"

#define ADRENALINE_DND_MANAGER_CONTRACTID "@mozilla.org/adrenaline/drag-and-drop;1"

namespace adrenaline {

/**
 * @brief Implementation of the nsIAdrenalineDragAndDrop interface.
 * When we want to do a drag and drop operation, web standards
 * don't really allow much customization of the drag image.
 * This class allows Adrenaline to have more control over the drag
 * and drop operations for the tabs.
 */
class nsAdrenalineDragAndDrop final : public nsIAdrenalineDragAndDrop {
  NS_DECL_ISUPPORTS
  NS_DECL_NSIADRENALINEDRAGANDDROP

 public:
  explicit nsAdrenalineDragAndDrop();
  auto GetDragImageOpacity() const { return mDragImageOpacity; }

  /**
   * @brief Get the singleton instance of nsAdrenalineDragAndDrop. There may be
   * occasions where it won't be available (e.g. on the content process), so
   * this may return nullptr.
   * @return nsAdrenalineDragAndDrop* The singleton instance, or nullptr if not
   * available
   */
  static auto GetAdrenalineDragAndDropInstance() -> nsCOMPtr<nsAdrenalineDragAndDrop>;

 private:
  ~nsAdrenalineDragAndDrop() = default;
  float mDragImageOpacity{};
};

}  // namespace adrenaline

#endif
