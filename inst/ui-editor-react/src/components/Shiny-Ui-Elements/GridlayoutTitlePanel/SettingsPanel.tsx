import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTitlePanelProps } from ".";

export const GridlayoutTitlePanelSettings: SettingsUpdaterComponent<
  GridlayoutTitlePanelProps
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
      />
      <TextInput name="title" label="App title" value={settings.title} />
    </>
  );
};
