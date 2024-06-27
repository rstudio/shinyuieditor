import icon from "../../assets/icons/shinyContainer.png";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode } from "../ShinyUiNode";
import type { KnownShinyUiNode } from "../uiNodeTypes";

import { BslibCardContainer } from "./BslibCardContainer";
import { renderCardElements } from "./Utils/render_card_elements";

export type BslibCardArguments = {
  full_screen?: boolean;
};
export const bslib_card = nodeInfoFactory<BslibCardArguments>()({
  r_info: {
    fn_name: "card",
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
  iconSrc: icon,
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
  ui_component: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <BslibCardContainer {...wrapperProps} card_args={namedArgs}>
        {renderCardElements(children, path)}
      </BslibCardContainer>
    );
  },
});

type BslibCardNode = Extract<KnownShinyUiNode, { id: "card" }>;

export function isBslibCard(node: ShinyUiNode): node is BslibCardNode {
  return node.id === "card";
}
