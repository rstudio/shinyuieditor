import { sizeNameToTag } from "../../../r-parsing/NodeTypes/TextNode";
import icon from "../../assets/icons/shinyText.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";

import styles from "./styles.module.css";
import { text_node } from "./text_node";

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
