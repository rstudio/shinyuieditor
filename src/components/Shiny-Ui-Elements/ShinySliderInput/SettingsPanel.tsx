import * as React from "react";

import NumericInput from "components/Inputs/NumericInput";
import OptionalInput from "components/Inputs/OptionalInput/OptionalInput";
import { TextInput } from "components/Inputs/TextInput";
import { WrappedSection } from "components/Inputs/WrappedSection";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySliderInputProps } from ".";

export const ShinySliderInputSettings: SettingsUpdaterComponent<
  ShinySliderInputProps
> = ({ settings: currentSettings, onChange }) => {
  const settings = { ...currentSettings };

  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={settings.inputId ?? "Default name"}
        onChange={onChange}
      />
      <TextInput
        label="label"
        name="label"
        value={settings.label ?? "Default label"}
        onChange={onChange}
      />

      <WrappedSection name="Values">
        <NumericInput name="min" value={settings.min} onChange={onChange} />
        <NumericInput name="max" value={settings.max} onChange={onChange} />
        <NumericInput name="start" value={settings.value} onChange={onChange} />
      </WrappedSection>

      <OptionalInput
        type="number"
        name="step"
        value={settings.step}
        defaultValue={1}
        onChange={onChange}
      />
    </>
  );
};
