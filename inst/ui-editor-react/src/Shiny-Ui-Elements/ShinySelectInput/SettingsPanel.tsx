import * as React from "react";

import NamedListInput from "components/Inputs/ListInput/NamedListInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinySelectInputProps } from ".";

const ShinySelectInputSettings: SettingsUpdaterComponent<
  ShinySelectInputProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" label="Input ID" allValues={settings} />
      <TextInput name="label" allValues={settings} />
      <NamedListInput
        name="choices"
        value={settings.choices}
        newItemValue={{ key: "choice", value: "value" }}
      />
    </>
  );
};
export default ShinySelectInputSettings;
