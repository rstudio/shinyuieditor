import { TextInput } from "components/Inputs/TextInput";
import { SettingsUpdateComponentProps } from "components/Shiny-Ui-Elements/componentTypes";
import * as React from "react";
import { ShinyPlotOutputProps } from ".";

export const ShinyPlotOutputSettings = ({
  settings,
  onChange,
}: SettingsUpdateComponentProps<ShinyPlotOutputProps>) => {
  const { outputId } = settings;

  return (
    <TextInput
      label="outputId"
      value={outputId ?? "defaultPlotOutput"}
      onChange={(newName) => onChange({ ...settings, outputId: newName })}
    />
  );
};
