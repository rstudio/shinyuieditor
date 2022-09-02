import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import NamedListInput from "components/Inputs/ListInput/NamedListInput";
import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyCheckboxGroupInputProps } from ".";

const ShinyCheckboxGroupInputSettings: SettingsUpdaterComponent<
  ShinyCheckboxGroupInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInputOld name="inputId" label="Input ID" value={settings.inputId} />
      <TextInputOld name="label" value={settings.label} />
      <NamedListInput
        name="choices"
        value={settings.choices}
        newItemValue={{ key: "choice", value: "value" }}
      />
      <LabeledCSSUnitInput
        name="width"
        value={settings.width}
        optional={true}
        units={["px", "%", "auto"]}
        defaultValue="100%"
      />
    </>
  );
};
export default ShinyCheckboxGroupInputSettings;
