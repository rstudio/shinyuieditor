import { nodeInfoFactory } from "../nodeInfoFactory";
import type { UiNodeComponent } from "../uiNodeTypes";

import { CardHeader } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";
export type CardHeaderSettings = {};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiChildren, path, wrapperProps } = node;

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

export const bslibCardHeaderInfo = nodeInfoFactory<CardHeaderSettings>()({
  library: "bslib",
  name: "card_header",
  title: "Card Header",
  UiComponent: BslibCardHeader,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
});
