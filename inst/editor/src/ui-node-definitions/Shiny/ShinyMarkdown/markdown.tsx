import ReactMarkdown from "react-markdown";

import icon from "../../assets/icons/shinyMarkdown.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { markdown_node } from "../markdown";

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
