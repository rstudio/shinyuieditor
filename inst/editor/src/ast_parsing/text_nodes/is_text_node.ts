import type { R_AST_Node } from "..";
import { IsNodeOfType } from "..";

import type { Text_Node, Text_Node_Tag } from "./build_text_node";
import { valid_text_node_tags } from "./build_text_node";

export function is_text_node(node: R_AST_Node): node is Text_Node {
  if (node.type === "c") return true;

  if (node.type !== "e") return false;

  const first_child = node.val[0];

  if (!IsNodeOfType(first_child, "symbol")) return false;

  const is_correct_tag_type = valid_text_node_tags.includes(
    first_child.val as Text_Node_Tag
  );

  return is_correct_tag_type && IsNodeOfType(node.val[1], "character");
}
