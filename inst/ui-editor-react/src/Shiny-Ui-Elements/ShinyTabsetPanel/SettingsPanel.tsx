import { OptionsDropdown } from "components/Inputs/OptionsDropdown/OptionsDropdown";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import { getNamesOfChildTabPanels } from "Shiny-Ui-Elements/ShinyTabPanel/tabPanelHelpers";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TabsetPanelSettings } from ".";

export const ShinyTabsetPanelSettings: SettingsUpdaterComponent<
  TabsetPanelSettings
> = ({ settings, node }) => {
  return (
    <>
      <TextInput
        name="id"
        optional={true}
        defaultValue="tabsetId"
        allValues={settings}
      />
      <OptionsDropdown
        name="selected"
        allValues={settings}
        label="Initial selection"
        optional={true}
        options={getNamesOfChildTabPanels(node)}
      />
    </>
  );
};
