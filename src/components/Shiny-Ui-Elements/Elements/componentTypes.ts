import { GridlayoutTitlePanelProps } from "./GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import { ShinySliderInputProps } from "./ShinySliderInput/arguments";

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */
export type ShinyUiArguments = {
  "shiny::plotOutput": ShinyPlotOutputProps;
  "shiny::sliderInput": ShinySliderInputProps;
  "gridlayout::title_panel": GridlayoutTitlePanelProps;
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiArguments;

/**
 * Union of Ui element name and associated arguments for easy narrowing
 */
export type ShinyUiNameAndArguments = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArguments[UiName];
  };
}[ShinyUiNames];

export type SettingsUpdateComponentProps<T extends object> = {
  settings: T;
  onChange: (newSettings: T) => void;
};
