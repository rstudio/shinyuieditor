import { NumericInput } from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";
import { ShinyUiArgumentsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { ShinySliderInputProps, validateNumber } from "./arguments";

export const ShinySliderInputSettings: ShinyUiArgumentsFields<
  ShinySliderInputProps
> = ({ currentSettings, onChange }) => {
  const settings = { ...currentSettings };
  if (settings.min) settings.min = validateNumber(settings.min);
  if (settings.max) settings.max = validateNumber(settings.max);
  if (settings.value) settings.value = validateNumber(settings.value);

  const validateAndUpdate = (newValues: Partial<ShinySliderInputProps>) => {
    const updatedValues = { ...settings, ...newValues };

    onChange(updatedValues, true);
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
      <NumericInput
        label="Maximum value"
        value={settings.max}
        onChange={(max) => validateAndUpdate({ max })}
      />
      <NumericInput
        label="Starting value"
        value={settings.value}
        onChange={(val) => validateAndUpdate({ value: val })}
      />
    </>
  );
};
