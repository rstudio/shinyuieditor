import { card_footer } from "../../ui-node-definitions/Bslib/card_footer";
import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { CardFooter } from "./Utils/CardElements";

export const bslibCardFooterInfo = addEditorInfoToUiNode(card_footer, {
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
