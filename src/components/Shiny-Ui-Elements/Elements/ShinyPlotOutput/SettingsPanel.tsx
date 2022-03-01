import { TextInput } from "components/Inputs/TextInput";
import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import { SettingsUpdaterComponent } from "../uiNodeTypes";

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings, onChange }) => {
  const { outputId } = settings;

  return (
    <TextInput
      label="outputId"
      name="outputId"
      value={outputId ?? "defaultPlotOutput"}
      onChange={(newName) => onChange({ ...settings, outputId: newName })}
    />
  );
};
