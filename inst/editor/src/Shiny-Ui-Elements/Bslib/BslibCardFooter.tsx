import { card_footer } from "ui-node-definitions/src/Bslib/card_footer";

import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import { CardFooter } from "./Utils/CardElements";
import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";

export const bslibCardFooterInfo = add_editor_info_to_ui_node(card_footer, {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <CardFooter {...wrapperProps}>
        <ChildrenWithDropNodes
          children={children}
          parentPath={path}
          parentid="card_footer"
          messageOnHover="Add to card footer"
        />
      </CardFooter>
    );
  },
});
