import icon from "../../assets/icons/shinyContainer.png";
import type { ArgsToDynamicInfo } from "../../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type {
  KnownShinyUiNode,
  ShinyUiNode,
  UiNodeComponent,
} from "../uiNodeTypes";

import { BslibCardContainer } from "./BslibCardContainer";
import { render_card_elements } from "./Utils/render_card_elements";

export type BslibCardArguments = {
  full_screen?: boolean;
};

const BslibCard: UiNodeComponent<
  BslibCardArguments,
  { TakesChildren: true }
> = ({ namedArgs, children = [], path, wrapperProps }) => {
  return (
    <BslibCardContainer {...wrapperProps} card_args={namedArgs}>
      {render_card_elements(children, path)}
    </BslibCardContainer>
  );
};

export const bslib_card_settings_info: ArgsToDynamicInfo<BslibCardArguments> = {
  full_screen: {
    inputType: "boolean",
    defaultValue: true,
    label: "Allow fullscreen mode?",
    optional: true,
  },
};

export const bslibCardInfo = nodeInfoFactory<BslibCardArguments>()({
  r_info: {
    fn_name: "bs_card",
    package: "bslib",
  },
  id: "card",
  title: "Card",
  takesChildren: true,
  UiComponent: BslibCard,
  settingsInfo: bslib_card_settings_info,
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
});

type BslibCardNode = Extract<KnownShinyUiNode, { id: "card" }>;

export function isBslibCard(node: ShinyUiNode): node is BslibCardNode {
  return node.id === "card";
}
