import { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import { ShinySliderInputProps } from "./ShinySliderInput/arguments";

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */
export type ShinyUiArgumentsByName = {
  "shiny::plotOutput": ShinyPlotOutputProps;
  "shiny::sliderInput": ShinySliderInputProps;
  "gridlayout::title_panel": GridlayoutTitlePanelProps;
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
export type ShinyUiNameAndArguments = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArgumentsByName[UiName];
  };
}[ShinyUiNames];

export type UiSettingsComponentProps = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArgumentsByName[UiName];
    // Using object type here because I can't get narrowing to work properly inside UiSettingsComponent()
    onChange: (newSettings: object) => void;
  };
}[ShinyUiNames];

export type SettingsUpdateComponentProps<T extends object> = {
  settings: T;
  onChange: (newSettings: T) => void;
};

export type SettingsUpdateComponent<T extends object> = (
  p: SettingsUpdateComponentProps<T>
) => JSX.Element;

/**
 * Interface for the settings panels for a given UI component. UiName is used to
 * map to the correct component for the given ui element
 */
export type UiArgumentsCompByName = {
  [UiName in ShinyUiNames]: SettingsUpdateComponentProps<
    ShinyUiArgumentsByName[UiName]
  > & {
    uiName: UiName;
  };
};
