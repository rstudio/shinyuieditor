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
        name="gapSize"
        label="Gap between panels"
        value={settings.gapSize}
        units={["px", "rem"]}
      />
    </>
  );
};
