import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { InputSection } from "components/Inputs/InputSections";
import NumericInput from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyNumericInputProps } from ".";

export const ShinyNumericInputSettings: SettingsUpdaterComponent<
  ShinyNumericInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" value={settings.inputId} />
      <TextInput name="label" value={settings.label} />
      <InputSection name="Values">
        <NumericInput name="value" value={settings.value} />
        <NumericInput
          name="min"
          value={settings.min}
          optional={true}
          defaultValue={0}
        />
        <NumericInput
          name="max"
          value={settings.max}
          optional={true}
          defaultValue={10}
        />
        <NumericInput
          name="step"
          value={settings.step}
          optional={true}
          defaultValue={1}
        />
      </InputSection>
      <LabeledCSSUnitInput
        name="width"
        value={settings.width}
        optional={true}
        units={["px", "%", "auto"]}
        defaultValue="400px"
      />
    </>
  );
};
