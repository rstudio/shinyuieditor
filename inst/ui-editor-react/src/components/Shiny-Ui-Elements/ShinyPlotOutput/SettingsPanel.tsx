import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput";
import type { CSSMeasure } from "CSSMeasure";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { ShinyPlotOutputProps } from ".";

export const ShinyPlotOutputSettings: SettingsUpdaterComponent<
  ShinyPlotOutputProps
> = ({ settings }) => {
  const { outputId, width = "100%", height = "400px" } = settings;

  return (
    <>
      <TextInput
        label="Output ID"
        name="outputId"
        value={outputId ?? "defaultPlotOutput"}
      />
      <LabeledCSSUnitInput
        name="width"
        units={["px", "%"]}
        value={width as CSSMeasure}
      />
      <LabeledCSSUnitInput
        name="height"
        units={["px", "%"]}
        value={height as CSSMeasure}
      />
    </>
  );
};
