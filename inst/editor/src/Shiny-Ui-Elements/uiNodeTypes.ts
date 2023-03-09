import type { PickKeyFn } from "util-functions/src/TypescriptUtils";

import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { ArgsToDynamicInfo } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type { useMakeWrapperProps } from "../components/UiNode/useMakeWrapperProps";
import type { DeleteAction, UpdateAction } from "../state/app_info";

import {
  bslibCardBodyInfo,
  bslibCardFooterInfo,
  bslibCardHeaderInfo,
  bslibCardInfo,
} from "./Bslib";
import { dtDTOutputInfo } from "./DtDtOutput";
import {
  gridlayoutCardInfo,
  gridlayoutGridCardPlotInfo,
  gridlayoutGridContainerInfo,
  gridlayoutGridPageInfo,
  gridlayoutTextPanelInfo,
} from "./Gridlayout";
import { plotlyPlotlyOutputInfo } from "./PlotlyPlotlyOutput";
import { shinyActionButtonInfo } from "./ShinyActionButton";
import { shinyCheckboxGroupInputInfo } from "./ShinyCheckboxGroupInput";
import { shinyCheckboxInputInfo } from "./ShinyCheckboxInput";
import { shinyNavbarPageInfo } from "./ShinyNavbarPage";
import { shinyNumericInputInfo } from "./ShinyNumericInput";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinyRadioButtonsInfo } from "./ShinyRadioButtons";
import { shinySelectInputInfo } from "./ShinySelectInput";
import { shinySliderInputInfo } from "./ShinySliderInput";
import { shinyTabPanelInfo } from "./ShinyTabPanel";
import { shinyTabsetPanelInfo } from "./ShinyTabsetPanel";
import { shinyTextInputInfo } from "./ShinyTextInput";
import { shinyTextOutputInfo } from "./ShinyTextOutput";
import { shinyUiOutputInfo } from "./ShinyUiOutput";
import { textNodeInfo } from "./TextNode";
import { unknownUiFunctionInfo } from "./UnknownUiFunction";

export type UiArgumentsObject = Record<string, unknown | undefined>;

/**
 * Defines everything needed to add a new Shiny UI component to the app
 */
export type UiComponentInfo<NodeSettings extends UiArgumentsObject> = {
  library?: string;

  /**
   * Name of function as called in code: e.g. `"sliderInput"` for `shiny::sliderInput()`
   */
  name: string;

  /**
   * The name of the component in plain language. E.g. Plot Output
   */
  title: string;

  /**
   * Info declaring what arguments to render in settings panel and how
   */
  settingsInfo: ArgsToDynamicInfo<NodeSettings>;

  /** Optional field that is only here so the proper settings type gets carried
   * along with the info object.  */
  exampleSettings?: NodeSettings;

  settingsFormRender?: CustomFormRenderFn<NodeSettings>;

  /**
   * The source of the icon. This comes from the importing of a png. If this is
   * not provided then the node will not show up in the element palette.
   */
  iconSrc?: string;

  /**
   * Optional category of the node. Used to organize the elements palette. All
   * nodes with the same category will be grouped together under that categories
   * header.
   */
  category?: string;

  /**
   * Description of the component that will show up on long hover over element
   * in the elements pallete. String is interpreted as markdown.
   */
  description?: string;

  allowedParents?: ShinyUiNames[];

  /**
   * Does this node have outputs code it connects to in the server side of
   * things? If so what's the argument name that links it to the server code?
   * Can also supply a function that takes the current arguments for the node
   * and returns the key. This is useful for ones where the choice may be
   * dynamic. See `GridlayoutGridCardPlot` for an example.
   */
  serverBindings?: Partial<ServerBindings<NodeSettings>>;

  /**
   * Optional update subscribers
   */
  stateUpdateSubscribers?: Partial<StateUpdateSubscribers>;
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
      UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: false }>;
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
      UiComponent: UiNodeComponent<NodeSettings, { TakesChildren: true }>;
    }
);

export type ServerBindings<
  NodeSettings extends UiArgumentsObject = UiArgumentsObject
> = {
  outputs: {
    outputIdKey: keyof NodeSettings | PickKeyFn<NodeSettings>;
    /** Scaffold text to be inserted into the app server if the user requests.
     * Can use the [vscode snippet
     * syntax](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets).
     * */
    renderScaffold: string;
  };
  inputs: {
    inputIdKey: keyof NodeSettings | PickKeyFn<NodeSettings>;
  };
};

/**
 * Optional functions that will hook into the state update reducers and allow
 * a component the ability to respond to state manipulation before the main
 * tree update action has been preformed. These are dangerous and should only
 * be used as a last resort. perform state mutations in response in addition
 * to the plain updating of the node (which will occur last)
 */
export type StateUpdateSubscribers = {
  UPDATE_NODE: UpdateAction;
  DELETE_NODE: DeleteAction;
};

/**
 * This is the main object that contains the info about a given uiNode. Once the
 * node info object is created and added here the ui-node will be usable within
 * the editor
 */
export const shinyUiNodeInfo = {
  "shiny::actionButton": shinyActionButtonInfo,
  "shiny::numericInput": shinyNumericInputInfo,
  "shiny::sliderInput": shinySliderInputInfo,
  "shiny::textInput": shinyTextInputInfo,
  "shiny::checkboxInput": shinyCheckboxInputInfo,
  "shiny::checkboxGroupInput": shinyCheckboxGroupInputInfo,
  "shiny::selectInput": shinySelectInputInfo,
  "shiny::radioButtons": shinyRadioButtonsInfo,
  "shiny::plotOutput": shinyPlotOutputInfo,
  "shiny::textOutput": shinyTextOutputInfo,
  "shiny::uiOutput": shinyUiOutputInfo,
  "shiny::navbarPage": shinyNavbarPageInfo,
  "shiny::tabPanel": shinyTabPanelInfo,
  "shiny::tabsetPanel": shinyTabsetPanelInfo,
  "gridlayout::grid_page": gridlayoutGridPageInfo,
  "gridlayout::grid_card": gridlayoutCardInfo,
  "gridlayout::grid_card_text": gridlayoutTextPanelInfo,
  "gridlayout::grid_card_plot": gridlayoutGridCardPlotInfo,
  "gridlayout::grid_container": gridlayoutGridContainerInfo,
  "DT::DTOutput": dtDTOutputInfo,
  "bslib::card": bslibCardInfo,
  "bslib::card_body_fill": bslibCardBodyInfo,
  "bslib::card_header": bslibCardHeaderInfo,
  "bslib::card_footer": bslibCardFooterInfo,
  "plotly::plotlyOutput": plotlyPlotlyOutputInfo,
  textNode: textNodeInfo,
  unknownUiFunction: unknownUiFunctionInfo,
};

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */

/**
 * Names of all the available Ui elements
 */
export const shinyUiNames = new Set(Object.keys(shinyUiNodeInfo));
export type ShinyUiNames = keyof typeof shinyUiNodeInfo;

/**
 * Ui Node with no children
 */
export type ShinyUiLeafNode = {
  uiName: string;
  uiArguments: UiArgumentsObject;
};

/**
 * Ui Node with children
 */
export type ShinyUiParentNode = ShinyUiLeafNode & {
  uiChildren: Array<ShinyUiNode>;
};
export type ShinyUiRootNode = ShinyUiParentNode | "TEMPLATE_CHOOSER";

/**
 * General ui node that can be a leaf or a parent node
 */
export type ShinyUiNode = ShinyUiLeafNode | ShinyUiParentNode;

export type MakeShinyUiNode<
  Args extends UiArgumentsObject,
  TakesChildren extends boolean = false
> = {
  uiName: string;
  uiArguments: Args;
} & (TakesChildren extends true ? { uiChildren: Array<ShinyUiNode> } : {});

/**
 * Narrow if a node is a parent node or not
 */
export function isParentNode(node: ShinyUiNode): node is ShinyUiParentNode {
  return "uiChildren" in node;
}

/**
 * Type of component defining the app view of a given ui node
 */
export type UiNodeComponent<
  NodeSettings extends object,
  Opts extends { TakesChildren: boolean } = { TakesChildren: true }
> = (
  props: {
    uiArguments: NodeSettings;
    path: NodePath;
    wrapperProps: ReturnType<typeof useMakeWrapperProps>;
  } & (Opts["TakesChildren"] extends true
    ? { uiChildren: Array<ShinyUiNode> }
    : {})
) => JSX.Element;

export type UiLeafNodeComponent<NodeSettings extends object> = UiNodeComponent<
  NodeSettings,
  { TakesChildren: false }
>;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type NodePath = number[];
