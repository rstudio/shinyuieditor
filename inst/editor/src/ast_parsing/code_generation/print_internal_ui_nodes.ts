import type {
  KnownShinyUiNode,
  ShinyUiNode,
  ShinyUiNodeInfo,
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";

import { isTextUiNode } from "../../Shiny-Ui-Elements/TextNode";
import type { UnknownUiNode } from "../../Shiny-Ui-Elements/UnknownUiFunction";
import { isUnknownUiNode } from "../../Shiny-Ui-Elements/UnknownUiFunction";
import { text_node_to_code } from "../text_nodes/text_node_to_code";

type InternalUiNodeNames = Extract<
  ShinyUiNodeInfo,
  { library: "Internal" }
>["uiName"];

type InternalUiNode = Extract<
  KnownShinyUiNode,
  { uiName: InternalUiNodeNames }
>;

export function isInternalUiNode(node: ShinyUiNode): node is InternalUiNode {
  return isUnknownUiNode(node) || isTextUiNode(node);
}

export function print_internal_ui_nodes(node: InternalUiNode): string {
  switch (node.uiName) {
    case "unknownUiFunction":
      return print_unknown_ui_node(node);
    case "textNode":
      return text_node_to_code(node);
    // By leaving off the default case here typescript will let us know we need
    // to add any new internal nodes to this printing function when we add them.
  }
}

function print_unknown_ui_node({ uiArguments }: UnknownUiNode) {
  return uiArguments.text;
}
