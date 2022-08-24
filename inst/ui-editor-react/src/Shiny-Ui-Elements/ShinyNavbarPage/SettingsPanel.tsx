import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NavbarPageSettings } from ".";

export const ShinyNavbarPageSettings: SettingsUpdaterComponent<
  NavbarPageSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="pageTitle"
        label="Page title"
        value={settings.pageTitle}
      />
    </>
  );
};
