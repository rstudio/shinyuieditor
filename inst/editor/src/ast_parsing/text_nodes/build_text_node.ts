import type { Expression_Node, AST_Node_By_Name } from "..";
import { IsNodeOfType } from "..";
import type { ShinyUiNodeByName } from "../../Shiny-Ui-Elements/uiNodeTypes";

export const valid_text_node_tags = ["span", "small", "h1", "h2"] as const;

export type UiTextNode = ShinyUiNodeByName["textNode"];
export type Text_Node_Tag = typeof valid_text_node_tags[number];

export type TextNodeSettings = {
  contents: string;
  decoration?: "default" | "italic" | "bold";
  size?: Text_Node_Tag;
};

export type Text_Node =
  | AST_Node_By_Name["character"]
  | Expression_Node<
      [{ val: Text_Node_Tag; type: "s" }, AST_Node_By_Name["character"]]
    >;

export function build_text_node(node: Text_Node): UiTextNode {
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