import * as React from "react";

import { TextInputOld } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutGridCardPlotProps } from ".";

export const GridlayoutGridCardPlotSettings: SettingsUpdaterComponent<
  GridlayoutGridCardPlotProps
> = ({ settings: { area, outputId } }) => {
  return (
    <>
      <TextInputOld name="area" label="Name of grid area" value={area} />
      <TextInputOld
        label="Output ID"
        name="outputId"
        value={outputId}
        optional={true}
        defaultValue={area}
      />
    </>
  );
};
