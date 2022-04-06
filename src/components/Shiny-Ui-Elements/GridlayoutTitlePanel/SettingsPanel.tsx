import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTitlePanelProps } from ".";

export const GridlayoutTitlePanelSettings: SettingsUpdaterComponent<
  GridlayoutTitlePanelProps
> = ({ settings, onChange }) => {
  return (
    <>
      <TextInput
        name="Grid-Area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={onChange}
      />
      <TextInput
        name="title"
        label="App title"
        value={settings.title}
        onChange={onChange}
      />
    </>
  );
};
