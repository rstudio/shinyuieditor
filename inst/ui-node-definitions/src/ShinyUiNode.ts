import type { namedArgsObject } from "./uiNodeTypes";
import { containerNodes } from "./uiNodeTypes";

/**
 * General ui node that can be a leaf or a parent node
 */

export type ShinyUiNode = ShinyUiLeafNode | ShinyUiParentNode;
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
