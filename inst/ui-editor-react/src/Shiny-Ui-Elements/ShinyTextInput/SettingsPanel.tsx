import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { InputSection } from "components/Inputs/InputSections";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyTextInputProps } from ".";

export const ShinyTextInputSettings: SettingsUpdaterComponent<
  ShinyTextInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" label="Input ID" allValues={settings} />
      <TextInput name="label" allValues={settings} />
      <InputSection name="Values">
        <TextInput name="value" allValues={settings} />
        <TextInput
          name="placeholder"
          allValues={settings}
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
