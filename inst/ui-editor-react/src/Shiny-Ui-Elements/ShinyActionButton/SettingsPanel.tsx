import * as React from "react";

import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings }) => {
  const { inputId, label } = settings;

  return (
    <>
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
    </>
  );
};
