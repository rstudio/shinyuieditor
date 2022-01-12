import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import { ShinyUiArgumentsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import { TextInput } from "components/Inputs/TextInput";

export const ShinyPlotOutputSettings: ShinyUiArgumentsFields<
  ShinyPlotOutputProps
> = ({ currentSettings, onChange }) => {
  const { outputId } = currentSettings;
  // All inputs are valid currently but later when this is expanded we will make this
  // variable more dynamic
  const isValid = true;

  return (
    <TextInput
      label="outputId"
      value={outputId ?? "defaultPlotOutput"}
      onChange={(newName) =>
        onChange({ ...currentSettings, outputId: newName }, isValid)
      }
    />
  );
};
