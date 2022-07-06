import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { TemplatedGridProps } from ".";

export const GridlayoutGridPageSettings: SettingsUpdaterComponent<
  TemplatedGridProps
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
