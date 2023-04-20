import { card_header } from "ui-node-definitions/src/Bslib/card_header";

import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import { CardHeader } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

export const bslibCardHeaderInfo = add_editor_info_to_ui_node(card_header, {
  UiComponent: (node) => {
    const { children, path, wrapperProps } = node;

    return (
      <CardHeader {...wrapperProps}>
        <CardChildrenWithDropNodes
          children={children}
          path={path}
          parentid="card_header"
          messageOnHover="Add to card header"
        />
      </CardHeader>
    );
  },
});
