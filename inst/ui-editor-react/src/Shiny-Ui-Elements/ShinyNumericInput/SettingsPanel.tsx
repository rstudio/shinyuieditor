import * as React from "react";

import CategoryDivider from "components/CategoryDivider";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { WrappedSection } from "components/Inputs/InputSections";
import NumericInput from "components/Inputs/NumericInput/NumericInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyNumericInputProps } from ".";

export const ShinyNumericInputSettings: SettingsUpdaterComponent<
  ShinyNumericInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" label="Input ID" allValues={settings} />
      <TextInput name="label" allValues={settings} />

      <WrappedSection name="Values">
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
      </WrappedSection>

      <CategoryDivider />

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
