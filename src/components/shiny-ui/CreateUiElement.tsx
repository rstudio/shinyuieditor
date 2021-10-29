import React from "react";
import GridlayoutTitlePanel from "./GridlayoutTitlePanel";
import ShinyPlotOutput from "./ShinyPlotOutput";
import ShinySliderInput from "./ShinySliderInput";

export const uiComponents = {
  plotOutput: ShinyPlotOutput,
  sliderInput: ShinySliderInput,
  titlePanel: GridlayoutTitlePanel,
};

export type UiComponentNames = keyof typeof uiComponents;

export default function CreateUiElement(
  name: UiComponentNames,
  extraProps: object
) {
  const UiComponent = uiComponents[name];
  return <UiComponent {...extraProps} />;
}
