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

export default function ShinyUiComponent({
  name,
  props,
}: {
  name: UiComponentNames;
  props: object;
}) {
  const UiComponent = uiComponents[name];
  return <UiComponent {...props} />;
}
