import icon from "../../assets/icons/shinyText.png";
import { sizeNameToTag } from "../../r-parsing/NodeTypes/TextNode";
import { text_node } from "../../ui-node-definitions/internal/text_node";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import styles from "./styles.module.css";

export const textNodeInfo = addEditorInfoToUiNode(text_node, {
  iconSrc: icon,
  UiComponent: ({
    namedArgs: { contents, decoration, size = "default" },
    wrapperProps,
  }) => {
    const WrapperComp = sizeNameToTag[size];

    return (
      <WrapperComp
        className={styles.wrapper}
        {...wrapperProps}
        data-decoration={decoration}
      >
        {contents}
      </WrapperComp>
    );
  },
});
