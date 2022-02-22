import { TemplatedGridProps } from "utils/gridTemplates/types";
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
  "gridlayout::grid_page": TemplatedGridProps;
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiArguments;

/**
 * Union of Ui element name and associated arguments for easy narrowing
 */
export type ShinyUiNode = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArguments[UiName];
    /** Any children of this node */
    uiChildren?: UiNodeProps[];
  };
}[ShinyUiNames];

export type SettingsUpdaterComponent<T extends object> = (p: {
  settings: T;
  onChange: (newSettings: T) => void;
}) => JSX.Element;

export type ContainerSettings = GridPanelSettings;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];

export type UiNodeProps = ShinyUiNode;

type UiContainerNode = Required<UiNodeProps>;
export function checkIfContainerNode(
  node: UiNodeProps
): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}
