import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import { CardHeader } from "./Utils/CardHeader";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";
export type CardHeaderSettings = {};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiArguments, uiChildren, path, wrapperProps } = node;

  return (
    <CardHeader {...wrapperProps}>
      <CardChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        parentUiName="bslib::card_header"
      />
    </CardHeader>
  );
};

export const bslibCardHeaderInfo: UiComponentInfo<CardHeaderSettings> = {
  title: "Card Header",
  UiComponent: BslibCardHeader,
  settingsInfo: {},
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};
