import { card_body_fill } from "ui-node-definitions/src/Bslib/card_body_fill";

import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import { CardBodyFill } from "./Utils/CardElements";
import { CardChildrenWithDropNodes } from "./Utils/ChildrenWithDropNodes";

export const bslibCardBodyInfo = add_editor_info_to_ui_node(card_body_fill, {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <CardBodyFill {...wrapperProps} args={namedArgs}>
        <CardChildrenWithDropNodes
          children={children}
          path={path}
          parentid="card_body_fill"
          messageOnHover="Add to card body"
        />
      </CardBodyFill>
    );
  },
});
