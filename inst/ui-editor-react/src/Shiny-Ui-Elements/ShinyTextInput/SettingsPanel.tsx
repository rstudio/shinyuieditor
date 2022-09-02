import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { InputSection } from "components/Inputs/InputSections";
import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyTextInputProps } from ".";

export const ShinyTextInputSettings: SettingsUpdaterComponent<
  ShinyTextInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInputOld name="inputId" label="Input ID" value={settings.inputId} />
      <TextInputOld name="label" value={settings.label} />
      <InputSection name="Values">
        <TextInputOld name="value" value={settings.value} />
        <TextInputOld
          name="placeholder"
          value={settings.placeholder}
          optional={true}
          defaultValue="placeholder text"
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
