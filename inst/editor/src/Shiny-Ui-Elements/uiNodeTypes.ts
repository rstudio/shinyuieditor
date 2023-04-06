import type { Expand, PickKeyFn } from "util-functions/src/TypescriptUtils";

import type { useMakeWrapperProps } from "../components/UiNode/useMakeWrapperProps";
import type { DeleteAction, UpdateAction } from "../state/app_info";

import { testingErrorNodeInfo } from "./__TestingErrorNode";
import {
  bslibCardBodyInfo,
  bslibCardFooterInfo,
  bslibCardHeaderInfo,
  bslibCardInfo,
} from "./Bslib";
import { bslibValueBoxInfo } from "./Bslib/ValueBox/ValueBox";
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

export type namedArgsObject = Record<string, unknown | undefined>;

export type ServerBindings<
  NodeSettings extends namedArgsObject = namedArgsObject
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
export const shinyUiNodeInfoArray = [
  shinyActionButtonInfo,
  shinyNumericInputInfo,
  shinySliderInputInfo,
  shinyTextInputInfo,
  shinyCheckboxInputInfo,
  shinyCheckboxGroupInputInfo,
  shinySelectInputInfo,
  shinyRadioButtonsInfo,
  shinyPlotOutputInfo,
  shinyTextOutputInfo,
  shinyUiOutputInfo,
  shinyNavbarPageInfo,
  shinyTabPanelInfo,
  shinyTabsetPanelInfo,
  gridlayoutGridPageInfo,
  gridlayoutCardInfo,
  gridlayoutTextPanelInfo,
  gridlayoutGridCardPlotInfo,
  gridlayoutGridContainerInfo,
  dtDTOutputInfo,
  bslibCardInfo,
  bslibValueBoxInfo,
  bslibCardBodyInfo,
  bslibCardHeaderInfo,
  bslibCardFooterInfo,
  plotlyPlotlyOutputInfo,
  textNodeInfo,
  unknownUiFunctionInfo,
  testingErrorNodeInfo,
] as const;

const shinyUiNodeInfo = new Map<string, ShinyUiNodeInfo>(
  shinyUiNodeInfoArray.map((info) => [info.id, info])
);

const containerNodes = new Set<string>(
  shinyUiNodeInfoArray
    .filter((info) => info.takesChildren)
    .map((info) => info.id)
);

/**
 *
 * @param id Name of ui node to look up
 * @returns Set of information about that node, or error if it doesn't exist
 * @throws Error if node doesn't exist
 */
export function getUiNodeInfo(id: string): ShinyUiNodeInfo {
  if (!shinyUiNodeInfo.has(id)) {
    throw new Error(`Failed to find node info for requested node: ${id}`);
  }
  return shinyUiNodeInfo.get(id) as ShinyUiNodeInfo;
}

/**
 * Get plain english title of a node based on its id
 * @param id Name of ui node to look up
 * @returns Plain english title for node. E.g. `Slider Input`
 * @throws Error if node doesn't exist
 */
export function getUiNodeTitle(id: string): string {
  return getUiNodeInfo(id).title;
}

export type ShinyUiNodeInfo = Expand<typeof shinyUiNodeInfoArray[number]>;
export type ShinyUiNodeIds = ShinyUiNodeInfo["id"];
export type ShinyUiNodeRPackages = ShinyUiNodeInfo["r_package"];
export type ShinyUiNodeCategories = Exclude<
  ShinyUiNodeInfo["category"],
  "TESTING"
>;

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */

/**
 * Names of all the available Ui elements
 */
export const shinyids = new Set<string>(
  shinyUiNodeInfoArray.map(({ id }) => id)
);

/**
 * Go from either an unnamespaced name (e.g. `sliderInput`) or a already
 * namespaced name (`shiny::sliderInput`)  to the namespaced name. Also acts as
 * a check for if a node is in known functions
 * */
export const shinyidToNamespacedName = new Map<string, string>([
  ...(shinyUiNodeInfoArray.map(({ name, id }) => [name, id]) as [
    string,
    string
  ][]),
  ...(shinyUiNodeInfoArray.map(({ id }) => [id, id]) as [string, string][]),
]);

/** A ui node type that type checks its values. Used for things like declaring test ui trees etc.. */
export type KnownShinyUiNode = {
  [NodeInfo in ShinyUiNodeInfo as NodeInfo["id"]]: {
    id: NodeInfo["id"];
    namedArgs: Required<NodeInfo>["example_args"];
  } & (NodeInfo["takesChildren"] extends true
    ? { children: KnownUiChildren }
    : {});
}[ShinyUiNodeInfo["id"]];

type KnownUiChildren = Array<KnownShinyUiNode>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knownUiNodeTest: KnownShinyUiNode = {
  id: "bslib::card",
  namedArgs: { full_screen: true },
  children: [
    {
      id: "shiny::actionButton",
      namedArgs: { inputId: "btn", label: "My Button" },
    },
  ],
};

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knownUiNodeTestFail: KnownShinyUiNode = {
  id: "shiny::actionButton",
  namedArgs: {
    inputId: "test",
  },
};

/**
 * Ui Node with no children
 */
export type ShinyUiLeafNode = {
  id: string;
  namedArgs: namedArgsObject;
};

/**
 * Ui Node with children
 */
export type ShinyUiParentNode = ShinyUiLeafNode & {
  children?: Array<ShinyUiNode>;
};
export type ShinyUiRootNode = ShinyUiParentNode | "TEMPLATE_CHOOSER";

/**
 * General ui node that can be a leaf or a parent node
 */
export type ShinyUiNode = ShinyUiLeafNode | ShinyUiParentNode;

export type MakeShinyUiNode<
  Args extends namedArgsObject,
  TakesChildren extends boolean = false
> = {
  id: string;
  namedArgs: Args;
} & (TakesChildren extends true ? { children: Array<ShinyUiNode> } : {});

/**
 * Narrow if a node is a parent node or not
 */
export function isParentNode(node: ShinyUiNode): node is ShinyUiParentNode {
  return "children" in node || containerNodes.has(node.id);
}

/**
 * Type of component defining the app view of a given ui node
 */
export type UiNodeComponent<
  NodeSettings extends object,
  Opts extends { TakesChildren: boolean }
> = (
  props: {
    namedArgs: NodeSettings;
    path: NodePath;
    wrapperProps: ReturnType<typeof useMakeWrapperProps>;
  } & (Opts["TakesChildren"] extends true
    ? { children: Array<ShinyUiNode> }
    : {})
) => JSX.Element;

/**
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type PathElement = number | string;
export type NodePath = PathElement[];
