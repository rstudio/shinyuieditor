import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import { ShinyUiSettingsFields } from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";

export const ShinyPlotOutputSettings: ShinyUiSettingsFields<
  ShinyPlotOutputProps
> = ({ currentSettings, onChange }) => {
  const { name } = currentSettings;
  return (
    <TextInput
      label="Plot Name"
      value={name ?? "UndefinedPlotName"}
      onChange={(newName) => onChange({ ...currentSettings, name: newName })}
    />
  );
};
