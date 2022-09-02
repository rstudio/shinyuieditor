import * as React from "react";

import NamedListInput from "components/Inputs/ListInput/NamedListInput";
import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySelectInputProps } from ".";

const ShinySelectInputSettings: SettingsUpdaterComponent<
  ShinySelectInputProps
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
    </>
  );
};
export default ShinySelectInputSettings;
