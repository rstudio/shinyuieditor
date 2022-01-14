import { NumericInput } from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";
import { ShinyUiArgumentsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import {
  buildSliderSettings,
  ShinySliderInputProps,
  validateSliderSettings,
} from "./arguments";
import { ShowProblems } from "../../UiSettings/ShowProblems";

export const ShinySliderInputSettings: ShinyUiArgumentsFields<
  ShinySliderInputProps
> = ({ currentSettings, onChange }) => {
  const settings = { ...buildSliderSettings(currentSettings) };

  const problems = validateSliderSettings(currentSettings);

  const validateAndUpdate = (newValues: Partial<ShinySliderInputProps>) => {
    const updatedValues = { ...settings, ...newValues };
    const problems = validateSliderSettings(updatedValues);
    onChange(updatedValues, problems.length === 0);
  };

  return (
    <>
      <TextInput
        label="inputId"
        value={settings.inputId ?? "Default name"}
        onChange={(inputId) => validateAndUpdate({ inputId })}
      />
      <TextInput
        label="label"
        value={settings.label ?? "Default label"}
        onChange={(label) => validateAndUpdate({ label })}
      />
      <NumericInput
        label="Minimum value"
        value={settings.min}
        onChange={(min) => validateAndUpdate({ min })}
      />
      <ShowProblems problems={problems} which="min" />

      <NumericInput
        label="Maximum value"
        value={settings.max}
        onChange={(max) => validateAndUpdate({ max })}
      />
      <ShowProblems problems={problems} which="max" />

      <NumericInput
        label="Starting value"
        value={settings.value}
        onChange={(val) => validateAndUpdate({ value: val })}
      />
      <ShowProblems problems={problems} which="value" />
    </>
  );
};
