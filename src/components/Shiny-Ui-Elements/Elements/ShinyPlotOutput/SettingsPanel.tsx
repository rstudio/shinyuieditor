import { TextInputChakra } from "components/Inputs/TextInput";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { ShinyPlotOutputProps } from ".";

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings, onChange }) => {
  const { outputId } = settings;

  return (
    <TextInputChakra
      label="outputId"
      value={outputId ?? "defaultPlotOutput"}
      onChange={(newName) => onChange({ ...settings, outputId: newName })}
    />
  );
};
