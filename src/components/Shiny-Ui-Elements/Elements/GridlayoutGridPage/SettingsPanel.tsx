import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import classes from "./SettingsPanel.module.css";

export const GridlayoutGridPageSettings: SettingsUpdaterComponent<
  TemplatedGridProps
> = ({ settings: currentSettings, onChange }) => {
  return (
    <>
      <div className={classes.formSection}>Settings for grid page:</div>
    </>
  );
};
