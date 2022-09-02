import * as React from "react";

import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyTextOutputProps } from ".";

export const ShinyTextOutputSettings: SettingsUpdaterComponent<
  ShinyTextOutputProps
> = ({ settings }) => {
  return (
    <TextInputOld label="Output ID" name="outputId" value={settings.outputId} />
  );
};
