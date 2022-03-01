import * as React from "react";

import NumericInput from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";
import { WrappedSection } from "components/Inputs/WrappedSection";

import { SettingsUpdaterComponent } from "../uiNodeTypes";

import { ShinySliderInputProps, validateNumber } from "./arguments";

export const ShinySliderInputSettings: SettingsUpdaterComponent<
  ShinySliderInputProps
> = ({ settings: currentSettings, onChange }) => {
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
        name="inputId"
        value={settings.inputId ?? "Default name"}
        onChange={(inputId) => validateAndUpdate({ inputId })}
      />
      <TextInput
        label="label"
        name="label"
        value={settings.label ?? "Default label"}
        onChange={(label) => validateAndUpdate({ label })}
      />

      <WrappedSection name="Values">
        <NumericInput
          label="Min"
          value={settings.min}
          onChange={(min) => validateAndUpdate({ min })}
        />
        <NumericInput
          label="Max"
          value={settings.max}
          onChange={(max) => validateAndUpdate({ max })}
        />
        <NumericInput
          label="Start"
          value={settings.value}
          onChange={(val) => validateAndUpdate({ value: val })}
        />
      </WrappedSection>
    </>
  );
};
