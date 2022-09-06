import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";
import { makeIdSafe } from "utils/makeIdSafe";

import type { NavbarPageSettings } from ".";

export const ShinyNavbarPageSettings: SettingsUpdaterComponent<
  NavbarPageSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="title" label="Page title" allValues={settings} />
      <TextInput
        name="id"
        optional={true}
        defaultValue={makeIdSafe(settings.title)}
        allValues={settings}
      />
    </>
  );
};
