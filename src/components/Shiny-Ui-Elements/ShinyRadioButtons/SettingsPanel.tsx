import * as React from "react";

import ListInput from "components/Inputs/ListInput";
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
      <ListInput
        name="choices"
        value={settings.choices}
        newItemValue="choice"
      />
    </>
  );
};
export default ShinyRadioButtonsSettings;
