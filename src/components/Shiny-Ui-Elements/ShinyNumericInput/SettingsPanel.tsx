import * as React from "react";

import { InputSection } from "components/Inputs/InputSections";
import NumericInput from "components/Inputs/NumericInput";
import OptionalInput from "components/Inputs/OptionalInput/OptionalInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyNumericInputProps } from ".";

export const ShinyNumericInputSettings: SettingsUpdaterComponent<
  ShinyNumericInputProps
> = ({ settings: currentSettings }) => {
  const settings = { ...currentSettings };

  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={settings.inputId ?? "Default name"}
      />
      <TextInput
        label="label"
        name="label"
        value={settings.label ?? "Default label"}
      />

      <InputSection name="Values">
        <NumericInput name="value" value={settings.value} />
        <OptionalInput
          type="number"
          name="min"
          value={settings.min}
          defaultValue={0}
        />
        <OptionalInput
          type="number"
          name="max"
          value={settings.max}
          defaultValue={10}
        />
        <OptionalInput
          type="number"
          name="step"
          value={settings.step}
          defaultValue={1}
        />
      </InputSection>
    </>
  );
};
