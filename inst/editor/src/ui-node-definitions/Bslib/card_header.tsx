import { ChildrenWithDropNodes } from "../ChildrenWithDropNodes";
import { nodeInfoFactory } from "../nodeInfoFactory";

import { CardHeader } from "./Utils/CardElements";

export const card_header = nodeInfoFactory<{}>()({
  r_info: {
    fn_name: "card_header",
    package: "bslib",
  },
  id: "card_header",
  title: "Card Header",
  takesChildren: true,
  settingsInfo: {},
  category: "Cards",
  description: "Header for bslib cards",
  ui_component: ({ children, path, wrapperProps }) => {
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
