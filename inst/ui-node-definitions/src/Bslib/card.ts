import { nodeInfoFactory } from "../nodeInfoFactory";
import type { KnownShinyUiNode } from "../uiNodeTypes";
import type { ShinyUiNode } from "../ShinyUiNode";

export type BslibCardArguments = {
  full_screen?: boolean;
};
export const bslib_card = nodeInfoFactory<BslibCardArguments>()({
  r_info: {
    fn_name: "bs_card",
    package: "bslib",
  },
  id: "card",
  title: "Card",
  takesChildren: true,
  settingsInfo: {
    full_screen: {
      inputType: "boolean",
      defaultValue: true,
      label: "Allow fullscreen mode?",
      optional: true,
    },
  },
  category: "Containers",
  description: "Bootstrap card with smart fill behavior",
  default_node: {
    namedArgs: { full_screen: true },
    children: [
      {
        id: "card_header",
        namedArgs: {},
        children: [
          {
            id: "textNode",
            namedArgs: {
              contents: "Header",
            },
          },
        ],
      },
    ],
  },
});

type BslibCardNode = Extract<KnownShinyUiNode, { id: "card" }>;

export function isBslibCard(node: ShinyUiNode): node is BslibCardNode {
  return node.id === "card";
}
