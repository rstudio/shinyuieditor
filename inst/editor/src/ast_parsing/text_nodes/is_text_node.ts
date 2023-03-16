import type {
  AST_Node_By_Name,
  Expression_Node,
  R_AST_Node,
} from "r-ast-parsing";
import { IsNodeOfType } from "r-ast-parsing/src/node_identity_checkers";
import type { Expand } from "util-functions/src/TypescriptUtils";

type ToNameTagMap<T extends { name: string; tag: string | null }> = {
  [Pair in T as Pair["name"]]: Pair["tag"];
};
type ToTagNameMap<T extends { name: string; tag: string }> = {
  [Pair in T as Pair["tag"]]: Pair["name"];
};

type TextDecorationMappings =
  | { name: "default"; tag: null }
  | { name: "bold"; tag: "strong" }
  | { name: "italic"; tag: "em" };

type TextDecorationMappingsNoDefault = Exclude<
  TextDecorationMappings,
  { name: "default" }
>;

export const decoration_to_wrapper: ToNameTagMap<TextDecorationMappings> = {
  default: null,
  bold: "strong",
  italic: "em",
};

const decoration_wrapper_to_value: ToTagNameMap<TextDecorationMappingsNoDefault> =
  {
    strong: "bold",
    em: "italic",
  };

type TextSizeMappings =
  | { name: "default"; tag: "span" }
  | { name: "small"; tag: "small" }
  | { name: "subtitle"; tag: "h2" }
  | { name: "headline"; tag: "h1" };

type TextSizeMappingsNoDefault = Exclude<TextSizeMappings, { name: "default" }>;

export const size_to_wrapper: ToNameTagMap<TextSizeMappings> = {
  default: "span",
  small: "small",
  headline: "h1",
  subtitle: "h2",
};

export const size_tag_to_name: ToTagNameMap<TextSizeMappingsNoDefault> = {
  h1: "headline",
  h2: "subtitle",
  small: "small",
};

export type TextDecorationTags = TextDecorationMappingsNoDefault["tag"];

export type TextNodeSettings = {
  contents: string;
  decoration?: TextDecorationMappings["name"];
  size?: TextSizeMappings["name"];
};

export type Text_Node_Size_Tag = TextSizeMappingsNoDefault["tag"];

type Sized_Text_Node = Expression_Node<
  [{ val: Text_Node_Size_Tag; type: "s" }, AST_Node_By_Name["character"]]
>;

type Decorated_Text_Node = Expression_Node<
  [{ val: TextDecorationTags; type: "s" }, AST_Node_By_Name["character"]]
>;

type Sized_And_Decorated_Text_Node = Expression_Node<
  [{ val: Text_Node_Size_Tag; type: "s" }, Decorated_Text_Node]
>;

export type Text_Node = Expand<
  | AST_Node_By_Name["character"]
  | Sized_Text_Node
  | Decorated_Text_Node
  | Sized_And_Decorated_Text_Node
>;

export function is_text_node(node: R_AST_Node): node is Text_Node {
  if (IsNodeOfType(node, "character")) return true;

  if (is_text_decoration_tag_node(node)) return true;

  if (is_text_size_tag_node(node)) return true;

  return false;
}
export function parse_text_decoration_tag_node(node: Decorated_Text_Node) {
  return {
    contents: node.val[1].val,
    decoration: decoration_wrapper_to_value[node.val[0].val],
  };
}

export function is_text_decoration_tag_node(
  node: R_AST_Node
): node is Decorated_Text_Node {
  if (!IsNodeOfType(node, "expression")) return false;

  const tag_node = node.val[0];

  const tag_node_is_decoration_tag =
    IsNodeOfType(tag_node, "symbol") &&
    Object.values(decoration_to_wrapper).includes(
      tag_node.val as TextDecorationTags
    );

  if (!tag_node_is_decoration_tag) return false;

  const content_node = node.val[1];

  return IsNodeOfType(content_node, "character");
}

export function is_text_size_tag_node(
  node: R_AST_Node
): node is Sized_Text_Node | Sized_And_Decorated_Text_Node {
  if (!IsNodeOfType(node, "expression")) return false;

  const tag_node = node.val[0];

  const tag_node_is_size_tag =
    IsNodeOfType(tag_node, "symbol") &&
    (tag_node.val as Text_Node_Size_Tag) in size_tag_to_name;

  if (!tag_node_is_size_tag) return false;

  const content_node = node.val[1];

  return (
    IsNodeOfType(content_node, "character") ||
    is_text_decoration_tag_node(content_node)
  );
}
