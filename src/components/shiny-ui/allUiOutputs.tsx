import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";

type UiComponentInfo<ComponentProps extends Object> = {
  component: React.ComponentType<ComponentProps>;
  defaultProps: ComponentProps;
};

type AllUiComponentsInfo = {
  plotOutput: UiComponentInfo<ShinyPlotOutputProps>;
  sliderInput: UiComponentInfo<ShinySliderInputProps>;
  titlePanel: UiComponentInfo<GridlayoutTitlePanelProps>;
};

export type UiComponentNames = keyof AllUiComponentsInfo;

const allUiOutputs: AllUiComponentsInfo = {
  plotOutput: {
    component: ShinyPlotOutput,
    defaultProps: {
      name: "MyPlot",
      width: "100%",
      height: "100%",
    },
  },
  sliderInput: {
    component: ShinySliderInput,
    defaultProps: {
      id: "MySlider",
      width: "100%",
      height: "100%",
    },
  },
  titlePanel: {
    component: GridlayoutTitlePanel,
    defaultProps: {
      title: "My App Title",
    },
  },
};

export default allUiOutputs;
