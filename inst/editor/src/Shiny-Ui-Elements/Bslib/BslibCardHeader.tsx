import { nodeInfoFactory } from "../nodeInfoFactory";
import type { UiNodeComponent } from "../uiNodeTypes";

import { CardHeader } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";
export type CardHeaderSettings = {};

const BslibCardHeader: UiNodeComponent<
  CardHeaderSettings,
  { TakesChildren: true }
> = (node) => {
  const { children, path, wrapperProps } = node;

  return (
    <CardHeader {...wrapperProps}>
      <CardChildrenWithDropNodes
        children={children}
        path={path}
        parentid="bslib::card_header"
        messageOnHover="Add to card header"
      />
    </CardHeader>
  );
};

export const bslibCardHeaderInfo = nodeInfoFactory<CardHeaderSettings>()({
  r_package: "bslib",
  name: "card_header",
  title: "Card Header",
  takesChildren: true,
  UiComponent: BslibCardHeader,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
});
