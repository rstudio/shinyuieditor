import { GridPanelSettings } from "./Elements/GridlayoutGridPanel";
import { GridlayoutTitlePanelProps } from "./Elements/GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "./Elements/ShinyPlotOutput";
import { ShinySliderInputProps } from "./Elements/ShinySliderInput/arguments";

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
  "gridlayout::grid_panel": GridPanelSettings;
};

/**
 * UiNode that can have children container within it
 * */
export type UiContainerNode = {
  uiName: "container";
  uiArguments: ContainerSettings;
  /** Any children of this node */
  uiChildren: UiNodeProps[];
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
    /** Any children of this node */
    uiChildren?: UiNodeProps[];
  };
}[ShinyUiNames];

export type SettingsUpdateComponentProps<T extends object> = {
  settings: T;
  onChange: (newSettings: T) => void;
};

export type ContainerSettings = GridPanelSettings;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];

export type UiNodeProps = UiContainerNode | ShinyUiNameAndArguments;

export function checkIfContainerNode(
  node: UiNodeProps
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}
