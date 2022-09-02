import * as React from "react";

import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutGridCardPlotProps } from ".";

export const GridlayoutGridCardPlotSettings: SettingsUpdaterComponent<
  GridlayoutGridCardPlotProps
> = ({ settings }) => {
  return (
    <>
      <TextInput name="area" label="Name of grid area" allValues={settings} />
      <TextInput
        label="Output ID"
        name="outputId"
        allValues={settings}
        optional={true}
      />
    </>
  );
};
