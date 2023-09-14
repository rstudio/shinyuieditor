import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";
import type { Brand } from "util-functions/src/TypescriptUtils";

import type { TextUiNode } from "../../ui-node-definitions/internal/text_node";

import { extract_string_content, is_string_node } from "./StringNode";

type TSTextNode = Brand<ParserNode, "TextNode">;

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

type TextSizeMappings =
  | { name: "default"; tag: "span" }
  | { name: "small"; tag: "small" }
  | { name: "subtitle"; tag: "h2" }
  | { name: "headline"; tag: "h1" };

const size_tag_to_name: ToTagNameMap<TextSizeMappings> = {
  h1: "headline",
  h2: "subtitle",
  small: "small",
  span: "default",
};

export const sizeNameToTag: ToNameTagMap<TextSizeMappings> = {
  default: "span",
  small: "small",
  headline: "h1",
  subtitle: "h2",
};

export type TextNodeSettings = {
  contents: string;
  decoration?: TextDecorationMappings["name"];
  size?: TextSizeMappings["name"];
};

type Decoration_Tag = TextDecorationMappingsNoDefault["tag"];
const decoration_tags = new Set(["strong", "em"]) satisfies Set<Decoration_Tag>;
function is_decoration_tag(fn_name: string): fn_name is Decoration_Tag {
  return decoration_tags.has(fn_name as Decoration_Tag);
}

type Size_Tag = TextSizeMappings["tag"];
const size_tags = new Set<Size_Tag>(["small", "span", "h1", "h2"]);
function is_size_tag(fn_name: string): fn_name is Size_Tag {
  return size_tags.has(fn_name as Size_Tag);
}

export function is_text_node(node: ParserNode): node is TSTextNode {
  if (is_string_node(node)) return true;

  if (!is_call_node(node)) return false;

  const { fn_name, fn_args } = extract_call_content(node);

  return (
    (is_decoration_tag(fn_name) || is_size_tag(fn_name)) &&
    is_text_node(fn_args[0])
  );
}

const decoration_wrapper_to_value: ToTagNameMap<TextDecorationMappingsNoDefault> =
  {
    strong: "bold",
    em: "italic",
  };

export function parse_text_node(node: TSTextNode): TextUiNode {
  if (is_string_node(node)) {
    return {
      id: "textNode",
      namedArgs: {
        contents: extract_string_content(node),
      },
    };
  }

  const { fn_name, fn_args } = extract_call_content(node);

  if (!is_text_node(fn_args[0])) {
    throw new Error("Can't parse string");
  }
  const internal_text_node = parse_text_node(fn_args[0]);

  if (is_decoration_tag(fn_name)) {
    return {
      id: "textNode",
      namedArgs: {
        decoration: decoration_wrapper_to_value[fn_name],
        ...internal_text_node.namedArgs,
      },
    };
  }

  if (is_size_tag(fn_name)) {
    return {
      id: "textNode",
      namedArgs: {
        size: size_tag_to_name[fn_name],
        ...internal_text_node.namedArgs,
      },
    };
  }

  throw new Error("Can't parse string");
}

/**
 * Convert a text node to code. Will be a function call like `strong("foo")` or
 * a plain string depending on the decoration and size options
 * @param ui_node The text node to convert
 * @returns The code for the text node
 */
export function textNodeToCode(ui_node: TextUiNode): string {
  // Why does this not automatically resolve for me?
  let text_size = ui_node.namedArgs.size;
  const { contents, decoration } = ui_node.namedArgs;

  const quoted_contents = `"${contents}"`;

  const decoration_wrapper = decoration
    ? decoration_to_wrapper[decoration]
    : "";

  const decorated_contents = decoration_wrapper
    ? `${decoration_wrapper}(${quoted_contents})`
    : quoted_contents;

  if (!text_size || text_size === "default") {
    // Just plain text
    return decorated_contents;
  }

  return `${sizeNameToTag[text_size]}(${decorated_contents})`;
}
