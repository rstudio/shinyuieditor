import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { GridPanelSettings } from ".";
import classes from "./SettingsPanel.module.css";

export const GridlayoutGridPanelSettings: SettingsUpdaterComponent<
  GridPanelSettings
> = ({ settings: currentSettings, onChange }) => {
  const settings = { ...currentSettings };

  return (
    <>
      <div className={classes.formSection}>
        <p>Vertical Alignment:</p>
        <fieldset
          className={classes.radioInputs}
          onChange={(e) => {
            const updatedVerticalAlign = (e.target as HTMLInputElement)
              .value as GridPanelSettings["verticalAlign"];

            onChange({ ...settings, verticalAlign: updatedVerticalAlign });
          }}
        >
          {["top", "center", "bottom"].map((dir) => (
            <div key={dir}>
              <input
                name="vertical-alignment"
                type="radio"
                value={dir}
                defaultChecked={dir === currentSettings.verticalAlign}
              />
              <label htmlFor={dir}>{dir}</label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className={classes.formSection}>
        <p>Horizontal Alignment:</p>
        <fieldset
          className={classes.radioInputs}
          onChange={(e) => {
            onChange({
              ...settings,
              horizontalAlign: (e.target as HTMLInputElement)
                .value as GridPanelSettings["horizontalAlign"],
            });
          }}
        >
          {["left", "center", "right"].map((dir) => (
            <div key={dir}>
              <input
                name="horizontal-alignment"
                type="radio"
                value={dir}
                defaultChecked={dir === currentSettings.horizontalAlign}
              />
              <label htmlFor={dir}>{dir}</label>
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
};
