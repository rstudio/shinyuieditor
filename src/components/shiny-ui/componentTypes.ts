import { Values } from "utils/type-helpers";
import { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import { ShinySliderInputProps } from "./ShinySliderInput";

/**
 * All possible props for the defined UI components
 */
export type ShinyUiPropsByName = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

/**
 * Union of Ui element name and associated props for easy narrowing
 */
export type ShinyUiNameAndProps = Values<
  {
    [Name in keyof ShinyUiPropsByName]: {
      componentName: Name;
      componentProps: ShinyUiPropsByName[Name];
    };
  }
>;

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = ShinyUiNameAndProps["componentName"];

/**
 * Property (arguments) of all the available Ui elements
 */
export type ShinyUiProps = ShinyUiNameAndProps["componentProps"];

/**
 * Format of a component designating a Shiny-Ui element
 */
export type ShinyUiComponent<Props extends ShinyUiProps> = (
  p: Props
) => JSX.Element;

/**
 * Format of the corresponding settings panel for a component a Shiny-Ui element
 */
export type ShinyUiSettingsComponent<Props extends ShinyUiProps> = (p: {
  startingSettings: Props;
  onUpdate: (newSettings: Props) => void;
}) => JSX.Element;
