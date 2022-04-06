import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings, onChange }) => {
  const { inputId, label } = settings;
  const updateSettings = ({
    name,
    value,
  }: {
    name: string;
    value?: number | string;
  }) => {
    onChange({ ...settings, [name]: value });
  };
  return (
    <>
      <TextInput
        label="inputId"
        name="inputId"
        value={inputId ?? "defaultActionButton"}
        onChange={updateSettings}
      />
      <TextInput
        label="input label"
        name="label"
        value={label ?? "default actionButton label"}
        onChange={updateSettings}
      />
    </>
  );
};
