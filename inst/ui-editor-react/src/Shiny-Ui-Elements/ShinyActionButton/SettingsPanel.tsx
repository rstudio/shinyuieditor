import * as React from "react";

import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings }) => {
  const { inputId, label } = settings;

  return (
    <>
      <TextInputOld
        label="inputId"
        name="inputId"
        value={inputId ?? "defaultActionButton"}
      />
      <TextInputOld
        label="input label"
        name="label"
        value={label ?? "default actionButton label"}
      />
    </>
  );
};
