import * as React from "react";

import BooleanInput from "components/Inputs/BooleanInput";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyCheckboxInputProps } from ".";

export const ShinyCheckboxInputSettings: SettingsUpdaterComponent<
  ShinyCheckboxInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" label="Input ID" value={settings.inputId} />
      <TextInput name="label" value={settings.label} />
      <BooleanInput
        label="Starting value"
        name="value"
        value={settings.value}
      />

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
