import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings, onChange }) => {
  const { inputId, label } = settings;

  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={inputId ?? "defaultActionButton"}
        onChange={(newName) => onChange({ ...settings, inputId: newName })}
      />
      <TextInput
        label="input label"
        name="label"
        value={label ?? "default actionButton label"}
        onChange={(newLabel) => onChange({ ...settings, label: newLabel })}
      />
    </>
  );
};
