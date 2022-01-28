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
      <RadioInputs
        name="Vertical Alignment"
        options={["top", "center", "bottom", "spread"]}
        currentSelection={currentSettings.verticalAlign ?? "spread"}
        onChange={(verticalAlign) => onChange({ ...settings, verticalAlign })}
      />
      <RadioInputs
        name="Horizontal Alignment"
        options={["left", "center", "right", "spread"]}
        currentSelection={currentSettings.horizontalAlign ?? "spread"}
        onChange={(horizontalAlign) =>
          onChange({ ...settings, horizontalAlign })
        }
      />
    </>
  );
};

function RadioInputs<OptionType extends string>({
  name,
  options,
  currentSelection,
  onChange,
}: {
  name: string;
  options: OptionType[];
  currentSelection: OptionType;
  onChange: (selection: OptionType) => void;
}) {
  return (
    <div className={classes.formSection}>
      <p>{name}:</p>
      <fieldset
        className={classes.radioInputs}
        onChange={(e) => {
          onChange((e.target as HTMLInputElement).value as OptionType);
        }}
      >
        {options.map((option) => (
          <div key={option}>
            <input
              name={name}
              type="radio"
              value={option}
              defaultChecked={option === currentSelection}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
