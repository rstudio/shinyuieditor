import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridContainerSettings } from ".";

export const GridlayoutGridContainerSettings: SettingsUpdaterComponent<
  GridContainerSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="title" label="Panel title" allValues={settings} />
      <LabeledCSSUnitInput
        name="gap_size"
        label="Gap between panels"
        value={settings.gap_size}
        units={["px", "rem"]}
      />
    </>
  );
};
