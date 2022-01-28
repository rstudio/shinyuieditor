import { RadioInputs } from "components/Inputs/RadioInputs";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { GridPanelSettings } from ".";

export const GridlayoutGridPanelSettings: SettingsUpdaterComponent<
  GridPanelSettings
> = ({ settings, onChange }) => {
  return (
    <>
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
