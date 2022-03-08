import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from ".";


export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings, onChange }) => {
  const { outputId } = settings;

  return (
    <TextInput
      label="outputId"
      name="outputId"
      value={outputId ?? "defaultPlotOutput"}
      onChange={(newName) => onChange({ ...settings, outputId: newName })}
    />
  );
};
