import { OptionsDropdown } from "components/Inputs/OptionsDropdown/OptionsDropdown";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import { getNamesOfChildTabPanels } from "Shiny-Ui-Elements/ShinyTabPanel/tabPanelHelpers";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";
import { makeIdSafe } from "utils/makeIdSafe";

import type { NavbarPageSettings } from ".";

export const ShinyNavbarPageSettings: SettingsUpdaterComponent<
  NavbarPageSettings
> = ({ settings, node }) => {
  const currentPanelChildren = getNamesOfChildTabPanels(node);

  return (
    <>
      <TextInput name="title" label="Page title" allValues={settings} />
      <TextInput
        name="id"
        optional={true}
        defaultValue={makeIdSafe(settings.title)}
        allValues={settings}
      />
      <OptionsDropdown
        name="selected"
        allValues={settings}
        label="Initial selection"
        optional={true}
        options={currentPanelChildren}
      />
    </>
  );
};
