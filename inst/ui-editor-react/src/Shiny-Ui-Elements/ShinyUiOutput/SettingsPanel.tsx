import * as React from "react";

import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyUiOutputProps } from ".";

export const ShinyuiOutputSettings: SettingsUpdaterComponent<
  ShinyUiOutputProps
> = ({ settings }) => {
  return (
    <TextInputOld
      label="Output ID"
      name="outputId"
      value={settings.outputId ?? "defaultUiOutput"}
    />
  );
};
