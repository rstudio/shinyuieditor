import { card_footer } from "ui-node-definitions/src/Bslib/card_footer";

import { add_editor_info_to_ui_node } from "../add_editor_info_to_ui_node";

import { CardFooter } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

export const bslibCardFooterInfo = add_editor_info_to_ui_node(card_footer, {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <CardFooter {...wrapperProps}>
        <CardChildrenWithDropNodes
          children={children}
          path={path}
          parentid="card_footer"
          messageOnHover="Add to card footer"
        />
      </CardFooter>
    );
  },
});
