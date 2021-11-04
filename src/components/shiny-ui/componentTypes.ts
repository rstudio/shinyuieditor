import { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import { ShinySliderInputProps } from "./ShinySliderInput";

// All possible props for the defined UI components
export type ShinyUiElementProps = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

// The names of those components (important for most type narrowing)
export type ShinyUiElementNames = keyof ShinyUiElementProps;

// Get a union type of the props for use in narrowing function generics
type AllUiProps = ShinyUiElementProps[keyof ShinyUiElementProps];

// This is the format of a UI component
export type ShinyUiComponent<Props extends AllUiProps> = (
  p: Props
) => JSX.Element;

// This is the format of the corresponding settings panel for a component
export type ShinyUiSettingsComponent<Props extends AllUiProps> = (p: {
  startingSettings: Props;
  onUpdate: (newSettings: Props) => void;
}) => JSX.Element;
