import {
  DragStartEvents,
  DropHandlers,
} from "../DragAndDropHelpers/DragAndDropHelpers";

import { gridlayoutGridPageInfo } from "./GridlayoutGridPage";
import { gridLayoutGridPanelInfo } from "./GridlayoutGridPanel";
import { gridlayoutTitlePanelInfo } from "./GridlayoutTitlePanel";
import { gridlayoutVerticalStackPanelInfo } from "./GridlayoutVerticalStackPanel";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinySliderInputInfo } from "./ShinySliderInput";

/**
 * Defines everything needed to add a new Shiny UI component to the app
 */
export type UiComponentInfo<NodeSettings extends object> = {
  /**
   * The name of the component in plain language. E.g. Plot Output
   */
  title: string;
  /**
   * Component for rendering the settings/ arguments form
   */
  SettingsComponent: SettingsUpdaterComponent<NodeSettings>;
  /**
   * The settings that a freshly initialized node will take. These will also be
   * used to fill in any missing arguments if they are provided.
   */
  defaultSettings: NodeSettings;
  /**
   * The source of the icon. This comes from the importing of a png. If this is
   * not provided then the node will not show up in the element palette.
   */
  iconSrc?: string;
} & (
  | {
      /**
       * Does this component accept children? This is used to enable or disable the
       * drag-to-drop callbacks.
       */
      acceptsChildren: false;
      /**
       * The component that is used to actually draw the main interface for ui
       * element
       */
      UiComponent: UiNodeComponent<NodeSettings>;
    }
  | {
      /**
       * Does this component accept children? This is used to enable or disable the
       * drag-to-drop callbacks.
       */
      acceptsChildren: true;
      /**
       * The component that is used to actually draw the main interface for ui
       * element
       */
      UiComponent: UiContainerNodeComponent<NodeSettings>;
    }
);

/**
 * This is the main object that contains the info about a given uiNode. Once the
 * node info object is created and added here the ui-node will be usable within
 * the editor
 */
export const shinyUiNodeInfo = {
  "shiny::plotOutput": shinyPlotOutputInfo,
  "shiny::sliderInput": shinySliderInputInfo,
  "gridlayout::title_panel": gridlayoutTitlePanelInfo,
  "gridlayout::grid_panel": gridLayoutGridPanelInfo,
  "gridlayout::grid_page": gridlayoutGridPageInfo,
  "gridlayout::vertical_stack_panel": gridlayoutVerticalStackPanelInfo,
};

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */
type ShinyUiArguments = {
  [UiName in keyof typeof shinyUiNodeInfo]: typeof shinyUiNodeInfo[UiName]["defaultSettings"];
};

/**
 * Names of all the available Ui elements
 */
export type ShinyUiNames = keyof ShinyUiArguments;
export const shinyUiNames = Object.keys(shinyUiNodeInfo) as ShinyUiNames[];

export type ShinyUiChildren = ShinyUiNode[];

/**
 * Union of Ui element name and associated arguments for easy narrowing
 */
export type ShinyUiNode = {
  [UiName in ShinyUiNames]: {
    uiName: UiName;
    uiArguments: ShinyUiArguments[UiName];
    /** Any children of this node */
    uiChildren?: ShinyUiChildren;
    uiHTML?: string;
  };
}[ShinyUiNames];

type AllowedBaseElements = HTMLDivElement;

type BaseElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<AllowedBaseElements>,
  AllowedBaseElements
>;

type NodeInfo = {
  path: NodePath;
};

export type UiNodeComponent<NodeSettings extends object> = React.FC<{
  uiArguments: NodeSettings;
  nodeInfo: NodeInfo;
  eventHandlers: Pick<BaseElementProps, "onClick" | DragStartEvents>;
}>;

export type UiContainerNodeComponent<NodeSettings extends object> = React.FC<{
  uiArguments: NodeSettings;
  uiChildren: ShinyUiChildren;
  nodeInfo: NodeInfo;
  eventHandlers: Pick<BaseElementProps, "onClick" | DragStartEvents> &
    DropHandlers;
}>;

export type SettingsUpdaterComponent<T extends object> = (p: {
  settings: T;
  onChange: (newSettings: T) => void;
}) => JSX.Element;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];
