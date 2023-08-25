import type { TextNodeSettings } from "r-bindings/src/NodeTypes/TextNode";

import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../ShinyUiNode";

export type TextUiNode = MakeShinyUiNode<TextNodeSettings>;

export function isTextUiNode(node: ShinyUiNode): node is TextUiNode {
  return "contents" in node.namedArgs && node.id === "textNode";
}

export const text_node = nodeInfoFactory<TextNodeSettings>()({
  id: "textNode",
  title: "Static Text",
  r_info: {
    fn_name: "textNode",
    package: "Internal",
  },
  category: "Utilities",
  description: `Plain static text to your ui for things like descriptions and headers. For more complex text, use the "Markdown text" node.`,
  takesChildren: false,
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
      defaultValue: "plain",
      choices: {
        default: { label: "Plain" },
        italic: { label: "Italic" },
        bold: { label: "Bold" },
      },
      optionsPerColumn: 2,
    },
    size: {
      label: "Font size",
      inputType: "radio",
      optional: true,
      defaultValue: "default",
      choices: {
        default: { label: "Normal" },
        small: { label: "Small" },
        headline: { label: "Headline" },
        subtitle: { label: "Subtitle" },
      } satisfies Record<Required<TextNodeSettings>["size"], { label: string }>,
      optionsPerColumn: 2,
    },
  },
});
