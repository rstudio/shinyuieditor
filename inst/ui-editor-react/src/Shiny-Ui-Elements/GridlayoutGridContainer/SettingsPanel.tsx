import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridContainerSettings } from ".";

export const GridlayoutGridContainerSettings: SettingsUpdaterComponent<
  GridContainerSettings
> = ({ settings }) => {
  return (
    <>
      <LabeledCSSUnitInput
        name="gap_size"
        label="Gap between panels"
        value={settings.gap_size}
        units={["px", "rem"]}
      />
    </>
  );
};
