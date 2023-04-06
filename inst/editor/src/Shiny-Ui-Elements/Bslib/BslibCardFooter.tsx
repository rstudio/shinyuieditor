import { nodeInfoFactory } from "../nodeInfoFactory";
import type { UiNodeComponent } from "../uiNodeTypes";

import { CardFooter } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

type CardFooterSettings = {};

const BslibCardFooter: UiNodeComponent<
  CardFooterSettings,
  { TakesChildren: true }
> = ({ namedArgs, uiChildren = [], path, wrapperProps }) => {
  return (
    <CardFooter {...wrapperProps}>
      <CardChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        parentid="bslib::card_footer"
        messageOnHover="Add to card footer"
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
