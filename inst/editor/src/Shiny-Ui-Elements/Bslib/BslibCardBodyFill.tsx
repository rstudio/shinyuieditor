import { card_body_fill } from "ui-node-definitions/src/Bslib/card_body_fill";

import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { CardBodyFill } from "./Utils/CardElements";

export const bslibCardBodyInfo = addEditorInfoToUiNode(card_body_fill, {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <CardBodyFill {...wrapperProps} args={namedArgs}>
        <ChildrenWithDropNodes
          children={children}
          parentPath={path}
          parentid="card_body"
          messageOnHover="Add to card body"
        />
      </CardBodyFill>
    );
  },
});
