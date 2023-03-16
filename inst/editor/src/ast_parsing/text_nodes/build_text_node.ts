import type { TextUiNode } from "../../Shiny-Ui-Elements/TextNode";

import type { Text_Node } from "./is_text_node";
import {
  is_text_size_tag_node,
  size_tag_to_name,
  is_text_decoration_tag_node,
  parse_text_decoration_tag_node,
} from "./is_text_node";

export function build_text_node(node: Text_Node): TextUiNode {
  const text_node: TextUiNode = {
    uiName: "textNode",
    uiArguments: {
      contents: "TO_REPLACE",
    },
  };

  if (is_text_size_tag_node(node)) {
    text_node.uiArguments.size = size_tag_to_name[node.val[0].val];

    const content_node = node.val[1];
    if (is_text_decoration_tag_node(content_node)) {
      const { decoration, contents } =
        parse_text_decoration_tag_node(content_node);
      text_node.uiArguments.decoration = decoration;
      text_node.uiArguments.contents = contents;
    } else {
      text_node.uiArguments.contents = content_node.val;
    }
  } else if (is_text_decoration_tag_node(node)) {
    const { decoration, contents } = parse_text_decoration_tag_node(node);
    text_node.uiArguments.decoration = decoration;
    text_node.uiArguments.contents = contents;
  } else {
    text_node.uiArguments.contents = node.val;
  }

  return text_node;
}
