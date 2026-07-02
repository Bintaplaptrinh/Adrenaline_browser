# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

<menupopup id="adrenalineCreateNewPopup">
  <menuitem data-l10n-id="adrenaline-panel-ui-workspaces-create" command="cmd_adrenalineOpenWorkspaceCreation" image="chrome://browser/skin/adrenaline-icons/duplicate-tab.svg" />
  <menuitem data-l10n-id="adrenaline-panel-ui-folder-create" command="cmd_adrenalineOpenFolderCreation" image="chrome://browser/skin/adrenaline-icons/folder.svg" />
  <menuseparator/>
  <menuitem data-l10n-id="adrenaline-panel-ui-new-empty-split" command="cmd_adrenalineNewEmptySplit" image="chrome://browser/skin/adrenaline-icons/split.svg" />
  <menuitem data-l10n-id="tabs-toolbar-new-tab" command="cmd_newNavigatorTab" image="chrome://browser/skin/adrenaline-icons/plus.svg" />
</menupopup>

<menupopup id="adrenalineWorkspaceMoreActions">
  <menuitem id="context_adrenalineEditWorkspace" data-l10n-id="adrenaline-workspaces-panel-change-name" command="cmd_adrenalineChangeWorkspaceName"/>
  <menuitem id="context_adrenalineEditWorkspaceIcon" data-l10n-id="adrenaline-workspaces-panel-change-icon" command="cmd_adrenalineChangeWorkspaceIcon"/>
  <menuitem class="adrenalineToolbarThemePicker"
          id="context_adrenalineChangeWorkspaceTheme"
          data-l10n-id="adrenaline-workspaces-change-theme"
          command="cmd_adrenalineOpenAdrenalineThemePicker"/>
  <menu id="context_adrenalineWorkspacesOpenInContainerTab"
    data-l10n-id="adrenaline-workspaces-panel-context-default-profile"
    selection-type="single"
    node-type="link"
    hide-if-private-browsing="true"
    hide-if-usercontext-disabled="true">
    <menupopup />
  </menu>
  <menuseparator id="context_adrenalineWorkspacesSeparator"/>
  <menuseparator/>
  <menuitem id="context_adrenalineReorderWorkspaces" data-l10n-id="adrenaline-workspaces-panel-context-reorder" command="cmd_adrenalineReorderWorkspaces"/>
  <menuitem id="context_adrenalineUnloadWorkspace" data-l10n-id="adrenaline-workspaces-panel-unload" command="cmd_adrenalineUnloadWorkspace"/>
  <menuitem id="context_adrenalineUnloadAllOtherWorkspace" data-l10n-id="adrenaline-workspaces-panel-unload-others" command="cmd_adrenalineUnloadAllOtherWorkspace"/>
  <menuseparator/>
  <menuitem data-l10n-id="adrenaline-panel-ui-workspaces-create" command="cmd_adrenalineOpenWorkspaceCreation"/>
  <menuitem id="context_adrenalineDeleteWorkspace" data-l10n-id="adrenaline-workspaces-panel-context-delete" command="cmd_adrenalineCtxDeleteWorkspace"/>
  <menuseparator/>
  <menuitem id="context_adrenalineSpaceRoutingSettings" data-l10n-id="adrenaline-space-routing-settings" command="cmd_adrenalineOpenSpaceRoutingSettings"/>
</menupopup>

<menupopup id="adrenalineFolderActions">
  <menu id="context_adrenalineLiveFolderOptions"
    data-l10n-id="adrenaline-live-folder-options"
    hidden="true">
    <menupopup />
  </menu>
  <menuseparator id="live-folder-separator" hidden="true"/>
  <menuitem id="context_adrenalineFolderRename" data-l10n-id="adrenaline-folders-panel-rename-folder"/>
  <menuitem id="context_adrenalineFolderChangeIcon" data-l10n-id="tab-context-adrenaline-edit-icon"/>
  <menuseparator />
  <menuitem id="context_adrenalineFolderUnloadAll" data-l10n-id="adrenaline-folders-unload-folder"/>
  <menuitem id="context_adrenalineFolderNewSubfolder" data-l10n-id="adrenaline-folders-new-subfolder"/>
  <menuseparator />
  <menu id="context_adrenalineChangeFolderSpace"
    data-l10n-id="adrenaline-folders-panel-change-folder-space">
    <menupopup />
  </menu>
  <menuitem id="context_adrenalineFolderToSpace" data-l10n-id="adrenaline-folders-panel-convert-folder-to-space" />
  <menuseparator />
  <menuitem id="context_adrenalineFolderUnpack" data-l10n-id="adrenaline-folders-panel-unpack-folder"/>
  <menuitem id="context_adrenalineFolderDelete" data-l10n-id="adrenaline-folders-panel-delete-folder"/>
</menupopup>

<menupopup id="adrenalineSiteDataActions">
  <menuitem id="context_adrenalineClearSiteData" data-l10n-id="identity-clear-site-data"/>
  <menuseparator />
  <menuitem command="Tools:Addons" data-l10n-id="adrenaline-site-data-manage-addons"/>
  <menuitem id="context_adrenalineOpenGetAddons" data-l10n-id="adrenaline-site-data-get-addons"/>
  <menuseparator />
  <menuitem id="context_adrenalineOpenSiteSettings" data-l10n-id="adrenaline-site-data-site-settings"/>
</menupopup>

<menupopup id="adrenalineMoveTabsToSyncedWorkspacePopup">
# Popup to move tabs to a synced workspace.
# This would be automatically populated with the list of available synced workspaces.
</menupopup>
