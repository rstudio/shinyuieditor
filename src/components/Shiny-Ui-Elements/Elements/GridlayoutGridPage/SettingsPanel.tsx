import { CSSUnitInput } from "components/CSSUnitInput";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import classes from "./SettingsPanel.module.css";

export const GridlayoutGridPageSettings: SettingsUpdaterComponent<
  TemplatedGridProps
> = ({ settings, onChange }) => {
  return (
    <>
      <div className={classes.formSection}>Settings for grid page:</div>

      <p>Gap Size:</p>
      {/* <CSSUnitInput
        value={settings.gapSize}
        units={["px", "rem"]}
        onChange={(gapSize) => onChange({ ...settings, gapSize })}
      /> */}
    </>
  );
};
