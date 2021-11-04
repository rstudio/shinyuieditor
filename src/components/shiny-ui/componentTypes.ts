import { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import { ShinySliderInputProps } from "./ShinySliderInput";

export type UiElementProps = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

export type UiElementNames = keyof UiElementProps;
type valueof<T> = T[keyof T];

export type ShinyUiComponent<PropsType extends valueof<UiElementProps>> = (
  props: PropsType
) => JSX.Element;

export type ShinyUiSettingsComponent<
  PropsType extends valueof<UiElementProps>
> = (props: {
  startingSettings: PropsType;
  onUpdate: (newSettings: PropsType) => void;
}) => JSX.Element;
