import * as React from "react";

import { WrappedSection } from "components/Inputs/InputSections";
import NumericInput from "components/Inputs/NumericInput";
import OptionalInput from "components/Inputs/OptionalInput/OptionalInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySliderInputProps } from ".";

export const ShinySliderInputSettings: SettingsUpdaterComponent<
  ShinySliderInputProps
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

      <WrappedSection name="Values">
        <NumericInput name="min" value={settings.min} />
        <NumericInput name="max" value={settings.max} />
        <NumericInput name="start" value={settings.value} />
      </WrappedSection>

      <NumericInput
        name="step"
        value={settings.step}
        optional={true}
        defaultValue={1}
      />
    </>
  );
};
