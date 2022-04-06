import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput";
import type { CSSMeasure } from "GridTypes";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from ".";

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings, onChange }) => {
  const { outputId, width = "100px" } = settings;

  return (
    <>
      <TextInput
        label="outputId"
        name="outputId"
        value={outputId ?? "defaultPlotOutput"}
        onChange={onChange}
      />
      <LabeledCSSUnitInput
        name="width"
        label="Width"
        value={width as CSSMeasure}
        onChange={onChange}
      />
    </>
  );
};
