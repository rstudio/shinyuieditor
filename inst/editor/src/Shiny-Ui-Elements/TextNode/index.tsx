import { size_to_wrapper } from "ui-node-definitions/src/internal/is_text_node";
import { text_node } from "ui-node-definitions/src/internal/text_node";

import icon from "../../assets/icons/shinyText.png";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import styles from "./styles.module.css";

export const textNodeInfo = add_editor_info_to_ui_node(text_node, {
  iconSrc: icon,
  UiComponent: ({
    namedArgs: { contents, decoration, size = "default" },
    wrapperProps,
  }) => {
    const WrapperComp = size_to_wrapper[size];

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
