import * as React from "react";

import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyTextOutputProps } from ".";

export const ShinyTextOutputSettings: SettingsUpdaterComponent<
  ShinyTextOutputProps
> = ({ settings }) => {
  return <TextInput label="Output ID" name="outputId" allValues={settings} />;
};
