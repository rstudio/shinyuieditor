import * as React from "react";

import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings, onChange }) => {
  const { inputId, label } = settings;

  return (
    <SettingsUpdateContext onChange={onChange}>
      <TextInput
        label="inputId"
        name="inputId"
        value={inputId ?? "defaultActionButton"}
      />
      <TextInput
        label="input label"
        name="label"
        value={label ?? "default actionButton label"}
      />
    </SettingsUpdateContext>
  );
};
