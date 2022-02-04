import { RadioInputs } from "components/Inputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { GridPanelSettings } from ".";

export const GridlayoutGridPanelSettings: SettingsUpdaterComponent<
  GridPanelSettings
> = ({ settings, onChange }) => {
  return (
    <>
      <TextInput
        name="Grid-Area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={(area) => onChange({ ...settings, area })}
      />
      <RadioInputs
        name="Vertical Alignment"
        options={["top", "center", "bottom", "spread"]}
        currentSelection={settings.verticalAlign ?? "spread"}
        onChange={(verticalAlign) => onChange({ ...settings, verticalAlign })}
      />
      <RadioInputs
        name="Horizontal Alignment"
        options={["left", "center", "right", "spread"]}
        currentSelection={settings.horizontalAlign ?? "spread"}
        onChange={(horizontalAlign) =>
          onChange({ ...settings, horizontalAlign })
        }
      />
    </>
  );
};
