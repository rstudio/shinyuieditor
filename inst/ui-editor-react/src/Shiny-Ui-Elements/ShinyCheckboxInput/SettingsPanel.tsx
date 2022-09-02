import * as React from "react";

import BooleanInput from "components/Inputs/BooleanInput";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyCheckboxInputProps } from ".";

export const ShinyCheckboxInputSettings: SettingsUpdaterComponent<
  ShinyCheckboxInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInputOld name="inputId" label="Input ID" value={settings.inputId} />
      <TextInputOld name="label" value={settings.label} />
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
