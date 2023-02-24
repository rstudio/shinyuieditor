import type { TextNodeSettings } from "../../ast_parsing/text_nodes/build_text_node";
import type { UiComponentInfo } from "../uiNodeTypes";

import { TextNode } from "./TextNode";

export const textNodeInfo: UiComponentInfo<TextNodeSettings> = {
  title: "Text Node",
  UiComponent: TextNode,
  settingsInfo: {
    contents: {
      label: "Text contents",
      inputType: "string",
      defaultValue: "Lorem Ipsum",
    },
    decoration: {
      label: "Decoration",
      inputType: "radio",
      defaultValue: "default",
      choices: {
        default: { icon: <span>Normal</span>, label: "Normal" },
        italic: { icon: <span style={{ fontStyle: "italic" }}>Italic</span> },
        bold: { icon: <span style={{ fontStyle: "bold" }}>Bold</span> },
      },
    },
    size: {
      label: "Font size",
      inputType: "radio",
      defaultValue: "span",
      choices: {
        span: { icon: <span>normal</span> },
        small: { icon: <span>small</span> },
        h1: { icon: <span>headline</span> },
        h2: { icon: <span>subtitle</span> },
      },
    },
  },
  acceptsChildren: false,
  category: "Utilities",
  description: "Add simple text to your ui",
};
