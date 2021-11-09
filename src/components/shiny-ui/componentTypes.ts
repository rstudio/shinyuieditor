import type { ValueOf } from "utils/type-helpers";
import type { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import type { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import type { ShinySliderInputProps } from "./ShinySliderInput";

/**
 * All possible props for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */
export type ShinyUiPropsByName = {
  plotOutput: ShinyPlotOutputProps;
  sliderInput: ShinySliderInputProps;
  titlePanel: GridlayoutTitlePanelProps;
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiPropsByName;

/**
 * Property (arguments) of all the available Ui elements
 */
export type ShinyUiProps = ShinyUiPropsByName[ShinyUiNames];

/**
 * Union of Ui element name and associated props for easy narrowing
 */
export type ShinyUiNameAndProps = ValueOf<
  {
    [Name in keyof ShinyUiPropsByName]: {
      componentName: Name;
      componentProps: ShinyUiPropsByName[Name];
    };
  }
>;

/**
 * Format of a React component designating a Shiny-Ui element with a given
 * set of input props.
 */
export type ShinyUiComponent<Props extends ShinyUiProps> = (
  p: Props
) => JSX.Element;

/**
 * Format of React component used for controlling settings of a given
 * UI component (ShinyUiComponent<Props>) with a given set of input props.
 */
export type ShinyUiSettingsComponent<Props extends ShinyUiProps> = (p: {
  startingSettings: Props;
  onUpdate: (newSettings: Props) => void;
}) => JSX.Element;

/**
 * Payload describing the two main components needed for working with a UI element
 */
export type ShinyUiComponentAndSettings = {
  [Name in keyof ShinyUiPropsByName]: {
    UiComponent: ShinyUiComponent<ShinyUiPropsByName[Name]>;
    SettingsComponent: ShinyUiSettingsComponent<ShinyUiPropsByName[Name]>;
  };
};
