import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import { ShinyUiSettingsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import { TextInput } from "components/Inputs/TextInput";

export const ShinyPlotOutputSettings: ShinyUiSettingsFields<
  ShinyPlotOutputProps
> = ({ currentSettings, onChange }) => {
  const { name } = currentSettings;
  // All inputs are valid currently but later when this is expanded we will make this
  // variable more dynamic
  const isValid = true;

  return (
    <TextInput
      label="Plot Name"
      value={name ?? "UndefinedPlotName"}
      onChange={(newName) =>
        onChange({ ...currentSettings, name: newName }, isValid)
      }
    />
  );
};
