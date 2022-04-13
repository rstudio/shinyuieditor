import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { TemplatedGridProps } from "utils/gridTemplates/types";

import classes from "./SettingsPanel.module.css";

export const GridlayoutGridPageSettings: SettingsUpdaterComponent<
  TemplatedGridProps
> = ({ settings }) => {
  return (
    <>
      <div className={classes.formSection}>Settings for grid page:</div>
      <LabeledCSSUnitInput
        name="gapSize"
        label="Gap Size"
        value={settings.gapSize}
        units={["px", "rem"]}
      />
    </>
  );
};
