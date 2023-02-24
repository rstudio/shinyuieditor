import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { CardBody } from "./CardBody";
import { ChildrenWithDropNodes } from "./ChildrenWithDropNodes";
export const bslibCardBodyInfo: UiComponentInfo<CardBodySettings> = {
  title: "Card Body",
  UiComponent: BslibCardBody,
  settingsInfo: {},
  acceptsChildren: true,
  category: "Cards",
  description: "body holder for bslib cards",
};

export type CardBodySettings = {};

function BslibCardBody({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}: UiNodeComponentProps<CardBodySettings, { TakesChildren: true }>) {
  return (
    <CardBody {...wrapperProps}>
      <ChildrenWithDropNodes uiChildren={uiChildren} path={path} />
    </CardBody>
  );
}
