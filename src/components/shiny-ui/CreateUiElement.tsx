import React from "react";
import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";

type UiOutputDefaults = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

export const uiOutputDefaults: UiOutputDefaults = {
  plotOutput: {
    name: "MyPlot",
    width: "100%",
    height: "100%",
  },
  sliderInput: {
    name: "MySlider",
    width: "100%",
    height: "100%",
  },
  titlePanel: {
    title: "My App Title",
  },
};
export type UiComponentNames = keyof UiOutputDefaults;

function CreateUiElement(name: UiComponentNames, extraProps: Object) {
  switch (name) {
    case "plotOutput":
      return (
        <ShinyPlotOutput {...merge(uiOutputDefaults.plotOutput, extraProps)} />
      );

    case "sliderInput":
      return (
        <ShinySliderInput
          {...merge(uiOutputDefaults.sliderInput, extraProps)}
        />
      );

    case "titlePanel":
      return (
        <GridlayoutTitlePanel
          {...merge(uiOutputDefaults.titlePanel, extraProps)}
        />
      );

    default:
      throw new Error("That's an unimplemented UI component");
  }
}

export default CreateUiElement;

function merge<DefaultProps extends Object, ExtraProps extends Object>(
  defaults: DefaultProps,
  extra: ExtraProps
) {
  return Object.assign({}, defaults, extra);
}
