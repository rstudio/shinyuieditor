import icon from "../../assets/icons/shinyText.png";
import type { TextNodeSettings } from "../../ast_parsing/text_nodes/is_text_node";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../uiNodeTypes";

import { TextNode } from "./TextNode";

export type TextUiNode = MakeShinyUiNode<TextNodeSettings>;

export function isTextUiNode(node: ShinyUiNode): node is TextUiNode {
  return "contents" in node.namedArgs && node.id === "textNode";
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
      } satisfies Record<Required<TextNodeSettings>["decoration"], { label: string }>,
      optionsPerColumn: 2,
    },
    size: {
      label: "Font size",
      inputType: "radio",
      optional: true,
      defaultValue: "default",
      choices: {
        default: {label: "Normal"},
        small: { label: "Small" },
        headline: { label: "Headline" },
        subtitle: { label: "Subtitle" },
      } satisfies Record<Required<TextNodeSettings>["size"], { label: string }>,
      optionsPerColumn: 2,
    },
  },
  iconSrc: icon,
});
