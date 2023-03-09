import type { AST_Node_By_Name, Expression_Node } from "r-ast-parsing";
import { IsNodeOfType } from "r-ast-parsing";

import type { TextUiNode } from "../../Shiny-Ui-Elements/TextNode";

export const valid_text_node_tags = ["span", "small", "h1", "h2"] as const;

export const valid_text_node_decorations = ["default", "italic", "bold"];
export type Text_Node_Tag = typeof valid_text_node_tags[number];

export type TextNodeSettings = {
  contents: string;
  decoration?: string;
  size?: string;
};

export type Text_Node =
  | AST_Node_By_Name["character"]
  | Expression_Node<
      [{ val: Text_Node_Tag; type: "s" }, AST_Node_By_Name["character"]]
    >;

export function build_text_node(node: Text_Node): TextUiNode {
  return {
    uiName: "textNode",
    uiArguments: IsNodeOfType(node, "character")
      ? {
          contents: node.val,
        }
      : {
          contents: node.val[1].val,
          size: node.val[0].val,
        },
  };
}
