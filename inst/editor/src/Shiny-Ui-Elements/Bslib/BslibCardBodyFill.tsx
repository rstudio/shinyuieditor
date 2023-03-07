import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { CardBody } from "./Utils/CardBody";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";
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
      <CardChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        parentUiName="bslib::card_body_fill"
      />
    </CardBody>
  );
}
