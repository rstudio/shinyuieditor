import icon from "../../assets/icons/shinyText.png";
import type { TextNodeSettings } from "../../ast_parsing/text_nodes/build_text_node";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../uiNodeTypes";

import { TextNode } from "./TextNode";

export type TextUiNode = MakeShinyUiNode<TextNodeSettings>;

export function isTextUiNode(node: ShinyUiNode): node is TextUiNode {
  return "contents" in node.uiArguments && node.uiName === "textNode";
}

export const textNodeInfo = nodeInfoFactory<TextNodeSettings>()({
  name: "textNode",
  title: "Static Text",
  category: "Utilities",
  description:
    "Add static text to your ui for things like descriptions and headers.",
  takesChildren: false,
  UiComponent: TextNode,
  settingsInfo: {
    contents: {
      label: "Text contents",
      inputType: "string",
      defaultValue: "Lorem Ipsum",
      longform: true,
    },
    decoration: {
      label: "Decoration",
      optional: true,
      inputType: "radio",
      defaultValue: "default",
      choices: {
        default: { label: "Normal" },
        italic: { label: "Italic" },
        bold: { label: "Bold" },
      },
      optionsPerColumn: 2,
    },
    size: {
      label: "Font size",
      inputType: "radio",
      optional: true,
      defaultValue: "span",
      choices: {
        span: { label: "Normal" },
        small: { label: "Small" },
        h1: { label: "Headline" },
        h2: { label: "Subtitle" },
      },
      optionsPerColumn: 2,
    },
  },
  iconSrc: icon,
});

export function text_node_to_code(ui_node: TextUiNode): string {
  // Why does this not automatically resolve for me?
  const { contents, size, decoration } =
    ui_node.uiArguments as TextNodeSettings;

  const quoted_contents = `"${contents}"`;

  if (!size && !decoration) return quoted_contents;

  return `${size}(${quoted_contents})`;
}
