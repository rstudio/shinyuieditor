import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridTabPanelSettings } from ".";

export const GridlayoutGridTabPanelSettings: SettingsUpdaterComponent<
  GridTabPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="name" label="Name of NODE" allValues={settings} />
    </>
  );
};
