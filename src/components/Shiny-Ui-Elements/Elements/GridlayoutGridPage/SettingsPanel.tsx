import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import type { TemplatedGridProps } from "utils/gridTemplates/types";

import classes from "./SettingsPanel.module.css";

export const GridlayoutGridPageSettings: SettingsUpdaterComponent<
  TemplatedGridProps
> = ({ settings, onChange }) => {
  return (
    <>
      <div className={classes.formSection}>Settings for grid page:</div>
      <LabeledCSSUnitInput
        value={settings.gapSize}
        label="Gap Size"
        units={["px", "rem"]}
        onChange={(gapSize) => onChange({ ...settings, gapSize })}
      />
    </>
  );
};
