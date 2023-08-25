import ReactMarkdown from "react-markdown";

import icon from "../../assets/icons/shinyText.png";
import { markdown_node } from "../../ui-node-definitions/Shiny/markdown";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

export const markdownNodeInfo = addEditorInfoToUiNode(markdown_node, {
  iconSrc: icon,
  UiComponent: ({ namedArgs: { mds }, wrapperProps }) => {
    return (
      <div {...wrapperProps}>
        <ReactMarkdown children={mds} />
      </div>
    );
  },
});
