import { isTextUiNode } from "ui-node-definitions/src/internal/text_node";
import type { UnknownUiNode } from "ui-node-definitions/src/internal/unknown_code";
import { isUnknownUiNode } from "ui-node-definitions/src/internal/unknown_code";

import { text_node_to_code } from "../../../r-bindings/src";
import type { ShinyUiNode } from "../ShinyUiNode";
import type { ShinyUiNodeInfo, KnownShinyUiNode } from "../uiNodeTypes";

type InternalUiNodeNames = Extract<
  ShinyUiNodeInfo,
  { r_info: { package: "Internal" } }
>["id"];

type InternalUiNode = Extract<KnownShinyUiNode, { id: InternalUiNodeNames }>;

export function isInternalUiNode(node: ShinyUiNode): node is InternalUiNode {
  return isUnknownUiNode(node) || isTextUiNode(node);
}

export function printInternalUiNodes(node: InternalUiNode): string {
  switch (node.id) {
    case "unknownUiFunction":
      return printUnknownUiNode(node);
    case "textNode":
      return text_node_to_code(node);
    // By leaving off the default case here typescript will let us know we need
    // to add any new internal nodes to this printing function when we add them.
  }

  // TODO: Fix this error by making typescript handle fn_aliases better
  throw new Error("Unknown internal ui node");
}

function printUnknownUiNode({ namedArgs }: UnknownUiNode) {
  return namedArgs.text;
}
