import { TemplatedGridProps } from "utils/gridTemplates/types";
import { DragAndDropHandlers } from "./DragAndDropHelpers/useDragAndDropElements";
import { gridlayoutGridPageInfo } from "./Elements/GridlayoutGridPage";
import {
  gridLayoutGridPanelInfo,
  GridPanelSettings,
} from "./Elements/GridlayoutGridPanel";
import {
  gridlayoutTitlePanelInfo,
  GridlayoutTitlePanelProps,
} from "./Elements/GridlayoutTitlePanel";
import {
  gridlayoutVerticalStackPanelInfo,
  VerticalStackPanelSettings,
} from "./Elements/GridlayoutVerticalStackPanel";
import {
  shinyPlotOutputInfo,
  ShinyPlotOutputProps,
} from "./Elements/ShinyPlotOutput";
import { shinySliderInputInfo } from "./Elements/ShinySliderInput";
import { ShinySliderInputProps } from "./Elements/ShinySliderInput/arguments";
import { UiComponentInfo } from "./Elements/UiComponentInfo";

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
  "gridlayout::vertical_stack_panel": VerticalStackPanelSettings;
};

export const shinyUiNodeInfo: {
  [UiName in ShinyUiNames]: UiComponentInfo<ShinyUiArguments[UiName]>;
} = {
  "shiny::plotOutput": shinyPlotOutputInfo,
  "shiny::sliderInput": shinySliderInputInfo,
  "gridlayout::title_panel": gridlayoutTitlePanelInfo,
  "gridlayout::grid_panel": gridLayoutGridPanelInfo,
  "gridlayout::grid_page": gridlayoutGridPageInfo,
  "gridlayout::vertical_stack_panel": gridlayoutVerticalStackPanelInfo,
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
    uiChildren?: ShinyUiNode[];
    uiHTML?: string;
  };
}[ShinyUiNames];

type AllowedBaseElements = HTMLDivElement;
export type UiNodeComponent<NodeSettings extends object> = React.FC<
  { uiArguments: NodeSettings } & DragAndDropHandlers &
    Pick<
      React.DetailedHTMLProps<
        React.HTMLAttributes<AllowedBaseElements>,
        AllowedBaseElements
      >,
      "onClick"
    >
>;

export type SettingsUpdaterComponent<T extends object> = (p: {
  settings: T;
  onChange: (newSettings: T) => void;
}) => JSX.Element;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];
