import type { ValueOf } from "utils/type-helpers";
import type { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import type { ShinyPlotOutputProps } from "../Shiny-Ui-Elements/ShinyPlotOutput";
import type { ShinySliderInputProps } from "../Shiny-Ui-Elements/ShinySliderInput";

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
export type ShinyUiNameAndProps = ValueOf<{
  [Name in keyof ShinyUiPropsByName]: {
    name: Name;
    componentProps: ShinyUiPropsByName[Name];
  };
}>;

/**
 * Format of a React component designating a Shiny-Ui element with a given
 * set of input props.
 */
export type ShinyUiComponent<Props extends ShinyUiProps> = (
  p: Props
) => JSX.Element;

/**
 * Interface for the settings panels for a given UI component. UiName is used to
 * map to the correct component for the given ui element
 */
export type UiSettingsCompByName<UiName extends ShinyUiNames> = {
  uiName: UiName;
  settings: ShinyUiPropsByName[UiName];
  onChange: ShinyUiSettingsUpdate<ShinyUiPropsByName[UiName]>;
};

/**
 * Format of form inputs for ShinyUiSettingsComponent. This is not wrapped in a
 * form element and thus can be embedded in other forms.
 */
export type ShinyUiSettingsFields<Props extends ShinyUiProps> = (p: {
  currentSettings: Props;
  onChange: ShinyUiSettingsUpdate<Props>;
}) => JSX.Element;

/**
 * Update function for a given elements settings.
 * isValid tells injestor if the settings are good to go or need updating before
 * they should be accepted
 */
export type ShinyUiSettingsUpdate<Props extends ShinyUiProps> = (
  newSettings: Props,
  isValid: boolean
) => void;

/**
 * Payload describing the two main components needed for working with a UI element
 */
export type ShinyUiComponentAndSettings = {
  [Name in keyof ShinyUiPropsByName]: {
    UiComponent: ShinyUiComponent<ShinyUiPropsByName[Name]>;
    SettingsComponent: ShinyUiSettingsFields<ShinyUiPropsByName[Name]>;
  };
};
