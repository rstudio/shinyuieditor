import { ChildrenWithDropNodes } from "../../Shiny-Ui-Elements/ChildrenWithDropNodes";
import { addEditorInfoToUiNode } from "../../Shiny-Ui-Elements/utils/add_editor_info_to_ui_node";
import { nodeInfoFactory } from "../nodeInfoFactory";

import { CardFooter } from "./Utils/CardElements";

export const card_footer = nodeInfoFactory<{}>()({
  r_info: {
    fn_name: "card_footer",
    package: "bslib",
  },
  id: "card_footer",
  title: "Card Footer",
  takesChildren: true,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
});

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
