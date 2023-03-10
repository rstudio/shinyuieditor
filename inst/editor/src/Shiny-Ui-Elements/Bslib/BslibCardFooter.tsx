import { nodeInfoFactory } from "../nodeInfoFactory";
import type { UiNodeComponent } from "../uiNodeTypes";

import { CardFooter } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

type CardFooterSettings = {};

const BslibCardFooter: UiNodeComponent<CardFooterSettings, 
  { TakesChildren: true }> = ({
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

export const bslibCardFooterInfo = nodeInfoFactory<CardFooterSettings>()({
  library: "bslib",
  name: "card_footer",
  title: "Card Footer",
  takesChildren: true,
  UiComponent: BslibCardFooter,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
});
