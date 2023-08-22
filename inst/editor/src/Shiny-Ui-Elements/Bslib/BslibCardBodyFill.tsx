import { card_body } from "ui-node-definitions/src/Bslib/card_body";

import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { CardBody } from "./Utils/CardElements";

export const bslibCardBodyInfo = addEditorInfoToUiNode(card_body, {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <CardBody {...wrapperProps} args={namedArgs}>
        <ChildrenWithDropNodes
          children={children}
          parentPath={path}
          parentid="card_body"
          messageOnHover="Add to card body"
        />
      </CardBody>
    );
  },
});
