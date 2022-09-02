import * as React from "react";

import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyActionButtonProps } from ".";

export const ShinyActionButtonSettings: SettingsUpdaterComponent<
  ShinyActionButtonProps
> = ({ settings }) => {
  return (
    <>
      <TextInput label="inputId" name="inputId" allValues={settings} />
      <TextInput label="input label" name="label" allValues={settings} />
    </>
  );
};
