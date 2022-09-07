import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridTabPanelSettings } from ".";

export const GridlayoutGridTabPanelSettings: SettingsUpdaterComponent<
  GridTabPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="name" label="Panel title" allValues={settings} />
      <LabeledCSSUnitInput
        name="gap_size"
        label="Gap between panels"
        value={settings.gap_size}
        units={["px", "rem"]}
      />
    </>
  );
};
