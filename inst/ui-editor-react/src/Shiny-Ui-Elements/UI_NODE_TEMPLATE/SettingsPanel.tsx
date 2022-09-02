import { TextInputOld } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NodeNameSettings } from ".";

export const PkgNodeNameSettings: SettingsUpdaterComponent<
  NodeNameSettings
> = ({ settings }) => {
  return (
    <>
      <TextInputOld name="name" label="Name of NODE" value={settings.name} />
    </>
  );
};
