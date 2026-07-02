# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

<panel id="adrenaline-folder-tabs-popup"
    nonnative=""
    type="arrow"
    orient="vertical"
    side="left"
    consumeoutsideclicks="never">
  <hbox class="tabs-list-header" flex="1">
    <image class="adrenaline-folder-tabs-list-search-icon" src="chrome://global/skin/icons/search-glass.svg"/>
    <html:input id="adrenaline-folder-tabs-list-search" 
      data-l10n-id="adrenaline-folders-search-placeholder" 
      data-l10n-args="{&quot;folder-name&quot;:&quot;&quot;}"
      type="search" />
  </hbox>
  <scrollbox class="adrenaline-folder-tabs-list-scrollbox" flex="1">
    <vbox id="adrenaline-folder-tabs-list"></vbox>
    <hbox id="adrenaline-folder-tabs-search-no-results" hidden="true" flex="1" data-l10n-id="adrenaline-folders-search-no-results" />
  </scrollbox>
</panel>
