import type { ValueOf } from "utils/type-helpers";
import type { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import type { ShinyPlotOutputProps } from "../Shiny-Ui-Elements/ShinyPlotOutput";
import type { ShinySliderInputProps } from "../Shiny-Ui-Elements/ShinySliderInput";

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */
export type ShinyUiArgumentsByName = {
  shiny__plotOutput: ShinyPlotOutputProps;
  shiny__sliderInput: ShinySliderInputProps;
  gridlayout__titlePanel: GridlayoutTitlePanelProps;
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiArgumentsByName;

/**
 * Property (arguments) of all the available Ui elements
 */
export type ShinyUiArguments = ShinyUiArgumentsByName[ShinyUiNames];

/**
 * Union of Ui element name and associated arguments for easy narrowing
 */
export type ShinyUiNameAndArguments = ValueOf<{
  [Name in keyof ShinyUiArgumentsByName]: {
    uiName: Name;
    uiArguments: ShinyUiArgumentsByName[Name];
  };
}>;

/**
 * Format of a React component designating a Shiny-Ui element with a given
 * set of input props.
 */
export type ShinyUiComponent<Props extends ShinyUiArguments> = (
  p: Props
) => JSX.Element;

/**
 * Interface for the settings panels for a given UI component. UiName is used to
 * map to the correct component for the given ui element
 */
export type UiArgumentsCompByName<UiName extends ShinyUiNames> = {
  uiName: UiName;
  settings: ShinyUiArgumentsByName[UiName];
  onChange: ShinyUiArgumentsUpdate<ShinyUiArgumentsByName[UiName]>;
};

/**
 * Component containing a series of inputs to control arguments for a Shiny UI function.
 * This is not wrapped in a form element and thus can be embedded in other forms.
 */
export type ShinyUiArgumentsFields<Args extends ShinyUiArguments> = (p: {
  currentSettings: Args;
  onChange: ShinyUiArgumentsUpdate<Args>;
}) => JSX.Element;

/**
 * Update function for a given elements settings.
 * isValid tells injestor if the settings are good to go or need updating before
 * they should be accepted
 */
export type ShinyUiArgumentsUpdate<Args extends ShinyUiArguments> = (
  newSettings: Args,
  isValid: boolean
) => void;

/**
 * Payload describing the two main components needed for working with a UI element
 */
export type ShinyUiComponentAndArguments = {
  [Name in keyof ShinyUiArgumentsByName]: {
    UiComponent: ShinyUiComponent<ShinyUiArgumentsByName[Name]>;
    SettingsComponent: ShinyUiArgumentsFields<ShinyUiArgumentsByName[Name]>;
  };
};
