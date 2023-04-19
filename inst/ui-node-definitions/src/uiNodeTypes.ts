import type { Expand, PickKeyFn } from "util-functions/src/TypescriptUtils";

import { shinyActionButtonInfo } from "./Shiny/ActionButton";

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
 * This is the main object that contains the info about a given uiNode. Once the
 * node info object is created and added here the ui-node will be usable within
 * the editor
 */
export const shinyUiNodeInfoArray = [shinyActionButtonInfo] as const;

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

export type ShinyUiNodeInfo = Expand<(typeof shinyUiNodeInfoArray)[number]>;
export type ShinyUiNodeIds = ShinyUiNodeInfo["id"];
export type ShinyUiNodePyPackages = ShinyUiNodeInfo["py_info"]["package"];
export type ShinyUiNodePyFns = ShinyUiNodeInfo["py_info"]["fn_name"];
export type ShinyUiNodeCategories = Exclude<
  ShinyUiNodeInfo["category"],
  "TESTING"
>;

export type NodeInfoByRPackage = {
  [RPackage in ShinyUiNodeInfo["r_info"]["package"]]: Extract<
    ShinyUiNodeInfo,
    { r_info: { package: RPackage } }
  >;
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
export const shinyids = new Set<string>(
  shinyUiNodeInfoArray.map(({ id }) => id)
);

/**
 * Go from either an unnamespaced name (e.g. `sliderInput`) or a already
 * namespaced name (`shiny::sliderInput`)  to the ui node id. Also acts as
 * a check for if a node is in known R functions
 * */
export const rFnNameToNodeId = new Map<string, string>([
  ...(shinyUiNodeInfoArray.map(({ r_info, id }) => [r_info.fn_name, id]) as [
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
 * Path to a given node. Starts at [0] for the root. The first child for
 * instance would be then [0,1]
 */
export type PathElement = number | string;
export type NodePath = PathElement[];
