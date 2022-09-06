import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TabsetPanelSettings } from ".";

export const ShinyTabsetPanelSettings: SettingsUpdaterComponent<
  TabsetPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="id"
        optional={true}
        defaultValue="tabsetId"
        allValues={settings}
      />
    </>
  );
};
