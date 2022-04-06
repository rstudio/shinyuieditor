import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyUiOutputProps } from ".";

export const ShinyuiOutputSettings: SettingsUpdaterComponent<
  ShinyUiOutputProps
> = ({ settings, onChange }) => {
  const { outputId } = settings;
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
    <TextInput
      label="outputId"
      name="outputId"
      value={outputId ?? "defaultUiOutput"}
      onChange={updateSettings}
    />
  );
};
