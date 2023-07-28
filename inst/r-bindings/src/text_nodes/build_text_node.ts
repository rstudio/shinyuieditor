import type { TextUiNode } from "ui-node-definitions/src/internal/text_node";

import type { TextNode } from "./is_text_node";
import {
  isTextSizeTagNode,
  size_tag_to_name,
  isTextDecorationTagNode,
  parseTextDecorationTagNode,
} from "./is_text_node";

export function buildTextNode(text: string): TextUiNode;
export function buildTextNode(node: TextNode): TextUiNode;

export function buildTextNode(node: TextNode | string): TextUiNode {
  const text_node: TextUiNode = {
    id: "textNode",
    namedArgs: {
      contents: "TO_REPLACE",
    },
  };

  if (typeof node === "string") {
    text_node.namedArgs.contents = node;
    return text_node;
  }

  if (isTextSizeTagNode(node)) {
    text_node.namedArgs.size = size_tag_to_name[node.val[0].val];

    const content_node = node.val[1];
    if (isTextDecorationTagNode(content_node)) {
      const { decoration, contents } = parseTextDecorationTagNode(content_node);
      text_node.namedArgs.decoration = decoration;
      text_node.namedArgs.contents = contents;
    } else {
      text_node.namedArgs.contents = content_node.val;
    }
  } else if (isTextDecorationTagNode(node)) {
    const { decoration, contents } = parseTextDecorationTagNode(node);
    text_node.namedArgs.decoration = decoration;
    text_node.namedArgs.contents = contents;
  } else {
    text_node.namedArgs.contents = node.val;
  }

  return text_node;
}
