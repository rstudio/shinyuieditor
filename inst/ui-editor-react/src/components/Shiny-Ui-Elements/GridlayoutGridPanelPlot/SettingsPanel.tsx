import * as React from "react";

import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutGridPanelPlotProps } from ".";

export const GridlayoutGridPanelPlotSettings: SettingsUpdaterComponent<
  GridlayoutGridPanelPlotProps
> = ({ settings: { area, outputId } }) => {
  return (
    <>
      <TextInput name="area" label="Name of grid area" value={area} />
      <TextInput
        label="Output ID"
        name="outputId"
        value={outputId}
        optional={true}
        defaultValue={area}
      />
    </>
  );
};
