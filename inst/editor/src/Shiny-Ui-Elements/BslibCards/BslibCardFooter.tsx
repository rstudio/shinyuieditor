import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { CardFooter } from "./CardFooter";
import { ChildrenWithDropNodes } from "./ChildrenWithDropNodes";

export const bslibCardFooterInfo: UiComponentInfo<CardFooterSettings> = {
  title: "Card Footer",
  UiComponent: BslibCardFooter,
  settingsInfo: {},
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};

export type CardFooterSettings = {};

function BslibCardFooter({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}: UiNodeComponentProps<CardFooterSettings>) {
  return (
    <CardFooter {...wrapperProps}>
      <ChildrenWithDropNodes uiChildren={uiChildren} path={path} />
    </CardFooter>
  );
}
