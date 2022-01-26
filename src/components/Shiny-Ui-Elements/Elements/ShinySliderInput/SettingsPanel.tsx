import { NumericInput } from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";
import { SettingsUpdateComponentProps } from "components/Shiny-Ui-Elements/componentTypes";
import * as React from "react";
import { ShinySliderInputProps, validateNumber } from "./arguments";

export const ShinySliderInputSettings = ({
  settings: currentSettings,
  onChange,
}: SettingsUpdateComponentProps<ShinySliderInputProps>) => {
  const settings = { ...currentSettings };
  if (settings.min) settings.min = validateNumber(settings.min);
  if (settings.max) settings.max = validateNumber(settings.max);
  if (settings.value) settings.value = validateNumber(settings.value);

  const validateAndUpdate = (newValues: Partial<ShinySliderInputProps>) => {
    onChange({ ...settings, ...newValues });
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
