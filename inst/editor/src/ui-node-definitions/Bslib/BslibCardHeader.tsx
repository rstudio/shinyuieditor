import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { card_header } from "./card_header";
import { CardHeader } from "./Utils/CardElements";

export const bslibCardHeaderInfo = addEditorInfoToUiNode(card_header, {
  UiComponent: (node) => {
    const { children, path, wrapperProps } = node;

    return (
      <CardHeader {...wrapperProps}>
        <ChildrenWithDropNodes
          children={children}
          parentPath={path}
          parentid="card_header"
          messageOnHover="Add to card header"
        />
      </CardHeader>
    );
  },
});
