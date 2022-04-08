import * as React from "react";

import NamedListInput from "components/Inputs/ListInput/NamedListInput";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyRadioButtonsProps } from ".";

const ShinyRadioButtonsSettings: SettingsUpdaterComponent<
  ShinyRadioButtonsProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="inputId" value={settings.inputId} />
      <TextInput name="label" value={settings.label} />
      <NamedListInput
        name="choices"
        value={settings.choices}
        newItemValue={{ key: "choice", value: "value" }}
      />
    </>
  );
};
export default ShinyRadioButtonsSettings;
