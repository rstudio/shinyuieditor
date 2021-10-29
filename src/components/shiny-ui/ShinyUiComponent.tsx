import React from "react";
import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";

export type UiComponentDefinition =
  | {
      componentName: "plotOutput";
      componentProps: ShinyPlotOutputProps;
    }
  | {
      componentName: "sliderInput";
      componentProps: ShinySliderInputProps;
    }
  | {
      componentName: "titlePanel";
      componentProps: GridlayoutTitlePanelProps;
    };

export type UiComponentNames = UiComponentDefinition["componentName"];

const uiComponents = {
  plotOutput: ShinyPlotOutput,
  sliderInput: ShinySliderInput,
  titlePanel: GridlayoutTitlePanel,
};

export default function ShinyUiComponent({
  componentName: name,
  componentProps: props,
}: UiComponentDefinition) {
  const UiComponent = uiComponents[name];
  return <UiComponent {...props} />;
}
