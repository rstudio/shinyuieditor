import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TabPanelSettings } from ".";

export const ShinyTabPanelSettings: SettingsUpdaterComponent<
  TabPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="name" label="Name of NODE" value={settings.title} />
    </>
  );
};
