import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import { CardFooter } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

type CardFooterSettings = {};

const BslibCardFooter: UiNodeComponent<CardFooterSettings> = ({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  return (
    <CardFooter {...wrapperProps}>
      <CardChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        parentUiName="bslib::card_footer"
      />
    </CardFooter>
  );
};

export const bslibCardFooterInfo: UiComponentInfo<CardFooterSettings> = {
  title: "Card Footer",
  UiComponent: BslibCardFooter,
  settingsInfo: {},
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};
